import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingIndex({ auth, topics = { data: [], links: [] } }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus topik ini secara permanen? Semua baris dialog di dalamnya juga akan terhapus.')) {
            router.delete(`/admin/shadowing/${id}`);
        }
    };

    const getLevelBadge = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-[#60f2ce]/20 text-[#0d9488] border-[#60f2ce]/50';
            case 'intermediate':
                return 'bg-[#fefc7c]/80 text-[#854d0e] border-[#fcbf49]/50';
            case 'advanced':
                return 'bg-[#ff822d]/15 text-[#c2410c] border-[#ff822d]/40';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Shadowing" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                                    Kelola Shadowing 🗣️
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                    Speaking Admin
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                Manajemen topik percakapan dan penyusunan baris dialog interaktif native speaker.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link 
                                href="/dashboard" 
                                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                            >
                                Dashboard
                            </Link>

                            <Link 
                                href="/admin/shadowing/create" 
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                            >
                                <i className="bi bi-plus-circle-fill text-sm"></i>
                                <span>Tambah Topik Baru</span>
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
                                        <th className="px-6 py-4 w-2/5">Topik Percakapan</th>
                                        <th className="px-6 py-4 w-1/5">Tingkat Kesulitan</th>
                                        <th className="px-6 py-4 text-center w-1/5">Status Publikasi</th>
                                        <th className="px-6 py-4 text-right w-1/5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {topics.data && topics.data.length > 0 ? (
                                        topics.data.map((topic) => (
                                            <tr key={topic.id} className="hover:bg-[#fafcfb] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-lg shadow-sm shadow-[#ff822d]/20 shrink-0">
                                                            <i className="bi bi-mic-fill"></i>
                                                        </div>
                                                        <div className="truncate max-w-xs md:max-w-md">
                                                            <span className="font-extrabold text-sm text-slate-900 block leading-tight truncate">
                                                                {topic.title}
                                                            </span>
                                                            <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                                                                {topic.lines_count || 0} Baris Dialog
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-lg border ${getLevelBadge(topic.level)}`}>
                                                        {topic.level || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {topic.is_published ? (
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
                                                        <Link 
                                                            href={`/admin/shadowing/${topic.id}`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-[#0d9488] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] transition-all shadow-2xs"
                                                            title="Builder Dialog"
                                                        >
                                                            <i className="bi bi-chat-dots-fill"></i>
                                                        </Link>
                                                        <Link 
                                                            href={`/admin/shadowing/${topic.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs"
                                                            title="Edit Detail Topik"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(topic.id)}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-2xs"
                                                            title="Hapus Topik"
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
                                                    <i className="bi bi-mic-mute"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 text-base mb-1">Belum Ada Topik Shadowing</h3>
                                                <p className="text-xs text-slate-400">Silakan tambahkan topik baru untuk mulai menyusun dialog speaking.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    {topics.links && topics.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-slate-400">
                                Menampilkan topik shadowing pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {topics.links.map((link, i) => (
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