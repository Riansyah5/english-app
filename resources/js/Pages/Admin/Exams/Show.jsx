import React, { useState } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ExamShow({ auth, exam }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        question_text: '',
        options: ['', '', '', ''], // 4 Pilihan ganda
        correct_answer: '',
        explanation: ''
    });

    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const addOption = () => {
        setData('options', [...data.options, '']);
    };

    const removeOption = (index) => {
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/exams/${exam.id}/questions`, {
            onSuccess: () => {
                reset();
                setShowForm(false);
            }
        });
    };

    const handleDeleteQuestion = (questionId) => {
        if (confirm('Hapus soal ini?')) {
            router.delete(`/admin/exams/${exam.id}/questions/${questionId}`);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Kelola Soal: ${exam.title}`} />
            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-4xl mx-auto space-y-7">
                    
                    {/* Header Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <Link href="/admin/exams" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#ff822d] dark:hover:text-[#ff822d] mb-2.5 transition-colors">
                                <i className="bi bi-arrow-left"></i> Kembali ke daftar ujian
                            </Link>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    {exam.title}
                                </h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30">
                                    CBT Manager
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{exam.description || 'Tidak ada deskripsi'}</p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                                showForm
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
                                    : 'bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 shadow-[#fcbf49]/20 hover:opacity-95'
                            }`}
                        >
                            <i className={showForm ? "bi bi-x-lg" : "bi bi-plus-lg"}></i>
                            {showForm ? 'Batal Tambah' : 'Tambah Soal'}
                        </button>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] p-4 rounded-2xl border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 flex items-center gap-3 shadow-xs">
                            <i className="bi bi-check-circle-fill text-lg"></i>
                            <p className="font-bold text-xs">{flash.success}</p>
                        </div>
                    )}

                    {/* Add Question Form Card */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/90 p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/80 space-y-6 transition-colors">
                            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                                <span className="w-2 h-2 rounded-full bg-[#ff822d]"></span>
                                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Form Tambah Soal CBT</h2>
                            </div>
                            
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Pertanyaan <span className="text-[#ff822d]">*</span>
                                </label>
                                <textarea
                                    value={data.question_text}
                                    onChange={e => setData('question_text', e.target.value)}
                                    rows="3"
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.question_text ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs`}
                                    placeholder="Tulis teks pertanyaan evaluasi di sini..."
                                    required
                                />
                                {errors.question_text && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.question_text}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Pilihan Jawaban <span className="text-[#ff822d]">*</span>
                                </label>
                                <div className="space-y-3">
                                    {data.options.map((option, index) => (
                                        <div key={index} className="flex gap-2.5 items-center">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-black text-slate-600 dark:text-slate-300 text-xs flex items-center justify-center shrink-0">
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={e => handleOptionChange(index, e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-[#fafcfb] dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
                                                placeholder={`Isi pilihan ${String.fromCharCode(65 + index)}...`}
                                                required
                                            />
                                            {data.options.length > 2 && (
                                                <button type="button" onClick={() => removeOption(index)} className="w-8 h-8 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-all shrink-0">
                                                    <i className="bi bi-x-circle-fill text-base"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.options && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.options}</p>}
                                <button type="button" onClick={addOption} className="mt-3.5 text-xs text-[#0d9488] dark:text-[#60f2ce] hover:underline font-bold inline-flex items-center gap-1">
                                    <i className="bi bi-plus-circle"></i> Tambah Opsi Pilihan Lain
                                </button>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Jawaban Benar <span className="text-[#ff822d]">*</span>
                                </label>
                                <select
                                    value={data.correct_answer}
                                    onChange={e => setData('correct_answer', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.correct_answer ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-700/80'
                                    } text-slate-800 dark:text-slate-100 shadow-2xs`}
                                    required
                                >
                                    <option value="" disabled className="dark:bg-slate-800">Pilih salah satu jawaban yang benar</option>
                                    {data.options.map((option, index) => (
                                        option && (
                                            <option key={index} value={option} className="dark:bg-slate-800">
                                                Opsi {String.fromCharCode(65 + index)}: {option}
                                            </option>
                                        )
                                    ))}
                                </select>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">Pastikan kolom pilihan jawaban di atas sudah terisi sebelum menentukan kunci jawaban.</p>
                                {errors.correct_answer && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-semibold">{errors.correct_answer}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Penjelasan / Pembahasan <span className="font-medium normal-case text-slate-400 dark:text-slate-500">(Opsional)</span>
                                </label>
                                <textarea
                                    value={data.explanation}
                                    onChange={e => setData('explanation', e.target.value)}
                                    rows="2"
                                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-[#fafcfb] dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs leading-relaxed"
                                    placeholder="Jelaskan alasan atau aturan grammar mengapa jawaban tersebut benar..."
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
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
                                            <i className="bi bi-floppy-fill text-xs"></i>
                                            <span>Simpan Soal</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Questions List Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-1">
                            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                Daftar Soal
                            </h2>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 font-mono">
                                {exam.questions?.length || 0} Butir Soal
                            </span>
                        </div>
                        
                        {exam.questions?.length > 0 ? (
                            exam.questions.map((q, idx) => (
                                <div key={q.id} className="bg-white dark:bg-slate-900/90 p-5 sm:p-6 rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/80 relative group transition-colors">
                                    <button 
                                        onClick={() => handleDeleteQuestion(q.id)}
                                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 w-8 h-8 rounded-xl flex items-center justify-center opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                                        title="Hapus Soal"
                                    >
                                        <i className="bi bi-trash3 text-xs"></i>
                                    </button>
                                    
                                    <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-3 pr-10 leading-snug">
                                        <span className="text-[#0d9488] dark:text-[#60f2ce] mr-2 font-mono font-extrabold">{idx + 1}.</span> {q.question_text}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4 pl-0 sm:pl-6">
                                        {q.options && q.options.map((opt, oIdx) => {
                                            const isCorrect = opt === q.correct_answer;
                                            return (
                                                <div 
                                                    key={oIdx} 
                                                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                                                        isCorrect 
                                                            ? 'bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 border-[#60f2ce]/50 dark:border-[#60f2ce]/40 text-[#0d9488] dark:text-[#60f2ce] font-bold' 
                                                            : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 font-medium'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 truncate pr-2">
                                                        <span className="font-mono font-bold opacity-60 shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                                                        <span className="truncate">{opt}</span>
                                                    </div>
                                                    {isCorrect && <i className="bi bi-check-circle-fill text-sm text-[#0d9488] dark:text-[#60f2ce] shrink-0"></i>}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {q.explanation && (
                                        <div className="pl-0 sm:pl-6 text-xs">
                                            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pembahasan:</span>
                                            <p className="text-slate-600 dark:text-slate-300 bg-amber-50/70 dark:bg-amber-400/10 p-3 rounded-2xl border border-amber-200/70 dark:border-amber-400/20 leading-relaxed font-medium">
                                                {q.explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">
                                <i className="bi bi-ui-checks text-4xl mb-3 block text-slate-300 dark:text-slate-600"></i>
                                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Belum ada butir soal untuk ujian ini.</p>
                                <button onClick={() => setShowForm(true)} className="mt-2 text-[#0d9488] dark:text-[#60f2ce] hover:underline font-bold text-xs">
                                    + Tambah Soal Pertama Sekarang
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}