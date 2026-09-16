import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function VideoIndex({ auth, folders = [] }) {
    // Total video dari semua folder untuk metrik ringkas
    const totalVideos = folders.reduce((acc, folder) => acc + (folder.videos?.length || 0), 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Video Library" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

                    {/* Top Bar Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Video Library 🎬
                                </h1>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    Native Speaker Context
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
                                Belajar kosakata, intonasi, dan listening langsung dari konteks video nyata.
                            </p>
                        </div>

                        {/* Quick Stats & Navigation Pills */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse"></span>
                                Total: <span className="font-bold text-slate-900 dark:text-white">{totalVideos} Video</span>
                            </div>
                            <Link 
                                href="/home" 
                                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition whitespace-nowrap active:scale-95"
                            >
                                Ke Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Folder Sections */}
                    {folders.length > 0 ? (
                        folders.map((folder) => (
                            <div key={folder.id} className="space-y-4">

                                {/* Folder Header Card */}
                                <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900/90 p-3.5 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
                                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-slate-950 flex items-center justify-center text-lg sm:text-xl shadow-xs shadow-[#ff822d]/20 shrink-0">
                                            <i className={folder.icon || 'bi bi-folder-fill'}></i>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight truncate">
                                                {folder.name}
                                            </h3>
                                            <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5 truncate">
                                                Kategori Materi Video
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 whitespace-nowrap">
                                        {folder.videos?.length || 0} Video
                                    </span>
                                </div>

                                {/* Video Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                    {folder.videos && folder.videos.length > 0 ? (
                                        folder.videos.map((video) => (
                                            <div 
                                                key={video.id} 
                                                className="group bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                            >
                                                {/* Thumbnail Image Container */}
                                                <div className="relative overflow-hidden bg-slate-950 h-44 sm:h-48">
                                                    <img 
                                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95" 
                                                        alt={video.title} 
                                                        loading="lazy"
                                                    />

                                                    {/* Soft Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                                    {/* Hover Play Button */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                        <div className="w-12 h-12 p-3 bg-gradient-to-tr from-[#60f2ce] to-[#fefc7c] rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                            <svg className="w-5 h-5 text-slate-950 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Difficulty Level Tag */}
                                                    {video.difficulty && (
                                                        <div className="absolute bottom-3 right-3 z-10">
                                                            <span className="text-[10px] sm:text-[11px] font-bold uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#fefc7c]/90 dark:bg-amber-400/20 backdrop-blur-md text-slate-900 dark:text-amber-300 rounded-lg border border-[#fefc7c] dark:border-amber-400/30 shadow-xs">
                                                                {video.difficulty}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content Details */}
                                                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                                                    <div className="mb-4">
                                                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ff822d] block mb-1">
                                                            {folder.name}
                                                        </span>
                                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-[#ff822d] transition-colors">
                                                            {video.title}
                                                        </h4>
                                                    </div>

                                                    <Link 
                                                        href={`/video-learning/${video.id}`} 
                                                        className="w-full text-center px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
                                                    >
                                                        <span>Tonton & Belajar</span>
                                                        <svg className="w-3.5 h-3.5 text-[#60f2ce]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full">
                                            <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/40">
                                                Belum ada materi video di dalam folder ini.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="p-12 text-center text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/60 flex flex-col items-center justify-center min-h-[320px]">
                            <div className="w-16 h-16 rounded-3xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#ff822d] flex items-center justify-center text-3xl mb-3">
                                <i className="bi bi-inbox"></i>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Perpustakaan Masih Kosong</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">
                                Belum ada folder atau video yang dipublikasikan saat ini. Silakan kembali lagi nanti!
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}