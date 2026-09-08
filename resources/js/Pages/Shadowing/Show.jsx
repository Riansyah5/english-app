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
            alert('Browser tidak mendukung Speech Recognition. Gunakan Chrome atau Edge.');
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
                confetti({ particleCount: 100, spread: 50, origin: { y: 0.75 }, colors: ['#10b981', '#3b82f6'] });
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

    const firstCharacter = topic.lines.length > 0 ? topic.lines[0].character_name : '';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={topic.title} />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <nav className="mb-6 flex text-sm font-medium text-slate-500">
                    <Link href="/shadowing" className="text-blue-600 hover:underline">Shadowing</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-400">{topic.title}</span>
                </nav>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{topic.title}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{topic.description}</p>
                </div>

                <div className="glass dark:glass-dark p-4 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
                    <div className="flex flex-col gap-6">
                        {topic.lines.map((line, index) => {
                            const isLeft = line.character_name === firstCharacter;

                            return (
                                <div key={line.id} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                    <div className="max-w-[90%] sm:max-w-[80%]">
                                        <div className={`text-xs font-bold text-slate-400 mb-1 ${isLeft ? 'ml-2' : 'mr-2 text-right'}`}>
                                            {line.character_name}
                                        </div>
                                        <div className={`flex items-start gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                                            
                                            <div className={`p-4 shadow-sm ${isLeft ? 'bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700' : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'}`}>
                                                <h5 className="mb-1.5 font-bold text-[17px] sm:text-lg leading-snug">{line.text_en}</h5>
                                                <p className={`m-0 text-sm ${isLeft ? 'text-slate-500 dark:text-slate-400' : 'text-blue-100'}`}>
                                                    {line.text_id}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-2 shrink-0">
                                                <button 
                                                    onClick={() => playLine(line.id, line.text_en, line.voice_gender, 1.0)}
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border transition-all ${activeActionId === `play-${line.id}-1` ? 'border-blue-500 text-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200 dark:border-slate-700 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm'}`}
                                                    title="Putar Normal"
                                                >
                                                    <i className="bi bi-play-fill text-lg ml-0.5"></i>
                                                </button>
                                                
                                                <button 
                                                    onClick={() => playLine(line.id, line.text_en, line.voice_gender, 0.7)}
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border transition-all ${activeActionId === `play-${line.id}-0.7` ? 'border-amber-500 text-amber-500 ring-2 ring-amber-500/20 shadow-md' : 'border-slate-200 dark:border-slate-700 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 shadow-sm'}`}
                                                    title="Putar Lambat"
                                                >
                                                    <span className="text-sm">🐢</span>
                                                </button>
                                                
                                                <button 
                                                    onClick={() => startSpeakingPractice(line.text_en)}
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border transition-all border-slate-200 dark:border-slate-700 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 shadow-sm`}
                                                    title="Latihan Bicara"
                                                >
                                                    <i className="bi bi-mic-fill"></i>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Speech Recognition Modal (Re-used pattern from Video Show) */}
            {speechModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-md overflow-hidden p-6 text-center animate-in fade-in zoom-in duration-200">
                        {speechModal.status === 'listening' && (
                            <>
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">🎤 Silakan Ucapkan</h4>
                                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6 italic">"{speechModal.expectedText}"</p>
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center animate-pulse">
                                        <i className="bi bi-mic-fill text-3xl"></i>
                                    </div>
                                </div>
                                <p className="text-rose-500 text-sm font-medium animate-pulse mb-6">Mendengarkan suara Anda...</p>
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Batal</button>
                            </>
                        )}
                        
                        {speechModal.status === 'result' && (
                            <>
                                <div className="mb-4">
                                    {speechModal.accuracy >= 80 ? (
                                        <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                            <i className="bi bi-star-fill text-4xl"></i>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 mx-auto bg-amber-100 dark:bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-4">
                                            <i className="bi bi-arrow-repeat text-4xl"></i>
                                        </div>
                                    )}
                                </div>
                                
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
                                    {speechModal.accuracy >= 80 ? 'Excellent! 🌟' : 'Coba Lagi! 💪'}
                                </h4>
                                
                                <div className="mb-6">
                                    <span className="text-slate-500">Akurasi: </span>
                                    <span className={`font-bold text-xl ${speechModal.accuracy >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {Math.round(speechModal.accuracy)}%
                                    </span>
                                </div>
                                
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6">
                                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-bold">Yang Terdengar:</p>
                                    <p className={`italic text-sm ${speechModal.accuracy >= 80 ? 'text-slate-700 dark:text-slate-300' : 'text-rose-500'}`}>
                                        "{speechModal.spoken}"
                                    </p>
                                </div>
                                
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors">Tutup</button>
                            </>
                        )}
                        
                        {speechModal.status === 'error' && (
                            <>
                                <i className="bi bi-exclamation-triangle text-rose-500 text-5xl mb-4 block"></i>
                                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Gagal Mendengar</h4>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {speechModal.error === 'not-allowed' ? 'Izin mikrofon ditolak.' : 
                                     speechModal.error === 'no-speech' ? 'Suara tidak terdeteksi.' : 
                                     'Terjadi kesalahan mikrofon.'}
                                </p>
                                <button onClick={() => setSpeechModal(null)} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors">Tutup</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

