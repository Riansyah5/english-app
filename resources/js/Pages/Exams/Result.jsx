import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ExamResult({ auth, exam, attempt }) {
    const { flash } = usePage().props;
    const [openExplanationId, setOpenExplanationId] = useState(null);

    const isPassed = attempt.score >= 70;

    const toggleExplanation = (id) => {
        setOpenExplanationId(prev => prev === id ? null : id);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Hasil Evaluasi" />

            <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10 text-center">
                
                {flash?.success && (
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium mb-6">
                        <i className="bi bi-check-circle-fill mr-2 text-lg"></i>
                        {flash.success}
                    </div>
                )}

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Hasil Evaluasi</h3>
                    <h6 className="text-slate-500 dark:text-slate-400 font-medium mb-10">{exam.title}</h6>

                    <div className={`mx-auto w-40 h-40 rounded-full flex items-center justify-center border-4 mb-8 bg-slate-50 dark:bg-slate-800/50 ${
                        isPassed ? 'border-emerald-500' : 'border-rose-500'
                    }`}>
                        <h1 className="text-6xl font-bold text-slate-900 dark:text-white m-0 tracking-tighter">
                            {attempt.score}
                        </h1>
                    </div>

                    <div className="flex justify-center gap-4 sm:gap-6 mb-10">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 w-32">
                            <h4 className="text-2xl font-bold text-emerald-600 dark:text-emerald-500 mb-1">{attempt.total_correct}</h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Benar</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 w-32">
                            <h4 className="text-2xl font-bold text-rose-600 dark:text-rose-500 mb-1">
                                {attempt.total_questions - attempt.total_correct}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Salah</span>
                        </div>
                    </div>

                    <div className="mb-10 max-w-md mx-auto">
                        {isPassed ? (
                            <>
                                <h5 className="font-bold text-xl text-emerald-600 dark:text-emerald-500 mb-2">Kerja Bagus! 🎉</h5>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    Pemahaman tata bahasa Anda sudah sangat baik. Pertahankan progres belajarmu!
                                </p>
                            </>
                        ) : (
                            <>
                                <h5 className="font-bold text-xl text-amber-500 mb-2">Jangan Menyerah! 💪</h5>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    Masih ada ruang untuk perbaikan. Terus gunakan fitur <i>Flashcard</i> setiap hari untuk memperkuat insting bahasa Anda.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
                        <Link 
                            href="/exams" 
                            className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                        >
                            <i className="bi bi-card-list mr-2"></i> Daftar Ujian
                        </Link>
                        <Link 
                            href="/home" 
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm"
                        >
                            <i className="bi bi-house mr-2"></i> Dashboard
                        </Link>
                    </div>

                    {/* Explanations Accordion */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-left">
                        <div className="flex items-center mb-6">
                            <i className="bi bi-lightbulb-fill text-amber-500 text-xl mr-3"></i>
                            <h5 className="font-bold text-lg text-slate-900 dark:text-white m-0">Kunci Jawaban & Pembahasan</h5>
                        </div>

                        <div className="flex flex-col gap-3">
                            {exam.questions.map((question, index) => {
                                const isOpen = openExplanationId === question.id;
                                
                                return (
                                    <div key={question.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/50">
                                        <button 
                                            onClick={() => toggleExplanation(question.id)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none"
                                        >
                                            <span className={`text-sm font-semibold ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                Soal {index + 1}
                                            </span>
                                            <i className={`bi bi-chevron-down text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] border-t border-slate-100 dark:border-slate-700' : 'max-h-0'}`}>
                                            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/50">
                                                <p className="mb-5 text-sm font-semibold text-slate-900 dark:text-slate-200 leading-relaxed">
                                                    {question.question_text}
                                                </p>

                                                <div className="mb-5">
                                                    <span className="inline-block px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold rounded mb-2">
                                                        JAWABAN BENAR: {question.correct_answer.toUpperCase()}
                                                    </span>
                                                    <div className="p-3 bg-slate-200/50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                                        <span className="text-sm text-slate-800 dark:text-slate-300">
                                                            <strong className="text-emerald-600 dark:text-emerald-500 mr-2">
                                                                {question.correct_answer.toUpperCase()}.
                                                            </strong> 
                                                            {question.options[question.correct_answer]}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-white dark:bg-slate-800 shadow-sm">
                                                    <span className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                                                        <i className="bi bi-chat-left-text mr-1.5"></i> Pembahasan:
                                                    </span>
                                                    <p className="m-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        {question.explanation || 'Tidak ada pembahasan untuk soal ini.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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

