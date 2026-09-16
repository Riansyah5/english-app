import React, { useEffect, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import Chart from 'chart.js/auto';

export default function Home({ 
    auth, 
    user, 
    cardsToStudyToday = 0, 
    reviewedToday = 0, 
    dueCardsCount = 0, 
    totalCardsCount = 0,
    streak = 0,
    chartLabels = [],
    chartData = [],
    dailyVideo,
    randomCategory,
    categoryProgress = 0,
    nextLessonToRead 
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Pantau perubahan mode pada class <html> untuk re-render chart
    useEffect(() => {
        const updateMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        updateMode();

        const observer = new MutationObserver(updateMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // Render & update Chart.js saat data atau tema berubah
    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 220);
        if (isDarkMode) {
            gradient.addColorStop(0, 'rgba(96, 242, 206, 0.28)');
            gradient.addColorStop(0.7, 'rgba(255, 130, 45, 0.1)');
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
        } else {
            gradient.addColorStop(0, 'rgba(96, 242, 206, 0.35)');
            gradient.addColorStop(0.6, 'rgba(252, 191, 73, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        const textColor = isDarkMode ? '#94a3b8' : '#64748b';
        const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.35)' : '#f1f5f9';

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Flashcard Di-review',
                    data: chartData,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: '#ff822d', 
                    borderWidth: 3,
                    pointBackgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    pointBorderColor: '#ff822d',
                    pointBorderWidth: 2.5,
                    pointRadius: 4.5,
                    pointHoverRadius: 6,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#0f172a' : '#1e293b',
                        titleColor: '#60f2ce',
                        bodyColor: '#ffffff',
                        padding: 10,
                        cornerRadius: 12,
                        displayColors: false,
                        borderColor: isDarkMode ? '#334155' : 'transparent',
                        borderWidth: isDarkMode ? 1 : 0
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor,
                            font: { size: 11, weight: '500' },
                            precision: 0
                        },
                        border: { dash: [5, 5], display: false },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { 
                            color: textColor,
                            font: { size: 11, weight: '500' }
                        },
                        border: { display: false },
                        grid: { display: false }
                    }
                }
            }
        });
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData, chartLabels, isDarkMode]);

    const dailyGoal = user?.daily_goal || 0;
    const progressPercentage = dailyGoal > 0 
        ? Math.min(100, Math.round(((reviewedToday || 0) / dailyGoal) * 100)) 
        : 0;

    return (
        <AuthenticatedLayout user={auth?.user || user}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-7xl mx-auto space-y-7">

                    {/* Top Bar Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    Pro Learner
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Selamat belajar, <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.name || 'Siswa'}</span>! Target hari ini: <span className="font-bold text-[#ff822d]">{dailyGoal} materi</span>.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Link 
                                href="/profile" 
                                className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
                            >
                                Atur Target
                            </Link>
                            <Link 
                                href="/study/listening" 
                                className="px-4 py-2.5 text-xs font-semibold text-[#0d9488] bg-[#60f2ce]/20 hover:bg-[#60f2ce]/30 border border-[#60f2ce]/50 rounded-full shadow-xs transition flex items-center gap-1.5"
                            >
                                <i className="bi bi-headphones"></i>
                                Listening
                            </Link>
                            {cardsToStudyToday > 0 ? (
                                <Link 
                                    href="/study" 
                                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] hover:opacity-95 rounded-full shadow-md shadow-[#fcbf49]/20 transition flex items-center gap-2"
                                >
                                    <span>Lanjut Belajar</span>
                                    <svg className="w-3.5 h-3.5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                </Link>
                            ) : (
                                <Link 
                                    href="/study/practice" 
                                    className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800 rounded-full shadow-xs transition border dark:border-slate-700"
                                >
                                    Latihan Bebas
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Top Row: Tips Card & Quick Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* 1. Feature Card */}
                        <div className="lg:col-span-6 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#ff822d] via-[#fcbf49] to-[#60f2ce] text-slate-950 shadow-[0_12px_32px_-8px_rgba(255,130,45,0.28)] flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#60f2ce]/50 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/60 backdrop-blur-md text-slate-900 mb-4 border border-white/40">
                                    Tips Belajar 💡
                                </span>
                                <h3 className="text-xl font-black leading-snug mb-2 tracking-tight text-slate-950">Konsistensi Kunci Retensi Memori</h3>
                                <p className="text-slate-900/90 text-xs leading-relaxed font-medium">
                                    Meninjau 10 kartu setiap hari secara konsisten terbukti lebih awet di ingatan dibanding 100 kartu sekaligus dalam semalam.
                                </p>
                            </div>

                            <div className="relative z-10 pt-6">
                                <Link 
                                    href="/study" 
                                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition shadow-xs"
                                >
                                    <span>Mulai Sesi Sekarang</span>
                                    <svg className="w-4 h-4 text-[#ff822d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                                </Link>
                            </div>
                        </div>

                        {/* 2. Circular Gauge Card */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col items-center justify-between text-center transition-colors">
                            <div className="w-full text-left">
                                <h3 className="font-bold text-slate-900 dark:text-white text-base">Target Harian</h3>
                                <p className="text-xs text-slate-400 dark:text-slate-400">Progress kartu hari ini</p>
                            </div>

                            <div className="relative my-3 flex items-center justify-center">
                                <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
                                    <defs>
                                        <linearGradient id="paletteCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#60f2ce" />
                                            <stop offset="50%" stopColor="#fefc7c" />
                                            <stop offset="75%" stopColor="#fcbf49" />
                                            <stop offset="100%" stopColor="#ff822d" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="60" cy="60" r="50" stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} strokeWidth="11" fill="transparent" />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        stroke="url(#paletteCircleGrad)"
                                        strokeWidth="11"
                                        strokeDasharray={2 * Math.PI * 50}
                                        strokeDashoffset={2 * Math.PI * 50 * (1 - progressPercentage / 100)}
                                        strokeLinecap="round"
                                        fill="transparent"
                                        className="transition-all duration-700 ease-out"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">{progressPercentage}%</span>
                                    <span className="text-[10px] font-bold text-[#ff822d] uppercase tracking-wider">Tercapai</span>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl text-xs border border-slate-100 dark:border-slate-800">
                                <div className="text-center">
                                    <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Selesai</span>
                                    <strong className="text-[#0d9488] dark:text-[#60f2ce] font-bold">{reviewedToday}</strong>
                                </div>
                                <div className="text-center border-l border-slate-200 dark:border-slate-700">
                                    <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Sisa</span>
                                    <strong className="text-[#ff822d] font-bold">{cardsToStudyToday}</strong>
                                </div>
                            </div>
                        </div>

                        {/* 3. User Badge & Metrics */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between transition-colors">
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] flex items-center justify-center text-white font-black text-base shadow-sm">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{user?.name || 'User'}</h4>
                                    <p className="text-xs text-slate-400">{user?.email || 'Pelajar Aktif'}</p>
                                </div>
                            </div>

                            <div className="space-y-2.5 my-3">
                                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#ff822d]/10 dark:bg-[#ff822d]/15 border border-[#ff822d]/25 dark:border-[#ff822d]/30">
                                    <span className="text-xs text-[#c2410c] dark:text-[#fb923c] font-semibold">Menunggak</span>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-white dark:bg-slate-800 text-[#ea580c] dark:text-[#ff822d] rounded-xl shadow-xs border dark:border-slate-700">
                                        {dueCardsCount} materi
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    <span className="text-xs text-[#0f766e] dark:text-[#60f2ce] font-semibold">Total Koleksi</span>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-white dark:bg-slate-800 text-[#0f766e] dark:text-[#60f2ce] rounded-xl shadow-xs border dark:border-slate-700">
                                        {totalCardsCount} kartu
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 border border-[#fcbf49]/50 dark:border-[#fcbf49]/30">
                                    <span className="text-xs text-[#b45309] dark:text-[#fbbf24] font-semibold">Study Streak</span>
                                    <span className="text-xs font-bold px-2.5 py-1 bg-white dark:bg-slate-800 text-[#b45309] dark:text-[#fbbf24] rounded-xl shadow-xs flex items-center gap-1 border dark:border-slate-700">
                                        {streak} Hari 🔥
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Content Items & Line Chart Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Recommendation Cards */}
                        <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Materi Rekomendasi</h3>
                                    <p className="text-xs text-slate-400">Pilihan belajar terbaik untuk hari ini</p>
                                </div>
                                <Link href="/video-learning" className="text-xs font-bold text-[#ff822d] hover:text-[#ea580c] transition">
                                    Lihat Semua →
                                </Link>
                            </div>

                            <div className="space-y-3.5">
                                {dailyVideo && (
                                    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#60f2ce]/60 hover:bg-[#60f2ce]/5 dark:hover:bg-[#60f2ce]/10 bg-white dark:bg-slate-800/60 transition duration-200">
                                        <div className="flex items-center gap-3.5 truncate pr-2">
                                            <div className="w-11 h-11 rounded-2xl bg-[#60f2ce] text-slate-950 flex items-center justify-center shrink-0 shadow-sm shadow-[#60f2ce]/40">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            </div>
                                            <div className="truncate">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{dailyVideo.title}</h4>
                                                <span className="text-xs text-slate-400">{dailyVideo.folder?.name || 'Materi Video'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            {dailyVideo.difficulty && (
                                                <span className="text-[11px] font-bold uppercase px-2.5 py-1 bg-[#fefc7c]/60 dark:bg-amber-400/20 text-slate-800 dark:text-amber-300 rounded-lg border border-[#fefc7c] dark:border-amber-400/30">
                                                    {dailyVideo.difficulty}
                                                </span>
                                            )}
                                            <Link href={`/video-learning/${dailyVideo.id}`} className="px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition shadow-xs">
                                                Tonton
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {randomCategory && nextLessonToRead && (
                                    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#fcbf49]/60 hover:bg-[#fcbf49]/5 dark:hover:bg-[#fcbf49]/10 bg-white dark:bg-slate-800/60 transition duration-200">
                                        <div className="flex items-center gap-3.5 truncate pr-2">
                                            <div className="w-11 h-11 rounded-2xl bg-[#fcbf49] text-slate-950 flex items-center justify-center shrink-0 shadow-sm shadow-[#fcbf49]/30">
                                                <i className={`bi ${randomCategory.icon || 'bi-book'} text-lg`}></i>
                                            </div>
                                            <div className="truncate">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{nextLessonToRead.title}</h4>
                                                <span className="text-xs text-slate-400">Kategori: {randomCategory.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 shrink-0">
                                            <div className="text-right hidden sm:block">
                                                <span className="text-xs font-bold text-[#b45309] dark:text-[#fbbf24]">{categoryProgress}%</span>
                                                <div className="w-20 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                                                    <div className="bg-gradient-to-r from-[#fcbf49] to-[#ff822d] h-1.5 rounded-full" style={{ width: `${categoryProgress}%` }}></div>
                                                </div>
                                            </div>
                                            <Link href={`/lessons/${nextLessonToRead.slug}`} className="px-4 py-2 bg-[#ff822d] hover:bg-[#ea580c] text-white rounded-xl text-xs font-bold transition shadow-xs">
                                                Baca
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {!dailyVideo && (!randomCategory || !nextLessonToRead) && (
                                    <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                        Belum ada materi rekomendasi saat ini.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Line Chart Card */}
                        <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Aktivitas Belajar</h3>
                                    <p className="text-xs text-slate-400">7 Hari Terakhir</p>
                                </div>
                                <span className="text-xs font-bold px-3 py-1 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] rounded-full border border-[#60f2ce]/40 dark:border-[#60f2ce]/30">
                                    {reviewedToday} materi hari ini
                                </span>
                            </div>
                            <div className="h-52 w-full mt-2">
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}