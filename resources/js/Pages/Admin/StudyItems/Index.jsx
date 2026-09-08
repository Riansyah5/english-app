import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function StudyItemIndex({ auth, items }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus materi ini secara permanen?')) {
            router.delete(`/admin/study-items/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Bank Materi" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Kelola Bank Materi 📚</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Manajemen kosakata, frasa, dan tata bahasa.</p>
                    </div>
                    <Link 
                        href="/admin/study-items/create" 
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
                    >
                        <i className="bi bi-plus-circle-fill mr-2"></i> Tambah Materi Baru
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
                                    <th className="px-6 py-4 font-semibold w-1/3">Teks (Inggris)</th>
                                    <th className="px-6 py-4 font-semibold w-1/6">Tipe</th>
                                    <th className="px-6 py-4 font-semibold w-1/3">Terjemahan (ID)</th>
                                    <th className="px-6 py-4 font-semibold w-1/6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {items.data.length > 0 ? items.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                            {item.content}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                {item.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                                            {item.translation}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/study-items/${item.id}/edit`}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-cyan-600 border border-slate-200 dark:border-slate-700 hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors"
                                                    title="Edit Materi"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-rose-500 border border-slate-200 dark:border-slate-700 hover:bg-rose-500 hover:text-white hover:border-transparent transition-colors"
                                                    title="Hapus Materi"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50 dark:bg-slate-900/20">
                                            <i className="bi bi-inbox text-5xl text-slate-300 dark:text-slate-700 block mb-3"></i>
                                            <span className="text-slate-500 text-sm font-medium">Belum ada materi di dalam database saat ini.</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Simple Pagination */}
                {items.links && items.links.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-1">
                        {items.links.map((link, i) => (
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

