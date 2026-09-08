import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonCreate({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        lesson_category_id: categories.length > 0 ? categories[0].id : '',
        youtube_url: '',
        order_number: 1,
        content: '',
        is_published: true
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/lessons');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tulis Materi" />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <div className="flex items-center mb-8">
                    <Link 
                        href="/admin/lessons" 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-4"
                    >
                        <i className="bi bi-arrow-left text-lg"></i>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Tulis Materi Baru ✍️</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Tulis konten HTML/Markdown untuk buku digital.</p>
                    </div>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Judul Materi <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                    autoFocus
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1.5">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="lesson_category_id" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Kategori <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    id="lesson_category_id" 
                                    value={data.lesson_category_id} 
                                    onChange={e => setData('lesson_category_id', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.lesson_category_id ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                >
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.lesson_category_id && <p className="text-rose-500 text-xs mt-1.5">{errors.lesson_category_id}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="order_number" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Urutan Bab <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="order_number" 
                                    min="1"
                                    value={data.order_number} 
                                    onChange={e => setData('order_number', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.order_number ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                />
                                {errors.order_number && <p className="text-rose-500 text-xs mt-1.5">{errors.order_number}</p>}
                            </div>

                            <div>
                                <label htmlFor="youtube_url" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Link YouTube <span className="font-normal normal-case text-slate-400">(Opsional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="youtube_url" 
                                    value={data.youtube_url} 
                                    onChange={e => setData('youtube_url', e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.youtube_url ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                />
                                {errors.youtube_url && <p className="text-rose-500 text-xs mt-1.5">{errors.youtube_url}</p>}
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700/50 my-2"></div>

                        <div>
                            <label htmlFor="content" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Isi Materi (HTML) <span className="text-rose-500">*</span>
                            </label>
                            <textarea 
                                id="content" 
                                value={data.content} 
                                onChange={e => setData('content', e.target.value)}
                                rows="15"
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.content ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white font-mono text-sm leading-relaxed`}
                                required
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-2">Gunakan tag HTML standar (h1, h2, p, ul, strong) untuk memformat buku digital Anda. Tailwind Typography (prose) akan me-render konten ini di sisi pengguna secara otomatis.</p>
                            {errors.content && <p className="text-rose-500 text-xs mt-1.5">{errors.content}</p>}
                        </div>

                        <div className="flex items-center mt-2">
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.is_published}
                                    onChange={e => setData('is_published', e.target.checked)}
                                    className="w-5 h-5 text-blue-600 rounded bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                />
                                <span className="ml-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Terbitkan Sekarang (Tampil ke Pengguna)
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <Link 
                                href="/admin/lessons" 
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

