import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        level: 'Beginner',
        description: '',
        is_published: true
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/shadowing');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Topik Shadowing" />

            <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
                <div className="flex items-center mb-8">
                    <Link 
                        href="/admin/shadowing" 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-4"
                    >
                        <i className="bi bi-arrow-left text-lg"></i>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Tambah Topik Shadowing 🎤</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Buat wadah topik sebelum menambahkan skrip percakapan.</p>
                    </div>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Judul Topik <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Contoh: At the Airport, Ordering Food"
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                    autoFocus
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1.5">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="level" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Level <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    id="level" 
                                    value={data.level} 
                                    onChange={e => setData('level', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.level ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                {errors.level && <p className="text-rose-500 text-xs mt-1.5">{errors.level}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Deskripsi Singkat <span className="font-normal normal-case text-slate-400">(Opsional)</span>
                            </label>
                            <textarea 
                                id="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                placeholder="Ceritakan sedikit konteks percakapan ini..."
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                            ></textarea>
                            {errors.description && <p className="text-rose-500 text-xs mt-1.5">{errors.description}</p>}
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
                                    Langsung Terbitkan (Publik)
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <Link 
                                href="/admin/shadowing" 
                                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <i className="bi bi-save mr-2"></i> {processing ? 'Menyimpan...' : 'Buat Topik & Lanjut Susun Skrip'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

