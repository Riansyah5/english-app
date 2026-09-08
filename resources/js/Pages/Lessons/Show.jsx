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
    const [theme, setTheme] = useState('dark');

    // Themes logic for article
    const themes = {
        dark: {
            bg: 'bg-[#0f131a]',
            card: 'bg-[#1e2530] border-white/5',
            text: 'text-slate-100',
            textMuted: 'text-slate-400',
            buttonActive: 'text-blue-500'
        },
        light: {
            bg: 'bg-[#f8fafc]',
            card: 'bg-white border-black/5',
            text: 'text-slate-900',
            textMuted: 'text-slate-500',
            buttonActive: 'text-blue-600'
        },
        sepia: {
            bg: 'bg-[#fbf0d9]',
            card: 'bg-[#f4e7cd] border-[#4c4033]/5',
            text: 'text-[#433422]',
            textMuted: 'text-[#7c6a52]',
            buttonActive: 'text-[#b45309]'
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('lessonTheme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('lessonTheme', newTheme);
    };

    const handleSaveNote = () => {
        setIsSavingNote(true);
        axios.post(`/lessons/${lesson.id}/save-note`, { note })
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert('Gagal menyimpan catatan.');
            })
            .finally(() => setIsSavingNote(false));
    };

    const handleMarkDone = () => {
        setIsMarkingDone(true);
        axios.post(`/lessons/${lesson.id}/complete`)
            .then(res => {
                setCompleted(true);
                confetti({ particleCount: 120, spread: 60, origin: { y: 0.75 }, colors: ['#3b82f6', '#10b981', '#f59e0b'] });
            })
            .catch(err => {
                alert('Gagal menandai selesai.');
            })
            .finally(() => setIsMarkingDone(false));
    };

    const wordCount = lesson.content ? lesson.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
    const readTime = Math.ceil(wordCount / 200);

    const currentTheme = themes[theme];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={lesson.title} />

            {/* Custom reading environment */}
            <div className={`min-h-screen pt-8 pb-20 transition-colors duration-300 ${currentTheme.bg}`}>
                <div className="container mx-auto px-4 max-w-3xl">
                    
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10 dark:border-white/10">
                        <nav className="flex text-sm font-medium">
                            <Link href="/lessons" className="text-blue-500 hover:text-blue-600 transition-colors">Daftar Materi</Link>
                            <span className={`mx-2 ${currentTheme.textMuted}`}>/</span>
                            <span className={currentTheme.textMuted}>{lesson.category.name}</span>
                        </nav>

                        <div className={`flex p-1 rounded-full border shadow-sm ${currentTheme.card}`}>
                            <button onClick={() => changeTheme('light')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'light' ? currentTheme.buttonActive : currentTheme.textMuted}`} title="Terang">
                                <i className="bi bi-sun-fill"></i>
                            </button>
                            <button onClick={() => changeTheme('sepia')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'sepia' ? currentTheme.buttonActive : currentTheme.textMuted}`} title="Sepia">
                                <i className="bi bi-book-fill"></i>
                            </button>
                            <button onClick={() => changeTheme('dark')} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? currentTheme.buttonActive : currentTheme.textMuted}`} title="Gelap">
                                <i className="bi bi-moon-stars-fill"></i>
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 rounded-md text-xs font-mono uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4">
                            Bab {lesson.order_number}
                        </span>
                        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight ${currentTheme.text}`}>
                            {lesson.title}
                        </h1>
                        <div className={`flex items-center text-sm font-medium ${currentTheme.textMuted}`}>
                            <i className="bi bi-hourglass-split mr-2 text-blue-500"></i>
                            Estimasi waktu baca: {readTime} menit
                        </div>
                    </div>

                    {lesson.youtube_video_id && (
                        <div className="mb-10">
                            <div className={`p-1 rounded-2xl shadow-sm ${currentTheme.card}`}>
                                <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
                                    <iframe 
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${lesson.youtube_video_id}?rel=0`} 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                            <div className={`text-center mt-3 text-sm font-medium ${currentTheme.textMuted}`}>
                                <i className="bi bi-info-circle mr-1 text-blue-500"></i> Tonton video di atas sebagai pengantar materi.
                            </div>
                        </div>
                    )}

                    {/* Prose styles applied to render HTML content nicely */}
                    <article 
                        className={`prose prose-lg max-w-none mb-12 ${
                            theme === 'dark' ? 'prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-blue-400' : 
                            theme === 'sepia' ? 'prose-p:text-[#433422] prose-headings:text-[#2c2216] prose-a:text-[#b45309]' : 
                            'prose-p:text-slate-700 prose-headings:text-slate-900 prose-a:text-blue-600'
                        }`}
                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />

                    <div className={`p-6 rounded-2xl border shadow-sm mb-10 ${currentTheme.card}`}>
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mr-3">
                                <i className="bi bi-pin-angle-fill"></i>
                            </div>
                            <h5 className={`font-bold text-lg m-0 ${currentTheme.text}`}>Catatan Pribadiku</h5>
                        </div>
                        <textarea 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-colors ${
                                theme === 'dark' ? 'bg-[#131822] border-white/10 text-white placeholder-slate-600' : 
                                theme === 'sepia' ? 'bg-[#fdf6e7] border-[#4c4033]/10 text-[#433422] placeholder-[#7c6a52]/50' : 
                                'bg-slate-50 border-black/10 text-slate-900 placeholder-slate-400'
                            }`}
                            rows="4" 
                            placeholder="Ketik ringkasan atau poin penting dari bab ini di sini..."
                        ></textarea>
                        <div className="text-right mt-4">
                            <button 
                                onClick={handleSaveNote}
                                disabled={isSavingNote}
                                className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all ${
                                    isSavingNote ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                                } ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
                            >
                                {isSavingNote ? 'Menyimpan...' : 'Simpan Catatan'}
                            </button>
                        </div>
                    </div>

                    <div className="text-center pt-4 border-t border-black/10 dark:border-white/10">
                        {completed ? (
                            <>
                                <div className="inline-block px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-6">
                                    <i className="bi bi-check-circle-fill mr-2"></i> Kamu sudah menyelesaikan bab ini!
                                </div>
                                {nextLesson && (
                                    <div>
                                        <Link 
                                            href={`/lessons/${nextLesson.slug}`} 
                                            className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-sm"
                                        >
                                            Lanjut ke Bab {nextLesson.order_number} &rarr;
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={handleMarkDone}
                                    disabled={isMarkingDone}
                                    className={`inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-sm mb-6 ${isMarkingDone ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                                >
                                    {isMarkingDone ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                    ) : (
                                        <i className="bi bi-check-lg mr-2 text-lg"></i>
                                    )}
                                    Tandai Selesai Dibaca
                                </button>
                                
                                {nextLesson && isMarkingDone && (
                                    <div className="animate-pulse">Menyiapkan bab selanjutnya...</div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

