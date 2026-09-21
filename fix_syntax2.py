import re

with open("resources/js/Pages/Study/ListeningSession.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# We know the return statement is at the end. We just need to make sure the top part has everything matched correctly.
top_part = """import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';

export default function ListeningSession({ auth, sessionCards, mode, direction = 'en-id' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [phase, setPhase] = useState('word'); // 'word', 'translation', 'example', 'done'
    const [isFinished, setIsFinished] = useState(false);
    
    const isPlayingRef = useRef(isPlaying);
    const timeoutRef = useRef(null);
    const currentAudioRef = useRef(null);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current = null;
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const playText = (text, lang = 'en-US', rate = 0.9) => {
        return new Promise((resolve) => {
            if (!text) {
                resolve();
                return;
            }

            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
            }

            let voice = 'en-US-JennyNeural'; 
            if (lang === 'en-US') {
                voice = 'en-US-AriaNeural';
            } else if (lang === 'id-ID') {
                voice = 'id-ID-GadisNeural';
            }

            let rateStr = '+0%';
            if (rate < 1.0) {
                const diff = Math.round((1.0 - rate) * 100);
                rateStr = `-${diff}%`;
            } else if (rate > 1.0) {
                const diff = Math.round((rate - 1.0) * 100);
                rateStr = `+${diff}%`;
            }

            const url = `/tts?text=${encodeURIComponent(text)}&voice=${voice}&rate=${encodeURIComponent(rateStr)}`;
            const audio = new Audio(url);
            currentAudioRef.current = audio;

            audio.onended = () => resolve();
            audio.onerror = (e) => {
                console.error("Audio playback error:", e);
                setTimeout(resolve, 500); 
            };

            audio.play().catch(e => {
                console.error("Audio play failed (mungkin diblokir browser):", e);
                resolve(); 
            });
        });
    };

    const wait = (ms) => {
        return new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, ms);
        });
    };

    const runSessionSequence = async () => {
        if (!sessionCards || sessionCards.length === 0 || currentIndex >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
            return;
        }

        const card = sessionCards[currentIndex].study_item;
        
        if (direction === 'en-id') {
            if (!isPlayingRef.current) return;
            setPhase('word');
            await playText(card.word, 'en-US', 0.9);
            
            if (!isPlayingRef.current) return;
            await wait(1500);

            if (!isPlayingRef.current) return;
            setPhase('translation');
            await playText(card.translation, 'id-ID', 1.0);
            
            if (!isPlayingRef.current) return;
            await wait(1500);
        } else {
            if (!isPlayingRef.current) return;
            setPhase('translation');
            await playText(card.translation, 'id-ID', 1.0);
            
            if (!isPlayingRef.current) return;
            await wait(1500);

            if (!isPlayingRef.current) return;
            setPhase('word');
            await playText(card.word, 'en-US', 0.9);
            
            if (!isPlayingRef.current) return;
            await wait(1500);
        }

        if (card.example_sentence) {
            if (direction === 'en-id') {
                if (!isPlayingRef.current) return;
                setPhase('example');
                await playText(card.example_sentence, 'en-US', 0.85);
                
                if (card.example_translation) {
                    await wait(1000);
                    if (!isPlayingRef.current) return;
                    await playText(card.example_translation, 'id-ID', 1.0);
                }
            } else {
                if (!isPlayingRef.current) return;
                setPhase('example');
                
                if (card.example_translation) {
                    await playText(card.example_translation, 'id-ID', 1.0);
                    await wait(1000);
                }
                
                if (!isPlayingRef.current) return;
                await playText(card.example_sentence, 'en-US', 0.85);
            }
            if (!isPlayingRef.current) return;
            await wait(2000);
        } else {
            await wait(2000);
        }

        if (isPlayingRef.current) {
            if (currentIndex + 1 >= sessionCards.length) {
                setIsFinished(true);
                setIsPlaying(false);
            } else {
                setCurrentIndex(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        if (isPlaying && !isFinished) {
            runSessionSequence();
        } else {
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [currentIndex, isPlaying]);

    const togglePlay = () => {
        if (isFinished) return;
        setIsPlaying(!isPlaying);
    };

    const handleSkip = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        if (currentIndex + 1 >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
        } else {
            setCurrentIndex(prev => prev + 1);
            if (!isPlaying) setIsPlaying(true);
        }
    };

"""

# Find where the `    if (!sessionCards || sessionCards.length === 0) {` block starts
match = re.search(r"    if \(!sessionCards \|\| sessionCards\.length === 0\) \{", content)
if match:
    bottom_part = content[match.start():]
    new_content = top_part + bottom_part
    with open("resources/js/Pages/Study/ListeningSession.jsx", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Fixed!")
else:
    print("Could not find bottom part")

