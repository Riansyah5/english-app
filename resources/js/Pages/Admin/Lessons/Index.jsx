import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonIndex({ auth, lessons }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus materi ini secara permanen?')) {
            router.delete(`/admin/lessons/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Konten Buku" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Kelola Konten Buku 📖</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Tulis dan atur urutan materi digital.</p>
                    </div>
                    <Link 
                        href="/admin/lessons/create" 
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
                    >
                        <i className="bi bi-pen-fill mr-2"></i> Tulis Materi Baru
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
                                    <th className="px-6 py-4 font-semibold w-2/5">Judul Materi</th>
                                    <th className="px-6 py-4 font-semibold w-1/5">Kategori</th>
                                    <th className="px-6 py-4 font-semibold text-center w-1/12">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right w-1/5">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {lessons.data.length > 0 ? lessons.data.map((lesson) => (
                                    <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shrink-0 font-bold font-mono text-xs">
                                                    #{lesson.order_number}
                                                </div>
                                                <div className="truncate max-w-xs">
                                                    <span className="font-bold text-slate-900 dark:text-white truncate block">{lesson.title}</span>
                                                    <span className="text-xs text-slate-400 truncate block">{lesson.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                                                <i className={`bi ${lesson.category?.icon || 'bi-book'} text-slate-400`}></i> 
                                                {lesson.category?.name || 'Kategori Terhapus'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {lesson.is_published ? (
                                                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                                                    Terbit
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                                                    Draf
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a 
                                                    href={`/lessons/${lesson.slug}`}
                                                    target="_blank"
                                                    className="w-8 h-8 rounded flex items-center justify-center text-indigo-500 border border-slate-200 dark:border-slate-700 hover:bg-indigo-500 hover:text-white hover:border-transparent transition-colors"
                                                    title="Pratinjau Materi"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </a>
                                                <Link 
                                                    href={`/admin/lessons/${lesson.id}/edit`}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-cyan-600 border border-slate-200 dark:border-slate-700 hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors"
                                                    title="Edit Materi"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(lesson.id)}
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
                                            <i className="bi bi-file-earmark-text text-5xl text-slate-300 dark:text-slate-700 block mb-3"></i>
                                            <span className="text-slate-500 text-sm font-medium">Belum ada konten materi buku.</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {lessons.links && lessons.links.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-1">
                        {lessons.links.map((link, i) => (
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

