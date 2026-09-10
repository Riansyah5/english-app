import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ProfileEdit({ auth, user }) {
    const { flash } = usePage().props;
    const currentUser = user || auth?.user || {};
    const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';

    const { data, setData, put, processing, errors } = useForm({
        name: currentUser.name || '',
        daily_goal: currentUser.daily_goal || 15,
    });

    const submit = (e) => {
        e.preventDefault();
        put('/profile');
    };

    const goalPresets = [10, 15, 20, 30, 50];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan Profil & Target" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-2xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/dashboard" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Dashboard"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                        Pengaturan Profil ⚙️
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                        Pro Learner
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">
                                    Atur identitas akun dan target kartu harian untuk konsistensi retensi memori.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/dashboard" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                        >
                            Ke Dashboard
                        </Link>
                    </div>

                    {/* Flash Success Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-4 bg-[#60f2ce]/20 border border-[#60f2ce]/50 text-[#0d9488] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] space-y-7">
                        
                        {/* User Identity Header Snippet */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fafcfb] border border-slate-100">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-2xl shadow-sm shadow-[#ff822d]/25 shrink-0">
                                {userInitial}
                            </div>
                            <div className="truncate">
                                <span className="font-extrabold text-base text-slate-900 block truncate leading-tight">
                                    {currentUser.name || 'Pelajar Aktif'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium block truncate mt-0.5">
                                    {currentUser.email}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d9488] mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse"></span>
                                    Target Saat Ini: {currentUser.daily_goal || 15} materi/hari
                                </span>
                            </div>
                        </div>

                        {/* Profile Edit Form */}
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input: Full Name */}
                            <div>
                                <label htmlFor="name" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Nama Lengkap <span className="text-[#ff822d]">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Nama Lengkap Anda"
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                    required
                                    autoFocus
                                />
                                {errors.name && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.name}</p>}
                            </div>

                            {/* Input: Email (Readonly) */}
                            <div>
                                <label htmlFor="email" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Alamat Email <span className="font-medium normal-case text-slate-400">(Terkunci)</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        value={currentUser.email || ''} 
                                        disabled
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-100/70 text-slate-500 text-sm font-medium cursor-not-allowed shadow-2xs"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs flex items-center gap-1">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1.5">
                                    Alamat email digunakan sebagai pengenal akun utama dan tidak dapat diubah secara langsung.
                                </p>
                            </div>

                            {/* Input: Daily Goal */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="daily_goal" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Target Belajar Harian (Flashcard) <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <span className="text-xs font-extrabold text-[#ff822d]">
                                        {data.daily_goal} Kartu / Hari
                                    </span>
                                </div>

                                <div className="relative">
                                    <input 
                                        type="number" 
                                        id="daily_goal" 
                                        value={data.daily_goal} 
                                        onChange={e => setData('daily_goal', parseInt(e.target.value) || 0)}
                                        min="5" 
                                        max="100"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-mono font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.daily_goal ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-900 shadow-2xs`}
                                        required
                                    />
                                    <div className="absolute right-2 top-2 bottom-2 px-3 flex items-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs font-bold">
                                        Kartu / Hari
                                    </div>
                                </div>
                                {errors.daily_goal && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.daily_goal}</p>}

                                {/* Fast Goal Presets */}
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="text-[11px] font-bold text-slate-400">Pilih Cepat:</span>
                                    {goalPresets.map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => setData('daily_goal', preset)}
                                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all border ${
                                                Number(data.daily_goal) === preset
                                                    ? 'bg-[#60f2ce] text-slate-950 border-[#60f2ce] shadow-xs scale-105'
                                                    : 'bg-[#fafcfb] text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                            }`}
                                        >
                                            {preset} Kartu
                                        </button>
                                    ))}
                                </div>

                                {/* Recommendation Banner */}
                                <div className="p-3.5 bg-[#fafcfb] rounded-2xl border border-slate-100 flex gap-2.5 items-start text-xs text-slate-600">
                                    <div className="w-5 h-5 rounded-lg bg-[#fcbf49]/20 text-[#b45309] flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">
                                        💡
                                    </div>
                                    <span className="leading-relaxed">
                                        Target yang disarankan adalah <strong>15–30 kartu per hari</strong>. Konsistensi harian memberi efek retensi memori jangka panjang yang jauh lebih baik dibanding review ratusan kartu dalam satu waktu.
                                    </span>
                                </div>
                            </div>

                            {/* Actions Button */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <Link 
                                    href="/dashboard" 
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