import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyIndex({ auth, dueFlashcards = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isMastering, setIsMastering] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const isComplete = currentIndex >= dueFlashcards.length || dueFlashcards.length === 0;
    const currentCard = isComplete ? null : dueFlashcards[currentIndex];
    const studyItem = currentCard?.study_item;

    const playAudio = useCallback((text, e) => {
        if (e) e.stopPropagation();
        if (!text || !('speechSynthesis' in window)) return;
        
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }, []);

    // Transisi crossfade halus: container hilang dulu, ganti data di balik layar, lalu muncul kembali
    const nextCard = useCallback(() => {
        setIsFading(true);

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);

            setTimeout(() => {
                setIsFading(false);
            }, 40);
        }, 150); // Sesuaikan dengan durasi duration-150 transition container
    }, []);

    const handleRate = useCallback((quality) => {
        if (!currentCard || isSaving || isMastering || isFading) return;
        setIsSaving(true);
        axios.post(`/study/${currentCard.id}/review`, { quality })
            .then(() => {
                nextCard();
            })
            .catch(err => {
                console.error(err);
                alert("Gagal menyimpan progress");
            })
            .finally(() => {
                setIsSaving(false);
            });
    }, [currentCard, isSaving, isMastering, isFading, nextCard]);

    const handleMarkMastered = useCallback(() => {
        if (!currentCard || isSaving || isMastering || isFading) return;
        setIsMastering(true);
        axios.post(`/study/${currentCard.id}/mastered`)
            .then(() => {
                nextCard();
            })
            .catch(err => {
                console.error(err);
                alert("Gagal menandai kata hafal");
            })
            .finally(() => {
                setIsMastering(false);
            });
    }, [currentCard, isSaving, isMastering, isFading, nextCard]);

    // Shortcut Keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            const targetTagName = e.target.tagName.toLowerCase();
            if (targetTagName === 'input' || targetTagName === 'textarea') return;
            if (isComplete || isSaving || isMastering || isFading) return;

            // Spasi atau Enter -> Buka Jawaban
            if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!showAnswer) {
                    setShowAnswer(true);
                }
                return;
            }

            // Tombol R -> Replay Audio Kata Bahasa Inggris
            if ((e.key === 'r' || e.key === 'R') && studyItem?.content) {
                e.preventDefault();
                playAudio(studyItem.content);
                return;
            }

            // Tombol Angka 1-4 -> Rating Hasil Review
            if (showAnswer) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        handleRate(1);
                        break;
                    case '2':
                        e.preventDefault();
                        handleRate(3);
                        break;
                    case '3':
                        e.preventDefault();
                        handleRate(4);
                        break;
                    case '4':
                        e.preventDefault();
                        handleRate(5);
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isComplete, isSaving, isMastering, isFading, showAnswer, currentCard, studyItem, handleRate, playAudio]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daily Review" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Top Bar Navigation */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                                Daily Review
                            </h1>
                            <span className="shrink-0 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                Mode Sesi
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                            <button 
                                onClick={() => setIsReversed(!isReversed)}
                                className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition whitespace-nowrap cursor-pointer"
                            >
                                🔄 {isReversed ? 'EN ➔ ID' : 'ID ➔ EN'}
                            </button>
                            <span className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-[11px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
                                {isComplete ? dueFlashcards.length : currentIndex + 1} / {dueFlashcards.length}
                            </span>
                        </div>
                    </div>

                    {isComplete ? (
                        /* Complete Card */
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-8 sm:p-10 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden transition-colors">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#fefc7c]/40 dark:bg-[#fefc7c]/10 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#60f2ce]/40 dark:bg-[#60f2ce]/10 rounded-full blur-2xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] flex items-center justify-center text-3xl shadow-sm">
                                    🎉
                                </div>
                                <h3 className="font-black text-2xl mb-2 text-slate-900 dark:text-white">Sesi Selesai!</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-8 font-normal">
                                    {dueFlashcards.length === 0 
                                        ? "Semua materi sudah bersih. Tidak ada kartu yang perlu di-review saat ini."
                                        : "Kerja bagus! Seluruh target review flashcard hari ini telah berhasil diselesaikan."}
                                </p>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    <Link 
                                        href="/home" 
                                        className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] hover:opacity-95 rounded-full shadow-sm shadow-[#fcbf49]/20 transition"
                                    >
                                        Ke Dashboard
                                    </Link>
                                    <Link 
                                        href="/study/practice" 
                                        className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800 rounded-full shadow-sm transition border dark:border-slate-700"
                                    >
                                        Latihan Bebas
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Card Container dengan Crossfade Transition */
                        <div 
                            className={`relative h-[480px] w-full transition-all duration-150 ease-out ${
                                isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                            }`}
                        >
                            {/* Front Card Face */}
                            <div 
                                className={`absolute inset-0 w-full h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ease-out transform ${
                                    showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold uppercase px-3 py-1 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0f766e] dark:text-[#60f2ce] rounded-lg border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                            {studyItem?.type?.replace('_', ' ') || 'Kartu Belajar'}
                                        </span>
                                        {studyItem?.level && (
                                            <span className="text-[11px] font-bold uppercase px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700">
                                                {studyItem.level}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Tekan spasi untuk cek</span>
                                </div>

                                <div className="my-auto text-center py-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <h2 className="font-black text-3xl sm:text-5xl tracking-tight text-slate-900 dark:text-white break-words">
                                            {!isReversed ? studyItem?.content : studyItem?.translation}
                                        </h2>
                                        
                                        {!isReversed && studyItem?.content && (
                                            <button
                                                type="button"
                                                onClick={(e) => playAudio(studyItem.content, e)}
                                                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shrink-0 cursor-pointer"
                                                title="Dengarkan pengucapan (Tekan R)"
                                            >
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button 
                                        type="button"
                                        onClick={() => setShowAnswer(true)}
                                        className="w-full py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] hover:opacity-95 rounded-2xl shadow-md shadow-[#fcbf49]/20 transition flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span>Lihat Jawaban</span>
                                        <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-black/10 rounded border border-black/15 text-slate-900">
                                            Spasi
                                        </kbd>
                                        <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Back Card Face */}
                            <div 
                                className={`absolute inset-0 w-full h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ease-out transform ${
                                    !showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                                }`}
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[11px] font-bold uppercase px-2.5 py-1 bg-[#ff822d]/15 text-[#ea580c] dark:text-[#ff822d] rounded-lg border border-[#ff822d]/30">
                                            Arti / Terjemahan
                                        </span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate max-w-[150px] sm:max-w-none">
                                            {!isReversed ? studyItem?.content : studyItem?.translation}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 mb-4">
                                        <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white break-words">
                                            {!isReversed ? studyItem?.translation : studyItem?.content}
                                        </h3>
                                        
                                        {isReversed && studyItem?.content && (
                                            <button
                                                type="button"
                                                onClick={(e) => playAudio(studyItem.content, e)}
                                                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shrink-0 cursor-pointer"
                                                title="Dengarkan pengucapan (Tekan R)"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <div className="bg-[#fafcfb] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contoh Kalimat</span>
                                            {studyItem?.example_sentence && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => playAudio(studyItem.example_sentence, e)}
                                                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 active:scale-95 transition cursor-pointer"
                                                    title="Dengarkan kalimat"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <p className="italic text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                                            "{studyItem?.example_sentence || 'Belum ada contoh kalimat.'}"
                                        </p>
                                        {studyItem?.example_translation && (
                                            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-2 border-t border-slate-100 dark:border-slate-700/60 pt-2">
                                                <span className="font-semibold text-slate-400 dark:text-slate-500">Arti:</span> {studyItem.example_translation}
                                            </p>
                                        )}
                                    </div>

                                    {studyItem?.notes && (
                                        <p className="text-slate-400 dark:text-slate-500 text-xs mt-3 px-1">{studyItem.notes}</p>
                                    )}
                                </div>

                                {/* Review Buttons */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <p className="mb-3 font-semibold text-slate-500 dark:text-slate-400 text-xs text-center">Seberapa mudah materi ini untukmu?</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        <button 
                                            type="button"
                                            disabled={isSaving || isMastering} 
                                            onClick={() => handleRate(1)} 
                                            className="py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/30 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition shadow-xs disabled:opacity-50 cursor-pointer"
                                        >
                                            <span>Lupa</span>
                                            <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-mono">1</kbd>
                                        </button>
                                        <button 
                                            type="button"
                                            disabled={isSaving || isMastering} 
                                            onClick={() => handleRate(3)} 
                                            className="py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 bg-[#ff822d]/10 dark:bg-[#ff822d]/15 text-[#ea580c] dark:text-[#ff822d] border border-[#ff822d]/20 dark:border-[#ff822d]/30 hover:bg-[#ff822d] hover:text-white transition shadow-xs disabled:opacity-50 cursor-pointer"
                                        >
                                            <span>Sulit</span>
                                            <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/50 text-[#ea580c] dark:text-[#ff822d] font-mono">2</kbd>
                                        </button>
                                        <button 
                                            type="button"
                                            disabled={isSaving || isMastering} 
                                            onClick={() => handleRate(4)} 
                                            className="py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/40 dark:border-[#fcbf49]/30 hover:bg-[#fcbf49] hover:text-slate-900 transition shadow-xs disabled:opacity-50 cursor-pointer"
                                        >
                                            <span>Bagus</span>
                                            <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-yellow-100 dark:bg-yellow-900/50 text-amber-800 dark:text-amber-200 font-mono">3</kbd>
                                        </button>
                                        <button 
                                            type="button"
                                            disabled={isSaving || isMastering} 
                                            onClick={() => handleRate(5)} 
                                            className="py-2.5 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0f766e] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 hover:bg-[#60f2ce] hover:text-slate-900 transition shadow-xs disabled:opacity-50 cursor-pointer"
                                        >
                                            <span>Mudah</span>
                                            <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-teal-100 dark:bg-teal-900/50 text-[#0f766e] dark:text-[#60f2ce] font-mono">4</kbd>
                                        </button>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <button
                                            type="button"
                                            disabled={isSaving || isMastering}
                                            onClick={handleMarkMastered}
                                            className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition shadow-xs disabled:opacity-50 cursor-pointer"
                                            title="Tandai kata ini sebagai sudah hafal."
                                        >
                                            {isMastering ? (
                                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                                </svg>
                                            ) : (
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            )}
                                            Sudah Hafal — Tidak perlu review lagi
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}