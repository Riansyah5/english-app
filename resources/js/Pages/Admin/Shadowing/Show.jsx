import React, { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';

export default function ShadowingShow({ auth, shadowing }) {
    const { flash } = usePage().props;
    const [playingLineId, setPlayingLineId] = useState(null);

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

    // Test audio TTS langsung di browser
    const playPreviewTTS = (text, gender, lineId) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        setPlayingLineId(lineId);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = gender === 'male' ? 0.9 : 1.1;

        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => 
            v.lang.startsWith('en') && 
            (gender === 'male' ? (v.name.includes('Male') || v.name.includes('Guy')) : (v.name.includes('Female') || v.name.includes('Jenny') || v.name.includes('Aria')))
        );

        if (matchingVoice) utterance.voice = matchingVoice;

        utterance.onend = () => setPlayingLineId(null);
        utterance.onerror = () => setPlayingLineId(null);

        window.speechSynthesis.speak(utterance);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Builder: ${shadowing.title}`} />

            <div className="min-h-screen bg-[#fafcfb] text-slate-800 p-6 md:p-8 font-sans">
                <div className="max-w-7xl mx-auto space-y-7">
                    
                    {/* Header Banner Section */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-[#fefc7c]/40 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-5">
                            <div>
                                <Link 
                                    href="/admin/shadowing" 
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#ff822d] transition-colors mb-3"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    <span>Kembali ke Daftar Topik</span>
                                </Link>

                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                        Dialog Builder Studio
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fcbf49]/20 text-[#b45309] border border-[#fcbf49]/50">
                                        {shadowing.level || 'General'}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                        {shadowing.lines?.length || 0} Dialog
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                                    {shadowing.title}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
                                    {shadowing.description || 'Tidak ada deskripsi situasi percakapan.'}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <Link 
                                    href={`/shadowing/${shadowing.slug}`} 
                                    target="_blank"
                                    className="px-4 py-2 text-xs font-semibold text-[#0d9488] bg-[#60f2ce]/20 border border-[#60f2ce]/50 rounded-full shadow-xs hover:bg-[#60f2ce]/30 transition flex items-center gap-1.5"
                                >
                                    <i className="bi bi-play-circle-fill"></i>
                                    <span>Uji Sesi Shadowing</span>
                                </Link>
                                <Link 
                                    href={`/admin/shadowing/${shadowing.id}/edit`} 
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition"
                                >
                                    Edit Topik
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Flash Notification */}
                    {flash?.success && (
                        <div className="flex items-center gap-2.5 p-4 bg-[#60f2ce]/20 border border-[#60f2ce]/50 text-[#0d9488] rounded-2xl text-xs font-bold shadow-xs">
                            <i className="bi bi-check-circle-fill text-base"></i>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                        
                        {/* Left Column: Form Add Line */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] sticky top-6">
                                <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fcbf49] to-[#ff822d] text-white flex items-center justify-center text-sm shadow-xs">
                                        <i className="bi bi-plus-lg"></i>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-extrabold text-slate-900 leading-tight">Tambah Baris Dialog</h2>
                                        <p className="text-[11px] text-slate-400">Tambahkan kalimat percakapan berikutnya</p>
                                    </div>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                                Nama Karakter <span className="text-[#ff822d]">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                value={data.character_name}
                                                onChange={e => setData('character_name', e.target.value)}
                                                placeholder="Misal: Alex"
                                                className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-2xl border bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${
                                                    errors.character_name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                                } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                                required
                                            />
                                            {errors.character_name && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.character_name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                                Suara AI TTS <span className="text-[#ff822d]">*</span>
                                            </label>
                                            <select 
                                                value={data.voice_gender}
                                                onChange={e => setData('voice_gender', e.target.value)}
                                                className="w-full px-3.5 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all text-slate-800 shadow-2xs"
                                                required
                                            >
                                                <option value="male">Laki-laki (Male)</option>
                                                <option value="female">Perempuan (Female)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Kalimat Bahasa Inggris <span className="text-[#ff822d]">*</span>
                                        </label>
                                        <textarea 
                                            value={data.text_en}
                                            onChange={e => setData('text_en', e.target.value)}
                                            rows="3"
                                            placeholder="Teks yang akan diucapkan dan dinilai akurasinya..."
                                            className={`w-full p-3.5 text-xs font-medium rounded-2xl border bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                                errors.text_en ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                            } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                            required
                                        />
                                        {errors.text_en && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.text_en}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Terjemahan Bahasa Indonesia <span className="text-[#ff822d]">*</span>
                                        </label>
                                        <textarea 
                                            value={data.text_id}
                                            onChange={e => setData('text_id', e.target.value)}
                                            rows="2"
                                            placeholder="Terjemahan penjelas konteks..."
                                            className={`w-full p-3.5 text-xs font-medium rounded-2xl border bg-[#fafcfb] focus:bg-white focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all leading-relaxed ${
                                                errors.text_id ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                                            } text-slate-900 placeholder:text-slate-400 shadow-2xs`}
                                            required
                                        />
                                        {errors.text_id && <p className="text-rose-500 text-xs font-semibold mt-1">{errors.text_id}</p>}
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className={`w-full py-3 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-bold text-xs rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 ${
                                            processing ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent"></span>
                                                <span>Menyimpan Baris...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-plus-circle-fill text-sm"></i>
                                                <span>Tambahkan Baris Dialog</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Preview Lines List */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center justify-between pb-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-extrabold text-slate-900">Alur Percakapan</h2>
                                    <span className="px-2.5 py-0.5 bg-[#60f2ce]/20 text-[#0d9488] rounded-full text-xs font-bold border border-[#60f2ce]/50">
                                        {shadowing.lines?.length || 0} Baris
                                    </span>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">
                                    Urutan otomatis berdasarkan input
                                </span>
                            </div>

                            {shadowing.lines && shadowing.lines.length > 0 ? (
                                <div className="space-y-3">
                                    {shadowing.lines.map((line) => {
                                        const isMale = line.voice_gender === 'male';
                                        const isPlaying = playingLineId === line.id;

                                        return (
                                            <div 
                                                key={line.id} 
                                                className="bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.06)] transition-all flex items-start gap-4 group relative"
                                            >
                                                {/* Speaker Avatar Badge */}
                                                <div className="shrink-0 flex flex-col items-center gap-1.5 w-16 text-center">
                                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-black shadow-xs ${
                                                        isMale 
                                                            ? 'bg-[#60f2ce]/25 text-[#0d9488] border border-[#60f2ce]/50' 
                                                            : 'bg-[#ff822d]/15 text-[#c2410c] border border-[#ff822d]/35'
                                                    }`}>
                                                        <i className="bi bi-person-fill"></i>
                                                    </div>
                                                    <span className="text-[10px] font-extrabold text-slate-700 uppercase truncate w-full tracking-wider">
                                                        {line.character_name}
                                                    </span>
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono uppercase ${
                                                        isMale ? 'bg-slate-100 text-slate-500' : 'bg-orange-50 text-[#c2410c]'
                                                    }`}>
                                                        {line.voice_gender}
                                                    </span>
                                                </div>

                                                {/* Dialog Text Container */}
                                                <div className="flex-grow pr-12">
                                                    <p className="font-bold text-sm sm:text-base text-slate-900 leading-snug mb-1">
                                                        {line.text_en}
                                                    </p>
                                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                        {line.text_id}
                                                    </p>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                                                    <button 
                                                        type="button"
                                                        onClick={() => playPreviewTTS(line.text_en, line.voice_gender, line.id)}
                                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-2xs ${
                                                            isPlaying 
                                                                ? 'bg-[#ff822d] text-white animate-pulse' 
                                                                : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-[#60f2ce]/20 hover:text-[#0d9488] hover:border-[#60f2ce]'
                                                        }`}
                                                        title="Tes Suara AI (TTS)"
                                                    >
                                                        <i className={`bi ${isPlaying ? 'bi-volume-up-fill' : 'bi-play-fill'} text-xs`}></i>
                                                    </button>
                                                    
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleDeleteLine(line.id)}
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200/80 text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-2xs opacity-80 hover:opacity-100"
                                                        title="Hapus baris ini"
                                                    >
                                                        <i className="bi bi-trash3 text-xs"></i>
                                                    </button>
                                                </div>

                                                {/* Decorative Order Badge */}
                                                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-xs border-2 border-white">
                                                    {line.order_number || '#'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-white flex flex-col items-center justify-center min-h-[320px]">
                                    <div className="w-14 h-14 rounded-2xl bg-[#fcbf49]/20 text-[#ff822d] flex items-center justify-center text-2xl mb-3">
                                        <i className="bi bi-chat-square-dots"></i>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base mb-1">Belum Ada Percakapan</h3>
                                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                                        Mulai tambahkan baris dialog percakapan menggunakan formulir di sebelah kiri.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}