import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyPractice({ auth, user, practiceCards = [], selectedType = '', source = 'today', limit = '50' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isMastering, setIsMastering] = useState(false);
    const [isFading, setIsFading] = useState(false);

    // Track mastered status locally
    const [masteredIds, setMasteredIds] = useState(
        () => new Set(practiceCards.filter(c => c.is_mastered).map(c => c.id))
    );

    // Reset index & state jika filter/cards berubah
    useEffect(() => {
        setCurrentIndex(0);
        setShowAnswer(false);
        setMasteredIds(new Set(practiceCards.filter(c => c.is_mastered).map(c => c.id)));
    }, [practiceCards]);

    const isComplete = currentIndex >= practiceCards.length || practiceCards.length === 0;
    const currentCard = isComplete ? null : practiceCards[currentIndex];
    const studyItem = currentCard?.study_item;
    const isCurrentMastered = currentCard ? masteredIds.has(currentCard.id) : false;

    const playAudio = useCallback((text, e) => {
        if (e) e.stopPropagation();
        if (!text || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }, []);

    // Transisi halus tanpa teks bocor
    const handleNext = useCallback(() => {
        if (isFading) return;
        window.speechSynthesis?.cancel();
        setIsFading(true);

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);

            setTimeout(() => {
                setIsFading(false);
            }, 40);
        }, 150);
    }, [isFading]);

    // Opsi mundur ke kartu sebelumnya
    const handlePrev = useCallback(() => {
        if (currentIndex === 0 || isFading) return;
        window.speechSynthesis?.cancel();
        setIsFading(true);

        setTimeout(() => {
            setCurrentIndex(prev => prev - 1);
            setShowAnswer(false);

            setTimeout(() => {
                setIsFading(false);
            }, 40);
        }, 150);
    }, [currentIndex, isFading]);

    const handleToggleMastered = useCallback(() => {
        if (!currentCard || isMastering) return;
        setIsMastering(true);
        axios.post(`/study/${currentCard.id}/mastered`)
            .then(res => {
                setMasteredIds(prev => {
                    const next = new Set(prev);
                    if (res.data.is_mastered) next.add(currentCard.id);
                    else next.delete(currentCard.id);
                    return next;
                });
            })
            .catch(err => {
                console.error(err);
                alert("Gagal mengubah status hafal");
            })
            .finally(() => setIsMastering(false));
    }, [currentCard, isMastering]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            const targetTag = e.target.tagName.toLowerCase();
            if (targetTag === 'input' || targetTag === 'textarea') return;
            if (isComplete || isFading) return;

            // Space / Enter -> Buka Jawaban atau Lanjut ke kartu berikutnya
            if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!showAnswer) {
                    setShowAnswer(true);
                } else {
                    handleNext();
                }
                return;
            }

            // Arrow Left -> Kartu sebelumnya
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                handlePrev();
                return;
            }

            // R -> Replay Audio kata bahasa inggris
            if ((e.key === 'r' || e.key === 'R') && studyItem?.content) {
                e.preventDefault();
                playAudio(studyItem.content);
                return;
            }

            // M -> Toggle Hafal
            if (e.key === 'm' || e.key === 'M') {
                e.preventDefault();
                handleToggleMastered();
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isComplete, isFading, showAnswer, currentIndex, studyItem, handleNext, handlePrev, handleToggleMastered, playAudio]);

    const navLinkClasses = (isActive) => 
        `px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all rounded-xl whitespace-nowrap ${
            isActive 
                ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60'
        }`;

    return (
        <AuthenticatedLayout user={auth?.user || user}>
            <Head title="Mode Latihan Bebas" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">

                    {/* Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Latihan Bebas
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/50 dark:border-[#fcbf49]/30 whitespace-nowrap">
                                    No Stress Mode 🎮
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Review santai tanpa memengaruhi hitungan streak atau interval SRS harian.
                            </p>
                        </div>
                        
                        {/* Switcher & Counter */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shrink-0">
                                <button 
                                    type="button"
                                    onClick={() => setIsReversed(false)}
                                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                                        !isReversed 
                                            ? 'bg-[#ff822d] text-white shadow-sm' 
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                    }`}
                                >
                                    ID ➔ EN
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsReversed(true)}
                                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                                        isReversed 
                                            ? 'bg-[#ff822d] text-white shadow-sm' 
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                    }`}
                                >
                                    EN ➔ ID
                                </button>
                            </div>

                            <span className="shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] font-bold text-[11px] sm:text-xs rounded-full shadow-xs whitespace-nowrap">
                                {isComplete ? practiceCards.length : currentIndex + 1} / {practiceCards.length}
                            </span>
                        </div>
                    </div>

                    {/* Configuration Controls Card */}
                    <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none space-y-4 transition-colors">
                        {/* Source Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Sumber Kartu</span>
                            <div className="flex bg-slate-50 dark:bg-slate-800/70 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 gap-1 w-fit">
                                <Link href={`/study/practice?type=${selectedType || ''}&source=today&limit=${limit}`} className={navLinkClasses(source === 'today')}>
                                    Hari Ini
                                </Link>
                                <Link href={`/study/practice?type=${selectedType || ''}&source=all&limit=${limit}`} className={navLinkClasses(source === 'all')}>
                                    Semua (Acak)
                                </Link>
                            </div>
                        </div>

                        {/* Limit Filter */}
                        {source === 'all' && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Batas Jumlah</span>
                                <div className="flex bg-slate-50 dark:bg-slate-800/70 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 gap-1 w-fit">
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=50`} className={navLinkClasses(limit === '50')}>50</Link>
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=100`} className={navLinkClasses(limit === '100')}>100</Link>
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=all`} className={navLinkClasses(limit === 'all')}>Semua</Link>
                                </div>
                            </div>
                        )}

                        {/* Type Pills */}
                        <div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-2.5">Kategori Materi</span>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {['', 'word', 'phrase', 'grammar_rule', 'idiom', 'speaking_prompt'].map((type) => {
                                    const isActive = (selectedType || '') === type;
                                    const label = type === '' ? 'Semua Tipe' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                                    return (
                                        <Link 
                                            key={type}
                                            href={`/study/practice?type=${type}&source=${source}&limit=${limit}`}
                                            className={`px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all border whitespace-nowrap ${
                                                isActive 
                                                    ? 'bg-[#60f2ce]/25 dark:bg-[#60f2ce]/20 text-[#0f766e] dark:text-[#60f2ce] border-[#60f2ce] dark:border-[#60f2ce]/50' 
                                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Card Arena */}
                    {isComplete ? (
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-8 sm:p-10 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden transition-colors">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#fefc7c]/30 dark:bg-[#fefc7c]/10 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#60f2ce]/30 dark:bg-[#60f2ce]/10 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 flex items-center justify-center text-2xl border border-[#60f2ce]/40 dark:border-[#60f2ce]/30">
                                    🎉
                                </div>
                                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white mb-2">Latihan Selesai!</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-md mx-auto mb-7">
                                    {practiceCards.length === 0 
                                        ? `Belum ada materi untuk setelan ini ${source === 'today' ? 'yang direview hari ini' : 'di database'}. Ubah filter di atas untuk mulai berlatih.`
                                        : 'Hebat! Semua kartu di sesi latihan bebas ini telah dituntaskan.'}
                                </p>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    <button 
                                        type="button"
                                        onClick={() => { setCurrentIndex(0); setShowAnswer(false); }}
                                        className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-full transition border dark:border-slate-700 cursor-pointer"
                                    >
                                        Ulangi Sesi Ini
                                    </button>
                                    <Link 
                                        href="/home" 
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                                    >
                                        Ke Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Card Container dengan Crossfade Anti-Bocor */
                        <div 
                            className={`relative h-[450px] w-full mx-auto transition-all duration-150 ease-out ${
                                isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                            }`}
                        >
                            {/* Front Card Face */}
                            <div className={`absolute inset-0 w-full h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] dark:shadow-none p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ease-out transform ${
                                showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                            }`}>
                                <div className="flex items-center justify-between gap-2 min-w-0">
                                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                        <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#fcbf49]/15 dark:bg-[#fcbf49]/20 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/30 uppercase tracking-wider whitespace-nowrap">
                                            {studyItem?.type?.replace('_', ' ') || 'Flashcard'}
                                        </span>
                                        {studyItem?.level && (
                                            <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-wider whitespace-nowrap">
                                                {studyItem.level}
                                            </span>
                                        )}
                                        {isCurrentMastered && (
                                            <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 whitespace-nowrap">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                Sudah Hafal
                                            </span>
                                        )}
                                    </div>
                                    <span className="shrink-0 text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                        Tekan Spasi
                                    </span>
                                </div>
                                
                                <div className="my-auto text-center px-2 sm:px-4 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <h2 className="font-extrabold text-2xl sm:text-4xl tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                                            {!isReversed ? studyItem?.translation : studyItem?.content}
                                        </h2>

                                        {isReversed && studyItem?.content && (
                                            <button
                                                type="button"
                                                onClick={(e) => playAudio(studyItem.content, e)}
                                                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shrink-0 cursor-pointer"
                                                title="Dengarkan pengucapan (Tekan R)"
                                            >
                                                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {currentIndex > 0 && (
                                        <button
                                            type="button"
                                            onClick={handlePrev}
                                            className="px-3.5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl transition cursor-pointer"
                                            title="Kembali ke kartu sebelumnya"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                            </svg>
                                        </button>
                                    )}
                                    <button 
                                        type="button"
                                        onClick={() => setShowAnswer(true)}
                                        className="flex-1 py-3.5 bg-slate-900 dark:bg-[#60f2ce] hover:bg-slate-800 dark:hover:bg-[#4de1bc] text-white dark:text-slate-950 font-bold text-xs rounded-2xl shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span>Lihat Jawaban</span>
                                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-white/20 dark:bg-black/15 rounded text-white dark:text-slate-900">
                                            Spasi
                                        </kbd>
                                    </button>
                                </div>
                            </div>

                            {/* Back Card Face */}
                            <div className={`absolute inset-0 w-full h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_12px_32px_-8px_rgba(255,130,45,0.12)] dark:shadow-none p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ease-out transform ${
                                !showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                            }`}>
                                <div className="flex items-center justify-between gap-2 min-w-0">
                                    <span className="shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0f766e] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 uppercase tracking-wider whitespace-nowrap">
                                        Kunci Jawaban
                                    </span>
                                    <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium truncate text-right">
                                        {!isReversed ? studyItem?.translation : studyItem?.content}
                                    </span>
                                </div>

                                <div className="my-auto py-2 space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-center gap-2.5">
                                        <h3 className="font-black text-2xl sm:text-4xl tracking-tight text-[#ea580c] dark:text-[#ff822d] break-words text-center">
                                            {!isReversed ? studyItem?.content : studyItem?.translation}
                                        </h3>

                                        {!isReversed && studyItem?.content && (
                                            <button
                                                type="button"
                                                onClick={(e) => playAudio(studyItem.content, e)}
                                                className="p-2 rounded-full text-[#ea580c]/70 hover:text-[#ea580c] dark:text-[#ff822d]/70 dark:hover:text-[#ff822d] hover:bg-orange-50 dark:hover:bg-slate-800 active:scale-95 transition shrink-0 cursor-pointer"
                                                title="Dengarkan pengucapan (Tekan R)"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800 max-h-36 overflow-y-auto">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                                                Contoh Kalimat:
                                            </span>
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
                                        <p className="italic text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-medium">
                                            "{studyItem?.example_sentence || 'Tidak ada contoh kalimat.'}"
                                        </p>
                                        {studyItem?.example_translation && (
                                            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-2 border-t border-slate-200 dark:border-slate-700/70 pt-2">
                                                <span className="font-semibold text-slate-400 dark:text-slate-500">Arti:</span> {studyItem.example_translation}
                                            </p>
                                        )}
                                        {studyItem?.notes && (
                                            <p className="text-slate-400 dark:text-slate-400 text-[11px] mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/70">
                                                📝 {studyItem.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 space-y-2">
                                    {/* Tombol Toggle Hafal */}
                                    <button
                                        type="button"
                                        disabled={isMastering}
                                        onClick={handleToggleMastered}
                                        className={`w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer ${
                                            isCurrentMastered
                                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:border-rose-500/30'
                                                : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white'
                                        }`}
                                        title="Tekan M untuk toggle"
                                    >
                                        {isMastering ? (
                                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isCurrentMastered ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}/>
                                            </svg>
                                        )}
                                        <span>{isCurrentMastered ? 'Hapus Tanda Hafal' : 'Tandai Sudah Hafal'}</span>
                                        <kbd className="hidden sm:inline-block ml-1 px-1 py-0.2 rounded text-[9px] bg-black/5 dark:bg-white/10 font-mono">M</kbd>
                                    </button>

                                    {/* Action Bottom: Prev & Next */}
                                    <div className="flex items-center gap-2">
                                        {currentIndex > 0 && (
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl transition cursor-pointer"
                                                title="Kartu sebelumnya (Arrow Left)"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                                </svg>
                                            </button>
                                        )}
                                        <button 
                                            type="button"
                                            onClick={handleNext} 
                                            className="flex-1 py-3 bg-gradient-to-r from-[#ff822d] to-[#fcbf49] text-slate-950 hover:opacity-95 font-extrabold text-xs rounded-2xl shadow-md shadow-[#ff822d]/20 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
                                        >
                                            <span>Lanjut Kartu Berikutnya</span>
                                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-black/10 rounded text-slate-900">
                                                Enter
                                            </kbd>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
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