import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import confetti from 'canvas-confetti';

export default function ShadowingShow({ auth, topic }) {
    const [voices, setVoices] = useState([]);
    const [speechModal, setSpeechModal] = useState(null);
    const [activeActionId, setActiveActionId] = useState(null);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
        
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => window.speechSynthesis.cancel();
    }, []);

    const getBestNaturalVoice = (gender) => {
        let premiumVoices = voices.filter(v => 
            v.lang.startsWith('en') && 
            (v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Google'))
        );
        
        let bestVoice = null;
        
        if (gender === 'male') {
            bestVoice = premiumVoices.find(v => v.name.includes('Male') || v.name.includes('Guy') || v.name.includes('Christopher') || v.name.includes('Eric'));
        } else {
            bestVoice = premiumVoices.find(v => v.name === 'Google US English' || v.name.includes('Female') || v.name.includes('Jenny') || v.name.includes('Aria'));
        }

        return bestVoice || premiumVoices[0] || voices.find(v => v.lang.startsWith('en-US')) || voices[0];
    };

    const playLine = (id, text, gender, speed) => {
        window.speechSynthesis.cancel();
        setActiveActionId(`play-${id}-${speed}`);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = getBestNaturalVoice(gender);
        utterance.rate = speed;
        utterance.pitch = gender === 'male' ? 0.9 : 1.1;
        
        utterance.onend = () => {
            setActiveActionId(null);
        };

        window.speechSynthesis.speak(utterance);
    };

    const cleanText = (str) => str.toLowerCase().replace(/[^\w\s\']/gi, '').trim();

    const startSpeakingPractice = (expectedText) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Browser tidak mendukung Speech Recognition. Gunakan Google Chrome atau Microsoft Edge.');
            return;
        }

        window.speechSynthesis.cancel();
        setSpeechModal({ expectedText, status: 'listening' });
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        let hasResult = false;
        
        recognition.onresult = (event) => {
            hasResult = true;
            const spokenText = event.results[0][0].transcript;
            
            let spokenWords = cleanText(spokenText).split(' ');
            let expectedWords = cleanText(expectedText).split(' ');
            let matches = 0;
            expectedWords.forEach(w => { if (spokenWords.includes(w)) matches++; });
            const accuracy = expectedWords.length === 0 ? 0 : Math.min(100, (matches / expectedWords.length) * 100);
            
            if (accuracy >= 80) {
                confetti({ 
                    particleCount: 90, 
                    spread: 60, 
                    origin: { y: 0.7 }, 
                    colors: ['#60f2ce', '#fcbf49', '#ff822d'] 
                });
            }
            
            setSpeechModal({ expectedText, status: 'result', accuracy, spoken: spokenText });
        };
        
        recognition.onerror = (event) => {
            setSpeechModal({ expectedText, status: 'error', error: event.error });
        };
        
        recognition.onend = () => {
            if (!hasResult) {
                setSpeechModal(prev => (prev?.status === 'listening' ? { ...prev, status: 'error', error: 'no-speech' } : prev));
            }
        };
        
        recognition.start();
    };

    const firstCharacter = topic.lines?.length > 0 ? topic.lines[0].character_name : '';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={topic.title} />

            <div className="min-h-screen bg-[#fafcfb] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 p-6 md:p-8 font-sans transition-colors duration-200">
                <div className="max-w-4xl mx-auto space-y-7">
                    
                    {/* Top Navigation & Breadcrumbs */}
                    <div className="flex items-center justify-between">
                        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                            <Link href="/shadowing" className="text-slate-600 dark:text-slate-400 hover:text-[#ff822d] dark:hover:text-[#ff822d] transition-colors flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
                                </svg>
                                Latihan Shadowing
                            </Link>
                            <span className="text-slate-300 dark:text-slate-700">/</span>
                            <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-sm">{topic.title}</span>
                        </nav>

                        <Link 
                            href="/shadowing" 
                            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/60 transition active:scale-95"
                        >
                            Daftar Topik
                        </Link>
                    </div>

                    {/* Topic Header Card */}
                    <div className="bg-white dark:bg-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none text-center relative overflow-hidden transition-colors">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#60f2ce]/20 dark:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-[#60f2ce]/50 dark:border-[#60f2ce]/30 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] dark:bg-[#60f2ce] animate-pulse"></span>
                            {topic.level || 'General Practice'} &bull; {topic.lines?.length || 0} Dialog
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-2">
                            {topic.title}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                            {topic.description || 'Dengarkan kalimat penutur asli, tirukan pelafalan secara langsung, dan uji skor akurasimu.'}
                        </p>
                    </div>

                    {/* Interactive Dialogue Container */}
                    <div className="bg-white dark:bg-slate-900/90 p-5 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] dark:shadow-none space-y-7 transition-colors">
                        {topic.lines && topic.lines.length > 0 ? (
                            topic.lines.map((line) => {
                                const isLeft = line.character_name === firstCharacter;
                                const isPlayingNormal = activeActionId === `play-${line.id}-1`;
                                const isPlayingSlow = activeActionId === `play-${line.id}-0.7`;

                                return (
                                    <div key={line.id} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                        <div className="max-w-[95%] sm:max-w-[85%]">
                                            
                                            {/* Speaker Label */}
                                            <div className={`flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ${isLeft ? 'ml-2' : 'mr-2 justify-end'}`}>
                                                <span className={`w-2 h-2 rounded-full ${isLeft ? 'bg-[#60f2ce]' : 'bg-[#ff822d]'}`}></span>
                                                <span>{line.character_name}</span>
                                            </div>

                                            {/* Bubble & Controller */}
                                            <div className={`flex items-start gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                                                
                                                {/* Text Bubble */}
                                                <div 
                                                    className={`p-5 rounded-3xl transition-all duration-200 shadow-xs border ${
                                                        isLeft 
                                                            ? 'bg-[#fafcfb] dark:bg-slate-800/60 border-slate-100 dark:border-slate-800 rounded-tl-sm' 
                                                            : 'bg-gradient-to-br from-[#fff7ed] to-[#fffbeb] dark:from-slate-800/90 dark:to-slate-800/70 border-[#fed7aa]/50 dark:border-[#ff822d]/30 rounded-tr-sm'
                                                    }`}
                                                >
                                                    <h3 className="font-bold text-[16px] sm:text-[17px] text-slate-900 dark:text-white leading-snug mb-1.5">
                                                        {line.text_en}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                                        {line.text_id}
                                                    </p>
                                                </div>

                                                {/* Audio Control Action Pills */}
                                                <div className="flex flex-col gap-1.5 shrink-0 pt-1">
                                                    {/* Normal Speed */}
                                                    <button 
                                                        onClick={() => playLine(line.id, line.text_en, line.voice_gender, 1.0)}
                                                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                                                            isPlayingNormal 
                                                                ? 'bg-[#60f2ce] text-slate-950 font-bold shadow-md shadow-[#60f2ce]/40 scale-105' 
                                                                : 'bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:text-[#0d9488] dark:hover:text-[#60f2ce]'
                                                        }`}
                                                        title="Putar Kecepatan Normal"
                                                    >
                                                        <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                    </button>

                                                    {/* Slow Speed */}
                                                    <button 
                                                        onClick={() => playLine(line.id, line.text_en, line.voice_gender, 0.7)}
                                                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                                                            isPlayingSlow 
                                                                ? 'bg-[#fcbf49] text-slate-950 font-bold shadow-md shadow-[#fcbf49]/40 scale-105' 
                                                                : 'bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:text-[#b45309] dark:hover:text-[#fcbf49]'
                                                        }`}
                                                        title="Putar Kecepatan Lambat (0.7x)"
                                                    >
                                                        <span className="text-xs">🐢</span>
                                                    </button>

                                                    {/* Speaking Practice (Mic) */}
                                                    <button 
                                                        onClick={() => startSpeakingPractice(line.text_en)}
                                                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                                                            speechModal?.status === 'listening' && speechModal?.expectedText === line.text_en 
                                                                ? 'bg-[#ff822d] text-white animate-pulse shadow-md shadow-[#ff822d]/40' 
                                                                : 'bg-slate-50 dark:bg-slate-800 hover:bg-[#60f2ce]/20 dark:hover:bg-[#60f2ce]/15 text-[#0d9488] dark:text-[#60f2ce] border border-slate-200/80 dark:border-slate-700 shadow-2xs'
                                                        }`}
                                                        title="Latih Pelafalan / Rekam Suara"
                                                    >
                                                        <i className="bi bi-mic-fill text-xs"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                Belum ada baris dialog pada materi ini.
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Speech Shadowing Modal */}
            {speechModal && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl w-full max-w-md overflow-hidden p-6 text-center animate-in fade-in zoom-in duration-200 transition-colors">
                        {speechModal.status === 'listening' && (
                            <>
                                <div className="w-14 h-14 mx-auto rounded-3xl bg-[#ff822d]/10 dark:bg-[#ff822d]/20 text-[#ff822d] flex items-center justify-center text-2xl mb-4 animate-pulse">
                                    <i className="bi bi-mic-fill"></i>
                                </div>
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">Silakan Ucapkan Kalimat:</h3>
                                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 my-4 text-xs font-semibold text-slate-800 dark:text-slate-200 italic leading-relaxed">
                                    "{speechModal.expectedText}"
                                </div>
                                <p className="text-[11px] font-bold text-[#ff822d] uppercase tracking-wider mb-6 animate-pulse">
                                    Mendengarkan suara Anda...
                                </p>
                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs transition"
                                >
                                    Batal
                                </button>
                            </>
                        )}

                        {speechModal.status === 'result' && (
                            <>
                                <div 
                                    className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-sm"
                                    style={{
                                        backgroundColor: speechModal.accuracy >= 80 ? 'rgba(96, 242, 206, 0.25)' : 'rgba(252, 191, 73, 0.25)',
                                        color: speechModal.accuracy >= 80 ? '#0d9488' : '#ff822d'
                                    }}
                                >
                                    <i className={speechModal.accuracy >= 80 ? 'bi bi-award-fill' : 'bi bi-arrow-repeat'}></i>
                                </div>

                                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                                    {speechModal.accuracy >= 80 ? 'Luar Biasa! 🌟' : 'Perlu Sedikit Latihan! 💪'}
                                </h3>
                                
                                <div className="my-4">
                                    <span className="text-xs text-slate-400 dark:text-slate-400 block mb-0.5">Tingkat Akurasi Pelafalan:</span>
                                    <span className={`font-black text-3xl ${speechModal.accuracy >= 80 ? 'text-[#0d9488] dark:text-[#60f2ce]' : 'text-[#ff822d]'}`}>
                                        {Math.round(speechModal.accuracy)}%
                                    </span>
                                </div>

                                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-left mb-6">
                                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Kalimat yang Terdengar:</p>
                                    <p className="italic text-xs font-semibold text-slate-700 dark:text-slate-300">"{speechModal.spoken}"</p>
                                </div>

                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-900 dark:bg-[#60f2ce] hover:bg-slate-800 dark:hover:bg-[#4de1bc] text-white dark:text-slate-950 rounded-2xl font-bold text-xs transition"
                                >
                                    Selesai
                                </button>
                            </>
                        )}

                        {speechModal.status === 'error' && (
                            <>
                                <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-50 dark:bg-rose-500/15 text-rose-500 dark:text-rose-400 flex items-center justify-center text-2xl mb-4">
                                    <i className="bi bi-mic-mute-fill"></i>
                                </div>
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">Suara Tidak Terdeteksi</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                    {speechModal.error === 'not-allowed' ? 'Izin akses mikrofon ditolak pada browser Anda.' : 
                                     speechModal.error === 'no-speech' ? 'Tidak ada suara yang terdengar. Coba ulangi dengan berbicara lebih dekat.' : 
                                     'Terjadi kendala pada input mikrofon.'}
                                </p>
                                <button 
                                    onClick={() => setSpeechModal(null)} 
                                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-xs transition"
                                >
                                    Tutup
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}