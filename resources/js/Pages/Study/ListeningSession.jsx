import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ListeningSession({ auth, sessionCards = [], mode, direction = 'en-id' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [phase, setPhase] = useState('idle'); // 'word', 'translation', 'example', 'idle'
    const [isFinished, setIsFinished] = useState(false);
    const [availableVoices, setAvailableVoices] = useState([]);

    const isPlayingRef = useRef(isPlaying);
    const timeoutRef = useRef(null);
    const isRunningRef = useRef(false);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Cleanup & inisialisasi daftar suara TTS
    useEffect(() => {
        const loadVoices = () => {
            if ('speechSynthesis' in window) {
                const v = window.speechSynthesis.getVoices();
                if (v && v.length > 0) {
                    setAvailableVoices(v);
                }
            }
        };

        loadVoices();

        if ('speechSynthesis' in window && 'onvoiceschanged' in window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const wait = (ms) => {
        return new Promise((resolve) => {
            timeoutRef.current = setTimeout(resolve, ms);
        });
    };

    const playText = useCallback((text, lang = 'en-US', rate = 0.9) => {
        return new Promise((resolve) => {
            if (!text || !('speechSynthesis' in window)) {
                setTimeout(resolve, 500);
                return;
            }

            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }

            window.speechSynthesis.cancel();

            setTimeout(() => {
                if (!isPlayingRef.current) {
                    resolve();
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = lang;
                utterance.rate = rate;
                utterance.volume = 1;

                const pool = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

                if (pool && pool.length > 0) {
                    let matchedVoice = null;
                    if (lang.startsWith('en')) {
                        matchedVoice = pool.find(v => v.name.includes('Google US English')) ||
                                       pool.find(v => v.name.includes('Natural') && v.lang.startsWith('en')) ||
                                       pool.find(v => v.name.includes('Microsoft Zira')) ||
                                       pool.find(v => v.name.includes('Microsoft David')) ||
                                       pool.find(v => v.lang === 'en-US') ||
                                       pool.find(v => v.lang.startsWith('en'));
                    } else if (lang.startsWith('id')) {
                        matchedVoice = pool.find(v => v.name.includes('Google Bahasa Indonesia')) ||
                                       pool.find(v => v.name.includes('Microsoft Andika')) ||
                                       pool.find(v => v.name.includes('Indonesian')) ||
                                       pool.find(v => v.lang === 'id-ID') ||
                                       pool.find(v => v.lang.startsWith('id'));
                    }

                    if (matchedVoice) {
                        utterance.voice = matchedVoice;
                    }
                }

                utterance.onend = () => {
                    resolve();
                };

                utterance.onerror = (e) => {
                    if (e.error !== 'interrupted' && e.error !== 'canceled') {
                        console.error(`TTS Error [${lang}]:`, e);
                    }
                    resolve();
                };

                window.speechSynthesis.speak(utterance);
            }, 80);
        });
    }, [availableVoices]);

    const runSessionSequence = useCallback(async () => {
        if (isRunningRef.current) return;
        isRunningRef.current = true;

        if (!sessionCards || sessionCards.length === 0 || currentIndex >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
            isRunningRef.current = false;
            return;
        }

        const rawCard = sessionCards[currentIndex];
        const card = rawCard?.study_item || rawCard;
        const mainWord = card?.word || card?.content || '';

        await wait(250);

        if (direction === 'en-id') {
            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            setPhase('word');
            await playText(`${mainWord}.`, 'en-US', 0.9);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            await wait(1400);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            setPhase('translation');
            await playText(card?.translation || '', 'id-ID', 1.0);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            await wait(1400);
        } else {
            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            setPhase('translation');
            await playText(card?.translation || '', 'id-ID', 1.0);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            await wait(1400);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            setPhase('word');
            await playText(`${mainWord}.`, 'en-US', 0.9);

            if (!isPlayingRef.current) { isRunningRef.current = false; return; }
            await wait(1400);
        }

        if (card?.example_sentence) {
            if (direction === 'en-id') {
                if (!isPlayingRef.current) { isRunningRef.current = false; return; }
                setPhase('example');
                await playText(card.example_sentence, 'en-US', 0.85);

                if (card.example_translation) {
                    await wait(1000);
                    if (!isPlayingRef.current) { isRunningRef.current = false; return; }
                    await playText(card.example_translation, 'id-ID', 1.0);
                }
            } else {
                if (!isPlayingRef.current) { isRunningRef.current = false; return; }
                setPhase('example');

                if (card.example_translation) {
                    await playText(card.example_translation, 'id-ID', 1.0);
                    await wait(1000);
                }

                if (!isPlayingRef.current) { isRunningRef.current = false; return; }
                await playText(card.example_sentence, 'en-US', 0.85);
            }
            await wait(1800);
        } else {
            await wait(1500);
        }

        isRunningRef.current = false;

        if (isPlayingRef.current) {
            if (currentIndex + 1 >= sessionCards.length) {
                setIsFinished(true);
                setIsPlaying(false);
            } else {
                setCurrentIndex(prev => prev + 1);
            }
        }
    }, [currentIndex, direction, playText, sessionCards]);

    useEffect(() => {
        if (isPlaying && !isFinished) {
            runSessionSequence();
        } else {
            isRunningRef.current = false;
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [currentIndex, isPlaying, isFinished, runSessionSequence]);

    const togglePlay = () => {
        if (isFinished) return;
        setIsPlaying(prev => !prev);
    };

    const handleSkip = () => {
        isRunningRef.current = false;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (currentIndex + 1 >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
        } else {
            setCurrentIndex(prev => prev + 1);
            if (!isPlaying) setIsPlaying(true);
        }
    };

    // State jika tidak ada kartu sama sekali
    if (!sessionCards || sessionCards.length === 0) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] flex flex-col items-center justify-center p-6 text-center font-sans transition-colors duration-200">
                    <div className="w-16 h-16 rounded-3xl bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] flex items-center justify-center text-3xl mb-4 shadow-sm">
                        <i className="bi bi-emoji-smile"></i>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Semua Target Tuntas!</h2>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 mb-6 max-w-sm">
                        Tidak ada antrean kosakata yang perlu di-review hari ini. Anda bisa mencoba mode bebas.
                    </p>
                    <Link 
                        href="/study/listening" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 rounded-full font-bold text-xs shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                    >
                        <i className="bi bi-arrow-left"></i>
                        <span>Atur Sesi Latihan Baru</span>
                    </Link>
                </div>
            </AuthenticatedLayout>
        );
    }

    // State saat sesi selesai
    if (isFinished) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] flex flex-col items-center justify-center p-6 text-center font-sans transition-colors duration-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white rounded-3xl flex items-center justify-center mb-5 shadow-lg shadow-[#ff822d]/25">
                        <i className="bi bi-patch-check-fill text-4xl"></i>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 mb-3">
                        Session Complete 🎉
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Sesi Listening Selesai</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm leading-relaxed">
                        Hebat! Anda telah mendengarkan <strong>{sessionCards.length} kosakata</strong> secara hands-free. Pertahankan konsistensi harian Anda!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Link 
                            href="/study/listening" 
                            className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold text-xs shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                        >
                            Ulangi Sesi Lain
                        </Link>
                        <Link 
                            href="/home" 
                            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 rounded-full font-extrabold text-xs shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const rawActiveCard = sessionCards[currentIndex];
    const currentCard = rawActiveCard?.study_item || rawActiveCard;
    const activeWord = currentCard?.word || currentCard?.content || '';
    const progressPercent = Math.round(((currentIndex + 1) / sessionCards.length) * 100);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Listening (${currentIndex + 1}/${sessionCards.length})`} />

            <div className="min-h-[calc(100vh-80px)] bg-[#fafcfb] dark:bg-[#0b1120] flex flex-col items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden transition-colors duration-200">
                
                {/* Background Glow Accents */}
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#fcbf49]/20 dark:bg-[#fcbf49]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="w-full max-w-lg z-10 flex flex-col h-full space-y-6">
                    
                    {/* Top Control Bar */}
                    <div className="flex items-center justify-between">
                        <Link 
                            href="/study/listening" 
                            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shadow-xs transition-colors"
                            title="Keluar dari sesi"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </Link>

                        <div className="text-center">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block">
                                Audio Study Session
                            </span>
                            <span className="text-xs font-mono font-bold text-[#0d9488] dark:text-[#60f2ce]">
                                {currentIndex + 1} dari {sessionCards.length} Kosakata
                            </span>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                            {progressPercent}%
                        </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <div 
                            className="h-full bg-gradient-to-r from-[#60f2ce] via-[#fcbf49] to-[#ff822d] rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {/* Audio Player Glass Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-8 sm:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between min-h-[380px] relative overflow-hidden text-center transition-colors">
                        
                        {/* Audio Wave Equalizer Indicator */}
                        <div className="flex justify-center items-center gap-1.5 h-6 mb-4">
                            {[0, 150, 300, 150, 0].map((delay, idx) => (
                                <span 
                                    key={idx}
                                    className={`w-1.5 rounded-full transition-all duration-300 ${
                                        isPlaying 
                                            ? 'bg-gradient-to-t from-[#ff822d] to-[#60f2ce] animate-pulse h-5' 
                                            : 'bg-slate-200 dark:bg-slate-700 h-2'
                                    }`}
                                    style={{ animationDelay: `${delay}ms` }}
                                />
                            ))}
                        </div>

                        {/* Central Vocabulary Text Area */}
                        <div className="flex-1 flex flex-col justify-center gap-6 my-auto">
                            
                            {/* Target Word (English) */}
                            <div className={`transition-all duration-500 ${phase === 'word' ? 'scale-105 opacity-100' : 'opacity-70 dark:opacity-60'}`}>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">
                                    English Vocabulary
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    {activeWord}
                                </h2>
                            </div>

                            {/* Meaning / Translation (Indonesian) */}
                            <div className={`transition-all duration-500 ${phase === 'translation' || phase === 'example' ? 'opacity-100 translate-y-0' : 'opacity-40 dark:opacity-30 translate-y-2'}`}>
                                <span className="text-[10px] font-bold text-[#ff822d] uppercase tracking-wider block mb-1">
                                    Arti Bahasa Indonesia
                                </span>
                                <p className="text-xl sm:text-2xl font-extrabold text-[#c2410c] dark:text-[#ff822d] leading-snug">
                                    {currentCard?.translation || '-'}
                                </p>
                            </div>

                            {/* Example Sentence Section */}
                            {currentCard?.example_sentence && (
                                <div className={`pt-4 border-t border-slate-100 dark:border-slate-800 transition-all duration-500 ${phase === 'example' ? 'opacity-100' : 'opacity-30 dark:opacity-20'}`}>
                                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                        "{currentCard.example_sentence}"
                                    </p>
                                    {currentCard.example_translation && (
                                        <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1">
                                            {currentCard.example_translation}
                                        </p>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Direction Status Chip */}
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-300 flex items-center gap-1.5">
                                <i className="bi bi-arrow-left-right text-[#ff822d]"></i>
                                <span>Arah: {direction === 'en-id' ? 'Inggris → Indonesia' : 'Indonesia → Inggris'}</span>
                            </span>
                        </div>

                    </div>

                    {/* Playback Controls Footer */}
                    <div className="flex items-center justify-center gap-6 pt-2">
                        {/* Play/Pause Button */}
                        <button 
                            type="button"
                            onClick={togglePlay}
                            className="w-13 h-13 rounded-full bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 flex items-center justify-center text-3xl shadow-lg shadow-[#fcbf49]/30 hover:scale-105 active:scale-95 transition-all"
                            title={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
                        >
                            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} translate-x-0.5`}></i>
                        </button>

                        {/* Skip Next Button */}
                        <button 
                            type="button"
                            onClick={handleSkip}
                            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 flex items-center justify-center shadow-xs active:scale-95 transition-all"
                            title="Lewati ke kata berikutnya"
                        >
                            <i className="bi bi-skip-forward-fill text-lg"></i>
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}