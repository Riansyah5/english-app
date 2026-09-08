import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function StudyItemCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        content: '',
        type: 'word',
        translation: '',
        example_sentence: '',
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/study-items');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Materi Baru" />

            <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
                <div className="flex items-center mb-8">
                    <Link 
                        href="/admin/study-items" 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-4"
                    >
                        <i className="bi bi-arrow-left text-lg"></i>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Tambah Materi Baru 📝</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Masukkan kosakata, frasa, atau aturan grammar baru.</p>
                    </div>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor="content" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Teks (Bahasa Inggris) <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="content" 
                                    value={data.content} 
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="Contoh: Make up your mind"
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.content ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                    autoFocus
                                />
                                {errors.content && <p className="text-rose-500 text-xs mt-1.5">{errors.content}</p>}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Tipe Materi <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    id="type" 
                                    value={data.type} 
                                    onChange={e => setData('type', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.type ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                >
                                    <option value="word">Word (Kata Tunggal)</option>
                                    <option value="phrase">Phrase (Frasa)</option>
                                    <option value="idiom">Idiom</option>
                                    <option value="grammar_rule">Grammar Rule</option>
                                    <option value="speaking_prompt">Speaking Prompt</option>
                                </select>
                                {errors.type && <p className="text-rose-500 text-xs mt-1.5">{errors.type}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="translation" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Terjemahan (Bahasa Indonesia) <span className="text-rose-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="translation" 
                                value={data.translation} 
                                onChange={e => setData('translation', e.target.value)}
                                placeholder="Contoh: Buatlah keputusan / Putuskanlah"
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.translation ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                required
                            />
                            {errors.translation && <p className="text-rose-500 text-xs mt-1.5">{errors.translation}</p>}
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700/50 my-2"></div>

                        <div>
                            <label htmlFor="example_sentence" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Contoh Kalimat <span className="font-normal normal-case text-slate-400">(Opsional)</span>
                            </label>
                            <textarea 
                                id="example_sentence" 
                                value={data.example_sentence} 
                                onChange={e => setData('example_sentence', e.target.value)}
                                rows="3"
                                placeholder="Contoh: You need to make up your mind before the deadline."
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.example_sentence ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                            ></textarea>
                            
                            <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-500/20 flex gap-2 items-start text-sm">
                                <i className="bi bi-info-circle text-blue-500 mt-0.5"></i>
                                <span className="text-slate-600 dark:text-slate-300">Sangat disarankan untuk diisi agar pengguna bisa memahami konteks penggunaannya.</span>
                            </div>
                            
                            {errors.example_sentence && <p className="text-rose-500 text-xs mt-1.5">{errors.example_sentence}</p>}
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Catatan Tambahan <span className="font-normal normal-case text-slate-400">(Opsional)</span>
                            </label>
                            <textarea 
                                id="notes" 
                                value={data.notes} 
                                onChange={e => setData('notes', e.target.value)}
                                rows="2"
                                placeholder="Contoh: Sangat umum digunakan dalam percakapan informal."
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.notes ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                            ></textarea>
                            {errors.notes && <p className="text-rose-500 text-xs mt-1.5">{errors.notes}</p>}
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <Link 
                                href="/admin/study-items" 
                                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <i className="bi bi-save mr-2"></i> {processing ? 'Menyimpan...' : 'Simpan Materi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

