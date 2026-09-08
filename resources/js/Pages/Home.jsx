import React, { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import Chart from 'chart.js/auto';

export default function Home({ 
    auth, 
    user, 
    cardsToStudyToday, 
    reviewedToday, 
    dueCardsCount, 
    totalCardsCount,
    streak,
    chartLabels,
    chartData,
    dailyVideo,
    randomCategory,
    categoryProgress,
    nextLessonToRead 
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Flashcard Di-review',
                        data: chartData,
                        backgroundColor: 'transparent',
                        borderColor: '#3b82f6', 
                        borderWidth: 2,
                        pointBackgroundColor: '#1e2530',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 10,
                                color: '#94a3b8',
                                font: { size: 11 }
                            },
                            border: { display: false },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)',
                            }
                        },
                        x: {
                            ticks: { 
                                color: '#94a3b8',
                                font: { size: 11 }
                            },
                            border: { display: false },
                            grid: { display: false }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData, chartLabels]);

    const progressPercentage = user.daily_goal > 0 ? Math.min(100, (reviewedToday / user.daily_goal) * 100) : 0;

    return (
        <AuthenticatedLayout user={auth?.user || user}>
            <Head title="Dashboard" />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Target belajar harianmu adalah <span className="font-semibold text-slate-900 dark:text-white">{user.daily_goal} materi</span>.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Daily Review Card */}
                    <div className="lg:col-span-2 glass dark:glass-dark rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm">
                        <div>
                            <h5 className="font-bold text-xl mb-6 opacity-90">Daily Review</h5>
                            
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Progress Hari Ini</span>
                                    <span className="text-sm font-semibold">{reviewedToday} / {user.daily_goal} Selesai</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {cardsToStudyToday > 0 ? (
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    Kamu masih memiliki <span className="font-semibold text-slate-900 dark:text-white">{cardsToStudyToday} materi</span> untuk diselesaikan hari ini.
                                </p>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400 mb-6">
                                    Luar biasa! Target belajar harianmu sudah terpenuhi. Waktunya mengistirahatkan otakmu.
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            {cardsToStudyToday > 0 ? (
                                <a href="/study" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
                                    Lanjutkan Belajar
                                </a>
                            ) : (
                                <>
                                    <button disabled className="px-6 py-2.5 bg-green-500/10 text-green-600 dark:text-green-400 font-medium rounded-xl border border-green-500/20 cursor-not-allowed">
                                        Target Tercapai ✓
                                    </button>
                                    <a href="/study/practice" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                                        Latihan Bebas
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        <div className="glass dark:glass-dark rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Total Menunggak</span>
                            <h2 className="text-4xl font-bold text-rose-500 mb-1">{dueCardsCount}</h2>
                            <small className="text-slate-500 dark:text-slate-400 opacity-70">Akan dicicil bertahap</small>
                        </div>
                        <div className="glass dark:glass-dark rounded-2xl p-6 flex flex-col justify-center shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Koleksi Materi</span>
                            <h2 className="text-4xl font-bold mb-0">{totalCardsCount}</h2>
                        </div>
                    </div>
                </div>

                {/* Activity & Streak Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Streak Card */}
                    <div className="glass dark:glass-dark rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Study Streak</span>
                        <h1 className="text-7xl font-bold tracking-tight flex items-center">
                            {streak}<span className="text-4xl ml-2">🔥</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">Hari berturut-turut</p>
                    </div>

                    {/* Chart Card */}
                    <div className="lg:col-span-2 glass dark:glass-dark rounded-2xl p-6 lg:p-8 shadow-sm">
                        <h6 className="font-bold text-lg mb-6 opacity-90">Aktivitas 7 Hari Terakhir</h6>
                        <div className="relative h-48 w-full">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

