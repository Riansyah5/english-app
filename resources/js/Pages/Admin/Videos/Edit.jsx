import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function VideoEdit({ auth, video, folders = [], formattedTranscripts }) {
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
            <Head title={`Edit Video - ${video.title}`} />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-4xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/videos" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#ff822d] dark:hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Daftar Video"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        Edit Video ✏️
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/50 dark:border-[#fcbf49]/30">
                                        Video ID #{video.id}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                    Perbarui detail video, folder kategori, tingkat kesulitan, atau sinkronisasi transkrip.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Link 
                                href={`/video-learning/${video.id}`}
                                target="_blank" 
                                className="px-4 py-2 text-xs font-semibold text-[#0d9488] dark:text-[#60f2ce] bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 rounded-full shadow-xs hover:bg-[#60f2ce]/30 transition flex items-center gap-1.5"
                            >
                                <i className="bi bi-eye"></i>
                                <span>Pratinjau Materi</span>
                            </Link>
                            <Link 
                                href="/admin/videos" 
                                className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input Rows: Title & YouTube ID */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-7">
                                    <label htmlFor="title" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Judul Video <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Judul Materi Video"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.title 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                        required
                                        autoFocus
                                    />
                                    {errors.title && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-5">
                                    <label htmlFor="youtube_id" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        YouTube Video ID <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="youtube_id" 
                                        value={data.youtube_id} 
                                        onChange={e => setData('youtube_id', e.target.value.trim())}
                                        placeholder="Contoh: dQw4w9WgXcQ"
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.youtube_id 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                        required
                                    />
                                    {errors.youtube_id && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.youtube_id}</p>}
                                </div>
                            </div>

                            {/* Live Video Preview Banner */}
                            {data.youtube_id && (
                                <div className="p-4 rounded-2xl bg-[#fafcfb] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xs animate-in fade-in duration-200">
                                    <div className="w-28 h-16 rounded-xl overflow-hidden relative shrink-0 shadow-xs bg-slate-950 border border-slate-200 dark:border-slate-700">
                                        <img 
                                            src={`https://img.youtube.com/vi/${data.youtube_id}/mqdefault.jpg`} 
                                            alt="Preview Thumbnail" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div className="text-xs">
                                        <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Pratinjau Thumbnail YouTube:</span>
                                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                                            ID Aktif: <code className="font-mono text-[#ff822d] bg-[#ff822d]/10 dark:bg-[#ff822d]/15 px-1.5 py-0.5 rounded font-bold">{data.youtube_id}</code>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Select Rows: Folder & Difficulty */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="video_folder_id" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Folder Kategori <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select 
                                        id="video_folder_id" 
                                        value={data.video_folder_id} 
                                        onChange={e => setData('video_folder_id', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.video_folder_id 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-800 dark:text-slate-100 shadow-2xs`}
                                        required
                                    >
                                        {folders.length > 0 ? (
                                            folders.map(f => (
                                                <option key={f.id} value={f.id} className="dark:bg-slate-800">{f.name}</option>
                                            ))
                                        ) : (
                                            <option value="" className="dark:bg-slate-800">Belum ada folder kategori</option>
                                        )}
                                    </select>
                                    {errors.video_folder_id && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.video_folder_id}</p>}
                                </div>

                                <div>
                                    <label htmlFor="difficulty" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Tingkat Kesulitan <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select 
                                        id="difficulty" 
                                        value={data.difficulty} 
                                        onChange={e => setData('difficulty', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.difficulty 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-800 dark:text-slate-100 shadow-2xs`}
                                        required
                                    >
                                        <option value="beginner" className="dark:bg-slate-800">Beginner (Pemula)</option>
                                        <option value="intermediate" className="dark:bg-slate-800">Intermediate (Menengah)</option>
                                        <option value="advanced" className="dark:bg-slate-800">Advanced (Lanjutan)</option>
                                    </select>
                                    {errors.difficulty && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.difficulty}</p>}
                                </div>
                            </div>

                            {/* Transcripts Input Section */}
                            <div>
                                <label htmlFor="transcripts" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Data Transkrip & Terjemahan <span className="text-[#ff822d]">*</span>
                                </label>

                                {/* Guide Box */}
                                <div className="p-4 bg-[#fafcfb] dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-3 space-y-2 text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
                                        <i className="bi bi-info-circle-fill text-[#ff822d]"></i>
                                        <span>Format Wajib per Baris:</span>
                                    </div>
                                    <code className="block bg-white dark:bg-slate-900 p-2.5 rounded-xl text-xs text-[#0d9488] dark:text-[#60f2ce] font-mono border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                                        mulai | selesai | teks inggris | terjemahan indonesia
                                    </code>
                                </div>

                                <textarea 
                                    id="transcripts" 
                                    value={data.transcripts} 
                                    onChange={e => setData('transcripts', e.target.value)}
                                    rows="14"
                                    placeholder="0.5 | 3.2 | Hello everyone | Halo semuanya..."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono font-medium bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.transcripts 
                                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                            : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                    required
                                />
                                {errors.transcripts && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.transcripts}</p>}
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <Link 
                                    href="/admin/videos" 
                                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl transition shadow-2xs border border-transparent dark:border-slate-700"
                                >
                                    Batal
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className={`inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all ${
                                        processing ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent"></span>
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check2-circle text-xs"></i>
                                            <span>Simpan Perubahan</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}