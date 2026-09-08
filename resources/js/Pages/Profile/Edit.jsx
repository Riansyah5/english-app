import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ProfileEdit({ auth, user }) {
    const { flash } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        daily_goal: user.daily_goal || 15,
    });

    const submit = (e) => {
        e.preventDefault();
        put('/profile');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pengaturan Profil" />

            <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mr-4">
                            <i className="bi bi-gear-fill text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white m-0">Pengaturan Profil</h3>
                    </div>

                    {flash?.success && (
                        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
                            <i className="bi bi-check-circle-fill mr-2 text-lg"></i>
                            {flash.success}
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nama Lengkap</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                required
                            />
                            {errors.name && <p className="text-rose-500 text-xs mt-1.5">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email (Tidak bisa diubah)</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={user.email} 
                                disabled
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label htmlFor="daily_goal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Target Belajar Harian (Flashcard)</label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    id="daily_goal" 
                                    value={data.daily_goal} 
                                    onChange={e => setData('daily_goal', e.target.value)}
                                    min="5" max="100"
                                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${errors.daily_goal ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} text-slate-900 dark:text-white`}
                                    required
                                />
                                <div className="absolute right-0 top-0 bottom-0 px-4 flex items-center bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 rounded-r-xl text-slate-500 dark:text-slate-400 text-sm font-medium">
                                    Kartu / Hari
                                </div>
                            </div>
                            {errors.daily_goal && <p className="text-rose-500 text-xs mt-1.5">{errors.daily_goal}</p>}
                            <p className="text-xs text-slate-500 mt-2">
                                Direkomendasikan 15-30 kartu per hari untuk retensi memori yang optimal tanpa membuat otak kelelahan.
                            </p>
                        </div>

                        <div className="mt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className={`w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

