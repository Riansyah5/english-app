import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function StudyIndex({ auth, dueFlashcards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReversed, setIsReversed] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const isComplete = currentIndex >= dueFlashcards.length || dueFlashcards.length === 0;
    const currentCard = isComplete ? null : dueFlashcards[currentIndex];
    const studyItem = currentCard?.study_item;

    const handleRate = (quality) => {
        setIsSaving(true);
        axios.post(`/study/${currentCard.id}/review`, { quality })
            .then(res => {
                setCurrentIndex(prev => prev + 1);
                setShowAnswer(false);
            })
            .catch(err => {
                console.error(err);
                alert("Gagal menyimpan progress");
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daily Review" />

            <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <h5 className="font-bold text-xl text-slate-900 dark:text-white opacity-90">Daily Review</h5>
                    <div className="flex gap-3 items-center">
                        <button 
                            onClick={() => setIsReversed(!isReversed)}
                            className="text-sm px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            🔄 {isReversed ? 'EN ➔ ID' : 'ID ➔ EN'}
                        </button>
                        <span className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold shadow-sm">
                            {isComplete ? dueFlashcards.length : currentIndex + 1} / {dueFlashcards.length}
                        </span>
                    </div>
                </div>

                {isComplete ? (
                    <div className="glass dark:glass-dark rounded-3xl text-center py-16 px-8 mb-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="mb-6">
                            <h1 className="text-7xl mb-0">🎉</h1>
                        </div>
                        <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Luar Biasa!</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">
                            {dueFlashcards.length === 0 
                                ? "Tidak ada materi yang perlu di-review hari ini."
                                : "Anda telah menyelesaikan semua review hari ini."}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href="/home" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
                                Ke Dashboard
                            </Link>
                            <Link href="/study/practice" className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors">
                                Latihan Bebas
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="relative h-[480px] w-full perspective-1000">
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
                                <h3 className="font-bold text-3xl tracking-tight text-blue-600 dark:text-blue-400">
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
                                <p className="mb-4 font-medium text-slate-500 text-sm text-center">Seberapa mudah materi ini untukmu?</p>
                                <div className="grid grid-cols-4 gap-2">
                                    <button disabled={isSaving} onClick={() => handleRate(1)} className="py-2.5 rounded-xl font-medium text-sm bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white dark:bg-rose-500/10 dark:border-rose-500/20 dark:hover:bg-rose-600 transition-colors">Lupa</button>
                                    <button disabled={isSaving} onClick={() => handleRate(3)} className="py-2.5 rounded-xl font-medium text-sm bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-500 hover:text-white dark:bg-amber-500/10 dark:border-amber-500/20 dark:hover:bg-amber-500 transition-colors">Sulit</button>
                                    <button disabled={isSaving} onClick={() => handleRate(4)} className="py-2.5 rounded-xl font-medium text-sm bg-cyan-50 text-cyan-600 border border-cyan-100 hover:bg-cyan-500 hover:text-white dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:hover:bg-cyan-500 transition-colors">Bagus</button>
                                    <button disabled={isSaving} onClick={() => handleRate(5)} className="py-2.5 rounded-xl font-medium text-sm bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:hover:bg-emerald-500 transition-colors">Mudah</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

