import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function LessonIndex({ auth, categories = [], completedLessonIds = [] }) {
    // Total materi di seluruh kategori
    const totalAllLessons = categories.reduce((acc, cat) => acc + (cat.lessons?.length || 0), 0);
    const totalAllCompleted = categories.reduce((acc, cat) => {
        return acc + (cat.lessons?.filter(l => completedLessonIds.includes(l.id)).length || 0);
    }, 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buku Materi Digital" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                                    Buku Materi Digital 📖
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                    Structured Lessons
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Pahami konsep tata bahasa, frasa penting, dan kosakata langkah demi langkah secara terstruktur.
                            </p>
                        </div>

                        {/* Quick Stats Pill */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff822d] animate-pulse shrink-0"></span>
                                <span>Progres:</span>
                                <strong className="text-slate-900 dark:text-white">{totalAllCompleted}</strong> / {totalAllLessons} Bab
                            </div>
                            <Link 
                                href="/home" 
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 active:scale-95 transition whitespace-nowrap"
                            >
                                Ke Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Categories and Lessons Accordion/Cards */}
                    {categories.length > 0 ? (
                        categories.map((category) => {
                            const lessons = category.lessons || [];
                            const totalLessons = lessons.length;
                            const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length;
                            const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
                            const isAllCompleted = totalLessons > 0 && completedCount === totalLessons;

                            return (
                                <div 
                                    key={category.id} 
                                    className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-5 sm:p-6 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none space-y-5 sm:space-y-6 transition-colors"
                                >
                                    {/* Category Header Row */}
                                    <div className="flex items-center justify-between gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-lg sm:text-xl shadow-xs shadow-[#ff822d]/25 shrink-0">
                                                <i className={`bi ${category.icon || 'bi-book'}`}></i>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    <h2 className="font-extrabold text-base sm:text-xl text-slate-900 dark:text-white leading-tight truncate">
                                                        {category.name}
                                                    </h2>
                                                    {isAllCompleted && (
                                                        <span className="shrink-0 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/40 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                                            Tuntas 🎉
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5 truncate">
                                                    {category.description || 'Kategori materi pembelajaran digital.'}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                            {totalLessons} Bab
                                        </span>
                                    </div>

                                    {/* Progress Gauge Bar */}
                                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fafcfb] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider shrink-0">
                                                Progres
                                            </span>
                                            <span className="text-[11px] sm:text-xs font-extrabold text-[#0d9488] dark:text-[#60f2ce] whitespace-nowrap">
                                                {completedCount}/{totalLessons} Selesai ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-[#60f2ce] via-[#fcbf49] to-[#ff822d] rounded-full transition-all duration-700 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Lesson Items List */}
                                    <div className="space-y-2 sm:space-y-2.5">
                                        {lessons.length > 0 ? (
                                            lessons.map(lesson => {
                                                const isDone = completedLessonIds.includes(lesson.id);

                                                return (
                                                    <Link 
                                                        key={lesson.id}
                                                        href={`/lessons/${lesson.slug}`}
                                                        className={`flex justify-between items-center p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 group ${
                                                            isDone 
                                                                ? 'bg-[#fafcfb] dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 hover:border-[#60f2ce]/60 hover:bg-[#60f2ce]/5 dark:hover:bg-[#60f2ce]/10' 
                                                                : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-[#ff822d] dark:hover:border-[#ff822d] hover:bg-slate-50/80 dark:hover:bg-slate-700/60 shadow-2xs'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 sm:gap-3.5 truncate pr-2">
                                                            {/* Chapter Badge */}
                                                            <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold rounded-xl shrink-0 border ${
                                                                isDone 
                                                                    ? 'bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border-[#60f2ce]/50 dark:border-[#60f2ce]/30' 
                                                                    : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                                                            }`}>
                                                                BAB {lesson.order_number}
                                                            </span>

                                                            {/* Title */}
                                                            <span className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                                                                isDone 
                                                                    ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600' 
                                                                    : 'text-slate-800 dark:text-slate-100 group-hover:text-[#ff822d] dark:group-hover:text-[#ff822d]'
                                                            }`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>

                                                        {/* Status Check / Arrow Icon */}
                                                        <div className="shrink-0">
                                                            {isDone ? (
                                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 group-hover:scale-105 transition-transform shadow-2xs">
                                                                    <i className="bi bi-check2 text-sm sm:text-base font-bold"></i>
                                                                </div>
                                                            ) : (
                                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-400 border border-slate-200/80 dark:border-slate-600 group-hover:bg-[#ff822d] group-hover:text-white group-hover:border-[#ff822d] group-hover:scale-105 transition-all shadow-2xs">
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-[#fafcfb] dark:bg-slate-850">
                                                <i className="bi bi-hourglass-split text-slate-300 dark:text-slate-600 text-2xl mb-1 block"></i>
                                                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Materi untuk kategori ini sedang disiapkan.</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })
                    ) : (
                        /* Empty State */
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 text-center py-16 px-8 flex flex-col items-center justify-center min-h-[340px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                            <div className="w-16 h-16 rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-3xl mb-4">
                                <i className="bi bi-journal-x"></i>
                            </div>
                            <h2 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1">Buku Digital Masih Kosong</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm leading-relaxed">
                                Belum ada modul atau kategori materi yang dipublikasikan saat ini. Silakan kembali lagi nanti!
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}