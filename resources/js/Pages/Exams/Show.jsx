import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ExamShow({ auth, exam }) {
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState((exam?.duration_minutes || 30) * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleOptionChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (isSubmitting) return;

        if (e && !confirm('Apakah Anda yakin sudah selesai dan ingin mengumpulkan ujian ini?')) {
            return;
        }

        setIsSubmitting(true);
        router.post(`/exams/${exam.id}/submit`, { answers });
    };

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = exam.questions?.length || 0;
    const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    const isCriticalTime = timeLeft < 300; // di bawah 5 menit

    const scrollToQuestion = (idx) => {
        const el = document.getElementById(`question-${idx}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`CBT - ${exam.title}`} />

            {/* Sticky Header Bar */}
            <div className="sticky top-[64px] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="truncate">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    CBT Active
                                </span>
                                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white truncate">
                                    {exam.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mt-1">
                                <span>Terjawab: <strong className="text-slate-800 dark:text-slate-200 font-bold">{answeredCount}</strong> / {totalQuestions} Soal</span>
                                <span>&bull;</span>
                                <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                                    <div 
                                        className="bg-gradient-to-r from-[#60f2ce] via-[#fcbf49] to-[#ff822d] h-1.5 rounded-full transition-all duration-300"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sisa Waktu Pill */}
                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs shadow-xs border transition-all ${
                                isCriticalTime 
                                    ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 animate-pulse' 
                                    : 'bg-[#ff822d]/10 dark:bg-[#ff822d]/20 text-[#c2410c] dark:text-[#ff822d] border-[#ff822d]/30'
                            }`}>
                                <i className="bi bi-stopwatch text-sm"></i>
                                <span>Sisa Waktu:</span>
                                <span className="font-mono text-sm tracking-wider font-extrabold">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-4 sm:p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7">
                    
                    {/* Main Questions List */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {exam.questions && exam.questions.length > 0 ? (
                                exam.questions.map((question, index) => {
                                    const isAnswered = answers[question.id] !== undefined;

                                    return (
                                        <div 
                                            key={question.id} 
                                            id={`question-${index}`}
                                            className={`bg-white dark:bg-slate-900/90 rounded-3xl border p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-all ${
                                                isAnswered 
                                                    ? 'border-[#60f2ce]/60 dark:border-[#60f2ce]/40' 
                                                    : 'border-slate-100 dark:border-slate-800/80'
                                            }`}
                                        >
                                            {/* Question Header */}
                                            <div className="flex items-start gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs transition-colors ${
                                                    isAnswered 
                                                        ? 'bg-gradient-to-br from-[#60f2ce] to-[#0d9488] text-white' 
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <h2 className="font-bold text-base sm:text-[17px] text-slate-900 dark:text-white leading-relaxed pt-1">
                                                    {question.question_text}
                                                </h2>
                                            </div>

                                            {/* Options Choices */}
                                            <div className="space-y-2.5">
                                                {Object.entries(question.options || {}).map(([key, text]) => {
                                                    const isSelected = answers[question.id] === key;

                                                    return (
                                                        <label 
                                                            key={key} 
                                                            className={`flex items-center p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                                                                isSelected 
                                                                    ? 'bg-gradient-to-r from-[#60f2ce]/15 via-[#fefc7c]/10 to-white dark:from-[#60f2ce]/20 dark:via-[#fcbf49]/10 dark:to-slate-900 border-[#60f2ce] dark:border-[#60f2ce]/60 shadow-2xs' 
                                                                    : 'bg-[#fafcfb] dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700'
                                                            }`}
                                                        >
                                                            <input 
                                                                type="radio" 
                                                                name={`q_${question.id}`} 
                                                                value={key} 
                                                                checked={isSelected}
                                                                onChange={() => handleOptionChange(question.id, key)}
                                                                className="sr-only" 
                                                            />

                                                            {/* Custom Indicator Pill */}
                                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs uppercase shrink-0 transition-all ${
                                                                isSelected 
                                                                    ? 'bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white shadow-xs' 
                                                                    : 'bg-white dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-slate-300 dark:group-hover:border-slate-600'
                                                            }`}>
                                                                {key}
                                                            </div>

                                                            <span className={`ml-3.5 text-xs sm:text-sm leading-relaxed transition-colors ${
                                                                isSelected 
                                                                    ? 'font-bold text-slate-900 dark:text-white' 
                                                                    : 'font-medium text-slate-600 dark:text-slate-300'
                                                            }`}>
                                                                {text}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/60">
                                    Daftar soal belum tersedia untuk paket ujian ini.
                                </div>
                            )}

                            {/* Submit Card Box */}
                            <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-8 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none transition-colors">
                                <div className="w-13 h-13 mx-auto rounded-2xl bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] flex items-center justify-center text-2xl mb-3">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">Sudah Yakin dengan Jawaban Anda?</h3>
                                <p className="text-xs text-slate-400 dark:text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                                    Periksa nomor soal melalui navigasi cepat di samping sebelum mengakhiri sesi ujian ini.
                                </p>
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent mr-1"></span>
                                            <span>Mengumpulkan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Selesai & Kumpulkan Ujian</span>
                                            <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Question Number Grid Navigator */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none sticky top-[150px] transition-colors">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Navigasi Soal</h3>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Klik nomor untuk menuju ke soal</p>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fcbf49]/20 dark:bg-[#fcbf49]/15 text-[#b45309] dark:text-[#fbbf24] border border-[#fcbf49]/40 dark:border-[#fcbf49]/30">
                                    {answeredCount}/{totalQuestions}
                                </span>
                            </div>

                            {/* Numbers Grid */}
                            <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
                                {exam.questions?.map((q, idx) => {
                                    const isAnswered = answers[q.id] !== undefined;

                                    return (
                                        <button 
                                            key={q.id}
                                            type="button"
                                            onClick={() => scrollToQuestion(idx)}
                                            className={`h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center border ${
                                                isAnswered 
                                                    ? 'bg-[#60f2ce] text-slate-950 border-[#60f2ce] shadow-xs' 
                                                    : 'bg-[#fafcfb] dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                            title={`Menuju nomor ${idx + 1}`}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Legend Information */}
                            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-[#60f2ce] border border-[#60f2ce]"></span>
                                    <span>Sudah Diisi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-[#fafcfb] dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></span>
                                    <span>Belum Diisi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}