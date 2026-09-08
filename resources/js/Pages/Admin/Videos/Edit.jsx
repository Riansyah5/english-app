import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function VideoEdit({ auth, video, folders, formattedTranscripts }) {
    const { data, setData, put, processing, errors } = useForm({
        title: video.title || '',
        youtube_id: video.youtube_id || '',
        video_folder_id: video.video_folder_id || '',
        difficulty: video.difficulty || 'beginner',
        transcripts: formattedTranscripts || ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/videos/${video.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Video" />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <div className="flex items-center mb-8">
                    <Link 
                        href="/admin/videos" 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-4"
                    >
                        <i className="bi bi-arrow-left text-lg"></i>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Edit Video ✏️</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Perbarui informasi video atau edit baris transkripnya.</p>
                    </div>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Judul Video <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                    autoFocus
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1.5">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="youtube_id" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    YouTube Video ID <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="youtube_id" 
                                    value={data.youtube_id} 
                                    onChange={e => setData('youtube_id', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.youtube_id ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white font-mono`}
                                    required
                                />
                                {errors.youtube_id && <p className="text-rose-500 text-xs mt-1.5">{errors.youtube_id}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="video_folder_id" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Folder Kategori <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    id="video_folder_id" 
                                    value={data.video_folder_id} 
                                    onChange={e => setData('video_folder_id', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.video_folder_id ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                >
                                    {folders.map(f => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
                                    ))}
                                </select>
                                {errors.video_folder_id && <p className="text-rose-500 text-xs mt-1.5">{errors.video_folder_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="difficulty" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Tingkat Kesulitan <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    id="difficulty" 
                                    value={data.difficulty} 
                                    onChange={e => setData('difficulty', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.difficulty ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                {errors.difficulty && <p className="text-rose-500 text-xs mt-1.5">{errors.difficulty}</p>}
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700/50 my-2"></div>

                        <div>
                            <label htmlFor="transcripts" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Data Transkrip Video <span className="text-rose-500">*</span>
                            </label>
                            
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4">
                                <h6 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Format Input Wajib per baris:</h6>
                                <code className="block bg-slate-200 dark:bg-slate-800 p-2 rounded text-xs text-rose-500 mb-2 font-mono">
                                    mulai | selesai | teks inggris | terjemahan indonesia
                                </code>
                            </div>

                            <textarea 
                                id="transcripts" 
                                value={data.transcripts} 
                                onChange={e => setData('transcripts', e.target.value)}
                                rows="15"
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.transcripts ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white font-mono text-sm leading-relaxed`}
                                required
                            ></textarea>
                            {errors.transcripts && <p className="text-rose-500 text-xs mt-1.5">{errors.transcripts}</p>}
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <Link 
                                href="/admin/videos" 
                                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <i className="bi bi-cloud-arrow-up mr-2"></i> {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

