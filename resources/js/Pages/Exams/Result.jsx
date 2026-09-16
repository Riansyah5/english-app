import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ExamResult({ auth, exam, attempt }) {
    const { flash } = usePage().props;
    const [openExplanationId, setOpenExplanationId] = useState(null);

    const isPassed = (attempt?.score || 0) >= 70;
    const score = Math.round(attempt?.score || 0);

    // SVG Circular Gauge calculation
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - score / 100);

    const toggleExplanation = (id) => {
        setOpenExplanationId(prev => prev === id ? null : id);
    };

    const totalWrong = (attempt?.total_questions || 0) - (attempt?.total_correct || 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Hasil Evaluasi" />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Flash Success Notification */}
                    {flash?.success && (
                        <div className="flex items-center justify-center gap-2 p-3.5 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 text-[#0d9488] dark:text-[#60f2ce] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-sm"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Main Score & Summary Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none text-center relative overflow-hidden transition-colors">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] dark:bg-[#60f2ce] animate-pulse"></span>
                            Evaluasi Selesai
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-1">
                            Hasil Evaluasi CBT
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 font-medium mb-8">
                            Paket Ujian: <strong className="text-slate-700 dark:text-slate-200">{exam.title}</strong>
                        </p>

                        {/* Circular Score Gauge */}
                        <div className="relative my-4 flex items-center justify-center">
                            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 140 140">
                                <defs>
                                    <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        {isPassed ? (
                                            <>
                                                <stop offset="0%" stopColor="#60f2ce" />
                                                <stop offset="60%" stopColor="#fefc7c" />
                                                <stop offset="100%" stopColor="#fcbf49" />
                                            </>
                                        ) : (
                                            <>
                                                <stop offset="0%" stopColor="#fefc7c" />
                                                <stop offset="50%" stopColor="#fcbf49" />
                                                <stop offset="100%" stopColor="#ff822d" />
                                            </>
                                        )}
                                    </linearGradient>
                                </defs>
                                <circle 
                                    cx="70" 
                                    cy="70" 
                                    r={radius} 
                                    stroke="currentColor"
                                    className="text-slate-100 dark:text-slate-800"
                                    strokeWidth="12" 
                                    fill="transparent" 
                                />
                                <circle
                                    cx="70"
                                    cy="70"
                                    r={radius}
                                    stroke="url(#scoreGaugeGradient)"
                                    strokeWidth="12"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {score}
                                </span>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff822d] mt-0.5">
                                    Skor Akhir
                                </span>
                            </div>
                        </div>

                        {/* Quick Metrics Breakdown */}
                        <div className="flex justify-center gap-3 sm:gap-4 my-8">
                            <div className="bg-[#fafcfb] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 w-32 shadow-2xs">
                                <span className="text-2xl font-black text-[#0d9488] dark:text-[#60f2ce] block mb-0.5">
                                    {attempt.total_correct}
                                </span>
                                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                                    Benar
                                </span>
                            </div>
                            <div className="bg-[#fafcfb] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 w-32 shadow-2xs">
                                <span className="text-2xl font-black text-[#ff822d] block mb-0.5">
                                    {totalWrong}
                                </span>
                                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                                    Salah
                                </span>
                            </div>
                            <div className="bg-[#fafcfb] dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 w-32 shadow-2xs">
                                <span className="text-2xl font-black text-slate-800 dark:text-slate-200 block mb-0.5">
                                    {attempt.total_questions}
                                </span>
                                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                                    Total Soal
                                </span>
                            </div>
                        </div>

                        {/* Motivational Note */}
                        <div className={`p-5 rounded-2xl max-w-lg mx-auto mb-8 text-xs leading-relaxed font-medium border ${
                            isPassed 
                                ? 'bg-[#60f2ce]/15 dark:bg-[#60f2ce]/10 border-[#60f2ce]/40 dark:border-[#60f2ce]/30' 
                                : 'bg-[#fcbf49]/15 dark:bg-[#fcbf49]/10 border-[#fcbf49]/40 dark:border-[#fcbf49]/30'
                        }`}>
                            <h2 className="font-extrabold text-sm mb-1 text-slate-900 dark:text-white">
                                {isPassed ? 'Kerja Luar Biasa! 🎉' : 'Tetap Semangat & Coba Lagi! 💪'}
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300">
                                {isPassed 
                                    ? 'Pemahaman tata bahasa dan kosakata Anda sudah sangat baik. Pertahankan konsistensi belajarmu!'
                                    : 'Masih ada beberapa konsep yang perlu diperdalam. Terus gunakan fitur Flashcard harian untuk mempertajam insting bahasa Anda.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Link 
                                href="/exams" 
                                className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 transition text-xs shadow-xs flex items-center justify-center gap-2"
                            >
                                <i className="bi bi-card-list"></i>
                                <span>Daftar Ujian</span>
                            </Link>
                            <Link 
                                href="/dashboard" 
                                className="px-6 py-2.5 bg-slate-900 dark:bg-[#60f2ce] hover:bg-slate-800 dark:hover:bg-[#4de1bc] text-white dark:text-slate-950 font-bold rounded-2xl transition text-xs shadow-xs flex items-center justify-center gap-2"
                            >
                                <span>Kembali ke Dashboard</span>
                                <svg className="w-3.5 h-3.5 text-[#60f2ce] dark:text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Explanations Accordion Card */}
                    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none text-left transition-colors">
                        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-xl bg-[#fcbf49]/20 text-[#b45309] dark:text-[#fcbf49] flex items-center justify-center text-sm">
                                <i className="bi bi-lightbulb-fill"></i>
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                                    Kunci Jawaban & Pembahasan
                                </h3>
                                <p className="text-[11px] text-slate-400 dark:text-slate-400">Tinjau penjelasan tiap nomor soal untuk belajar dari kesalahan</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {exam.questions?.map((question, index) => {
                                const isOpen = openExplanationId === question.id;
                                
                                return (
                                    <div 
                                        key={question.id} 
                                        className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/40 transition-all shadow-2xs"
                                    >
                                        <button 
                                            onClick={() => toggleExplanation(question.id)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#fafcfb] dark:hover:bg-slate-800/80 transition-colors focus:outline-none"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                                                    isOpen ? 'bg-[#ff822d] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                                }`}>
                                                    {index + 1}
                                                </span>
                                                <span className={`text-xs sm:text-sm font-bold ${isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                                    Soal Nomor {index + 1}
                                                </span>
                                            </div>
                                            <i className={`bi bi-chevron-down text-xs text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ff822d]' : ''}`}></i>
                                        </button>

                                        {isOpen && (
                                            <div className="p-4 sm:p-5 bg-[#fafcfb] dark:bg-slate-800/70 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
                                                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                                                    {question.question_text}
                                                </p>

                                                {/* Correct Answer Box */}
                                                <div>
                                                    <span className="inline-block px-2.5 py-1 bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/40 dark:border-[#60f2ce]/30 text-[10px] font-bold uppercase rounded-lg mb-1.5">
                                                        Jawaban Benar: {question.correct_answer.toUpperCase()}
                                                    </span>
                                                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium">
                                                        <strong className="text-[#0d9488] dark:text-[#60f2ce] mr-2">
                                                            {question.correct_answer.toUpperCase()}.
                                                        </strong>
                                                        {question.options[question.correct_answer]}
                                                    </div>
                                                </div>

                                                {/* Explanation Box */}
                                                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-l-4 border-[#ff822d] border-t border-r border-b border-slate-100 dark:border-slate-800 shadow-2xs">
                                                    <span className="flex items-center text-[10px] font-bold text-[#ff822d] uppercase tracking-wider mb-1">
                                                        <i className="bi bi-chat-left-text-fill mr-1.5"></i> Pembahasan:
                                                    </span>
                                                    <p className="m-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                        {question.explanation || 'Tidak ada pembahasan khusus untuk nomor ini.'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}