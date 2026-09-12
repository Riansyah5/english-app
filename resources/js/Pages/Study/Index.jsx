import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
            .then(() => {
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

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Top Bar Navigation (Responsif Mobile) */}
                    <div className="flex items-center justify-between gap-2">
                        {/* Kiri: Judul & Badge Mode */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                                Daily Review
                            </h1>
                            <span className="shrink-0 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                Mode Sesi
                            </span>
                        </div>
                        
                        {/* Kanan: Tombol Tukar Bahasa & Counter Kartu */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                            <button 
                                onClick={() => setIsReversed(!isReversed)}
                                className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white border border-slate-200 text-slate-700 rounded-full shadow-xs hover:bg-slate-50 active:scale-95 transition whitespace-nowrap"
                            >
                                🔄 {isReversed ? 'EN ➔ ID' : 'ID ➔ EN'}
                            </button>
                            <span className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white border border-slate-200 text-slate-700 rounded-full text-[11px] sm:text-xs font-bold shadow-xs whitespace-nowrap">
                                {isComplete ? dueFlashcards.length : currentIndex + 1} / {dueFlashcards.length}
                            </span>
                        </div>
                    </div>

                    {isComplete ? (
                        /* Complete Card */
                        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#60f2ce]/40 rounded-full blur-2xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] flex items-center justify-center text-3xl shadow-sm">
                                    🎉
                                </div>
                                <h3 className="font-black text-2xl mb-2 text-slate-900">Sesi Selesai!</h3>
                                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-normal">
                                    {dueFlashcards.length === 0 
                                        ? "Semua materi sudah bersih. Tidak ada kartu yang perlu di-review saat ini."
                                        : "Kerja bagus! Seluruh target review flashcard hari ini telah berhasil diselesaikan."}
                                </p>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    <Link 
                                        href="/home" 
                                        className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] hover:opacity-95 rounded-full shadow-sm shadow-[#fcbf49]/20 transition"
                                    >
                                        Ke Dashboard
                                    </Link>
                                    <Link 
                                        href="/study/practice" 
                                        className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-sm transition"
                                    >
                                        Latihan Bebas
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Card Flip Workspace */
                        <div className="relative h-[480px] w-full">
                            
                            {/* Front Card */}
                            <div className={`absolute inset-0 w-full h-full bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform ${showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold uppercase px-3 py-1 bg-[#60f2ce]/20 text-[#0f766e] rounded-lg border border-[#60f2ce]/50">
                                            {studyItem?.type?.replace('_', ' ') || 'Kartu Belajar'}
                                        </span>
                                        {studyItem?.level && (
                                            <span className="text-[11px] font-bold uppercase px-2 py-1 bg-slate-100 text-slate-500 rounded-lg border border-slate-200">
                                                {studyItem.level}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-400">Ketuk untuk cek</span>
                                </div>

                                <div className="my-auto text-center py-6">
                                    <h2 className="font-black text-3xl sm:text-5xl tracking-tight text-slate-900 break-words">
                                        {!isReversed ? studyItem?.content : studyItem?.translation}
                                    </h2>
                                </div>

                                <div>
                                    <button 
                                        onClick={() => setShowAnswer(true)}
                                        className="w-full py-3.5 text-sm font-bold text-slate-900 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] hover:opacity-95 rounded-2xl shadow-md shadow-[#fcbf49]/20 transition flex items-center justify-center gap-2"
                                    >
                                        <span>Lihat Jawaban</span>
                                        <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Back Card */}
                            <div className={`absolute inset-0 w-full h-full bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform ${!showAnswer ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[11px] font-bold uppercase px-2.5 py-1 bg-[#ff822d]/15 text-[#ea580c] rounded-lg border border-[#ff822d]/30">
                                            Arti / Terjemahan
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium truncate max-w-[150px] sm:max-w-none">
                                            {!isReversed ? studyItem?.content : studyItem?.translation}
                                        </span>
                                    </div>
                                    <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 mb-4 break-words">
                                        {!isReversed ? studyItem?.translation : studyItem?.content}
                                    </h3>

                                    {/* Example Sentence Container */}
                                    <div className="bg-[#fafcfb] p-4 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-bold block mb-1 text-slate-400 uppercase tracking-wider">Contoh Kalimat</span>
                                        <p className="italic text-slate-700 text-xs leading-relaxed">
                                            "{studyItem?.example_sentence || 'Belum ada contoh kalimat.'}"
                                        </p>
                                        {studyItem?.example_translation && (
                                            <p className="text-slate-500 text-[11px] mt-2 border-t border-slate-100 pt-2">
                                                <span className="font-semibold text-slate-400">Arti:</span> {studyItem.example_translation}
                                            </p>
                                        )}
                                    </div>

                                    {studyItem?.notes && (
                                        <p className="text-slate-400 text-xs mt-3 px-1">{studyItem.notes}</p>
                                    )}
                                </div>

                                {/* Review Buttons */}
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="mb-3 font-semibold text-slate-500 text-xs text-center">Seberapa mudah materi ini untukmu?</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        <button 
                                            disabled={isSaving} 
                                            onClick={() => handleRate(1)} 
                                            className="py-2.5 rounded-xl font-bold text-xs bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white transition shadow-xs"
                                        >
                                            Lupa
                                        </button>
                                        <button 
                                            disabled={isSaving} 
                                            onClick={() => handleRate(3)} 
                                            className="py-2.5 rounded-xl font-bold text-xs bg-[#ff822d]/10 text-[#ea580c] border border-[#ff822d]/20 hover:bg-[#ff822d] hover:text-white transition shadow-xs"
                                        >
                                            Sulit
                                        </button>
                                        <button 
                                            disabled={isSaving} 
                                            onClick={() => handleRate(4)} 
                                            className="py-2.5 rounded-xl font-bold text-xs bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/40 hover:bg-[#fcbf49] hover:text-slate-900 transition shadow-xs"
                                        >
                                            Bagus
                                        </button>
                                        <button 
                                            disabled={isSaving} 
                                            onClick={() => handleRate(5)} 
                                            className="py-2.5 rounded-xl font-bold text-xs bg-[#60f2ce]/20 text-[#0f766e] border border-[#60f2ce]/50 hover:bg-[#60f2ce] hover:text-slate-900 transition shadow-xs"
                                        >
                                            Mudah
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