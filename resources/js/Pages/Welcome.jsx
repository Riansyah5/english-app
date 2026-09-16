import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDark =
            document.documentElement.classList.contains('dark') ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(isDark);
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

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

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 font-sans selection:bg-[#60f2ce]/40 selection:text-slate-900 relative overflow-hidden flex flex-col justify-between transition-colors duration-200">
                
                {/* Background Radial Ornaments */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#fcbf49]/20 dark:bg-[#fcbf49]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#ff822d]/15 dark:bg-[#ff822d]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Navbar Header */}
                <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between gap-3">
                    {/* Brand */}
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center font-black text-sm sm:text-lg shadow-xs shadow-[#ff822d]/20 shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </div>
                        <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white truncate">
                            English<span className="text-[#ff822d]">App</span>
                        </span>
                    </div>

                    {/* Nav Action & Theme Toggle */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Switch Light / Dark Mode */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Ganti Mode Tampilan"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs transition-all active:scale-95 focus:outline-none"
                        >
                            {isDarkMode ? (
                                <i className="bi bi-sun-fill text-amber-300 text-sm leading-none transition-transform hover:rotate-45"></i>
                            ) : (
                                <i className="bi bi-moon-stars-fill text-slate-600 text-xs leading-none transition-transform hover:-rotate-12"></i>
                            )}
                        </button>

                        {auth?.user ? (
                            <Link
                                href="/home"
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-slate-900 dark:bg-[#60f2ce] hover:bg-slate-800 dark:hover:bg-[#4de1bc] text-white dark:text-slate-950 font-bold text-[11px] sm:text-xs shadow-xs transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                            >
                                <span>Dashboard</span>
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#60f2ce] dark:text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-full shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition whitespace-nowrap active:scale-95"
                                >
                                    Masuk
                                </a>
                                <a
                                    href="/register"
                                    className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] rounded-full shadow-xs shadow-[#fcbf49]/20 hover:opacity-95 transition-all hover:-translate-y-0.5 whitespace-nowrap active:scale-95"
                                >
                                    Daftar
                                </a>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col items-center text-center">
                    
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs mb-5 sm:mb-6 text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-[#ff822d] animate-pulse shrink-0"></span>
                        <span className="truncate">Platform Pembelajaran Bahasa Inggris Terpadu</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-4xl mb-4 sm:mb-6">
                        Cara Cerdas Menguasai Bahasa Inggris Secara{' '}
                        <span className="bg-gradient-to-r from-[#ff822d] via-[#fcbf49] to-[#0d9488] dark:to-[#60f2ce] bg-clip-text text-transparent">
                            Alami & Konsisten
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-8 sm:mb-10 px-2">
                        Kombinasikan metode Spaced Repetition Flashcards, latihan menirukan intonasi native speaker (Shadowing), video interaktif, dan modul bacaan digital dalam satu dashboard modern.
                    </p>

                    {/* Primary CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-12 sm:mb-16">
                        {auth?.user ? (
                            <Link
                                href="/home"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#fcbf49]/25 hover:opacity-95 transition-all hover:-translate-y-0.5 active:scale-95"
                            >
                                <i className="bi bi-speedometer2 text-base"></i>
                                <span>Lanjutkan Belajar di Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/register"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#fcbf49]/25 hover:opacity-95 transition-all hover:-translate-y-0.5 active:scale-95"
                                >
                                    <span>Mulai Belajar Gratis</span>
                                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </a>
                                <a
                                    href="/login"
                                    className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-2xl shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition active:scale-95"
                                >
                                    Masuk ke Akun
                                </a>
                            </>
                        )}
                    </div>

                    {/* Feature Grid Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full text-left">
                        {features.map((feat, idx) => (
                            <div 
                                key={idx}
                                className="bg-white dark:bg-slate-900/85 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-5 sm:p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br ${feat.color} text-slate-950 flex items-center justify-center text-base sm:text-lg shadow-xs shrink-0`}>
                                            <i className={`bi ${feat.icon}`}></i>
                                        </div>
                                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                                            {feat.badge}
                                        </span>
                                    </div>
                                    <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug mb-1.5 sm:mb-2">
                                        {feat.title}
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>

                {/* Footer Section */}
                <footer className="relative z-10 border-t border-slate-100 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs py-6 sm:py-8 px-4 sm:px-6 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors duration-200">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-300">EnglishApp</span> &copy; {new Date().getFullYear()} &bull; Semua hak cipta dilindungi.
                        </div>
                        <div className="flex items-center gap-3 sm:gap-6 font-semibold text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex-wrap justify-center">
                            <a href="/lessons" className="hover:text-[#ff822d] transition">Buku Digital</a>
                            <a href="/video-learning" className="hover:text-[#ff822d] transition">Video Belajar</a>
                            <a href="/shadowing" className="hover:text-[#ff822d] transition">Studio Shadowing</a>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}