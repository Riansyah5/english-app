import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import confetti from 'canvas-confetti';

export default function VideoShow({ auth, video, savedFlashcards, savedVocabs }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [activeLine, setActiveLine] = useState(-1);
    const [showTranslations, setShowTranslations] = useState({});
    
    // Modal states
    const [dictModal, setDictModal] = useState(null); // { word, context, definition, phonetic, partOfSpeech, translation, loading, error }
    const [speechModal, setSpeechModal] = useState(null); // { expectedText, status: 'listening'|'analyzing'|'result', accuracy, spoken, error }
    
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const syncIntervalRef = useRef(null);
    
    useEffect(() => {
        // Load YouTube API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
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
            videoId: video.youtube_id,
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
        video.transcripts.forEach((t, idx) => {
            if (time >= t.start_time && time <= t.end_time) {
                foundIndex = idx;
            }
        });
        
        if (foundIndex !== -1 && foundIndex !== activeLine) {
            setActiveLine(foundIndex);
            const lineEl = document.getElementById(`line-${foundIndex}`);
            if (lineEl && containerRef.current) {
                lineEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
            alert('Browser tidak mendukung Speech Recognition. Gunakan Chrome atau Edge.');
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
                confetti({ particleCount: 100, spread: 50, origin: { y: 0.75 }, colors: ['#10b981', '#3b82f6'] });
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
        <AuthenticatedLayout user={auth.user}>
            <Head title={video.title} />

            <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
                <nav className="mb-6 flex text-sm font-medium text-slate-500">
                    <Link href="/video-learning" className="text-blue-600 hover:underline">Video Library</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-400">{video.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="glass dark:glass-dark p-1 rounded-2xl overflow-hidden mb-4 shadow-sm">
                            <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
                                <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
                            </div>
                        </div>

                        <h4 className="font-bold text-2xl text-slate-900 dark:text-white mt-4 mb-2 leading-tight">
                            {video.title}
                        </h4>
                        
                        <div className="mb-6">
                            <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono uppercase px-3 py-1 text-xs rounded-md border border-blue-200 dark:border-blue-500/20">
                                {video.difficulty}
                            </span>
                        </div>

                        <div className="glass dark:glass-dark border-l-4 border-l-cyan-500 p-4 rounded-xl mb-6 shadow-sm border-t border-r border-b border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                <i className="bi bi-lightbulb text-amber-500 mr-2"></i>
                                <strong>Tips:</strong> Klik kata manapun pada transkrip di sebelah kanan untuk melihat kamus cepat dan menyimpannya ke Flashcard Anda.
                            </p>
                        </div>

                        <div className="glass dark:glass-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
                            <div className="border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h6 className="font-bold text-slate-900 dark:text-white m-0 flex items-center">
                                    <i className="bi bi-archive-fill text-emerald-500 mr-2"></i>
                                    Bank Kosakatamu
                                </h6>
                                <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-3 py-1 text-xs rounded-md border border-emerald-200 dark:border-emerald-500/20">
                                    {savedFlashcards.length} Kata
                                </span>
                            </div>
                            <div className="p-4 max-h-[220px] overflow-auto">
                                {savedFlashcards.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {savedFlashcards.map(card => (
                                            <div key={card.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 text-sm flex items-center shadow-sm">
                                                <span className="font-bold text-slate-900 dark:text-white mr-2">{card.studyItem.content}</span>
                                                <span className="border-l border-slate-200 dark:border-slate-700 pl-2 text-slate-500 text-xs">
                                                    {card.studyItem.translation}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <i className="bi bi-journal-x text-4xl text-slate-300 dark:text-slate-600 mb-2 block"></i>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Belum ada kosakata yang disimpan.</p>
                                        <small className="text-slate-400 dark:text-slate-500">Klik kata pada transkrip di sebelah kanan untuk mulai mengumpulkan!</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="glass dark:glass-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[600px] lg:h-[calc(100vh-120px)]">
                            <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/50">
                                <h6 className="font-bold text-slate-900 dark:text-white m-0">Interactive Transcript</h6>
                            </div>
                            <div className="flex-grow overflow-auto p-4" ref={containerRef} id="transcript-container">
                                {video.transcripts.length > 0 ? (
                                    video.transcripts.map((transcript, idx) => {
                                        const isActive = activeLine === idx;
                                        return (
                                            <div 
                                                key={transcript.id} 
                                                id={`line-${idx}`}
                                                className={`mb-3 p-3 rounded-xl transition-all border-l-4 ${isActive ? 'bg-slate-100 dark:bg-slate-800 border-l-blue-500' : 'border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-b-slate-100 dark:border-b-slate-800'}`}
                                            >
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="flex-grow">
                                                        <div className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-1 text-[15px]">
                                                            {transcript.text.split(" ").map((word, i) => {
                                                                const cleanW = word.replace(/[^\w\s\']/g, "").toLowerCase();
                                                                const isSaved = savedVocabs.includes(cleanW);
                                                                return (
                                                                    <span 
                                                                        key={i} 
                                                                        onClick={() => handleWordClick(word, transcript.text)}
                                                                        className={`cursor-pointer px-0.5 rounded transition-colors hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 ${isSaved ? 'text-emerald-600 dark:text-emerald-400 font-bold underline decoration-dotted' : ''}`}
                                                                    >
                                                                        {word}{' '}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                        
                                                        {transcript.translation && showTranslations[idx] && (
                                                            <div className="text-slate-500 text-sm mt-2 border-l-2 border-l-blue-300 dark:border-l-blue-700 pl-3 italic">
                                                                {transcript.translation}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 overflow-hidden">
                                                        <button onClick={() => playLine(transcript.start_time)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors border-r border-slate-200 dark:border-slate-700" title="Putar ulang">
                                                            <i className="bi bi-play-fill"></i>
                                                        </button>
                                                        {transcript.translation && (
                                                            <button onClick={() => toggleTranslation(idx)} className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-r border-slate-200 dark:border-slate-700 ${showTranslations[idx] ? 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-800' : 'text-slate-500'}`} title="Terjemahan">
                                                                <i className="bi bi-translate text-xs"></i>
                                                            </button>
                                                        )}
                                                        <button onClick={() => startSpeakingPractice(transcript.text)} className={`p-2 transition-colors ${speechModal?.status === 'listening' && speechModal?.expectedText === transcript.text ? 'bg-rose-500 text-white animate-pulse' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400'}`} title="Latihan Pelafalan">
                                                            <i className="bi bi-mic-fill text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10">
                                        <i className="bi bi-chat-square-text text-slate-300 dark:text-slate-600 text-3xl mb-3 block"></i>
                                        <span className="text-slate-500 text-sm">Transkrip tidak tersedia.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dictionary Modal */}
            {dictModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        {dictModal.loading ? (
                            <div className="p-8 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600 mb-4"></div>
                                <p className="text-slate-600 dark:text-slate-400">Mencari arti "{dictModal.word}"...</p>
                            </div>
                        ) : dictModal.error ? (
                            <div className="p-6 text-center">
                                <i className="bi bi-exclamation-triangle text-rose-500 text-4xl mb-4 block"></i>
                                <h5 className="font-bold text-slate-900 dark:text-white mb-2">Error</h5>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">{dictModal.error}</p>
                                <button onClick={() => setDictModal(null)} className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Tutup</button>
                            </div>
                        ) : (
                            <div className="p-6">
                                <h3 className="font-bold text-2xl text-slate-900 dark:text-white">{dictModal.word}</h3>
                                <p className="text-slate-500 text-sm mb-4">{dictModal.phonetic} &bull; <i className="lowercase">{dictModal.partOfSpeech}</i></p>
                                
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl mb-4 text-sm text-slate-700 dark:text-slate-300">
                                    {dictModal.definition}
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Terjemahan Indonesia</label>
                                    <input 
                                        type="text" 
                                        className="w-full text-center font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                                        value={dictModal.translation} 
                                        onChange={(e) => setDictModal({...dictModal, translation: e.target.value})}
                                    />
                                </div>
                                
                                <div className="flex gap-3">
                                    <button onClick={() => setDictModal(null)} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Batal</button>
                                    <button onClick={handleSaveVocab} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors shadow-sm">Simpan</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Speech Recognition Modal */}
            {speechModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 text-center animate-in fade-in zoom-in duration-200">
                        {speechModal.status === 'listening' && (
                            <>
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">🎤 Silakan Ucapkan</h4>
                                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6 italic">"{speechModal.expectedText}"</p>
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center animate-pulse">
                                        <i className="bi bi-mic-fill text-3xl"></i>
                                    </div>
                                </div>
                                <p className="text-rose-500 text-sm font-medium animate-pulse mb-6">Mendengarkan suara Anda...</p>
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Batal</button>
                            </>
                        )}
                        
                        {speechModal.status === 'result' && (
                            <>
                                <div className="mb-4">
                                    {speechModal.accuracy >= 80 ? (
                                        <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                            <i className="bi bi-star-fill text-4xl"></i>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 mx-auto bg-amber-100 dark:bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-4">
                                            <i className="bi bi-arrow-repeat text-4xl"></i>
                                        </div>
                                    )}
                                </div>
                                
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
                                    {speechModal.accuracy >= 80 ? 'Excellent! 🌟' : 'Coba Lagi! 💪'}
                                </h4>
                                
                                <div className="mb-6">
                                    <span className="text-slate-500">Akurasi: </span>
                                    <span className={`font-bold text-xl ${speechModal.accuracy >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {Math.round(speechModal.accuracy)}%
                                    </span>
                                </div>
                                
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6">
                                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-bold">Yang Terdengar:</p>
                                    <p className={`italic text-sm ${speechModal.accuracy >= 80 ? 'text-slate-700 dark:text-slate-300' : 'text-rose-500'}`}>
                                        "{speechModal.spoken}"
                                    </p>
                                </div>
                                
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">Tutup</button>
                            </>
                        )}
                        
                        {speechModal.status === 'error' && (
                            <>
                                <i className="bi bi-exclamation-triangle text-rose-500 text-5xl mb-4 block"></i>
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Gagal Mendengar</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {speechModal.error === 'not-allowed' ? 'Izin mikrofon ditolak.' : 
                                     speechModal.error === 'no-speech' ? 'Suara tidak terdeteksi.' : 
                                     'Terjadi kesalahan mikrofon.'}
                                </p>
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Tutup</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

