import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonCategoryIndex({ auth, categories }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus kategori ini beserta semua materi di dalamnya secara permanen?')) {
            router.delete(`/admin/lesson-categories/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Kategori Materi" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Kelola Kategori Buku 📚</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Manajemen kategori untuk buku dan materi digital.</p>
                    </div>
                    <Link 
                        href="/admin/lesson-categories/create" 
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
                    >
                        <i className="bi bi-plus-circle-fill mr-2"></i> Tambah Kategori Baru
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
                                    <th className="px-6 py-4 font-semibold w-1/4">Kategori</th>
                                    <th className="px-6 py-4 font-semibold w-1/2">Deskripsi</th>
                                    <th className="px-6 py-4 font-semibold text-center w-1/12">Jml Materi</th>
                                    <th className="px-6 py-4 font-semibold text-right w-1/6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {categories.data.length > 0 ? categories.data.map((category) => (
                                    <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                                                    <i className={`bi ${category.icon || 'bi-book-half'} text-lg`}></i>
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white">{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
                                            {category.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                {category.lessons_count} Materi
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/lesson-categories/${category.id}/edit`}
                                                    className="w-8 h-8 inline-flex items-center justify-center rounded text-cyan-600 border border-slate-200 dark:border-slate-700 hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors"
                                                    title="Edit Kategori"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(category.id)}
                                                    className="w-8 h-8 inline-flex items-center justify-center rounded text-rose-500 border border-slate-200 dark:border-slate-700 hover:bg-rose-500 hover:text-white hover:border-transparent transition-colors"
                                                    title="Hapus Kategori"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50 dark:bg-slate-900/20">
                                            <i className="bi bi-journal-album text-5xl text-slate-300 dark:text-slate-700 block mb-3"></i>
                                            <span className="text-slate-500 text-sm font-medium">Belum ada kategori materi.</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {categories.links && categories.links.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-1">
                        {categories.links.map((link, i) => (
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

