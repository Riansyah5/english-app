import re

with open("resources/js/Pages/Study/ListeningSession.jsx", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r"    const runSessionSequence = async \(\) => \{.*?    // Memicu sekuens saat currentIndex berubah atau isPlaying berubah", re.DOTALL)

clean_sequence = """    const runSessionSequence = async () => {
        if (!sessionCards || sessionCards.length === 0 || currentIndex >= sessionCards.length) {
            setIsFinished(true);
            setIsPlaying(false);
            return;
        }

        const card = sessionCards[currentIndex].study_item;
        
        if (direction === 'en-id') {
            // MODE: INGGRIS -> INDONESIA
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
            // MODE: INDONESIA -> INGGRIS
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

        // Contoh kalimat
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

        // Lanjut kartu
        if (isPlayingRef.current) {
            if (currentIndex + 1 >= sessionCards.length) {
                setIsFinished(true);
                setIsPlaying(false);
            } else {
                setCurrentIndex(prev => prev + 1);
            }
        }
    };

    // Memicu sekuens saat currentIndex berubah atau isPlaying berubah"""

content = pattern.sub(clean_sequence, content, count=1)

with open("resources/js/Pages/Study/ListeningSession.jsx", "w", encoding="utf-8") as f:
    f.write(content)

