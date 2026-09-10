import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function VideoIndex({ auth, folders = [] }) {
    // Total video dari semua folder untuk metrik ringkas
    const totalVideos = folders.reduce((acc, folder) => acc + (folder.videos?.length || 0), 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Video Library" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                                    Video Library 🎬
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                    Native Speaker Context
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                Belajar kosakata, intonasi, dan listening langsung dari konteks video nyata.
                            </p>
                        </div>

                        {/* Quick Stats Pill */}
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-semibold text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse"></span>
                                Total Tersedia: <span className="font-bold text-slate-900">{totalVideos} Video</span>
                            </div>
                            <Link 
                                href="/home" 
                                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
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
                                <div className="flex items-center justify-between bg-white p-4 md:p-5 rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-xl shadow-sm shadow-[#ff822d]/20 shrink-0">
                                            <i className={folder.icon || 'bi bi-folder-fill'}></i>
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-lg text-slate-900 leading-tight">{folder.name}</h3>
                                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                                                Kategori Materi Video
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                        {folder.videos?.length || 0} Video
                                    </span>
                                </div>

                                {/* Video Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {folder.videos && folder.videos.length > 0 ? (
                                        folder.videos.map((video) => (
                                            <div 
                                                key={video.id} 
                                                className="group bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                            >
                                                {/* Thumbnail Image Container */}
                                                <div className="relative overflow-hidden bg-slate-900 h-48">
                                                    <img 
                                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95" 
                                                        alt={video.title} 
                                                        loading="lazy"
                                                    />
                                                    
                                                    {/* Soft Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                                    
                                                    {/* Hover Play Button */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                        <div className="w-13 h-13 p-3.5 bg-gradient-to-tr from-[#60f2ce] to-[#fefc7c] rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                            <svg className="w-6 h-6 text-slate-900 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Difficulty Level Tag */}
                                                    {video.difficulty && (
                                                        <div className="absolute bottom-3 right-3 z-10">
                                                            <span className="text-[11px] font-bold uppercase px-2.5 py-1 bg-[#fefc7c]/90 backdrop-blur-md text-slate-800 rounded-lg border border-[#fefc7c] shadow-xs">
                                                                {video.difficulty}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content Details */}
                                                <div className="p-5 flex flex-col flex-grow justify-between">
                                                    <div className="mb-4">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff822d] block mb-1">
                                                            {folder.name}
                                                        </span>
                                                        <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#ff822d] transition-colors">
                                                            {video.title}
                                                        </h4>
                                                    </div>

                                                    <Link 
                                                        href={`/video-learning/${video.id}`} 
                                                        className="w-full text-center px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
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
                                            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-white">
                                                Belum ada materi video di dalam folder ini.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-white flex flex-col items-center justify-center min-h-[320px]">
                            <div className="w-16 h-16 rounded-3xl bg-[#fcbf49]/20 text-[#ff822d] flex items-center justify-center text-3xl mb-3">
                                <i className="bi bi-inbox"></i>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">Perpustakaan Masih Kosong</h3>
                            <p className="text-xs text-slate-400 max-w-sm">
                                Belum ada folder atau video yang dipublikasikan saat ini. Silakan kembali lagi nanti!
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}