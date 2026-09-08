import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingIndex({ auth, topics }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus topik ini secara permanen? Semua baris dialog di dalamnya juga akan terhapus.')) {
            router.delete(`/admin/shadowing/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Shadowing" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Kelola Shadowing 🗣️</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Manajemen topik percakapan untuk latihan shadowing.</p>
                    </div>
                    <Link 
                        href="/admin/shadowing/create" 
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
                    >
                        <i className="bi bi-plus-circle-fill mr-2"></i> Tambah Topik Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
                        <i className="bi bi-check-circle-fill mr-2 text-lg"></i>
                        {flash.success}
                    </div>
                )}

                <div className="glass dark:glass-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 font-semibold w-2/5">Topik Percakapan</th>
                                    <th className="px-6 py-4 font-semibold w-1/5">Level</th>
                                    <th className="px-6 py-4 font-semibold text-center w-1/5">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right w-1/5">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {topics.data.length > 0 ? topics.data.map((topic) => (
                                    <tr key={topic.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-500 flex items-center justify-center border border-violet-100 dark:border-violet-500/20 shrink-0">
                                                    <i className="bi bi-mic-fill text-lg"></i>
                                                </div>
                                                <div className="truncate max-w-xs">
                                                    <span className="font-bold text-slate-900 dark:text-white truncate block">{topic.title}</span>
                                                    <span className="text-xs text-slate-500 block truncate">{topic.lines_count} baris dialog</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded ${
                                                topic.level === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' :
                                                topic.level === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30' :
                                                'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                                            }`}>
                                                {topic.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {topic.is_published ? (
                                                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                                                    Terbit
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                    Draf
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/shadowing/${topic.id}`}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-violet-600 border border-slate-200 dark:border-slate-700 hover:bg-violet-600 hover:text-white hover:border-transparent transition-colors"
                                                    title="Builder Dialog"
                                                >
                                                    <i className="bi bi-chat-dots-fill"></i>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(topic.id)}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-rose-500 border border-slate-200 dark:border-slate-700 hover:bg-rose-500 hover:text-white hover:border-transparent transition-colors"
                                                    title="Hapus Topik"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50 dark:bg-slate-900/20">
                                            <i className="bi bi-mic-mute text-5xl text-slate-300 dark:text-slate-700 block mb-3"></i>
                                            <span className="text-slate-500 text-sm font-medium">Belum ada topik shadowing.</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {topics.links && topics.links.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-1">
                        {topics.links.map((link, i) => (
                            <Link 
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors border ${
                                    link.active 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : !link.url 
                                        ? 'text-slate-400 border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed' 
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

