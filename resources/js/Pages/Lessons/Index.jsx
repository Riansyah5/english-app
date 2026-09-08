import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function LessonIndex({ auth, categories, completedLessonIds }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buku Materi Digital" />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Buku Materi Digital 📖</h2>
                    <p className="text-slate-500 dark:text-slate-400">Pahami konsep fundamental bahasa Inggris langkah demi langkah.</p>
                </div>

                {categories.length > 0 ? (
                    categories.map((category) => {
                        const totalLessons = category.lessons.length;
                        const completedCount = category.lessons.filter(l => completedLessonIds.includes(l.id)).length;
                        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

                        return (
                            <div key={category.id} className="glass dark:glass-dark mb-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
                                <div className="p-6 md:p-8">
                                    
                                    <div className="flex flex-col md:flex-row md:items-center items-start mb-6 gap-4">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shrink-0">
                                            <i className={`bi ${category.icon || 'bi-book'} text-2xl text-blue-500`}></i>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{category.name}</h4>
                                            <p className="text-slate-500 text-sm m-0">{category.description}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 mb-6">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Progres Belajar</span>
                                            <span className="font-semibold text-emerald-500 text-sm">
                                                {completedCount} dari {totalLessons} Bab Selesai ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {category.lessons.length > 0 ? (
                                            category.lessons.map(lesson => {
                                                const isDone = completedLessonIds.includes(lesson.id);
                                                
                                                return (
                                                    <Link 
                                                        key={lesson.id}
                                                        href={`/lessons/${lesson.slug}`}
                                                        className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-200 group hover:pl-5
                                                            ${isDone 
                                                                ? 'bg-transparent border-slate-200 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800/30' 
                                                                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <span className={`px-2.5 py-1 text-xs font-mono rounded-lg shrink-0 ${
                                                                isDone 
                                                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                                                                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                                            }`}>
                                                                BAB {lesson.order_number}
                                                            </span>
                                                            <span className={`font-semibold text-sm truncate ${
                                                                isDone 
                                                                ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600' 
                                                                : 'text-slate-800 dark:text-slate-200'
                                                            }`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="shrink-0 ml-3">
                                                            {isDone ? (
                                                                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 group-hover:scale-110 transition-transform">
                                                                    <i className="bi bi-check-lg text-sm"></i>
                                                                </div>
                                                            ) : (
                                                                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:text-blue-500 transition-all">
                                                                    <i className="bi bi-chevron-right text-xs"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/30">
                                                <i className="bi bi-hourglass-split text-slate-400 text-3xl mb-2 block opacity-50"></i>
                                                <span className="text-slate-500 text-sm">Materi sedang dipersiapkan.</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="glass dark:glass-dark rounded-3xl text-center py-20 px-8 flex flex-col items-center justify-center min-h-[350px] shadow-sm border border-slate-200 dark:border-slate-800">
                        <i className="bi bi-journal-x text-7xl text-slate-300 dark:text-slate-700 mb-6 opacity-50"></i>
                        <h5 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">Buku Digital Kosong</h5>
                        <p className="text-slate-500 dark:text-slate-400">Belum ada kategori materi yang tersedia saat ini.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

