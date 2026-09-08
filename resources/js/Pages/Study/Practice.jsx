import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyPractice({ auth, practiceCards, selectedType, source, limit }) {
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
        `px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mode Latihan Bebas" />

            <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                    <div>
                        <h5 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Mode Latihan Bebas 🎮</h5>
                        <p className="text-slate-500 text-sm">Skor tidak akan disimpan ke statistik.</p>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                        <div className="flex bg-slate-100 dark:bg-[#131822] p-1 rounded-full border border-slate-200 dark:border-slate-800">
                            <button 
                                onClick={() => setIsReversed(false)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${!isReversed ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                            >
                                ID ➔ EN
                            </button>
                            <button 
                                onClick={() => setIsReversed(true)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${isReversed ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                            >
                                EN ➔ ID
                            </button>
                        </div>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold shadow-sm">
                            {isComplete ? practiceCards.length : currentIndex + 1} / {practiceCards.length}
                        </span>
                    </div>
                </div>

                {/* Configuration Controls */}
                <div className="glass dark:glass-dark p-4 rounded-2xl mb-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sumber Data:</span>
                        <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <Link href={`/study/practice?type=${selectedType || ''}&source=today&limit=${limit}`} className={navLinkClasses(source === 'today')}>
                                Hari Ini
                            </Link>
                            <Link href={`/study/practice?type=${selectedType || ''}&source=all&limit=${limit}`} className={navLinkClasses(source === 'all')}>
                                Semua (Acak)
                            </Link>
                        </div>
                    </div>
                </div>

                {source === 'all' && (
                    <div className="glass dark:glass-dark p-4 rounded-2xl mb-4 shadow-sm border-l-4 border-l-cyan-500 border border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Batas Jumlah:</span>
                            <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=50`} className={navLinkClasses(limit === '50')}>50</Link>
                                <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=100`} className={navLinkClasses(limit === '100')}>100</Link>
                                <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=all`} className={navLinkClasses(limit === 'all')}>Semua</Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Type Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {['', 'word', 'phrase', 'grammar_rule', 'idiom', 'speaking_prompt'].map((type) => {
                        const isActive = (selectedType || '') === type;
                        const label = type === '' ? 'Semua Tipe' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return (
                            <Link 
                                key={type}
                                href={`/study/practice?type=${type}&source=${source}&limit=${limit}`}
                                className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all ${isActive ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {isComplete ? (
                    <div className="glass dark:glass-dark rounded-3xl text-center py-16 px-8 mb-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="mb-6">
                            <h1 className="text-7xl mb-0">🔁</h1>
                        </div>
                        <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Latihan Selesai</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">
                            {practiceCards.length === 0 
                                ? `Belum ada materi untuk kategori ini ${source === 'today' ? 'yang kamu review hari ini' : 'di dalam database-mu'}. Silakan ubah filter di atas.`
                                : "Anda telah mengulang semua materi di pengaturan ini."}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href={`/study/practice?type=${selectedType || ''}&source=${source}&limit=${limit}`} className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors">
                                Ulangi Lagi
                            </Link>
                            <Link href="/home" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
                                Ke Dashboard
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="relative h-[480px] w-full max-w-2xl mx-auto perspective-1000">
                        {/* Front Card */}
                        <div className={`absolute inset-0 w-full h-full glass dark:glass-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg p-8 flex flex-col transition-all duration-300 transform ${showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                            <div className="text-center mt-2">
                                <span className="uppercase tracking-widest text-slate-400 font-bold text-xs">{studyItem.type.replace('_', ' ')}</span>
                            </div>
                            
                            <div className="my-auto text-center py-8">
                                <h2 className="font-bold text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
                                    {!isReversed ? studyItem.content : studyItem.translation}
                                </h2>
                            </div>
                            
                            <div className="mt-auto">
                                <button 
                                    onClick={() => setShowAnswer(true)}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-sm transition-all"
                                >
                                    Lihat Jawaban
                                </button>
                            </div>
                        </div>

                        {/* Back Card */}
                        <div className={`absolute inset-0 w-full h-full glass dark:glass-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg p-8 flex flex-col transition-all duration-300 transform ${!showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                            <div className="mb-4">
                                <span className="uppercase tracking-widest text-slate-400 font-bold text-xs">Jawaban</span>
                                <h6 className="font-medium text-slate-500 mt-2 mb-1">
                                    {!isReversed ? studyItem.content : studyItem.translation}
                                </h6>
                                <h3 className="font-bold text-3xl tracking-tight text-emerald-600 dark:text-emerald-500">
                                    {!isReversed ? studyItem.translation : studyItem.content}
                                </h3>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-4 border border-slate-100 dark:border-slate-700/50 flex-grow overflow-auto">
                                <span className="text-slate-400 font-bold block mb-2 uppercase tracking-widest text-xs">Example Sentence:</span>
                                <p className="italic text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                    {studyItem.example_sentence || 'Tidak ada contoh kalimat.'}
                                </p>
                            </div>

                            {studyItem.notes && (
                                <p className="text-slate-500 text-xs mb-4 px-1">{studyItem.notes}</p>
                            )}

                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button onClick={handleNext} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-sm transition-all">
                                    Lanjut ke Kartu Berikutnya &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

