import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: 'bi-card-text',
            title: 'Spaced Repetition Flashcards',
            desc: 'Kuasai ribuan kosakata dan frasa dengan algoritma pengulangan berkala yang terbukti ilmiah.',
            badge: 'Memory Retention',
            color: 'from-[#60f2ce] to-[#0d9488]'
        },
        {
            icon: 'bi-mic-fill',
            title: 'Interactive Shadowing Studio',
            desc: 'Latih kelancaran berbicara dan intonasi mirip penutur asli dengan panduan audio sintetis per dialog.',
            badge: 'Speaking Fluency',
            color: 'from-[#fcbf49] to-[#ff822d]'
        },
        {
            icon: 'bi-youtube',
            title: 'Video Native Transcripts',
            desc: 'Tonton video pembicara asli dengan teks bahasa Inggris dan terjemahan instan per detiknya.',
            badge: 'Active Listening',
            color: 'from-[#ff822d] to-rose-500'
        },
        {
            icon: 'bi-journal-bookmark-fill',
            title: 'Buku & Evaluasi CBT',
            desc: 'Materi digital tata bahasa terstruktur dilengkapi ujian komputer untuk menguji pemahaman.',
            badge: 'Grammar & Test',
            color: 'from-[#60f2ce] via-[#fefc7c] to-[#fcbf49]'
        }
    ];

    return (
        <>
            <Head title="Selamat Datang di EnglishApp" />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 font-sans selection:bg-[#60f2ce]/40 selection:text-slate-900 relative overflow-hidden flex flex-col justify-between">
                
                {/* Background Radial Ornaments */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#60f2ce]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#fcbf49]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#ff822d]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Top Navbar Header */}
                <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-lg shadow-sm shadow-[#ff822d]/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </div>
                        <span className="font-black text-lg tracking-tight text-slate-900">
                            English<span className="text-[#ff822d]">App</span>
                        </span>
                    </div>

                    {/* Nav Action */}
                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href="/home"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all hover:-translate-y-0.5"
                            >
                                <span>Buka Dashboard</span>
                                <svg className="w-3.5 h-3.5 text-[#60f2ce]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200/80 rounded-full shadow-2xs hover:bg-slate-50 transition"
                                >
                                    Masuk (Log In)
                                </a>
                                <a
                                    href="/register"
                                    className="px-5 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all hover:-translate-y-0.5"
                                >
                                    Daftar Sekarang
                                </a>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center">
                    
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6 text-xs font-bold text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse"></span>
                        Platform Pembelajaran Bahasa Inggris Terpadu
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mb-6">
                        Cara Cerdas Menguasai Bahasa Inggris Secara{' '}
                        <span className="bg-gradient-to-r from-[#ff822d] via-[#fcbf49] to-[#0d9488] bg-clip-text text-transparent">
                            Alami & Konsisten
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-10">
                        Kombinasikan metode Spaced Repetition Flashcards, latihan menirukan intonasi native speaker (Shadowing), video interaktif, dan modul bacaan digital dalam satu dashboard modern.
                    </p>

                    {/* Primary CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-16">
                        {auth?.user ? (
                            <Link
                                href="/home"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-[#fcbf49]/25 hover:opacity-95 transition-all hover:-translate-y-0.5"
                            >
                                <i className="bi bi-speedometer2 text-base"></i>
                                <span>Lanjutkan Belajar di Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/register"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-[#fcbf49]/25 hover:opacity-95 transition-all hover:-translate-y-0.5"
                                >
                                    <span>Mulai Belajar Gratis</span>
                                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </a>
                                <a
                                    href="/login"
                                    className="w-full sm:w-auto px-7 py-4 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-2xl shadow-xs hover:bg-slate-50 transition"
                                >
                                    Masuk ke Akun
                                </a>
                            </>
                        )}
                    </div>

                    {/* Feature Grid Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
                        {features.map((feat, idx) => (
                            <div 
                                key={idx}
                                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center text-lg shadow-sm`}>
                                            <i className={`bi ${feat.icon}`}></i>
                                        </div>
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-200/80 text-slate-600 uppercase tracking-wider">
                                            {feat.badge}
                                        </span>
                                    </div>
                                    <h2 className="font-extrabold text-base text-slate-900 leading-snug mb-2">
                                        {feat.title}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>

                {/* Footer Section */}
                <footer className="relative z-10 border-t border-slate-100 bg-white/60 backdrop-blur-xs py-8 px-6 text-center text-xs text-slate-400">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700">EnglishApp</span> &copy; {new Date().getFullYear()} &bull; Semua hak cipta dilindungi.
                        </div>
                        <div className="flex items-center gap-6 font-semibold text-slate-500">
                            <a href="/lessons" className="hover:text-[#ff822d] transition">Buku Digital</a>
                            <a href="/video-learning" className="hover:text-[#ff822d] transition">Video Pembelajaran</a>
                            <a href="/shadowing" className="hover:text-[#ff822d] transition">Studio Shadowing</a>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}