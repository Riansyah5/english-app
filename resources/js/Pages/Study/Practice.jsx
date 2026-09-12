import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyPractice({ auth, user, practiceCards = [], selectedType = '', source = 'today', limit = '50' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const isComplete = currentIndex >= practiceCards.length || practiceCards.length === 0;
    const currentCard = isComplete ? null : practiceCards[currentIndex];
    const studyItem = currentCard?.study_item;

    const handleNext = () => {
        setShowAnswer(false);
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, 150);
    };

    const navLinkClasses = (isActive) => 
        `px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold transition-all rounded-xl whitespace-nowrap ${
            isActive 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
        }`;

    return (
        <AuthenticatedLayout user={auth?.user || user}>
            <Head title="Mode Latihan Bebas" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">

                    {/* Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                                    Latihan Bebas
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/50 whitespace-nowrap">
                                    No Stress Mode 🎮
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Review santai tanpa memengaruhi hitungan streak atau interval SRS harian.
                            </p>
                        </div>
                        
                        {/* Switcher & Counter */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 shrink-0">
                                <button 
                                    onClick={() => setIsReversed(false)}
                                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                                        !isReversed 
                                            ? 'bg-[#ff822d] text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    ID ➔ EN
                                </button>
                                <button 
                                    onClick={() => setIsReversed(true)}
                                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                                        isReversed 
                                            ? 'bg-[#ff822d] text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    EN ➔ ID
                                </button>
                            </div>

                            <span className="shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white border border-slate-200 text-[#0d9488] font-bold text-[11px] sm:text-xs rounded-full shadow-xs whitespace-nowrap">
                                {isComplete ? practiceCards.length : currentIndex + 1} / {practiceCards.length}
                            </span>
                        </div>
                    </div>

                    {/* Configuration Controls Card */}
                    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] space-y-4">
                        {/* Source Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sumber Kartu</span>
                            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 gap-1 w-fit">
                                <Link href={`/study/practice?type=${selectedType || ''}&source=today&limit=${limit}`} className={navLinkClasses(source === 'today')}>
                                    Hari Ini
                                </Link>
                                <Link href={`/study/practice?type=${selectedType || ''}&source=all&limit=${limit}`} className={navLinkClasses(source === 'all')}>
                                    Semua (Acak)
                                </Link>
                            </div>
                        </div>

                        {/* Limit Filter (If 'all') */}
                        {source === 'all' && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batas Jumlah</span>
                                <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 gap-1 w-fit">
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=50`} className={navLinkClasses(limit === '50')}>50</Link>
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=100`} className={navLinkClasses(limit === '100')}>100</Link>
                                    <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=all`} className={navLinkClasses(limit === 'all')}>Semua</Link>
                                </div>
                            </div>
                        )}

                        {/* Type Pills */}
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Kategori Materi</span>
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
                                                    ? 'bg-[#60f2ce]/25 text-[#0f766e] border-[#60f2ce]' 
                                                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
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
                        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#fefc7c]/30 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#60f2ce]/30 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#60f2ce]/20 flex items-center justify-center text-2xl border border-[#60f2ce]/40">
                                    🎉
                                </div>
                                <h3 className="font-extrabold text-2xl text-slate-900 mb-2">Latihan Selesai!</h3>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto mb-7">
                                    {practiceCards.length === 0 
                                        ? `Belum ada materi untuk setelan ini ${source === 'today' ? 'yang direview hari ini' : 'di database'}. Ubah filter di atas untuk mulai berlatih.`
                                        : 'Hebat! Semua kartu di sesi latihan bebas ini telah dituntaskan.'}
                                </p>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    <Link 
                                        href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=${limit}`} 
                                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition"
                                    >
                                        Ulangi Lagi
                                    </Link>
                                    <Link 
                                        href="/home" 
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-900 font-extrabold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                                    >
                                        Ke Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative h-[440px] w-full mx-auto">
                            {/* Front Card */}
                            <div className={`absolute inset-0 w-full h-full bg-white rounded-3xl border border-slate-100 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform ${
                                showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                            }`}>
                                <div className="flex items-center justify-between gap-2 min-w-0">
                                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                        <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#fcbf49]/15 text-[#b45309] border border-[#fcbf49]/30 uppercase tracking-wider whitespace-nowrap">
                                            {studyItem?.type?.replace('_', ' ') || 'Flashcard'}
                                        </span>
                                        {studyItem?.level && (
                                            <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wider whitespace-nowrap">
                                                {studyItem.level}
                                            </span>
                                        )}
                                    </div>
                                    <span className="shrink-0 text-[11px] sm:text-xs font-semibold text-slate-400 whitespace-nowrap">
                                        Pertanyaan
                                    </span>
                                </div>
                                
                                <div className="my-auto text-center px-2 sm:px-4">
                                    <h2 className="font-extrabold text-2xl sm:text-4xl tracking-tight text-slate-900 leading-tight break-words">
                                        {!isReversed ? studyItem?.content : studyItem?.translation}
                                    </h2>
                                </div>
                                
                                <div>
                                    <button 
                                        onClick={() => setShowAnswer(true)}
                                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        Lihat Jawaban
                                    </button>
                                </div>
                            </div>

                            {/* Back Card */}
                            <div className={`absolute inset-0 w-full h-full bg-white rounded-3xl border border-slate-100 shadow-[0_12px_32px_-8px_rgba(255,130,45,0.12)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform ${
                                !showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                            }`}>
                                {/* Header Kunci Jawaban (Aman dari Wrap) */}
                                <div className="flex items-center justify-between gap-2 min-w-0">
                                    <span className="shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#60f2ce]/20 text-[#0f766e] border border-[#60f2ce]/50 uppercase tracking-wider whitespace-nowrap">
                                        Kunci Jawaban
                                    </span>
                                    <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate text-right">
                                        {!isReversed ? studyItem?.content : studyItem?.translation}
                                    </span>
                                </div>

                                <div className="my-auto py-2 space-y-3 sm:space-y-4">
                                    <div className="text-center">
                                        <h3 className="font-black text-2xl sm:text-4xl tracking-tight text-[#ea580c] break-words">
                                            {!isReversed ? studyItem?.translation : studyItem?.content}
                                        </h3>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100 max-h-36 overflow-y-auto">
                                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                                            Contoh Kalimat:
                                        </span>
                                        <p className="italic text-slate-700 text-xs leading-relaxed font-medium">
                                            "{studyItem?.example_sentence || 'Tidak ada contoh kalimat.'}"
                                        </p>
                                        {studyItem?.example_translation && (
                                            <p className="text-slate-500 text-[11px] mt-2 border-t border-slate-200 pt-2">
                                                <span className="font-semibold text-slate-400">Arti:</span> {studyItem.example_translation}
                                            </p>
                                        )}
                                        {studyItem?.notes && (
                                            <p className="text-slate-400 text-[11px] mt-2 pt-2 border-t border-slate-200">
                                                📝 {studyItem.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        onClick={handleNext} 
                                        className="w-full py-3.5 bg-gradient-to-r from-[#ff822d] to-[#fcbf49] text-slate-950 hover:opacity-95 font-extrabold text-xs rounded-2xl shadow-md shadow-[#ff822d]/20 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
                                    >
                                        <span>Lanjut Kartu Berikutnya</span>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}