import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonCreate({ auth, categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        lesson_category_id: categories.length > 0 ? categories[0].id : '',
        youtube_url: '',
        order_number: 1,
        content: '',
        is_published: true
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/lessons');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tulis Materi Baru" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-4xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/lessons" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#ff822d] dark:hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Konten Buku"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        Tulis Materi Baru ✍️
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                        Digital Book
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                    Tulis bab pelajaran baru, sematkan video pendukung, dan atur status publikasi materi.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/admin/lessons" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                        >
                            Batal & Kembali
                        </Link>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Row 1: Judul Materi & Kategori */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-7">
                                    <label htmlFor="title" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Judul Materi <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Bab 1 - Simple Present Tense in Daily Life"
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
                                    <label htmlFor="lesson_category_id" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Kategori Buku <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select 
                                        id="lesson_category_id" 
                                        value={data.lesson_category_id} 
                                        onChange={e => setData('lesson_category_id', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.lesson_category_id 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-800 dark:text-slate-100 shadow-2xs`}
                                        required
                                    >
                                        {categories.length > 0 ? (
                                            categories.map(c => (
                                                <option key={c.id} value={c.id} className="dark:bg-slate-800">{c.name}</option>
                                            ))
                                        ) : (
                                            <option value="" className="dark:bg-slate-800">Belum ada kategori buku</option>
                                        )}
                                    </select>
                                    {errors.lesson_category_id && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.lesson_category_id}</p>}
                                </div>
                            </div>

                            {/* Row 2: Urutan Bab & Link YouTube */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-4">
                                    <label htmlFor="order_number" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Urutan Bab <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        id="order_number" 
                                        min="1"
                                        value={data.order_number} 
                                        onChange={e => setData('order_number', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-mono font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.order_number 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white shadow-2xs`}
                                        required
                                    />
                                    {errors.order_number && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.order_number}</p>}
                                </div>

                                <div className="md:col-span-8">
                                    <label htmlFor="youtube_url" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                        Link YouTube Pendukung <span className="font-medium normal-case text-slate-400 dark:text-slate-500">(Opsional)</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="youtube_url" 
                                        value={data.youtube_url} 
                                        onChange={e => setData('youtube_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono font-semibold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.youtube_url 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                    />
                                    {errors.youtube_url && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.youtube_url}</p>}
                                </div>
                            </div>

                            {/* Row 3: Isi Materi (HTML/Prose) */}
                            <div>
                                <label htmlFor="content" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Isi Materi Pelajaran (Format HTML) <span className="text-[#ff822d]">*</span>
                                </label>

                                <textarea 
                                    id="content" 
                                    value={data.content} 
                                    onChange={e => setData('content', e.target.value)}
                                    rows="14"
                                    placeholder="<h2>Pengantar</h2>&#10;<p>Tulis penjelasan materi di sini menggunakan tag HTML standar...</p>"
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-mono font-medium bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.content 
                                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                            : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                    required
                                />

                                {/* Info Box Tipografi */}
                                <div className="mt-2.5 p-3.5 bg-[#fafcfb] dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-2.5 items-start text-xs text-slate-600 dark:text-slate-300">
                                    <div className="w-5 h-5 rounded-lg bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">
                                        <i className="bi bi-info-circle-fill"></i>
                                    </div>
                                    <span className="leading-relaxed">
                                        Gunakan tag HTML semantik seperti <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] font-bold font-mono text-[11px]">&lt;h2&gt;</code>, <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] font-bold font-mono text-[11px]">&lt;p&gt;</code>, <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] font-bold font-mono text-[11px]">&lt;ul&gt;</code>, dan <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[#0d9488] dark:text-[#60f2ce] font-bold font-mono text-[11px]">&lt;strong&gt;</code>. Konten ini akan langsung diformat rapi dengan <em>Tailwind Typography (prose)</em> di halaman baca siswa.
                                    </span>
                                </div>
                                {errors.content && <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5">{errors.content}</p>}
                            </div>

                            {/* Row 4: Switch Status Terbit */}
                            <div className="p-4 rounded-2xl bg-[#fafcfb] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                                        Status Publikasi Materi
                                    </span>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                        {data.is_published 
                                            ? 'Materi langsung tayang dan dapat dibaca oleh seluruh siswa.' 
                                            : 'Simpan sebagai draf (hanya dapat dilihat oleh admin).'}
                                    </span>
                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d9488] dark:peer-checked:bg-[#60f2ce]"></div>
                                </label>
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <Link 
                                    href="/admin/lessons" 
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
                                            <i className="bi bi-cloud-arrow-up-fill text-xs"></i>
                                            <span>Simpan Materi</span>
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