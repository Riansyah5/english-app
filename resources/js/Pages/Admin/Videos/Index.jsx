import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function VideoIndex({ auth, videos = { data: [], links: [] } }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus video ini beserta seluruh data transkripnya secara permanen?')) {
            router.delete(`/admin/videos/${id}`);
        }
    };

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner':
                return 'bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border-[#60f2ce]/50 dark:border-[#60f2ce]/30';
            case 'intermediate':
                return 'bg-[#fefc7c]/80 dark:bg-amber-400/20 text-[#854d0e] dark:text-amber-300 border-[#fcbf49]/50 dark:border-amber-400/30';
            case 'advanced':
                return 'bg-[#ff822d]/15 dark:bg-[#ff822d]/20 text-[#c2410c] dark:text-[#ff822d] border-[#ff822d]/40 dark:border-[#ff822d]/30';
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Video Learning" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Kelola Video Learning 🎬
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    Admin Panel
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Manajemen video YouTube, folder materi, dan sinkronisasi transkrip interaktif.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link 
                                href="/home" 
                                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                            >
                                Dashboard
                            </Link>

                            <Link 
                                href="/admin/videos/create" 
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition"
                            >
                                <i className="bi bi-plus-circle-fill text-sm"></i>
                                <span>Tambah Video Baru</span>
                            </Link>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-4 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 text-[#0d9488] dark:text-[#60f2ce] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Table Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="bg-[#fafcfb] dark:bg-slate-800/60 text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-6 py-4 w-2/5">Informasi Video</th>
                                        <th className="px-6 py-4 w-1/5">Folder Kategori</th>
                                        <th className="px-6 py-4 w-1/5">Tingkat Kesulitan</th>
                                        <th className="px-6 py-4 text-right w-1/5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {videos.data && videos.data.length > 0 ? (
                                        videos.data.map((video) => (
                                            <tr key={video.id} className="hover:bg-[#fafcfb] dark:hover:bg-slate-850 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3.5">
                                                        {/* Thumbnail Preview with YouTube Play Indicator */}
                                                        <div className="shrink-0 w-24 h-14 rounded-2xl overflow-hidden relative shadow-2xs border border-slate-100 dark:border-slate-800 bg-slate-950">
                                                            <img 
                                                                src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                                                                alt={video.title} 
                                                                className="w-full h-full object-cover" 
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                                                <div className="w-6 h-6 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center shadow-xs">
                                                                    <svg className="w-3 h-3 text-slate-900 dark:text-[#60f2ce] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z"/>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="truncate max-w-[220px] md:max-w-xs">
                                                            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white truncate leading-snug">
                                                                {video.title}
                                                            </h2>
                                                            <a 
                                                                href={`https://youtube.com/watch?v=${video.youtube_id}`} 
                                                                target="_blank" 
                                                                rel="noreferrer" 
                                                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 hover:text-[#ff822d] dark:hover:text-[#ff822d] transition-colors mt-0.5"
                                                            >
                                                                <i className="bi bi-youtube text-rose-500"></i> 
                                                                <span>{video.youtube_id}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs">
                                                        <i className={`bi ${video.folder?.icon || 'bi-folder'} text-[#ff822d]`}></i> 
                                                        <span>{video.folder?.name || 'Tanpa Kategori'}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-lg border ${getDifficultyBadge(video.difficulty)}`}>
                                                        {video.difficulty || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link 
                                                            href={`/video-learning/${video.id}`}
                                                            target="_blank" 
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs"
                                                            title="Pratinjau Video"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>
                                                        <Link 
                                                            href={`/admin/videos/${video.id}/edit`}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] hover:bg-[#60f2ce]/20 hover:border-[#60f2ce] transition-all shadow-2xs"
                                                            title="Edit Video"
                                                        >
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(video.id)}
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/30 transition-all shadow-2xs"
                                                            title="Hapus Video"
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
                                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                                    <i className="bi bi-camera-video-off"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Belum Ada Video Learning</h3>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">Silakan tambahkan video YouTube baru untuk mulai menyediakan materi belajar.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    {videos.links && videos.links.length > 3 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                Menampilkan video pada halaman saat ini
                            </span>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {videos.links.map((link, i) => (
                                    <Link 
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                                            link.active 
                                                ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 border-slate-900 dark:border-[#60f2ce] shadow-xs' 
                                                : !link.url 
                                                    ? 'text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 cursor-not-allowed pointer-events-none' 
                                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
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