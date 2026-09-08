import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function LessonCategoryEdit({ auth, lessonCategory }) {
    const { data, setData, put, processing, errors } = useForm({
        name: lessonCategory.name || '',
        description: lessonCategory.description || '',
        icon: lessonCategory.icon || 'bi-book-half'
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/lesson-categories/${lessonCategory.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Kategori Materi" />

            <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
                <div className="flex items-center mb-8">
                    <Link 
                        href="/admin/lesson-categories" 
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-4"
                    >
                        <i className="bi bi-arrow-left text-lg"></i>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Edit Kategori 📖</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm m-0">Perbarui nama atau deskripsi kategori materi digital.</p>
                    </div>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Nama Kategori <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                    autoFocus
                                />
                                {errors.name && <p className="text-rose-500 text-xs mt-1.5">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="icon" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Ikon (Bootstrap)
                                </label>
                                <input 
                                    type="text" 
                                    id="icon" 
                                    value={data.icon} 
                                    onChange={e => setData('icon', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.icon ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                />
                                {errors.icon && <p className="text-rose-500 text-xs mt-1.5">{errors.icon}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Deskripsi <span className="font-normal normal-case text-slate-400">(Opsional)</span>
                            </label>
                            <textarea 
                                id="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                            ></textarea>
                            {errors.description && <p className="text-rose-500 text-xs mt-1.5">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end items-center gap-3 mt-4">
                            <Link 
                                href="/admin/lesson-categories" 
                                className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <i className="bi bi-cloud-arrow-up mr-2"></i> {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

