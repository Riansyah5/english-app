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

    const durationPresets = [15, 30, 45, 60, 90];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit Ujian: ${exam.title}`} />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-3xl mx-auto space-y-6 sm:space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                        {/* Kiri: Tombol Kembali + Judul & Badge */}
                        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                            <Link 
                                href="/admin/exams" 
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all shrink-0 active:scale-95"
                                title="Kembali ke Daftar Ujian"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <h1 className="text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                                        Edit Ujian ✏️
                                    </h1>
                                    <span className="shrink-0 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/50 whitespace-nowrap">
                                        ID #{exam.id}
                                    </span>
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 truncate hidden xs:block">
                                    Perbarui judul evaluasi, petunjuk, atau batas durasi waktu.
                                </p>
                            </div>
                        </div>

                        {/* Kanan: Aksi Cepat & Batal */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <Link 
                                href={`/admin/exams/${exam.id}`}
                                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#0d9488] bg-[#60f2ce]/20 border border-[#60f2ce]/50 rounded-xl sm:rounded-2xl shadow-2xs hover:bg-[#60f2ce]/30 active:scale-95 transition flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
                            >
                                <i className="bi bi-ui-checks text-xs"></i>
                                <span className="hidden xs:inline">Kelola </span>Soal
                            </Link>

                            <Link 
                                href="/admin/exams" 
                                className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-2xl shadow-xs hover:bg-slate-50 active:scale-95 transition whitespace-nowrap"
                            >
                                Batal
                            </Link>
                        </div>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-8 md:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                            
                            {/* Input: Judul Ujian */}
                            <div>
                                <label htmlFor="title" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Judul Paket Ujian <span className="text-[#ff822d]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Contoh: Evaluasi Akhir - Grammar & Tenses Level 1"
                                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.title ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                    required
                                    autoFocus
                                />
                                {errors.title && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.title}</p>}
                            </div>

                            {/* Input: Deskripsi & Petunjuk Pengerjaan */}
                            <div>
                                <label htmlFor="description" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Petunjuk / Deskripsi Ujian <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    placeholder="Tuliskan petunjuk pengerjaan soal, kriteria kelulusan, atau ruang lingkup materi tes..."
                                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />
                                {errors.description && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.description}</p>}
                            </div>

                            {/* Input: Durasi Ujian & Preset Cepat */}
                            <div className="space-y-2.5 sm:space-y-3">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="duration_minutes" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Batas Waktu Pengerjaan <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <span className="text-xs font-extrabold text-[#ff822d]">
                                        {data.duration_minutes} Menit
                                    </span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="number"
                                        id="duration_minutes"
                                        value={data.duration_minutes}
                                        onChange={e => setData('duration_minutes', parseInt(e.target.value) || 0)}
                                        min="1"
                                        className={`w-full pl-3.5 sm:pl-4 pr-20 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-mono font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.duration_minutes ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-900 shadow-2xs`}
                                        required
                                    />
                                    <div className="absolute right-2 top-2 bottom-2 px-2.5 sm:px-3 flex items-center bg-white border border-slate-200 rounded-xl text-slate-500 text-[11px] sm:text-xs font-bold pointer-events-none">
                                        Menit
                                    </div>
                                </div>
                                {errors.duration_minutes && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.duration_minutes}</p>}

                                {/* Quick Duration Presets */}
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">Pilih Cepat:</span>
                                    {durationPresets.map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => setData('duration_minutes', preset)}
                                            className={`px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold font-mono transition-all border active:scale-95 ${
                                                Number(data.duration_minutes) === preset
                                                    ? 'bg-[#60f2ce] text-slate-950 border-[#60f2ce] shadow-xs scale-105'
                                                    : 'bg-[#fafcfb] text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                            }`}
                                        >
                                            {preset}m
                                        </button>
                                    ))}
                                </div>

                                {/* Info Box */}
                                <div className="mt-2.5 p-3 sm:p-3.5 bg-[#fafcfb] rounded-2xl border border-slate-100 flex gap-2 sm:gap-2.5 items-start text-[11px] sm:text-xs text-slate-600">
                                    <div className="w-5 h-5 rounded-lg bg-[#fcbf49]/20 text-[#b45309] flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">
                                        ⏱️
                                    </div>
                                    <span className="leading-relaxed">
                                        Perubahan batas durasi waktu hanya akan berdampak pada sesi pengerjaan ujian baru yang dimulai setelah perubahan ini disimpan.
                                    </span>
                                </div>
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5 sm:gap-3">
                                <Link 
                                    href="/admin/exams" 
                                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition shadow-2xs active:scale-95"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 active:scale-95 transition-all ${
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