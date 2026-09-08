import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ExamShow({ auth, exam }) {
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(exam.duration_minutes * 60);
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`CBT - ${exam.title}`} />

            {/* Sticky Header */}
            <div className="sticky top-[64px] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-1">{exam.title}</h4>
                            <p className="text-slate-500 text-xs m-0">Pastikan koneksi internet stabil sebelum mengirimkan jawaban.</p>
                        </div>
                        <div className="shrink-0">
                            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border ${
                                timeLeft < 300 
                                ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 animate-pulse' 
                                : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                            }`}>
                                <i className="bi bi-stopwatch text-lg"></i>
                                Sisa Waktu: {formatTime(timeLeft)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 pb-20 max-w-3xl relative z-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        {exam.questions.map((question, index) => (
                            <div key={question.id} className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                                        <span className="font-bold text-slate-700 dark:text-slate-300">{index + 1}</span>
                                    </div>
                                    <h5 className="font-bold text-lg text-slate-900 dark:text-white leading-relaxed pt-1.5 m-0">
                                        {question.question_text}
                                    </h5>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {Object.entries(question.options).map(([key, text]) => {
                                        const isSelected = answers[question.id] === key;
                                        return (
                                            <label 
                                                key={key} 
                                                className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer group ${
                                                    isSelected 
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-sm' 
                                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name={`q_${question.id}`} 
                                                    value={key}
                                                    checked={isSelected}
                                                    onChange={() => handleOptionChange(question.id, key)}
                                                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                                />
                                                <div className="ml-3 flex-grow">
                                                    <span className={`font-bold mr-2 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                                        {key.toUpperCase()}.
                                                    </span>
                                                    <span className={`text-sm ${isSelected ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {text}
                                                    </span>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass dark:glass-dark rounded-3xl p-8 sm:p-10 text-center mt-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <i className="bi bi-shield-check text-5xl text-blue-500 block mb-4"></i>
                        <h5 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Selesai Mengerjakan?</h5>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
                            Pastikan Anda telah meninjau kembali seluruh jawaban sebelum mengirimkan hasil ujian ini.
                        </p>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <><span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></span> Memproses...</>
                            ) : (
                                <><i className="bi bi-send-check text-xl mr-2"></i> Selesai & Kumpulkan Ujian</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

