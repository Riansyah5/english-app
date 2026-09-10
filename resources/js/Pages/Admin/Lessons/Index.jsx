import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonIndex({ auth, lessons = { data: [], links: [] } }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus materi ini secara permanen?')) {
            router.delete(`/admin/lessons/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Konten Buku" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                                    Kelola Konten Buku 📖
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                    Lesson Editor
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                Tulis, sunting bab, dan atur urutan publikasi materi buku digital.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link 
                                href="/home" 
                                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                            >
                                Dashboard
                            </Link>

                            <Link 
                                href="/admin/lessons/create" 
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                            >
                                <i className="bi bi-pen-fill text-sm"></i>
                                <span>Tulis Materi Baru</span>
                            </Link>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-4 bg-[#60f2ce]/20 border border-[#60f2ce]/50 text-[#0d9488] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Table Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="bg-[#fafcfb] text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
                                        <th className="px-6 py-4 w-2/5">Judul Materi & Urutan</th>
                                        <th className="px-6 py-4 w-1/5">Kategori Buku</th>
                                        <th className="px-6 py-4 text-center w-1/12">Status</th>
                                        <th className="px-6 py-4 text-right w-1/5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {lessons.data && lessons.data.length > 0 ? (
                                        lessons.data.map((lesson) => (
                                            <tr key={lesson.id} className="hover:bg-[#fafcfb] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black font-mono text-xs shadow-sm shadow-[#ff822d]/25 shrink-0">
                                                            #{lesson.order_number}
                                                        </div>
                                                        <div className="truncate max-w-xs md:max-w-md">
                                                            <span className="font-extrabold text-sm text-slate-900 block leading-tight truncate">
                                                                {lesson.title}
                                                            </span>
                                                            <span className="text-[11px] font-semibold text-slate-400 block mt-0.5 font-mono truncate">
                                                                /{lesson.slug}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs">
                                                        <i className={`bi ${lesson.category?.icon || 'bi-book'} text-[#ff822d]`}></i> 
                                                        <span>{lesson.category?.name || 'Kategori Terhapus'}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {lesson.is_published ? (
                                                        <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-lg bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                                            Terbit
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-lg bg-[#fefc7c]/80 text-[#854d0e] border border-[#fcbf49]/50">
                                                            Draf
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <a 
                                                            href={`/lessons/${lesson.slug}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs"
                                                            title="Pratinjau Materi"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </a>
                                                        <Link 
                                                            href={`/admin/lessons/${lesson.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-[#0d9488] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] transition-all shadow-2xs"
                                                            title="Edit Materi"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(lesson.id)}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-2xs"
                                                            title="Hapus Materi"
                                                        >
                                                            <i className="bi bi-trash3"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-14 text-center">
                                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#fcbf49]/20 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                                    <i className="bi bi-file-earmark-text"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-base mb-1">Belum Ada Konten Materi</h3>
                                                <p className="text-xs text-slate-400">Silakan tambahkan bab atau materi bacaan baru untuk kategori buku yang ada.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    {lessons.links && lessons.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-slate-400">
                                Menampilkan materi pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {lessons.links.map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                                            link.active 
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                                                : !link.url 
                                                    ? 'text-slate-300 border-slate-100 bg-white cursor-not-allowed pointer-events-none' 
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}