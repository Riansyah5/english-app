import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function VideoIndex({ auth, folders }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Video Library" />

            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Video Library 🎬</h2>
                    <p className="text-slate-500 dark:text-slate-400">Belajar bahasa Inggris langsung dari konteks nyata (Native Speakers).</p>
                </div>

                {folders.length > 0 ? (
                    folders.map((folder) => (
                        <div key={folder.id} className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                                    <i className={`${folder.icon || 'bi bi-folder-fill'} text-2xl text-blue-500`}></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{folder.name}</h4>
                                    <small className="text-slate-500 font-semibold uppercase tracking-widest text-xs">
                                        <i className="bi bi-film mr-1"></i> {folder.videos.length} Video tersedia
                                    </small>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {folder.videos.length > 0 ? (
                                    folder.videos.map((video) => (
                                        <div key={video.id} className="group glass dark:glass-dark rounded-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            <div className="relative overflow-hidden bg-slate-900 h-48">
                                                <img 
                                                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                                                    alt="Thumbnail" 
                                                />
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                        <i className="bi bi-play-fill text-slate-900 text-2xl ml-1"></i>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-3 right-3 z-10">
                                                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono uppercase px-2.5 py-1 text-xs rounded shadow-sm">
                                                        {video.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h6 className="font-bold text-slate-900 dark:text-white mb-6 line-clamp-2 leading-relaxed min-h-[3rem]">
                                                    {video.title}
                                                </h6>
                                                <div className="mt-auto">
                                                    <Link 
                                                        href={`/video-learning/${video.id}`} 
                                                        className="block w-full text-center px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 text-slate-900 dark:text-white font-medium rounded-xl transition-colors"
                                                    >
                                                        Tonton & Belajar
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full">
                                        <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                                            <i className="bi bi-camera-video-off text-slate-400 text-3xl mb-3 block opacity-50"></i>
                                            <span className="text-slate-500 text-sm">Belum ada materi video di dalam folder ini.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="glass dark:glass-dark rounded-3xl text-center py-20 px-8 flex flex-col items-center justify-center min-h-[350px] shadow-sm border border-slate-200 dark:border-slate-800">
                        <i className="bi bi-inbox text-7xl text-slate-300 dark:text-slate-700 mb-6 opacity-50"></i>
                        <h5 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">Perpustakaan Kosong</h5>
                        <p className="text-slate-500 dark:text-slate-400">Belum ada folder atau video yang tersedia saat ini.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

