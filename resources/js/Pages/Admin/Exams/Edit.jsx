import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ExamEdit({ auth, exam }) {
    const { data, setData, put, processing, errors } = useForm({
        title: exam.title || '',
        description: exam.description || '',
        duration_minutes: exam.duration_minutes || 30
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/exams/${exam.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit Ujian: ${exam.title}`} />
            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-2xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/exams" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#ff822d] dark:hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Daftar Ujian"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        Edit Ujian 📝
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/50 dark:border-[#fcbf49]/30">
                                        Paket ID #{exam.id}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                                    Perbarui judul, durasi pengerjaan, atau deskripsi petunjuk evaluasi CBT.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/admin/exams" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                        >
                            Batal & Kembali
                        </Link>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Judul Ujian <span className="text-[#ff822d]">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Contoh: Evaluasi Tata Bahasa - Grammar Midterm"
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.title 
                                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                            : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                    required
                                    autoFocus
                                />
                                {errors.title && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Deskripsi Singkat & Petunjuk <span className="font-medium normal-case text-slate-400 dark:text-slate-500">(Opsional)</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    placeholder="Tuliskan petunjuk singkat atau cakupan bab yang diujikan dalam paket ini..."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.description 
                                            ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                            : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                />
                                {errors.description && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Durasi Pengerjaan (Menit) <span className="text-[#ff822d]">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={data.duration_minutes}
                                        onChange={e => setData('duration_minutes', e.target.value)}
                                        min="1"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-mono font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.duration_minutes 
                                                ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' 
                                                : 'border-slate-200 dark:border-slate-700/80'
                                        } text-slate-900 dark:text-white shadow-2xs`}
                                        required
                                    />
                                    <div className="absolute right-2 top-2 bottom-2 px-3 flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-bold">
                                        Menit
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">Timer otomatis berjalan saat siswa menekan tombol Mulai Ujian.</p>
                                {errors.duration_minutes && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.duration_minutes}</p>}
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <Link
                                    href="/admin/exams"
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
                                            <span>Update Ujian</span>
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