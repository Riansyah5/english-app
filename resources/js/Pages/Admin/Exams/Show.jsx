import React, { useState } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ExamShow({ auth, exam }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        question_text: '',
        options: ['', '', '', ''], // 4 opsi bawaan (A, B, C, D)
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
        const optionToRemove = data.options[index];
        const newOptions = data.options.filter((_, i) => i !== index);
        
        // Reset correct_answer jika opsi yang dihapus adalah kunci jawaban
        if (data.correct_answer === optionToRemove) {
            setData({
                ...data,
                options: newOptions,
                correct_answer: ''
            });
        } else {
            setData('options', newOptions);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/exams/${exam.id}/questions`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            }
        });
    };

    const handleDeleteQuestion = (questionId) => {
        if (confirm('Hapus butir soal ini secara permanen?')) {
            router.delete(`/admin/exams/${exam.id}/questions/${questionId}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Kelola Soal: ${exam.title}`} />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-5xl mx-auto space-y-6 sm:space-y-7">
                    
                    {/* Header Banner Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 md:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
                            {/* Kiri: Tombol Back, Badges, Judul, & Deskripsi */}
                            <div className="min-w-0 flex-1">
                                <Link 
                                    href="/admin/exams" 
                                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-[#ff822d] transition-colors mb-2 sm:mb-2.5 active:scale-95"
                                >
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    <span>Kembali ke Daftar Ujian</span>
                                </Link>

                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                                    <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 whitespace-nowrap">
                                        Question Builder
                                    </span>
                                    <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/50 whitespace-nowrap">
                                        Durasi: {exam.duration_minutes || 0}m
                                    </span>
                                    <span className="shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                                        {exam.questions?.length || 0} Soal
                                    </span>
                                </div>

                                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug break-words">
                                    {exam.title}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                                    {exam.description || 'Tidak ada deskripsi atau instruksi khusus untuk ujian ini.'}
                                </p>
                            </div>

                            {/* Kanan: Tombol Aksi */}
                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                <Link 
                                    href={`/admin/exams/${exam.id}/edit`}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-2xs hover:bg-slate-50 active:scale-95 transition whitespace-nowrap"
                                >
                                    Edit Ujian
                                </Link>

                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-bold text-[11px] sm:text-xs shadow-sm transition-all whitespace-nowrap active:scale-95 ${
                                        showForm
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            : 'bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 shadow-[#fcbf49]/20 hover:opacity-95 hover:-translate-y-0.5'
                                    }`}
                                >
                                    <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-circle-fill'} text-xs`}></i>
                                    <span>{showForm ? 'Batal' : 'Tambah Soal'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-3.5 sm:p-4 bg-[#60f2ce]/20 border border-[#60f2ce]/50 text-[#0d9488] rounded-2xl text-xs font-bold shadow-xs animate-in fade-in duration-200">
                            <i className="bi bi-check-circle-fill text-base shrink-0"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Form Tambah Soal Card (Collapsible) */}
                    {showForm && (
                        <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-8 md:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] animate-in slide-in-from-top-3 duration-200">
                            <div className="flex items-center justify-between pb-4 mb-5 sm:mb-6 border-b border-slate-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-sm shadow-xs shrink-0">
                                        <i className="bi bi-patch-question-fill"></i>
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">Form Input Butir Soal</h2>
                                        <p className="text-[10px] sm:text-[11px] text-slate-400">Tuliskan pertanyaan, pilihan ganda, dan kunci jawaban</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                                    Multiple Choice
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                
                                {/* Pertanyaan */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Naskah Pertanyaan <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <textarea
                                        value={data.question_text}
                                        onChange={e => setData('question_text', e.target.value)}
                                        rows="3"
                                        className={`w-full p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                            errors.question_text ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                        placeholder="Tuliskan butir pertanyaan atau kalimat rumpang di sini..."
                                        required
                                        autoFocus
                                    />
                                    {errors.question_text && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.question_text}</p>}
                                </div>

                                {/* Opsi Pilihan Ganda */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            Pilihan Jawaban <span className="text-[#ff822d]">*</span>
                                        </label>
                                        <span className="text-[10px] sm:text-[11px] text-slate-400">
                                            Minimal 2 opsi pilihan
                                        </span>
                                    </div>

                                    <div className="space-y-2.5">
                                        {data.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2 sm:gap-2.5">
                                                {/* Label Huruf A, B, C, D */}
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 text-slate-700 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-slate-200/80">
                                                    {String.fromCharCode(65 + index)}
                                                </div>

                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={e => handleOptionChange(index, e.target.value)}
                                                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-slate-200 bg-[#fafcfb] text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all shadow-2xs"
                                                    placeholder={`Teks pilihan ${String.fromCharCode(65 + index)}`}
                                                    required
                                                />

                                                {data.options.length > 2 && (
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeOption(index)} 
                                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-rose-500 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors shrink-0 active:scale-95"
                                                        title="Hapus opsi ini"
                                                    >
                                                        <i className="bi bi-trash3 text-xs"></i>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {errors.options && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.options}</p>}

                                    {data.options.length < 6 && (
                                        <button 
                                            type="button" 
                                            onClick={addOption} 
                                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#0d9488] hover:text-[#0f766e] bg-[#60f2ce]/20 hover:bg-[#60f2ce]/30 px-3 sm:px-3.5 py-1.5 rounded-xl border border-[#60f2ce]/50 transition-colors active:scale-95"
                                        >
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Tambah Opsi ({String.fromCharCode(65 + data.options.length)})</span>
                                        </button>
                                    )}
                                </div>

                                {/* Kunci Jawaban Benar */}
                                <div>
                                    <label htmlFor="correct_answer" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Kunci Jawaban yang Benar <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select
                                        id="correct_answer"
                                        value={data.correct_answer}
                                        onChange={e => setData('correct_answer', e.target.value)}
                                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.correct_answer ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-800 shadow-2xs`}
                                        required
                                    >
                                        <option value="" disabled>-- Pilih salah satu opsi yang benar --</option>
                                        {data.options.map((option, index) => (
                                            option ? (
                                                <option key={index} value={option}>
                                                    Opsi {String.fromCharCode(65 + index)}: {option}
                                                </option>
                                            ) : null
                                        ))}
                                    </select>
                                    <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5">
                                        Pastikan teks pilihan jawaban sudah diisi agar opsi di dropdown ini dapat dipilih.
                                    </p>
                                    {errors.correct_answer && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.correct_answer}</p>}
                                </div>

                                {/* Penjelasan / Pembahasan */}
                                <div>
                                    <label htmlFor="explanation" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Pembahasan / Penjelasan Jawaban <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                    </label>
                                    <textarea
                                        id="explanation"
                                        value={data.explanation}
                                        onChange={e => setData('explanation', e.target.value)}
                                        rows="2"
                                        className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-[#fafcfb] text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed shadow-2xs"
                                        placeholder="Jelaskan kaidah tata bahasa atau alasan mengapa kunci jawaban tersebut tepat..."
                                    />
                                    {errors.explanation && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.explanation}</p>}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5 sm:gap-3">
                                    <button
                                        type="button"
                                        onClick={() => { reset(); setShowForm(false); }}
                                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition shadow-2xs active:scale-95"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 active:scale-95 transition-all ${
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
                                                <i className="bi bi-cloud-arrow-up-fill text-xs"></i>
                                                <span>Simpan Butir Soal</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}

                    {/* Questions List Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-1 gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 truncate">
                                    Daftar Butir Soal
                                </h2>
                                <span className="shrink-0 px-2 sm:px-2.5 py-0.5 bg-[#60f2ce]/20 text-[#0d9488] rounded-full text-[10px] sm:text-xs font-bold border border-[#60f2ce]/50 whitespace-nowrap">
                                    {exam.questions?.length || 0} Soal
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0 whitespace-nowrap">
                                Acak otomatis saat ujian
                            </span>
                        </div>

                        {exam.questions && exam.questions.length > 0 ? (
                            <div className="space-y-4">
                                {exam.questions.map((q, idx) => (
                                    <div 
                                        key={q.id} 
                                        className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.06)] transition-all relative group"
                                    >
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => handleDeleteQuestion(q.id)}
                                            className="absolute top-4 sm:top-5 right-4 sm:right-5 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-2xs active:scale-95"
                                            title="Hapus Butir Soal Ini"
                                        >
                                            <i className="bi bi-trash3 text-xs"></i>
                                        </button>

                                        {/* Question Header */}
                                        <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4 pr-9 sm:pr-12">
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-black text-[11px] sm:text-xs shrink-0 shadow-xs">
                                                {idx + 1}
                                            </span>
                                            <p className="font-extrabold text-xs sm:text-base text-slate-900 leading-snug pt-0.5 break-words">
                                                {q.question_text}
                                            </p>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pl-0 sm:pl-9 mb-3 sm:mb-4">
                                            {q.options && q.options.map((opt, oIdx) => {
                                                const isCorrect = opt === q.correct_answer;
                                                return (
                                                    <div 
                                                        key={oIdx} 
                                                        className={`p-2.5 sm:p-3 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition-all ${
                                                            isCorrect 
                                                                ? 'bg-[#60f2ce]/15 border-[#60f2ce]/60 text-[#0d9488] font-bold shadow-2xs' 
                                                                : 'bg-[#fafcfb] border-slate-100 text-slate-700 font-medium'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 truncate pr-2 min-w-0">
                                                            <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-black shrink-0 ${
                                                                isCorrect 
                                                                    ? 'bg-[#0d9488] text-white' 
                                                                    : 'bg-slate-200/80 text-slate-600'
                                                            }`}>
                                                                {String.fromCharCode(65 + oIdx)}
                                                            </span>
                                                            <span className="truncate">{opt}</span>
                                                        </div>

                                                        {isCorrect && (
                                                            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase bg-white px-2 py-0.5 rounded-full border border-[#60f2ce]/60 text-[#0d9488] shrink-0 font-bold">
                                                                <i className="bi bi-check2-circle"></i>
                                                                <span>Kunci</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Explanation Box */}
                                        {q.explanation && (
                                            <div className="pl-0 sm:pl-9">
                                                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#fafcfb] border border-slate-100 flex items-start gap-2 text-xs">
                                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-[#fcbf49]/20 text-[#b45309] flex items-center justify-center shrink-0 text-[10px] sm:text-xs mt-0.5 font-bold">
                                                        💡
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <span className="font-bold text-slate-800 block text-[10px] sm:text-[11px]">
                                                            Pembahasan Soal:
                                                        </span>
                                                        <p className="text-slate-600 leading-relaxed font-medium m-0 text-xs">
                                                            {q.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white rounded-3xl border border-slate-100 text-center py-12 sm:py-16 px-6 sm:px-8 flex flex-col items-center justify-center min-h-[300px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#fcbf49]/20 text-[#ff822d] flex items-center justify-center text-xl sm:text-2xl mb-3">
                                    <i className="bi bi-patch-question"></i>
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Belum Ada Butir Soal</h3>
                                <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
                                    Paket ujian ini belum memiliki pertanyaan evaluasi. Mulai masukkan butir soal pilihan ganda sekarang.
                                </p>
                                <button 
                                    onClick={() => setShowForm(true)} 
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-full shadow-md shadow-[#fcbf49]/20 hover:opacity-95 active:scale-95 transition"
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    <span>Tambah Soal Pertama</span>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}