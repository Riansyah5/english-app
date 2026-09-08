import React from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingShow({ auth, shadowing }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        character_name: '',
        voice_gender: 'male',
        text_en: '',
        text_id: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/shadowing/${shadowing.id}/lines`, {
            preserveScroll: true,
            onSuccess: () => reset('character_name', 'text_en', 'text_id')
        });
    };

    const handleDeleteLine = (id) => {
        if (confirm('Hapus baris dialog ini?')) {
            router.delete(`/admin/shadowing/lines/${id}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Builder: ${shadowing.title}`} />

            <div className="container mx-auto px-4 py-8 relative z-10">
                
                {/* Header Section */}
                <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <i className="bi bi-mic-fill text-9xl text-violet-500"></i>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-6">
                        <div>
                            <Link 
                                href="/admin/shadowing" 
                                className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-4"
                            >
                                <i className="bi bi-arrow-left mr-2"></i> Kembali ke Daftar
                            </Link>
                            
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
                                    Script Builder
                                </span>
                                <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                    {shadowing.level}
                                </span>
                            </div>
                            
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{shadowing.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">{shadowing.description || 'Tidak ada deskripsi.'}</p>
                        </div>
                    </div>
                </div>

                {flash?.success && (
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
                        <i className="bi bi-check-circle-fill mr-2 text-lg"></i>
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Form Add Line */}
                    <div className="lg:col-span-1">
                        <div className="glass dark:glass-dark rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-8">
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Tambah Dialog</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Tambahkan baris percakapan baru.</p>
                            </div>

                            <form onSubmit={submit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nama Karakter</label>
                                        <input 
                                            type="text" 
                                            value={data.character_name}
                                            onChange={e => setData('character_name', e.target.value)}
                                            placeholder="Misal: John"
                                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                            required
                                        />
                                        {errors.character_name && <p className="text-rose-500 text-xs mt-1">{errors.character_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Jenis Suara (AI)</label>
                                        <select 
                                            value={data.voice_gender}
                                            onChange={e => setData('voice_gender', e.target.value)}
                                            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                            required
                                        >
                                            <option value="male">Laki-laki (Male)</option>
                                            <option value="female">Perempuan (Female)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Teks Inggris</label>
                                    <textarea 
                                        value={data.text_en}
                                        onChange={e => setData('text_en', e.target.value)}
                                        rows="3"
                                        placeholder="Teks yang akan dibaca AI..."
                                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                        required
                                    ></textarea>
                                    {errors.text_en && <p className="text-rose-500 text-xs mt-1">{errors.text_en}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Terjemahan Indonesia</label>
                                    <textarea 
                                        value={data.text_id}
                                        onChange={e => setData('text_id', e.target.value)}
                                        rows="3"
                                        placeholder="Terjemahan untuk membantu user..."
                                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                                        required
                                    ></textarea>
                                    {errors.text_id && <p className="text-rose-500 text-xs mt-1">{errors.text_id}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className={`w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <i className="bi bi-plus-circle-fill mr-2"></i> {processing ? 'Menyimpan...' : 'Tambahkan Baris'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Preview Lines */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Preview Percakapan</h4>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                                Total: {shadowing.lines.length} Baris
                            </span>
                        </div>

                        {shadowing.lines.length === 0 ? (
                            <div className="glass dark:glass-dark rounded-3xl p-12 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                                <i className="bi bi-chat-square-dots text-5xl text-slate-300 dark:text-slate-700 mb-4"></i>
                                <h5 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Belum ada percakapan</h5>
                                <p className="text-slate-500 text-sm max-w-sm">Mulai tambahkan baris dialog menggunakan form di sebelah kiri.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {shadowing.lines.map((line) => (
                                    <div key={line.id} className="glass dark:glass-dark rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 relative group">
                                        
                                        <div className="flex-shrink-0 flex flex-col items-center gap-2 w-16">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${
                                                line.voice_gender === 'female' 
                                                ? 'bg-pink-100 dark:bg-pink-500/20 text-pink-500 border border-pink-200 dark:border-pink-500/30' 
                                                : 'bg-blue-100 dark:bg-blue-500/20 text-blue-500 border border-blue-200 dark:border-blue-500/30'
                                            }`}>
                                                <i className={`bi bi-person-fill`}></i>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase text-center truncate w-full">
                                                {line.character_name}
                                            </span>
                                        </div>

                                        <div className="flex-grow">
                                            <p className="text-slate-900 dark:text-white font-medium mb-1">{line.text_en}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">{line.text_id}</p>
                                        </div>

                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleDeleteLine(line.id)}
                                                className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors border border-rose-200 dark:border-rose-500/30"
                                                title="Hapus baris ini"
                                            >
                                                <i className="bi bi-trash3 text-sm"></i>
                                            </button>
                                        </div>
                                        
                                        {/* Order Badge (Decorative) */}
                                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-slate-900">
                                            {line.order_number}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

