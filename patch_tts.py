import re

with open("resources/js/Pages/Study/ListeningSession.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace currentUtteranceRef with currentAudioRef and remove window.speechSynthesis.cancel() in the first useEffect
pattern1 = re.compile(r"    const currentUtteranceRef = useRef\(null\);.*?    }, \[\]\);", re.DOTALL)
replacement1 = """    const currentAudioRef = useRef(null);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Cleanup saat unmount
    useEffect(() => {
        return () => {
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current = null;
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);"""

content = pattern1.sub(replacement1, content, count=1)

# 2. Replace playText
pattern2 = re.compile(r"    const playText = \(text, lang = 'en-US', rate = 0\.9\) => \{.*?    \};\n\n    const wait", re.DOTALL)
replacement2 = """    const playText = (text, lang = 'en-US', rate = 0.9) => {
        return new Promise((resolve) => {
            if (!text) {
                resolve();
                return;
            }

            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
            }

            // Tentukan Edge TTS Voice (Pilih yang natural)
            let voice = 'en-US-JennyNeural'; 
            if (lang === 'en-US') {
                voice = 'en-US-AriaNeural'; // Pilihan lain: en-US-GuyNeural, en-US-ChristopherNeural
            } else if (lang === 'id-ID') {
                voice = 'id-ID-GadisNeural'; // Pilihan lain: id-ID-ArdiNeural
            }

            // Hitung rate (Edge TTS menggunakan format string seperti '+0%', '+10%', '-10%')
            let rateStr = '+0%';
            if (rate < 1.0) {
                const diff = Math.round((1.0 - rate) * 100);
                rateStr = `-${diff}%`;
            } else if (rate > 1.0) {
                const diff = Math.round((rate - 1.0) * 100);
                rateStr = `+${diff}%`;
            }

            const url = `/api/tts?text=${encodeURIComponent(text)}&voice=${voice}&rate=${encodeURIComponent(rateStr)}`;
            const audio = new Audio(url);
            currentAudioRef.current = audio;

            audio.onended = () => resolve();
            audio.onerror = (e) => {
                console.error("Audio playback error:", e);
                setTimeout(resolve, 500); // Lanjut meski error
            };

            audio.play().catch(e => {
                console.error("Audio play failed (mungkin diblokir browser):", e);
                resolve(); // Lanjut jika autoplay diblokir
            });
        });
    };

    const wait"""

content = pattern2.sub(replacement2, content, count=1)

# 3. Replace cancel() in useEffect and handleSkip
content = content.replace("window.speechSynthesis.cancel();", """if (currentAudioRef.current) {
                currentAudioRef.current.pause();
            }""")

with open("resources/js/Pages/Study/ListeningSession.jsx", "w", encoding="utf-8") as f:
    f.write(content)

