import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import confetti from 'canvas-confetti';
import axios from 'axios';

export default function LessonShow({ auth, lesson, isCompleted, nextLesson, personalNote }) {
    const [note, setNote] = useState(personalNote || '');
    const [isSavingNote, setIsSavingNote] = useState(false);
    const [completed, setCompleted] = useState(isCompleted);
    const [isMarkingDone, setIsMarkingDone] = useState(false);
    const [theme, setTheme] = useState('light');

    // Tema membaca yang diselaraskan dengan palet Dashboard
    const themes = {
        light: {
            bg: 'bg-[#fafcfb]',
            card: 'bg-white border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]',
            text: 'text-slate-900',
            textMuted: 'text-slate-400',
            inputBg: 'bg-[#fafcfb] border-slate-200 text-slate-900 placeholder:text-slate-400',
            prose: 'prose-slate prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-[#0d9488] prose-strong:text-slate-900'
        },
        sepia: {
            bg: 'bg-[#fbf7ee]',
            card: 'bg-[#f5ede0] border-[#ecdcc3] shadow-[0_4px_24px_-4px_rgba(80,50,20,0.05)]',
            text: 'text-[#433422]',
            textMuted: 'text-[#8a755e]',
            inputBg: 'bg-[#faf3e6] border-[#e0ceb3] text-[#433422] placeholder-[#a69279]',
            prose: 'prose-stone prose-headings:text-[#2c2216] prose-p:text-[#433422] prose-a:text-[#b45309] prose-strong:text-[#2c2216]'
        },
        dark: {
            bg: 'bg-[#0f172a]',
            card: 'bg-[#1e293b] border-slate-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]',
            text: 'text-white',
            textMuted: 'text-slate-400',
            inputBg: 'bg-[#0f172a] border-slate-700 text-white placeholder:text-slate-500',
            prose: 'prose-invert prose-headings:text-white prose-p:text-slate-300 prose-a:text-[#60f2ce] prose-strong:text-white'
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('lessonTheme') || 'light';
        setTheme(savedTheme);
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('lessonTheme', newTheme);
    };

    const handleSaveNote = () => {
        setIsSavingNote(true);
        axios.post(`/lessons/${lesson?.id}/save-note`, { note })
            .then(res => {
                alert(res.data.message || 'Catatan berhasil disimpan.');
            })
            .catch(() => {
                alert('Gagal menyimpan catatan.');
            })
            .finally(() => setIsSavingNote(false));
    };

    const handleMarkDone = () => {
        setIsMarkingDone(true);
        axios.post(`/lessons/${lesson?.id}/complete`)
            .then(() => {
                setCompleted(true);
                confetti({ 
                    particleCount: 100, 
                    spread: 60, 
                    origin: { y: 0.75 }, 
                    colors: ['#60f2ce', '#fcbf49', '#ff822d'] 
                });
            })
            .catch(() => {
                alert('Gagal menandai selesai.');
            })
            .finally(() => setIsMarkingDone(false));
    };

    const wordCount = lesson?.content ? lesson.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 180));
    const currentTheme = themes[theme] || themes['light'];

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={lesson?.title || 'Materi'} />

            <div className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300 font-sans ${currentTheme.bg}`}>
                <div className="max-w-4xl mx-auto space-y-7">
                    
                    {/* Top Navigation & Theme Switcher Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                        <nav className="flex items-center gap-2 text-xs font-semibold">
                            <Link href="/lessons" className="text-slate-500 hover:text-[#ff822d] transition-colors flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                                <span>Katalog Buku</span>
                            </Link>
                            <span className={currentTheme.textMuted}>/</span>
                            <span className={`truncate max-w-[200px] sm:max-w-xs font-bold ${currentTheme.text}`}>
                                {lesson?.category?.name || 'Materi'}
                            </span>
                        </nav>

                        {/* Reading Ambient Toggle */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                            <div className="p-1 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center gap-1">
                                <button 
                                    onClick={() => changeTheme('light')} 
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                                        theme === 'light' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-slate-700'
                                    }`} 
                                    title="Mode Terang"
                                >
                                    <i className="bi bi-sun-fill"></i>
                                </button>
                                <button 
                                    onClick={() => changeTheme('sepia')} 
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                                        theme === 'sepia' ? 'bg-[#b45309] text-white font-bold shadow-xs' : 'text-slate-400 hover:text-[#b45309]'
                                    }`} 
                                    title="Mode Sepia (Hangat)"
                                >
                                    <i className="bi bi-book-half"></i>
                                </button>
                                <button 
                                    onClick={() => changeTheme('dark')} 
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                                        theme === 'dark' ? 'bg-[#0d9488] text-white font-bold shadow-xs' : 'text-slate-400 hover:text-slate-700'
                                    }`} 
                                    title="Mode Gelap"
                                >
                                    <i className="bi bi-moon-stars-fill"></i>
                                </button>
                            </div>

                            <Link 
                                href="/lessons" 
                                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full shadow-2xs hover:bg-slate-50 transition"
                            >
                                Daftar Bab
                            </Link>
                        </div>
                    </div>

                    {/* Article Container Card */}
                    <div className={`rounded-3xl border p-6 sm:p-10 transition-all ${currentTheme.card}`}>
                        
                        {/* Article Header */}
                        <div className="mb-8 pb-6 border-b border-slate-200/60">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50">
                                    BAB {lesson?.order_number || 1}
                                </span>
                                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                    {lesson?.category?.name || 'Materi Belajar'}
                                </span>
                            </div>

                            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight leading-snug mb-3 ${currentTheme.text}`}>
                                {lesson?.title || 'Materi Pembelajaran'}
                            </h1>

                            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <i className="bi bi-clock-history text-[#ff822d]"></i>
                                    <span>Estimasi baca: ~{readTime} menit</span>
                                </span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1.5">
                                    <i className="bi bi-file-text"></i>
                                    <span>{wordCount} kata</span>
                                </span>
                            </div>
                        </div>

                        {/* YouTube Video Intro (Optional) */}
                        {lesson?.youtube_video_id && (
                            <div className="mb-9 space-y-2">
                                <div className="p-1.5 rounded-2xl bg-black overflow-hidden shadow-sm">
                                    <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
                                        <iframe 
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${lesson?.youtube_video_id}?rel=0`} 
                                            title="YouTube video player" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                                <div className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                    <i className="bi bi-play-circle-fill text-[#ff822d]"></i>
                                    <span>Tonton video pengantar di atas sebelum membaca naskah bab ini.</span>
                                </div>
                            </div>
                        )}

                        {/* Main HTML / Typography Article */}
                        <article 
                            className={`prose prose-base sm:prose-lg max-w-none mb-10 leading-relaxed font-normal ${currentTheme.prose}`}
                            dangerouslySetInnerHTML={{ __html: lesson?.content || '' }}
                        />

                        {/* Personal Notes Box */}
                        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3.5 mb-8 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#fcbf49]/20 text-[#b45309] flex items-center justify-center text-sm">
                                        <i className="bi bi-journal-bookmark-fill"></i>
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-bold m-0 ${currentTheme.text}`}>Catatan Pribadiku</h3>
                                        <p className="text-[11px] text-slate-400 m-0">Simpan rangkuman rumus atau kosakata penting dari bab ini</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                                    Personal Notebook
                                </span>
                            </div>

                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows="3"
                                placeholder="Tulis catatan atau contoh kalimat kreasi Anda sendiri di sini..."
                                className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#60f2ce] focus:border-[#60f2ce] outline-none transition-all ${currentTheme.inputBg}`}
                            />

                            <div className="flex justify-end">
                                <button 
                                    onClick={handleSaveNote}
                                    disabled={isSavingNote}
                                    className={`inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all ${
                                        isSavingNote ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSavingNote ? (
                                        <>
                                            <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></span>
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-floppy-fill text-xs text-[#60f2ce]"></i>
                                            <span>Simpan Catatan</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Completion / Next Lesson Footer CTA */}
                        <div className="pt-6 border-t border-slate-200/60 text-center">
                            {completed ? (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#60f2ce]/20 text-[#0d9488] border border-[#60f2ce]/50 text-xs sm:text-sm font-bold">
                                        <i className="bi bi-patch-check-fill text-base"></i>
                                        <span>Hebat! Anda telah menuntaskan bab pembelajaran ini.</span>
                                    </div>
                                    
                                    {nextLesson && (
                                        <div className="pt-1">
                                            <Link 
                                                href={`/lessons/${nextLesson.slug}`} 
                                                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all"
                                            >
                                                <span>Lanjut ke Bab {nextLesson.order_number}: {nextLesson.title}</span>
                                                <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <button 
                                        onClick={handleMarkDone}
                                        disabled={isMarkingDone}
                                        className={`inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#60f2ce] via-[#fefc7c] to-[#fcbf49] text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-[#fcbf49]/20 hover:opacity-95 transition-all ${
                                            isMarkingDone ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {isMarkingDone ? (
                                            <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></span>
                                                <span>Menandai Selesai...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle-fill text-sm"></i>
                                                <span>Tandai Selesai Dibaca</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[11px] text-slate-400 block">
                                        Progres Anda akan langsung diperbarui di dashboard profil belajar.
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