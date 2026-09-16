import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function VideoFolderCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        icon: 'bi-folder-fill'
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/video-folders');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Kategori Video" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/video-folders" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#ff822d] dark:hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Kategori Video"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        Tambah Kategori Baru 📁
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                        Folder Baru
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                    Buat folder baru untuk mengelompokkan video pembelajaran native speaker.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/admin/video-folders" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                        >
                            Batal & Kembali
                        </Link>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input Rows: Name & Icon */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-8">
                                    <label htmlFor="name" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Nama Folder Kategori <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Contoh: TED Talks, Daily Vlogs, Business English"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.name 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                        required
                                        autoFocus
                                    />
                                    {errors.name && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.name}</p>}
                                </div>

                                <div className="md:col-span-4">
                                    <label htmlFor="icon" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Ikon (Bootstrap)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {/* Live Icon Preview Pill */}
                                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-lg shadow-sm shadow-[#ff822d]/20 shrink-0">
                                            <i className={`bi ${data.icon || 'bi-folder-fill'}`}></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            id="icon" 
                                            value={data.icon} 
                                            onChange={e => setData('icon', e.target.value)}
                                            placeholder="bi-folder-fill"
                                            className={`w-full px-3.5 py-3 rounded-2xl border text-xs font-semibold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                                errors.icon 
                                                    ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                    : 'border-slate-200 dark:border-slate-700/80'
                                            } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                        />
                                    </div>
                                    {errors.icon && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.icon}</p>}
                                </div>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Deskripsi Singkat <span className="font-medium normal-case text-slate-400 dark:text-slate-500">(Opsional)</span>
                                </label>
                                <textarea 
                                    id="description" 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    placeholder="Jelaskan jenis konten atau tingkat kemahiran yang cocok untuk folder ini..."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.description 
                                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                            : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                />
                                
                                {/* Info Helper Banner */}
                                <div className="mt-2 p-3 bg-[#60f2ce]/15 dark:bg-[#60f2ce]/10 rounded-2xl border border-[#60f2ce]/40 dark:border-[#60f2ce]/30 flex gap-2.5 items-start text-xs text-[#0d9488] dark:text-[#60f2ce]">
                                    <i className="bi bi-lightbulb-fill text-sm shrink-0"></i>
                                    <span className="font-medium">
                                        Deskripsi ini akan muncul di halaman Library video untuk mempermudah siswa memilih materi yang sesuai.
                                    </span>
                                </div>
                                {errors.description && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.description}</p>}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <Link 
                                    href="/admin/video-folders" 
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
                                            <i className="bi bi-save2-fill text-xs"></i>
                                            <span>Simpan Kategori</span>
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