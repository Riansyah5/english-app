import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import confetti from 'canvas-confetti';

export default function VideoShow({ auth, video, savedFlashcards = [], savedVocabs = [] }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [activeLine, setActiveLine] = useState(-1);
    const [showTranslations, setShowTranslations] = useState({});
    
    // Modal states
    const [dictModal, setDictModal] = useState(null); // { word, context, definition, phonetic, partOfSpeech, translation, loading, error }
    const [speechModal, setSpeechModal] = useState(null); // { expectedText, status: 'listening'|'analyzing'|'result'|'error', accuracy, spoken, error }
    
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const syncIntervalRef = useRef(null);
    
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.head.appendChild(tag);
            }
            
            window.onYouTubeIframeAPIReady = initializePlayer;
        } else {
            initializePlayer();
        }

        return () => {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
            if (playerRef.current) playerRef.current.destroy();
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    const initializePlayer = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
            videoId: video?.youtube_id,
            playerVars: { playsinline: 1, rel: 0 },
            events: {
                onStateChange: (event) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        syncIntervalRef.current = setInterval(syncTranscript, 250);
                    } else {
                        if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
                    }
                }
            }
        });
    };

    const syncTranscript = () => {
        if (!playerRef.current || typeof playerRef.current.getCurrentTime !== 'function') return;
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        
        let foundIndex = -1;
        video?.transcripts?.forEach((t, idx) => {
            if (time >= t.start_time && time <= t.end_time) {
                foundIndex = idx;
            }
        });
        
        if (foundIndex !== -1 && foundIndex !== activeLine) {
            setActiveLine(foundIndex);
            const lineEl = document.getElementById(`line-${foundIndex}`);
            const container = containerRef.current;

            if (lineEl && container) {
                const containerRect = container.getBoundingClientRect();
                const lineRect = lineEl.getBoundingClientRect();
                const isMobile = window.innerWidth < 1024;

                let targetScrollTop;

                if (isMobile) {
                    // Mobile: Posisi baris aktif tepat berada di paling atas kontainer (tepat di bawah header) dengan padding 8px
                    targetScrollTop = container.scrollTop + (lineRect.top - containerRect.top) - 8;
                } else {
                    // Desktop: Tetap di tengah layar kontainer
                    targetScrollTop = container.scrollTop + (lineRect.top - containerRect.top) - (container.clientHeight / 2) + (lineEl.clientHeight / 2);
                }

                container.scrollTo({
                    top: Math.max(0, targetScrollTop),
                    behavior: 'smooth'
                });
            }
        }
    };

    const playLine = (startTime) => {
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(startTime, true);
            playerRef.current.playVideo();
        }
    };

    const toggleTranslation = (idx) => {
        setShowTranslations(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const handleWordClick = async (word, context) => {
        if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
            playerRef.current.pauseVideo();
        }

        const cleanWord = word.replace(/[^\w\s\']/g, "").toLowerCase();
        setDictModal({ loading: true, word: cleanWord, context });
        
        try {
            const [dictRes, transRes] = await Promise.all([
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`).then(res => res.ok ? res.json() : null),
                fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(cleanWord)}`).then(res => res.json())
            ]);
            
            const translation = transRes?.[0]?.[0]?.[0] || "";
            const phonetic = dictRes?.[0]?.phonetic || "";
            const partOfSpeech = dictRes?.[0]?.meanings?.[0]?.partOfSpeech || "";
            const definition = dictRes?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || "Definisi tidak ditemukan.";
            
            setDictModal({
                loading: false,
                word: cleanWord,
                context,
                translation,
                phonetic,
                partOfSpeech,
                definition
            });
        } catch (e) {
            setDictModal({ error: "Gagal menghubungi server kamus.", word: cleanWord });
        }
    };

    const handleSaveVocab = () => {
        const { word, translation, context, definition } = dictModal;
        if (!translation) return alert('Terjemahan wajib diisi!');
        
        setDictModal(prev => ({ ...prev, loading: true }));
        
        axios.post('/video-learning/save-vocab', {
            word,
            translation,
            example_sentence: context,
            notes: definition
        }).then(res => {
            alert(res.data.message);
            setDictModal(null);
            router.reload({ only: ['savedFlashcards', 'savedVocabs'] });
        }).catch(err => {
            console.error(err);
            alert("Terjadi kesalahan.");
            setDictModal(null);
        });
    };

    const cleanText = (str) => str.toLowerCase().replace(/[^\w\s\']/gi, '').trim();

    const startSpeakingPractice = (expectedText) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Browser tidak mendukung Speech Recognition. Gunakan Google Chrome atau Microsoft Edge.');
            return;
        }

        if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
            playerRef.current.pauseVideo();
        }

        setSpeechModal({ expectedText, status: 'listening' });
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        let hasResult = false;
        
        recognition.onresult = (event) => {
            hasResult = true;
            const spokenText = event.results[0][0].transcript;
            
            let spokenWords = cleanText(spokenText).split(' ');
            let expectedWords = cleanText(expectedText).split(' ');
            let matches = 0;
            expectedWords.forEach(w => { if (spokenWords.includes(w)) matches++; });
            const accuracy = expectedWords.length === 0 ? 0 : Math.min(100, (matches / expectedWords.length) * 100);
            
            if (accuracy >= 80) {
                confetti({ 
                    particleCount: 90, 
                    spread: 60, 
                    origin: { y: 0.7 }, 
                    colors: ['#60f2ce', '#fcbf49', '#ff822d'] 
                });
            }
            
            setSpeechModal({ expectedText, status: 'result', accuracy, spoken: spokenText });
        };
        
        recognition.onerror = (event) => {
            setSpeechModal({ expectedText, status: 'error', error: event.error });
        };
        
        recognition.onend = () => {
            if (!hasResult) {
                setSpeechModal(prev => (prev?.status === 'listening' ? { ...prev, status: 'error', error: 'no-speech' } : prev));
            }
        };
        
        recognition.start();
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={video?.title} />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-7">
                    
                    {/* Top Bar Navigation (Breadcrumbs & Back Button) */}
                    <div className="flex items-center justify-between gap-3">
                        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 min-w-0">
                            <Link href="/video-learning" className="text-slate-600 hover:text-[#ff822d] transition-colors flex items-center gap-1 shrink-0">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                                <span>Library</span>
                            </Link>
                            <span className="shrink-0 text-slate-300">/</span>
                            <span className="text-slate-800 truncate">{video?.title}</span>
                        </nav>
                        
                        <Link 
                            href="/video-learning" 
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-xs hover:bg-slate-50 transition shrink-0 whitespace-nowrap active:scale-95"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>

                    {/* Main Content Layout */}
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-7">
                        
                        {/* 1. Video Player Card (Urutan 1 di Mobile & Kiri Atas di Desktop) */}
                        <div className="order-1 lg:col-span-7">
                            <div className="bg-white p-3 md:p-4 rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                                <div className="relative pt-[56.25%] bg-slate-950 rounded-2xl overflow-hidden shadow-inner">
                                    <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
                                </div>

                                <div className="pt-4 sm:pt-5 pb-2 px-1 sm:px-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                                        {video?.difficulty && (
                                            <span className="text-[10px] sm:text-[11px] font-bold uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#fefc7c]/80 text-slate-900 rounded-lg border border-[#fefc7c]">
                                                {video?.difficulty}
                                            </span>
                                        )}
                                        <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#60f2ce]/20 text-[#0d9488] rounded-lg border border-[#60f2ce]/40">
                                            {video?.transcripts?.length || 0} Baris Dialog
                                        </span>
                                    </div>
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug break-words">
                                        {video?.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* 2. Interactive Transcript (Urutan 2 di Mobile -> TEPAT di bawah Video, Kolom Kanan di Desktop) */}
                        <div className="order-2 lg:col-span-5 lg:row-span-2">
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col h-[420px] sm:h-[600px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-6 overflow-hidden">
                                
                                {/* Transcript Header */}
                                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-sm shadow-xs shrink-0">
                                            <i className="bi bi-chat-square-quote-fill"></i>
                                        </div>
                                        <div>
                                            <h2 className="font-extrabold text-slate-900 text-sm">Interactive Transcript</h2>
                                            <p className="text-[11px] text-slate-400">Sinkronisasi otomatis dengan audio</p>
                                        </div>
                                    </div>
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#60f2ce] animate-ping"></span>
                                </div>

                                {/* Transcript Content (relative agar scroll terisolasi di dalam container ini) */}
                                <div className="relative flex-grow overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3" ref={containerRef} id="transcript-container">
                                    {video?.transcripts && video?.transcripts.length > 0 ? (
                                        video?.transcripts.map((transcript, idx) => {
                                            const isActive = activeLine === idx;
                                            return (
                                                <div 
                                                    key={transcript.id || idx} 
                                                    id={`line-${idx}`}
                                                    className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border ${
                                                        isActive 
                                                            ? 'bg-gradient-to-r from-[#60f2ce]/15 via-[#fefc7c]/10 to-transparent border-[#60f2ce] shadow-xs' 
                                                            : 'bg-white hover:bg-slate-50/80 border-slate-100'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start gap-2.5 sm:gap-3">
                                                        <div className="flex-grow min-w-0">
                                                            <div className="text-slate-800 font-medium leading-relaxed text-[13px] sm:text-[14px]">
                                                                {transcript.text.split(" ").map((word, i) => {
                                                                    const cleanW = word.replace(/[^\w\s\']/g, "").toLowerCase();
                                                                    const isSaved = savedVocabs.includes(cleanW);
                                                                    return (
                                                                        <span 
                                                                            key={i} 
                                                                            onClick={() => handleWordClick(word, transcript.text)}
                                                                            className={`cursor-pointer px-1 py-0.5 rounded-lg transition-colors hover:bg-[#60f2ce]/30 hover:text-slate-900 inline-block ${
                                                                                isSaved ? 'text-[#0d9488] font-bold bg-[#60f2ce]/20 border-b-2 border-[#0d9488]' : ''
                                                                            }`}
                                                                        >
                                                                            {word}{' '}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                            
                                                            {transcript.translation && showTranslations[idx] && (
                                                                <div className="text-slate-500 text-xs mt-2 border-l-2 border-[#fcbf49] pl-2.5 py-0.5 italic bg-[#fcbf49]/5 rounded-r-lg">
                                                                    {transcript.translation}
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Action Buttons */}
                                                        <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-1 shrink-0 gap-1 shadow-2xs">
                                                            <button 
                                                                onClick={() => playLine(transcript.start_time)} 
                                                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#ff822d] text-slate-500 transition-all" 
                                                                title="Putar Bagian Ini"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                            </button>

                                                            {transcript.translation && (
                                                                <button 
                                                                    onClick={() => toggleTranslation(idx)} 
                                                                    className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                                                                        showTranslations[idx] 
                                                                            ? 'bg-[#fcbf49] text-slate-900 font-bold shadow-2xs' 
                                                                            : 'hover:bg-white text-slate-500'
                                                                    }`} 
                                                                    title="Terjemahan"
                                                                >
                                                                    <i className="bi bi-translate text-xs"></i>
                                                                </button>
                                                            )}

                                                            <button 
                                                                onClick={() => startSpeakingPractice(transcript.text)} 
                                                                className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                                                                    speechModal?.status === 'listening' && speechModal?.expectedText === transcript.text 
                                                                        ? 'bg-[#ff822d] text-white animate-pulse' 
                                                                        : 'hover:bg-white text-[#0d9488]'
                                                                }`} 
                                                                title="Latihan Shadowing / Pelafalan"
                                                            >
                                                                <i className="bi bi-mic-fill text-xs"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 text-xs text-slate-400">
                                            Transkrip belum tersedia untuk video ini.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3. Info Bawah: Tips & Saved Vocab (Urutan 3 di Mobile, di Bawah Video pada Desktop) */}
                        <div className="order-3 lg:col-span-7 space-y-6">
                            
                            {/* Tips Card */}
                            <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#ff822d]/10 via-[#fcbf49]/10 to-[#60f2ce]/20 border border-[#fcbf49]/30 flex items-start gap-3 shadow-xs">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-xs text-lg sm:text-xl flex items-center justify-center shrink-0">
                                    💡
                                </div>
                                <div className="text-xs leading-relaxed text-slate-700">
                                    <strong className="text-slate-900 font-bold block mb-0.5">Petunjuk Belajar Interaktif:</strong>
                                    Klik kata mana pun pada transkrip untuk membuka kamus cepat, cek arti kata, dan simpan langsung ke Flashcard harian Anda.
                                </div>
                            </div>

                            {/* Saved Vocabulary Pill Box */}
                            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-xl bg-[#60f2ce]/20 text-[#0d9488] flex items-center justify-center font-bold shrink-0">
                                            <i className="bi bi-bookmark-check-fill"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">Bank Kosakatamu</h3>
                                            <p className="text-[11px] text-slate-400">Kata yang berhasil Anda kumpulkan</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                        {savedFlashcards.length} Kata
                                    </span>
                                </div>

                                <div className="max-h-[220px] overflow-y-auto pr-1">
                                    {savedFlashcards.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {savedFlashcards.map(card => (
                                                <div key={card.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 text-xs flex items-center shadow-2xs hover:border-[#60f2ce] transition-colors">
                                                    <span className="font-bold text-slate-900 mr-2">{card?.study_item?.content || '-'}</span>
                                                    <span className="border-l border-slate-200 pl-2 text-slate-500 font-medium truncate max-w-[140px] sm:max-w-xs">
                                                        {card?.study_item?.translation || '-'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-7 text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                                            Belum ada kosakata yang disimpan dari video ini.
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Dictionary Modal */}
            {dictModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        {dictModal.loading ? (
                            <div className="p-8 text-center space-y-3">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-slate-100 border-t-[#ff822d]"></div>
                                <p className="text-xs font-semibold text-slate-500">Mencari kosakata "{dictModal.word}"...</p>
                            </div>
                        ) : dictModal.error ? (
                            <div className="p-6 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl mx-auto mb-3">
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Gagal Menemukan Kata</h3>
                                <p className="text-xs text-slate-500 mb-5">{dictModal.error}</p>
                                <button 
                                    onClick={() => setDictModal(null)} 
                                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-black text-2xl text-slate-900 capitalize tracking-tight">{dictModal.word}</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {dictModal.phonetic} {dictModal.partOfSpeech && <span>&bull; <i className="lowercase font-medium">{dictModal.partOfSpeech}</i></span>}
                                        </p>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-[#60f2ce]/20 text-[#0d9488]">
                                        Vocabulary
                                    </span>
                                </div>

                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-4 text-xs text-slate-600 leading-relaxed font-medium">
                                    {dictModal.definition}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Terjemahan Bahasa Indonesia
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full text-center font-bold bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none shadow-xs" 
                                        value={dictModal.translation} 
                                        onChange={(e) => setDictModal({ ...dictModal, translation: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setDictModal(null)} 
                                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        onClick={handleSaveVocab} 
                                        className="flex-1 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-sm hover:opacity-95 transition"
                                    >
                                        Simpan ke Flashcard
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Speech Shadowing Modal */}
            {speechModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden p-6 text-center animate-in fade-in zoom-in duration-200">
                        {speechModal.status === 'listening' && (
                            <>
                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#ff822d]/10 text-[#ff822d] flex items-center justify-center text-2xl mb-4 animate-pulse">
                                    <i className="bi bi-mic-fill"></i>
                                </div>
                                <h3 className="font-extrabold text-lg text-slate-900 mb-1">Silakan Ucapkan Kalimat:</h3>
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 my-4 text-xs font-semibold text-slate-800 italic leading-relaxed">
                                    "{speechModal.expectedText}"
                                </div>
                                <p className="text-[11px] font-bold text-[#ff822d] uppercase tracking-wider mb-6 animate-pulse">
                                    Mendengarkan suara Anda...
                                </p>
                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition"
                                >
                                    Batal
                                </button>
                            </>
                        )}

                        {speechModal.status === 'result' && (
                            <>
                                <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-sm"
                                    style={{
                                        backgroundColor: speechModal.accuracy >= 80 ? 'rgba(96, 242, 206, 0.3)' : 'rgba(252, 191, 73, 0.3)',
                                        color: speechModal.accuracy >= 80 ? '#0d9488' : '#b45309'
                                    }}
                                >
                                    <i className={speechModal.accuracy >= 80 ? 'bi bi-award-fill' : 'bi bi-arrow-repeat'}></i>
                                </div>

                                <h3 className="font-extrabold text-xl text-slate-900 mb-1">
                                    {speechModal.accuracy >= 80 ? 'Luar Biasa! 🌟' : 'Perlu Sedikit Latihan! 💪'}
                                </h3>
                                
                                <div className="my-4">
                                    <span className="text-xs text-slate-400 block mb-0.5">Tingkat Akurasi Pelafalan:</span>
                                    <span className={`font-black text-3xl ${speechModal.accuracy >= 80 ? 'text-[#0d9488]' : 'text-[#ff822d]'}`}>
                                        {Math.round(speechModal.accuracy)}%
                                    </span>
                                </div>

                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-left mb-6">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Kalimat yang Terdengar:</p>
                                    <p className="italic text-xs font-semibold text-slate-700">"{speechModal.spoken}"</p>
                                </div>

                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs transition"
                                >
                                    Selesai
                                </button>
                            </>
                        )}

                        {speechModal.status === 'error' && (
                            <>
                                <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center text-2xl mb-4">
                                    <i className="bi bi-mic-mute-fill"></i>
                                </div>
                                <h3 className="font-extrabold text-lg text-slate-900 mb-1">Suara Tidak Terdeteksi</h3>
                                <p className="text-xs text-slate-500 mb-6">
                                    {speechModal.error === 'not-allowed' ? 'Izin akses mikrofon ditolak pada browser Anda.' : 
                                     speechModal.error === 'no-speech' ? 'Tidak ada suara yang terdengar. Coba ulangi dengan berbicara lebih dekat.' : 
                                     'Terjadi kendala pada input mikrofon.'}
                                </p>
                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition"
                                >
                                    Tutup
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}