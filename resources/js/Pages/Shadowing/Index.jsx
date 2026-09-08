import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ShadowingIndex({ auth, topics }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Latihan Shadowing" />

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Latihan Shadowing 🗣️</h2>
                    <p className="text-slate-500 dark:text-slate-400">Tirukan intonasi native speaker untuk melatih kelancaran berbicara.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.length > 0 ? (
                        topics.map((topic) => {
                            const levelBadgeClass = 
                                topic.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' : 
                                topic.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20' : 
                                'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20';

                            return (
                                <div key={topic.id} className="glass dark:glass-dark rounded-3xl p-6 flex flex-col h-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${levelBadgeClass}`}>
                                            {topic.level}
                                        </span>
                                        <span className="text-slate-400 text-xs font-semibold flex items-center">
                                            <i className="bi bi-chat-text mr-1.5"></i> {topic.lines_count} Dialog
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2 leading-tight">
                                        {topic.title}
                                    </h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm flex-grow mb-6 leading-relaxed">
                                        {topic.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link 
                                            href={`/shadowing/${topic.slug}`}
                                            className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-sm transition-colors"
                                        >
                                            Mulai Latihan &rarr;
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full glass dark:glass-dark rounded-3xl text-center py-20 px-8 flex flex-col items-center shadow-sm border border-slate-200 dark:border-slate-800">
                            <i className="bi bi-mic-mute text-7xl text-slate-300 dark:text-slate-700 mb-6 opacity-50 block"></i>
                            <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">Belum ada materi shadowing</h4>
                            <p className="text-slate-500">Materi sedang disiapkan oleh tim pengajar.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

