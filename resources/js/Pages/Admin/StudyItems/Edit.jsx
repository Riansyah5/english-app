import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function StudyItemEdit({ auth, studyItem }) {
    const { data, setData, put, processing, errors } = useForm({
        content: studyItem.content || '',
        type: studyItem.type || 'word',
        translation: studyItem.translation || '',
        example_sentence: studyItem.example_sentence || '',
        notes: studyItem.notes || ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/study-items/${studyItem.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit Materi - ${studyItem.content}`} />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-3xl mx-auto space-y-7">
                    
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                            <Link 
                                href="/admin/study-items" 
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#ff822d] hover:border-[#ff822d]/40 shadow-xs transition-all"
                                title="Kembali ke Bank Materi"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </Link>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                        Edit Materi ✏️
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/50">
                                        ID #{studyItem.id}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">
                                    Perbarui konten kosakata, terjemahan, atau konteks tata bahasa.
                                </p>
                            </div>
                        </div>

                        <Link 
                            href="/admin/study-items" 
                            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                        >
                            Batal & Kembali
                        </Link>
                    </div>

                    {/* Form Container Card */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input Rows: Content & Type */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                <div className="md:col-span-6">
                                    <label htmlFor="content" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Teks (Bahasa Inggris) <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="content" 
                                        value={data.content} 
                                        onChange={e => setData('content', e.target.value)}
                                        placeholder="Contoh: Make up your mind"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.content ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                        required
                                        autoFocus
                                    />
                                    {errors.content && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.content}</p>}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="type" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Tipe Materi <span className="text-[#ff822d]">*</span>
                                    </label>
                                    <select 
                                        id="type" 
                                        value={data.type} 
                                        onChange={e => setData('type', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                            errors.type ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                        } text-slate-800 shadow-2xs`}
                                        required
                                    >
                                        <option value="word">Word (Kata Tunggal)</option>
                                        <option value="phrase">Phrase (Frasa)</option>
                                        <option value="idiom">Idiom</option>
                                        <option value="grammar_rule">Grammar Rule</option>
                                        <option value="speaking_prompt">Speaking Prompt</option>
                                    </select>
                                    {errors.type && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.type}</p>}
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="level" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Level <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                    </label>
                                    <select
                                        id="level"
                                        value={data.level}
                                        onChange={e => setData('level', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-xs font-bold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#ff822d] focus:border-[#ff822d] outline-none transition-all ${errors.level ? "border-rose-400 bg-rose-50/30" : "border-slate-200"} text-slate-800 shadow-2xs`}
                                    >
                                        <option value="">Semua Level</option>
                                        <option value="A1">A1 (Beginner)</option>
                                        <option value="A2">A2 (Elementary)</option>
                                        <option value="B1">B1 (Intermediate)</option>
                                        <option value="B2">B2 (Upper Intermediate)</option>
                                        <option value="C1">C1 (Advanced)</option>
                                        <option value="C2">C2 (Mastery)</option>
                                    </select>
                                    {errors.level && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.level}</p>}
                                </div>
                            </div>

                            {/* Translation Input */}
                            <div>
                                <label htmlFor="translation" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Terjemahan (Bahasa Indonesia) <span className="text-[#ff822d]">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="translation" 
                                    value={data.translation} 
                                    onChange={e => setData('translation', e.target.value)}
                                    placeholder="Contoh: Buatlah keputusan / Putuskanlah"
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                        errors.translation ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                    required
                                />
                                {errors.translation && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.translation}</p>}
                            </div>

                            {/* Example Sentence Input */}
                            <div>
                                <label htmlFor="example_sentence" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Contoh Kalimat <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                </label>
                                <textarea 
                                    id="example_sentence" 
                                    value={data.example_sentence} 
                                    onChange={e => setData('example_sentence', e.target.value)}
                                    rows="3"
                                    placeholder="Contoh: You need to make up your mind before the deadline."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.example_sentence ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />

                                {/* Info Banner */}
                                <div className="mt-2 p-3 bg-[#60f2ce]/15 rounded-2xl border border-[#60f2ce]/40 flex gap-2.5 items-start text-xs text-[#0d9488]">
                                    <i className="bi bi-lightbulb-fill text-sm shrink-0"></i>
                                    <span className="font-medium">
                                        Perubahan kalimat contoh akan langsung disinkronkan ke kartu flashcard pengguna yang mempelajari materi ini.
                                    </span>
                                </div>
                                {errors.example_sentence && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.example_sentence}</p>}
                            </div>

                            {/* Additional Notes Input */}
                            <div>
                                <label htmlFor="notes" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Catatan Tambahan <span className="font-medium normal-case text-slate-400">(Opsional)</span>
                                </label>
                                <textarea 
                                    id="notes" 
                                    value={data.notes} 
                                    onChange={e => setData('notes', e.target.value)}
                                    rows="2"
                                    placeholder="Contoh: Sangat umum digunakan dalam percakapan informal sehari-hari."
                                    className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-medium bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                        errors.notes ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                    } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                />
                                {errors.notes && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.notes}</p>}
                            </div>

                            {/* Actions Bar */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                                <Link 
                                    href="/admin/study-items" 
                                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition shadow-2xs"
                                >
                                    Batal
                                </Link>
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
                                            <i className="bi bi-check2-circle text-xs"></i>
                                            <span>Simpan Perubahan</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
