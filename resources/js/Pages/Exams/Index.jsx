import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ExamIndex({ auth, exams }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Modul Evaluasi (CBT)" />

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Modul Evaluasi (CBT) 📝</h2>
                    <p className="text-slate-500 dark:text-slate-400">Uji pemahaman tata bahasa dan kosakata Anda secara berkala.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.length > 0 ? (
                        exams.map((exam) => (
                            <div key={exam.id} className="glass dark:glass-dark rounded-3xl p-6 flex flex-col h-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-5">
                                        <i className="bi bi-file-earmark-text text-2xl text-blue-500"></i>
                                    </div>
                                    <h5 className="font-bold text-xl text-slate-900 dark:text-white leading-snug mb-3">
                                        {exam.title}
                                    </h5>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0 line-clamp-2 leading-relaxed h-[2.5rem]">
                                            {exam.description || 'Tidak ada deskripsi untuk paket ujian ini.'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-auto flex justify-between items-center pt-2">
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                                        <i className="bi bi-stopwatch text-slate-400"></i> {exam.duration_minutes} Menit
                                    </span>
                                    
                                    <Link 
                                        href={`/exams/${exam.id}`}
                                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                                    >
                                        Mulai Ujian
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full glass dark:glass-dark rounded-3xl text-center py-20 px-8 flex flex-col items-center justify-center shadow-sm border border-slate-200 dark:border-slate-800">
                            <i className="bi bi-inbox text-7xl text-slate-300 dark:text-slate-700 mb-6 opacity-50 block"></i>
                            <h5 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">Belum Ada Ujian</h5>
                            <p className="text-slate-500 dark:text-slate-400">Belum ada paket ujian yang dijadwalkan atau tersedia saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

