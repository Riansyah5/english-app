import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ListeningSetup({ auth }) {
    const [mode, setMode] = useState('daily');
    const [limit, setLimit] = useState('50');
    const [direction, setDirection] = useState('en-id');

    const handleStart = (e) => {
        e.preventDefault();
        router.get('/study/listening/session', { mode, limit, direction });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Vocabulary Listening Setup" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans flex items-center justify-center transition-colors duration-200">
                <div className="w-full max-w-lg bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-9 border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden transition-colors">
                    
                    {/* Background Radial Glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#fefc7c]/40 dark:bg-[#fefc7c]/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Header Section */}
                    <div className="text-center mb-8 relative z-10">
                        {/* <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-2xl shadow-sm shadow-[#ff822d]/25 mx-auto mb-3">
                            <i className="bi bi-headphones"></i>
                        </div> */}
                        {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 mb-2">
                            Hands-Free Audio Session
                        </div> */}
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Audio Study Session 🎧
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                            Dengarkan kosakata, terjemahan, dan pelafalan otomatis layaknya mendengarkan podcast.
                        </p>
                    </div>

                    <form onSubmit={handleStart} className="space-y-6 relative z-10">
                        
                        {/* Option 1: Segmented Pill untuk Mode Belajar */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Mode Belajar
                            </label>
                            <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#fafcfb] dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
                                <button
                                    type="button"
                                    onClick={() => setMode('daily')}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                        mode === 'daily'
                                            ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 shadow-xs'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <i className="bi bi-calendar-check-fill text-xs"></i>
                                    <span>Target Hari Ini</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('free')}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                        mode === 'free'
                                            ? 'bg-slate-900 dark:bg-[#60f2ce] text-white dark:text-slate-950 shadow-xs'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <i className="bi bi-shuffle text-xs"></i>
                                    <span>Mode Bebas</span>
                                </button>
                            </div>
                        </div>

                        {/* Option 2: Direction Compact Cards */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Arah Pembacaan Bahasa
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDirection('en-id')}
                                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                                        direction === 'en-id'
                                            ? 'bg-[#60f2ce]/15 dark:bg-[#60f2ce]/10 border-[#60f2ce]/70 dark:border-[#60f2ce]/50 text-[#0d9488] dark:text-[#60f2ce] shadow-xs ring-1 ring-[#60f2ce]/30'
                                            : 'bg-[#fafcfb] dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center justify-between mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <i className="bi bi-volume-up-fill text-[#0d9488] dark:text-[#60f2ce]"></i>
                                            <span>EN &rarr; ID</span>
                                        </span>
                                        {direction === 'en-id' && (
                                            <i className="bi bi-check-circle-fill text-[#0d9488] dark:text-[#60f2ce] text-xs"></i>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        Inggris dibaca lebih dulu, diikuti arti Indonesia
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setDirection('id-en')}
                                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                                        direction === 'id-en'
                                            ? 'bg-[#ff822d]/10 dark:bg-[#ff822d]/15 border-[#ff822d]/60 dark:border-[#ff822d]/50 text-[#c2410c] dark:text-[#ff822d] shadow-xs ring-1 ring-[#ff822d]/30'
                                            : 'bg-[#fafcfb] dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center justify-between mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <i className="bi bi-translate text-[#ff822d]"></i>
                                            <span>ID &rarr; EN</span>
                                        </span>
                                        {direction === 'id-en' && (
                                            <i className="bi bi-check-circle-fill text-[#ff822d] text-xs"></i>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        Arti Indonesia dibaca dulu untuk melatih daya ingat
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Option 3: Limit Dropdown (Khusus Mode Free) */}
                        {mode === 'free' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-4 rounded-2xl bg-[#fafcfb] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Jumlah Kosakata yang Diputar
                                </label>
                                <select
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all shadow-2xs cursor-pointer"
                                >
                                    <option value="10" className="dark:bg-slate-800">10 Kata (~2 Menit - Singkat)</option>
                                    <option value="20" className="dark:bg-slate-800">20 Kata (~5 Menit - Sedang)</option>
                                    <option value="50" className="dark:bg-slate-800">50 Kata (~12 Menit - Rekomendasi)</option>
                                    <option value="100" className="dark:bg-slate-800">100 Kata (~25 Menit - Intensif)</option>
                                    <option value="all" className="dark:bg-slate-800">Semua Koleksi (Maraton Playlist)</option>
                                </select>
                            </div>
                        )}

                        {/* Actions CTA */}
                        <div className="pt-2 flex flex-col gap-2.5">
                            <button
                                type="submit"
                                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.99]"
                            >
                                <i className="bi bi-play-circle-fill text-base"></i>
                                <span>Mulai Sesi Listening</span>
                            </button>

                            <Link
                                href="/home"
                                className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs text-center transition-colors block border border-transparent dark:border-slate-700"
                            >
                                Batal & Kembali ke Dashboard
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}