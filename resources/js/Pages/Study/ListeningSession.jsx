import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import confetti from 'canvas-confetti';

export default function ListeningSession({ auth, sessionCards = [], mode, direction = 'en-id' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [phase, setPhase] = useState('content'); // 'word', 'translation', 'example', 'done'
    const [isFinished, setIsFinished] = useState(false);
    
    const isPlayingRef = useRef(isPlaying);
    const timeoutRef = useRef(null);
    const currentAudioRef = useRef(null);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current = null;
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const playText = (text, lang = 'en-US', rate = 0.9) => {
        return new Promise((resolve) => {
            if (!text) {
                resolve();
                return;
            }

            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
            }

            let voice = 'en-US-JennyNeural'; 
            if (lang === 'en-US') {
                voice = 'en-US-EmmaNeural';
            } else if (lang === 'id-ID') {
                voice = 'id-ID-GadisNeural';
            }

            let rateStr = '+0%';
            if (rate < 1.0) {
                const diff = Math.round((1.0 - rate) * 100);
                rateStr = `-${diff}%`;
            } else if (rate > 1.0) {
                const diff = Math.round((rate - 1.0) * 100);
                rateStr = `+${diff}%`;
            }

            const url = `/tts?text=${encodeURIComponent(text)}&voice=${voice}&rate=${encodeURIComponent(rateStr)}`;
            const audio = new Audio(url);
            currentAudioRef.current = audio;

            audio.onended = () => resolve();
            audio.onerror = (e) => {
                console.error("Audio playback error:", e);
                setTimeout(resolve, 500); 
            };

            audio.play().catch(e => {
                console.error("Audio play failed (mungkin diblokir browser):", e);
                resolve(); 
            });
        });
    };

    const wait = (ms) => {
        return new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, ms);
        });
    };

    const runSessionSequence = async () => {
        if (!sessionCards || sessionCards.length === 0 || currentIndex >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
            confetti({ particleCount: 100, spread: 65, origin: { y: 0.7 }, colors: ['#60f2ce', '#fcbf49', '#ff822d'] });
            return;
        }

        const card = sessionCards[currentIndex].study_item;
        
        if (direction === 'en-id') {
            if (!isPlayingRef.current) return;
            setPhase('content');
            await playText(card.content, 'en-US', 0.9);
            
            if (!isPlayingRef.current) return;
            await wait(1500);

            if (!isPlayingRef.current) return;
            setPhase('translation');
            await playText(card.translation, 'id-ID', 1.0);
            
            if (!isPlayingRef.current) return;
            await wait(1500);
        } else {
            if (!isPlayingRef.current) return;
            setPhase('translation');
            await playText(card.translation, 'id-ID', 1.0);
            
            if (!isPlayingRef.current) return;
            await wait(1500);

            if (!isPlayingRef.current) return;
            setPhase('content');
            await playText(card.content, 'en-US', 0.9);
            
            if (!isPlayingRef.current) return;
            await wait(1500);
        }

        if (card.example_sentence) {
            if (direction === 'en-id') {
                if (!isPlayingRef.current) return;
                setPhase('example');
                await playText(card.example_sentence, 'en-US', 0.85);
                
                if (card.example_translation) {
                    await wait(1000);
                    if (!isPlayingRef.current) return;
                    await playText(card.example_translation, 'id-ID', 1.0);
                }
            } else {
                if (!isPlayingRef.current) return;
                setPhase('example');
                
                if (card.example_translation) {
                    await playText(card.example_translation, 'id-ID', 1.0);
                    await wait(1000);
                }
                
                if (!isPlayingRef.current) return;
                await playText(card.example_sentence, 'en-US', 0.85);
            }
            if (!isPlayingRef.current) return;
            await wait(2000);
        } else {
            await wait(2000);
        }

        if (isPlayingRef.current) {
            if (currentIndex + 1 >= sessionCards.length) {
                setIsFinished(true);
                setIsPlaying(false);
                confetti({ particleCount: 100, spread: 65, origin: { y: 0.7 }, colors: ['#60f2ce', '#fcbf49', '#ff822d'] });
            } else {
                setCurrentIndex(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        if (isPlaying && !isFinished) {
            runSessionSequence();
        } else {
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [currentIndex, isPlaying]);

    const togglePlay = () => {
        if (isFinished) return;
        setIsPlaying(!isPlaying);
    };

    const handleSkip = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        if (currentIndex + 1 >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
            confetti({ particleCount: 100, spread: 65, origin: { y: 0.7 }, colors: ['#60f2ce', '#fcbf49', '#ff822d'] });
        } else {
            setCurrentIndex(prev => prev + 1);
            if (!isPlaying) setIsPlaying(true);
        }
    };

    // State Kosong (Tidak ada kartu jatuh tempo)
    if (!sessionCards || sessionCards.length === 0) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Listening Selesai" />
                <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] flex items-center justify-center p-6 text-center font-sans transition-colors duration-200">
                    <div className="max-w-md w-full bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] flex items-center justify-center text-3xl mx-auto shadow-sm">
                            <i className="bi bi-emoji-smile"></i>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Semua Tuntas!</h2>
                        <p className="text-xs text-slate-400 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                            Tidak ada kosakata yang perlu di-review hari ini. Anda bisa memilih mode bebas untuk terus berlatih.
                        </p>
                        <div className="pt-2 flex flex-col gap-2">
                            <Link 
                                href="/study/listening" 
                                className="w-full py-3 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition text-center"
                            >
                                Ganti ke Mode Bebas
                            </Link>
                            <Link 
                                href="/home" 
                                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl transition text-center border border-transparent dark:border-slate-700"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // State Selesai Sesi
    if (isFinished) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Sesi Selesai" />
                <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] flex items-center justify-center p-6 text-center font-sans transition-colors duration-200">
                    <div className="max-w-md w-full bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-3xl mx-auto shadow-md shadow-[#ff822d]/25">
                            <i className="bi bi-patch-check-fill"></i>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Sesi Listening Tuntas! 🎉</h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                            Kerja luar biasa! Anda telah mendengarkan pelafalan <strong className="text-slate-900 dark:text-white font-bold">{sessionCards.length} kosakata</strong> secara penuh.
                        </p>
                        <div className="pt-3 flex flex-col gap-2.5">
                            <Link 
                                href="/study/listening" 
                                className="w-full py-3.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition text-center"
                            >
                                Mulai Sesi Baru
                            </Link>
                            <Link 
                                href="/home" 
                                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl transition text-center border border-transparent dark:border-slate-700"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const currentCard = sessionCards[currentIndex].study_item;
    const progressPercent = ((currentIndex + 1) / sessionCards.length) * 100;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Listening Session Player" />

            <div className="min-h-[calc(100vh-65px)] bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans flex items-center justify-center relative overflow-hidden transition-colors duration-200">
                
                {/* Background Ambient Radial Glow */}
                <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#fcbf49]/20 dark:bg-[#fcbf49]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Player Main Card */}
                <div className="w-full max-w-xl bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800/80 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] dark:shadow-none relative z-10 flex flex-col justify-between min-h-[580px] transition-colors">
                    
                    {/* Top Control Bar: Back & Counter */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Link 
                                href="/study/listening" 
                                className="w-9 h-9 rounded-2xl flex items-center justify-center bg-[#fafcfb] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#ff822d] dark:hover:text-[#ff822d] hover:border-[#ff822d]/40 transition shadow-2xs"
                                title="Keluar dari sesi"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>

                            <div className="text-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    {direction === 'en-id' ? 'EN → ID' : 'ID → EN'} &bull; {mode === 'daily' ? 'Target Harian' : 'Mode Bebas'}
                                </span>
                            </div>

                            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                                {currentIndex + 1} / {sessionCards.length}
                            </span>
                        </div>

                        {/* Progress Bar with Gradient */}
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-[#60f2ce] via-[#fcbf49] to-[#ff822d] transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Dynamic Card Display */}
                    <div className="py-8 flex flex-col justify-center items-center text-center space-y-6">
                        
                        {/* Word Section */}
                        <div className={`transition-all duration-500 ${phase === 'content' ? 'scale-105 opacity-100' : 'scale-100 opacity-60 dark:opacity-50'}`}>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                                Vocabulary
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                {currentCard.content}
                            </h2>

                            {/* Audio Equalizer Wave (Word Phase) */}
                            {phase === 'content' && isPlaying && (
                                <div className="flex justify-center items-center gap-1 h-3 mt-3">
                                    <span className="w-1 h-3 bg-[#0d9488] dark:bg-[#60f2ce] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1 h-5 bg-[#0d9488] dark:bg-[#60f2ce] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1 h-2 bg-[#0d9488] dark:bg-[#60f2ce] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    <span className="w-1 h-4 bg-[#0d9488] dark:bg-[#60f2ce] rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></span>
                                </div>
                            )}
                        </div>

                        {/* Translation Section */}
                        <div className={`transition-all duration-500 ${(phase === 'translation' || phase === 'example') ? 'opacity-100 translate-y-0' : 'opacity-20 dark:opacity-15 translate-y-2'}`}>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">
                                Terjemahan
                            </span>
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#c2410c] dark:text-[#ff822d] leading-snug">
                                {currentCard.translation}
                            </p>

                            {/* Audio Equalizer Wave (Translation Phase) */}
                            {phase === 'translation' && isPlaying && (
                                <div className="flex justify-center items-center gap-1 h-3 mt-3">
                                    <span className="w-1 h-3 bg-[#ff822d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1 h-5 bg-[#ff822d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1 h-2 bg-[#ff822d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            )}
                        </div>

                        {/* Example Sentence Section */}
                        {currentCard.example_sentence && (
                            <div className={`p-4 rounded-2xl bg-[#fafcfb] dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 max-w-md w-full transition-all duration-500 ${
                                phase === 'example' ? 'opacity-100 scale-100 border-[#fcbf49]/60 dark:border-amber-400/50 shadow-2xs' : 'opacity-40 dark:opacity-25 scale-95'
                            }`}>
                                <span className="text-[10px] font-bold text-[#b45309] dark:text-amber-300 uppercase tracking-wider block mb-1">
                                    Contoh Kalimat:
                                </span>
                                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic leading-relaxed">
                                    "{currentCard.example_sentence}"
                                </p>
                                {currentCard.example_translation && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                                        {currentCard.example_translation}
                                    </p>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Bottom Floating Playback Controls */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-5">
                        {/* Play/Pause Button */}
                        <button 
                            type="button"
                            onClick={togglePlay}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                                isPlaying 
                                    ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-[#4ee0bd]' 
                                    : 'bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 shadow-[#fcbf49]/30 hover:opacity-95 scale-105'
                            }`}
                            title={isPlaying ? 'Jeda Audio (Pause)' : 'Putar Audio (Play)'}
                        >
                            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-3xl ${isPlaying ? 'text-white dark:text-slate-950' : 'text-slate-950'} translate-x-0.5`}></i>
                        </button>

                        {/* Skip Next Button */}
                        <button 
                            type="button"
                            onClick={handleSkip}
                            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-transparent dark:border-slate-700 flex items-center justify-center active:scale-95 transition-all shadow-2xs"
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