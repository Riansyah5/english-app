import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function VideoIndex({ auth, videos }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Hapus video ini secara permanen?')) {
            router.delete(`/admin/videos/${id}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Video Learning" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Kelola Video Learning 🎬</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Manajemen video YouTube dan transkrip terjemahan.</p>
                    </div>
                    <Link 
                        href="/admin/videos/create" 
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
                    >
                        <i className="bi bi-plus-circle-fill mr-2"></i> Tambah Video Baru
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
                                    <th className="px-6 py-4 font-semibold w-2/5">Informasi Video</th>
                                    <th className="px-6 py-4 font-semibold w-1/5">Folder</th>
                                    <th className="px-6 py-4 font-semibold w-1/5">Tingkat Kesulitan</th>
                                    <th className="px-6 py-4 font-semibold text-right w-1/5">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {videos.data.length > 0 ? videos.data.map((video) => (
                                    <tr key={video.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="shrink-0 w-24 h-14 rounded-lg overflow-hidden relative shadow-sm border border-slate-200 dark:border-slate-700">
                                                    <img src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} alt="Thumbnail" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                        <i className="bi bi-play-circle-fill text-white opacity-80 text-xl"></i>
                                                    </div>
                                                </div>
                                                <div className="truncate max-w-[200px] md:max-w-xs">
                                                    <h6 className="font-bold text-slate-900 dark:text-white m-0 text-sm truncate">{video.title}</h6>
                                                    <a href={`https://youtube.com/watch?v=${video.youtube_id}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                                                        <i className="bi bi-youtube text-rose-500 mr-1"></i> {video.youtube_id}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                                                <i className={`bi ${video.folder?.icon || 'bi-folder'} text-slate-400`}></i> 
                                                {video.folder?.name || 'Folder Dihapus'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded ${
                                                video.difficulty === 'beginner' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' :
                                                video.difficulty === 'intermediate' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30' :
                                                'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                                            }`}>
                                                {video.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/videos/${video.id}/edit`}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-cyan-600 border border-slate-200 dark:border-slate-700 hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors"
                                                    title="Edit Video"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(video.id)}
                                                    className="w-8 h-8 rounded flex items-center justify-center text-rose-500 border border-slate-200 dark:border-slate-700 hover:bg-rose-500 hover:text-white hover:border-transparent transition-colors"
                                                    title="Hapus Video"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50 dark:bg-slate-900/20">
                                            <i className="bi bi-film text-5xl text-slate-300 dark:text-slate-700 block mb-3"></i>
                                            <span className="text-slate-500 text-sm font-medium">Belum ada video di dalam database saat ini.</span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {videos.links && videos.links.length > 3 && (
                    <div className="flex justify-center md:justify-end gap-1">
                        {videos.links.map((link, i) => (
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

