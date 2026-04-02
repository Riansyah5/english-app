@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI & ANIMATIONS                    */
    /* ======================================================== */

    /* Typography & Colors */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 15px rgba(255,255,255,0.3); }
    .neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
    .neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }
    .border-slate { border-color: rgba(255, 255, 255, 0.1) !important; }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.25rem;
        box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    }

    .badge-glass {
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.3);
        color: #38bdf8;
        backdrop-filter: blur(8px);
    }

    .vocab-badge {
        background: rgba(52, 211, 153, 0.1);
        border: 1px solid rgba(52, 211, 153, 0.3);
        color: #fff;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    /* Video Player Wrapper */
    .video-wrapper {
        border-radius: 1rem;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        background: #000;
    }

    /* Buttons */
    .btn-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        transition: all 0.2s ease;
    }
    .btn-glass:hover, .btn-glass.active {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.4);
        color: #38bdf8;
        transform: scale(1.05);
    }

    .btn-glass-success {
        background: rgba(16, 185, 129, 0.05);
        border: 1px solid rgba(16, 185, 129, 0.2);
        color: #34d399;
        transition: all 0.2s ease;
    }
    .btn-glass-success:hover {
        background: rgba(16, 185, 129, 0.2);
        border-color: rgba(16, 185, 129, 0.5);
        color: #fff;
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }

    .btn-neon-danger {
        background: rgba(244, 63, 94, 0.15) !important;
        border: 1px solid rgba(244, 63, 94, 0.4) !important;
        color: #fb7185 !important;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.4) !important;
    }
    
    /* Vertical Glass Button Group */
    .glass-btn-group-vertical {
        display: inline-flex; /* Memastikan container mengikuti lebar tombol */
        border-radius: 2rem;
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        overflow: hidden;
    }
    .glass-btn-group-vertical .btn {
        border: none;
        border-radius: 0 !important;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
    .glass-btn-group-vertical .btn:last-child {
        border-right: none;
    }
    

    /* Transcript Line Interactions */
    .transcript-line {
        border-bottom: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s ease;
        border-left: 4px solid transparent;
    }
    
    .transcript-line.active {
        background: linear-gradient(90deg, rgba(56, 189, 248, 0.1) 0%, transparent 100%) !important;
        border-left: 4px solid #38bdf8;
        box-shadow: inset 2px 0 10px rgba(56, 189, 248, 0.05);
        border-radius: 0 8px 8px 0;
    }
    
    .transcript-line.active .formatted-text {
        color: #fff !important;
        text-shadow: 0 0 10px rgba(255,255,255,0.2);
    }

    /* Clickable Words */
    .clickable-word {
        cursor: pointer;
        padding: 0 2px;
        border-radius: 4px;
        transition: all 0.2s;
        color: #cbd5e1;
    }
    .clickable-word:hover {
        background-color: rgba(56, 189, 248, 0.2);
        color: #fff;
        text-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
    }

    /* Saved Words */
    .saved-word {
        color: #34d399 !important; /* Neon Green */
        font-weight: 600;
        text-shadow: 0 0 10px rgba(52, 211, 153, 0.4);
        text-decoration: underline;
        text-decoration-style: dotted;
        text-decoration-color: rgba(52, 211, 153, 0.6);
    }

    /* Mic Animations */
    @keyframes pulse-record {
        0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
        100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
    }
    .recording-active {
        animation: pulse-record 1.5s infinite;
    }
    
    @keyframes blink-animation {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    .blink-text {
        animation: blink-animation 1s linear infinite;
    }

    /* Custom Scrollbar for Transcript */
    #transcript-container::-webkit-scrollbar { width: 6px; }
    #transcript-container::-webkit-scrollbar-track { background: transparent; }
    #transcript-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    #transcript-container::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
    
    .breadcrumb-item a { color: #38bdf8; }
    .breadcrumb-item.active { color: #94a3b8; }
    .breadcrumb-item + .breadcrumb-item::before { color: #64748b; }
</style>    
@endsection

@section('content')
<div class="container-fluid px-4 py-3 position-relative z-1">
    
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb mb-0 fw-semibold" style="letter-spacing: 0.5px;">
            <li class="breadcrumb-item"><a href="{{ route('videos.user.index') }}" class="text-decoration-none">Video Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $video->title }}</li>
        </ol>
    </nav>

    <div class="row g-4">
        <div class="col-lg-8">
            
            <div class="video-wrapper mb-3">
                <div class="ratio ratio-16x9">
                    <div id="youtube-player"></div>
                </div>
            </div>
            
            <h3 class="fw-bold text-white mt-3 text-glow line-clamp-2">{{ $video->title }}</h3>
            <div class="d-flex align-items-center gap-2 mt-2">
                <span class="badge badge-glass text-uppercase px-3 py-2 fw-bold" style="letter-spacing: 1px;">{{ $video->difficulty }}</span>
            </div>
            
            <div class="glass-card mt-3 p-3 border-glow-info" style="border-left: 3px solid #38bdf8;">
                <p class="text-slate mb-0 small">
                    <i class="bi bi-lightbulb text-warning me-1"></i> <strong class="text-white">Tips:</strong> Klik kata manapun pada transkrip di sebelah kanan untuk melihat kamus dan menyimpannya ke Flashcard Anda.
                </p>
            </div>

            <div class="glass-card mt-4 mb-4">
                <div class="card-header bg-transparent border-slate pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold mb-0 text-white text-glow">
                        <i class="bi bi-archive-fill neon-green me-2"></i>Bank Kosakatamu
                    </h5>
                    <span class="badge" style="background: rgba(52, 211, 153, 0.2); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3);">{{ $savedFlashcards->count() }} Kata</span>
                </div>
                
                <div class="card-body p-4 overflow-auto" style="max-height: 250px;">
                    @if($savedFlashcards->count() > 0)
                        <div class="d-flex flex-wrap gap-2">
                            @foreach($savedFlashcards as $card)
                                <div class="vocab-badge rounded-pill px-3 py-2 fs-6 d-flex align-items-center">
                                    <span class="fw-bold me-2">{{ $card->studyItem->content }}</span>
                                    <span class="border-start border-light ps-2" style="opacity: 0.9;">
                                        {{ $card->studyItem->translation }}
                                    </span>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-4">
                            <i class="bi bi-journal-x display-4 text-slate opacity-25 mb-3 d-block"></i>
                            <p class="text-slate fw-medium mb-1">Belum ada kosakata yang disimpan.</p>
                            <small class="text-slate opacity-75">Klik kata pada transkrip di sebelah kanan untuk mulai mengumpulkan!</small>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="glass-card h-100 d-flex flex-column">
                <div class="card-header bg-transparent border-slate pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold text-white mb-0 text-glow">Interactive Transcript</h5>
                </div>
                <div class="card-body overflow-auto p-0" id="transcript-container" style="max-height: 650px; position: relative;">
                    
                    <div class="p-3">
                        @forelse($video->transcripts as $index => $transcript)
                            <div class="transcript-line mb-2 p-3 rounded" 
                                 id="line-{{ $index }}"
                                 data-start="{{ $transcript->start_time }}" 
                                 data-end="{{ $transcript->end_time }}">
                                 
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1 pe-3">
                                        <span class="raw-text d-none">{{ $transcript->text }}</span>
                                        <span class="formatted-text fs-5 lh-base fw-medium text-slate d-block mb-1"></span>
                                        
                                        @if($transcript->translation)
                                            <div class="text-slate small mt-2 border-start border-2 ps-2 transcript-translation d-none" style="border-color: #38bdf8 !important;">
                                                <i>{{ $transcript->translation }}</i>
                                            </div>
                                        @endif
                                    </div>
                                    
                                    <div class="btn-group glass-btn-group-vertical shadow-sm ms-3">
                                        <button class="btn btn-sm btn-glass" onclick="playLine({{ $transcript->start_time }})" title="Putar ulang kalimat ini">
                                            <i class="bi bi-play-fill fs-5"></i>
                                        </button>
                                        
                                        @if($transcript->translation)
                                        <button class="btn btn-sm btn-glass" onclick="toggleTranslation(this)" title="Lihat terjemahan">
                                            <i class="bi bi-translate"></i>
                                        </button>
                                        @endif

                                        <button class="btn btn-sm btn-glass-success btn-mic" onclick="startSpeakingPractice(this, '{{ addslashes($transcript->text) }}')" title="Latihan Pelafalan (Pronunciation)">
                                            <i class="bi bi-mic-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="text-center py-5">
                                <i class="bi bi-chat-square-text text-slate opacity-25 display-4 mb-3 d-block"></i>
                                <p class="text-slate">Transkrip tidak tersedia untuk video ini.</p>
                            </div>
                        @endforelse
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('scripts')
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script>
    // Data dari Laravel
    const youtubeVideoId = "{{ $video->youtube_id }}";
    const savedVocabs = @json($savedVocabs); 
    const savedVocabsArray = Array.isArray(savedVocabs) ? savedVocabs : Object.values(savedVocabs);

    let player;
    let syncInterval;
    const transcriptLines = document.querySelectorAll('.transcript-line');
    const transcriptContainer = document.getElementById('transcript-container');

    // Default Swal config for Dark Glassmorphism Theme
    const darkSwalConfig = {
        background: 'rgba(20, 25, 40, 0.95)',
        color: '#f8fafc',
        backdrop: 'rgba(0, 0, 0, 0.6)',
        customClass: { popup: 'glass-swal border border-secondary border-opacity-25', title: 'text-glow' }
    };

    // 1. INISIALISASI YOUTUBE PLAYER
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('youtube-player', {
            videoId: youtubeVideoId,
            playerVars: {
                'playsinline': 1,
                'rel': 0,
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 2. KENDALI SINKRONISASI WAKTU
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            syncInterval = setInterval(syncTranscript, 300);
        } else {
            clearInterval(syncInterval);
        }
    }

    function syncTranscript() {
        const currentTime = player.getCurrentTime();

        transcriptLines.forEach(line => {
            const start = parseFloat(line.getAttribute('data-start'));
            const end = parseFloat(line.getAttribute('data-end'));

            if (currentTime >= start && currentTime <= end) {
                if (!line.classList.contains('active')) {
                    document.querySelectorAll('.transcript-line.active').forEach(el => el.classList.remove('active'));
                    line.classList.add('active');
                    line.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            } else {
                line.classList.remove('active');
            }
        });
    }

    // 3. MEMECAH KALIMAT MENJADI KATA KLIKABEL
    function processTranscriptWords() {
        transcriptLines.forEach(line => {
            const rawText = line.querySelector('.raw-text').innerText;
            const formattedContainer = line.querySelector('.formatted-text');
            
            const words = rawText.split(" ");
            
            words.forEach(word => {
                const cleanWord = word.replace(/[^\w\s\']/g, "").toLowerCase();
                const isSaved = savedVocabs.includes(cleanWord);
                const savedClass = isSaved ? "saved-word" : "";

                const span = document.createElement('span');
                span.className = `clickable-word ${savedClass}`;
                span.innerText = word + " ";
                
                span.onclick = function() {
                    if(player && typeof player.pauseVideo === 'function') {
                        player.pauseVideo();
                    }
                    openDictionary(cleanWord, rawText);
                };
                
                formattedContainer.appendChild(span);
            });
        });
    }

    // 4. LOGIKA KAMUS (API)
    function openDictionary(word, contextSentence) {
        Swal.fire({
            ...darkSwalConfig,
            title: `Mencari arti "${word}"...`,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        Promise.all([
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.ok ? res.json() : null),
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(word)}`).then(res => res.json())
        ])
        .then(([dictData, transData]) => {
            let translation = "";
            if (transData && transData[0] && transData[0][0] && transData[0][0][0]) {
                translation = transData[0][0][0];
            }

            let phonetic = "";
            let partOfSpeech = "";
            let definition = "Definisi bahasa Inggris tidak ditemukan.";
            
            if (dictData && dictData[0]) {
                const entry = dictData[0];
                phonetic = entry.phonetic || "";
                if(entry.meanings && entry.meanings[0]) {
                    partOfSpeech = entry.meanings[0].partOfSpeech;
                    definition = entry.meanings[0].definitions[0].definition;
                }
            }

            Swal.fire({
                ...darkSwalConfig,
                title: `<span class="neon-blue">${word}</span>`,
                html: `
                    <p class="text-slate mb-3" style="letter-spacing:1px;">${phonetic} &bull; <i>${partOfSpeech}</i></p>
                    <div class="p-3 rounded mb-4 text-start" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
                        <strong class="text-white">English Def:</strong><br> <span class="text-slate">${definition}</span>
                    </div>
                    <label class="fw-bold text-start w-100 mb-2 text-white">Terjemahan (ID):</label>
                    <input type="text" id="swal-input-translation" class="form-control form-control-lg fw-bold text-white text-center" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(52, 211, 153, 0.4); box-shadow: 0 0 10px rgba(52,211,153,0.1);" value="${translation}">
                `,
                showCancelButton: true,
                confirmButtonText: '<i class="bi bi-bookmark-plus"></i> Simpan ke Flashcard',
                cancelButtonText: 'Tutup',
                confirmButtonColor: '#10b981', 
                cancelButtonColor: 'rgba(255,255,255,0.1)',
                preConfirm: () => {
                    const finalTranslation = document.getElementById('swal-input-translation').value;
                    if (!finalTranslation) {
                        Swal.showValidationMessage('Terjemahan Indonesia wajib diisi!');
                    }
                    return { translation: finalTranslation, definition: definition };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    saveVocabularyToDB(word, result.value.translation, contextSentence, result.value.definition);
                }
            });
        })
        .catch(error => {
            console.error(error);
            Swal.fire({ ...darkSwalConfig, title: 'Error', text: 'Gagal menghubungi server kamus.', icon: 'error' });
        });
    }

    // 5. AJAX SIMPAN LARAVEL
    function saveVocabularyToDB(word, translation, contextSentence, notes) {
        fetch('{{ route("videos.user.save-vocab") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ word: word, translation: translation, example_sentence: contextSentence, notes: notes })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                Swal.fire({ ...darkSwalConfig, title: 'Tersimpan!', text: data.message, icon: 'success' }).then(() => location.reload());
            } else {
                Swal.fire({ ...darkSwalConfig, title: 'Info', text: data.message, icon: 'info' });
            }
        })
        .catch(error => Swal.fire({ ...darkSwalConfig, title: 'Error', text: 'Gagal menyimpan ke database.', icon: 'error' }));
    }

    document.addEventListener('DOMContentLoaded', processTranscriptWords);

    // 6. PUTAR ULANG
    function playLine(startTime) {
        if(player && typeof player.seekTo === 'function') {
            player.seekTo(startTime, true);
            player.playVideo();
        }
    }

    // 7. TOGGLE TERJEMAHAN
    function toggleTranslation(buttonElement) {
        const translationDiv = buttonElement.closest('.transcript-line').querySelector('.transcript-translation');
        if (translationDiv) {
            translationDiv.classList.toggle('d-none');
            buttonElement.classList.toggle('active'); // triggers glass active state
        }
    }

    // ==========================================
    // MODUL SPEAKING
    // ==========================================
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    function cleanText(str) { return str.toLowerCase().replace(/[^\w\s\']/gi, '').trim(); }

    function calculateAccuracy(spoken, expected) {
        let spokenWords = cleanText(spoken).split(' ');
        let expectedWords = cleanText(expected).split(' ');
        let matches = 0;
        expectedWords.forEach(w => { if(spokenWords.includes(w)) matches++; });
        if(expectedWords.length === 0) return 0; 
        let accuracy = (matches / expectedWords.length) * 100;
        return accuracy > 100 ? 100 : accuracy;
    }

    function startSpeakingPractice(btnElement, expectedText) {
        if (!SpeechRecognition) {
            Swal.fire({ ...darkSwalConfig, title: 'Browser Tidak Mendukung', text: 'Gunakan Chrome/Edge terbaru.', icon: 'error' });
            return;
        }

        if(player && typeof player.pauseVideo === 'function') player.pauseVideo();

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; 
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let hasResult = false; 

        recognition.onstart = function() {
            btnElement.classList.remove('btn-glass-success');
            btnElement.classList.add('btn-neon-danger', 'recording-active');
            btnElement.innerHTML = '<i class="bi bi-stop-fill"></i>';
            
            Swal.fire({
                ...darkSwalConfig,
                title: '🎤 Sedang Merekam...',
                html: `Silakan ucapkan kalimat ini:<br><br><strong class="fs-4 text-white text-glow">"${expectedText}"</strong><br><br><span class="text-danger blink-text fw-bold">● Merekam suara Anda...</span>`,
                showConfirmButton: true,
                confirmButtonText: 'Selesai & Periksa ✔️',
                confirmButtonColor: '#10b981',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    recognition.stop(); 
                    Swal.fire({ ...darkSwalConfig, title: 'Menganalisis Suara...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                }
            });
        };

        recognition.onresult = function(event) {
            hasResult = true;
            const spokenText = event.results[0][0].transcript;
            const accuracy = calculateAccuracy(spokenText, expectedText);

            if (accuracy >= 80) {
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#10b981', '#38bdf8', '#fbbf24'] });
                Swal.fire({
                    ...darkSwalConfig,
                    icon: 'success',
                    title: 'Excellent! 🌟',
                    html: `Skor Akurasi: <b class="neon-green fs-4">${Math.round(accuracy)}%</b><br><br>
                           <span class="text-slate">Sistem mendengar:</span><br>
                           <i class="text-white">"${spokenText}"</i>`
                });
            } else {
                Swal.fire({
                    ...darkSwalConfig,
                    icon: 'warning',
                    title: 'Coba Lagi! 💪',
                    html: `Skor Akurasi: <b class="text-warning fs-4">${Math.round(accuracy)}%</b><br><br>
                           <span class="text-slate">Sistem mendengar:</span><br>
                           <i class="text-danger">"${spokenText}"</i><br><br>
                           <span class="text-slate">Seharusnya:</span><br>
                           <i class="neon-green">"${expectedText}"</i>`
                });
            }
        };

        recognition.onerror = function(event) {
            let errorMsg = 'Terjadi kesalahan pada mikrofon Anda.';
            if(event.error === 'not-allowed') errorMsg = 'Izin mikrofon ditolak oleh browser.';
            if(event.error === 'no-speech') {
                errorMsg = 'Tidak ada suara. Pastikan mikrofon aktif dan bicara lebih keras.';
                hasResult = true; 
            }
            Swal.fire({ ...darkSwalConfig, title: 'Ups!', text: errorMsg, icon: 'error' });
            resetBtn();
        };

        recognition.onend = function() {
            resetBtn();
            if (!hasResult && Swal.isVisible() && Swal.getTitle().textContent === 'Menganalisis Suara...') {
                 Swal.fire({ ...darkSwalConfig, title: 'Kosong!', text: 'Sistem tidak mendengar ucapan apapun.', icon: 'warning' });
            }
        };

        function resetBtn() {
            btnElement.classList.add('btn-glass-success');
            btnElement.classList.remove('btn-neon-danger', 'recording-active');
            btnElement.innerHTML = '<i class="bi bi-mic-fill"></i>';
        }

        recognition.start();
    }
</script>
@endsection