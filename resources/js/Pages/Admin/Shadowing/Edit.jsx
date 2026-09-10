import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingEdit({ auth, shadowing }) {
    const { data, setData, put, processing, errors } = useForm({
        title: shadowing.title || '',
        level: shadowing.level || 'Beginner',
        description: shadowing.description || '',
        is_published: shadowing.is_published ?? true
    });

    const submit = (e) => {
        e.preventDefault();
        put('/admin/shadowing/' + shadowing.id);
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Edit Topik Shadowing" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-3xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/shadowing" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Daftar Topik"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                        Tambah Topik Shadowing 🎤
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                        Speaking Studio
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">
                                    Buat topik percakapan baru sebelum menyusun baris dialog dan konfigurasi suara TTS.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/admin/shadowing" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                        >
                            Batal & Kembali
                        </Link>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input Rows: Title & Level */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-8">
                                    <label htmlFor="title" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Judul Topik Percakapan <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Ordering Coffee at a Cafe, Checking in at the Airport"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.title ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                        required
                                        autoFocus
                                    />
                                    {errors.title && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-4">
                                    <label htmlFor="level" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Tingkat Kesulitan <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select 
                                        id="level" 
                                        value={data.level} 
                                        onChange={e => setData('level', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.level ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-800 shadow-2xs`}
                                        required
                                    >
                                        <option value="Beginner">Beginner (Pemula)</option>
                                        <option value="Intermediate">Intermediate (Menengah)</option>
                                        <option value="Advanced">Advanced (Lanjutan)</option>
                                    </select>
                                    {errors.level && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.level}</p>}
                                </div>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Deskripsi Singkat & Konteks Situasi <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                </label>
                                <textarea 
                                    id="description" 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    placeholder="Ceritakan latar belakang dialog, peran pembicara, atau kosakata kunci yang akan dipelajari..."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />

                                {/* Info Context Banner */}
                                <div className="mt-2.5 p-3.5 bg-[#60f2ce]/15 rounded-2xl border border-[#60f2ce]/40 flex gap-2.5 items-start text-xs text-[#0d9488]">
                                    <i className="bi bi-lightbulb-fill text-sm shrink-0 mt-0.5"></i>
                                    <span className="font-medium leading-relaxed">
                                        Setelah topik ini dibuat, Anda akan langsung diarahkan ke <strong>Dialog Builder</strong> untuk menambahkan karakter pembicara, suara TTS (pria/wanita), serta kalimat percakapan.
                                    </span>
                                </div>
                                {errors.description && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.description}</p>}
                            </div>

                            {/* Switch Status Publikasi */}
                            <div className="p-4 rounded-2xl bg-[#fafcfb] border border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-slate-900 text-xs block">
                                        Status Publikasi Topik
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        {data.is_published 
                                            ? 'Langsung tampil di katalog Latihan Shadowing siswa.' 
                                            : 'Simpan sebagai draf (hanya dapat diakses oleh admin).'}
                                    </span>
                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d9488]"></div>
                                </label>
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <Link 
                                    href="/admin/shadowing" 
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition shadow-2xs"
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
                                            <i className="bi bi-chat-square-quote-fill text-xs"></i>
                                            <span>Buat Topik & Lanjut Susun Skrip</span>
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