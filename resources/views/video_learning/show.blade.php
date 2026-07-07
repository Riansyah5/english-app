@extends('layouts.app')

@section('content')
<div class="container-fluid px-md-4 py-3">
    
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb mb-0 fw-medium" style="font-size: 0.9rem;">
            <li class="breadcrumb-item"><a href="{{ route('videos.user.index') }}" class="text-decoration-none accent-link">Video Library</a></li>
            <li class="breadcrumb-item active-breadcrumb" aria-current="page">{{ $video->title }}</li>
        </ol>
    </nav>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="minimal-card overflow-hidden p-1 bg-dark mb-3">
                <div class="ratio ratio-16x9 rounded-3 overflow-hidden">
                    <div id="youtube-player"></div>
                </div>
            </div>
            
            <h4 class="fw-bold text-theme-main tracking-tight line-clamp-2 mt-3 mb-2" style="line-height: 1.4;">{{ $video->title }}</h4>
            <div class="d-flex align-items-center gap-2 mt-2">
                <span class="badge badge-minimal-accent font-monospace text-uppercase px-2.5 py-1.5" style="font-size: 0.7rem;">{{ $video->difficulty }}</span>
            </div>
            
            <div class="minimal-card mt-3 p-3 border-accent-info">
                <p class="text-theme-muted mb-0 small">
                    <i class="bi bi-lightbulb text-warning me-1.5"></i> <strong>Tips:</strong> Klik kata manapun pada transkrip di sebelah kanan untuk melihat kamus cepat dan menyimpannya ke Flashcard Anda.
                </p>
            </div>

            <div class="minimal-card mt-4 mb-4">
                <div class="border-bottom-minimal py-3 px-4 d-flex justify-content-between align-items-center">
                    <h6 class="fw-bold mb-0 text-theme-main">
                        <i class="bi bi-archive-fill text-success me-2"></i>Bank Kosakatamu
                    </h6>
                    <span class="badge badge-minimal-success font-monospace px-2.5 py-1.5" style="font-size: 0.7rem;">{{ $savedFlashcards->count() }} Kata</span>
                </div>
                
                <div class="card-body p-4 overflow-auto" style="max-height: 220px;">
                    @if($savedFlashcards->count() > 0)
                        <div class="d-flex flex-wrap gap-2">
                            @foreach($savedFlashcards as $card)
                                <div class="badge-minimal-vocab rounded-pill px-3 py-1.5 small d-flex align-items-center">
                                    <span class="fw-bold text-theme-main me-2">{{ $card->studyItem->content }}</span>
                                    <span class="border-start border-muted-divider ps-2 text-theme-muted" style="font-size: 0.8rem;">
                                        {{ $card->studyItem->translation }}
                                    </span>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-4">
                            <i class="bi bi-journal-x text-theme-muted display-6 opacity-30 mb-2 d-block"></i>
                            <p class="text-theme-muted small fw-medium mb-1">Belum ada kosakata yang disimpan.</p>
                            <small class="text-theme-muted opacity-60">Klik kata pada transkrip di sebelah kanan untuk mulai mengumpulkan!</small>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="minimal-card h-100 d-flex flex-column" style="max-height: calc(100vh - 120px);">
                <div class="border-bottom-minimal py-3 px-4">
                    <h6 class="fw-bold text-theme-main mb-0">Interactive Transcript</h6>
                </div>
                
                <div class="card-body overflow-auto p-3" id="transcript-container">
                    @forelse($video->transcripts as $index => $transcript)
                        <div class="transcript-line mb-2 p-3 rounded-3" 
                             id="line-{{ $index }}"
                             data-start="{{ $transcript->start_time }}" 
                             data-end="{{ $transcript->end_time }}">
                             
                            <div class="d-flex justify-content-between align-items-start gap-2">
                                <div class="flex-grow-1 overflow-hidden">
                                    <span class="raw-text d-none">{{ $transcript->text }}</span>
                                    <span class="formatted-text fs-6 lh-base fw-semibold text-theme-muted d-block mb-1"></span>
                                    
                                    @if($transcript->translation)
                                        <div class="text-theme-muted small mt-2 border-start border-2 ps-2 transcript-translation d-none border-primary-minimal">
                                            <i style="font-size: 0.85rem;">{{ $transcript->translation }}</i>
                                        </div>
                                    @endif
                                </div>
                                
                                <div class="btn-group border-minimal rounded-2 overflow-hidden flex-shrink-0" role="group" style="box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                                    <button class="btn btn-action-minimal" onclick="playLine({{ $transcript->start_time }})" title="Putar ulang kalimat ini">
                                        <i class="bi bi-play-fill fs-6"></i>
                                    </button>
                                    
                                    @if($transcript->translation)
                                    <button class="btn btn-action-minimal" onclick="toggleTranslation(this)" title="Lihat terjemahan">
                                        <i class="bi bi-translate" style="font-size: 0.85rem;"></i>
                                    </button>
                                    @endif

                                    <button class="btn btn-action-minimal btn-mic text-success" onclick="startSpeakingPractice(this, '{{ addslashes($transcript->text) }}')" title="Latihan Pelafalan (Pronunciation)">
                                        <i class="bi bi-mic-fill" style="font-size: 0.85rem;"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-5">
                            <i class="bi bi-chat-square-text text-theme-muted opacity-30 fs-3 mb-2 d-block"></i>
                            <span class="text-theme-muted small">Transkrip tidak tersedia untuk video ini.</span>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST COMPACT VIDEO LEARNING ENGINE ENVIRONMENT      */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --item-hover-bg: #131822;
    --swal-bg: #161b26;
    
    --accent-primary: #3b82f6;
    --accent-info: #06b6d4;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
    --border-divider: rgba(255, 255, 255, 0.1);
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --item-hover-bg: #f8fafc;
    --swal-bg: #ffffff;
    
    --accent-primary: #2563eb;
    --accent-info: #0891b2;
    --accent-success: #059669;
    --accent-danger: #dc2626;
    --border-divider: rgba(0, 0, 0, 0.08);
}

/* Structural flat elements container mapping */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
}

.border-bottom-minimal { border-bottom: 1px solid var(--card-border); }
.border-minimal { border: 1px solid var(--card-border); }
.border-accent-info { border-left: 3px solid var(--accent-info) !important; }
.border-primary-minimal { border-left-color: var(--accent-primary) !important; }
.border-muted-divider { border-color: var(--card-border) !important; }

/* Custom badges style elements */
.badge-minimal-accent { background: rgba(59, 130, 246, 0.06); color: var(--accent-primary); }
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }
.badge-minimal-vocab { background: var(--box-bg); border: 1px solid var(--card-border); }

/* Navigation Breadcrumbs mapping styling variables */
.accent-link { color: var(--accent-color); font-weight: 500; }
.accent-link:hover { opacity: 0.8; }
.active-breadcrumb { color: var(--text-muted); }
.breadcrumb-item + .breadcrumb-item::before { color: var(--text-muted); }

/* Compact Flat Structural Action control boxes buttons */
.btn-action-minimal {
    background: var(--card-bg);
    color: var(--text-muted);
    border: none;
    padding: 0.35rem 0.55rem;
    transition: all 0.15s ease;
}
.btn-action-minimal:hover, .btn-action-minimal.active {
    background: var(--item-hover-bg);
    color: var(--text-main);
}
.btn-action-minimal:not(:last-child) {
    border-right: 1px solid var(--card-border);
}

/* Subtitles Transcript Flow Line Mechanics */
.transcript-line {
    border-bottom: 1px solid var(--card-border);
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
}
.transcript-line.active {
    background: var(--box-bg);
    border-left-color: var(--accent-primary);
    border-radius: 0 0.5rem 0.5rem 0;
}
.transcript-line.active .formatted-text {
    color: var(--text-main) !important;
}

/* Text Vocabulary Nodes Interactions highlights mapping hooks */
.clickable-word {
    cursor: pointer;
    padding: 0 1px;
    border-radius: 0.25rem;
    transition: all 0.15s ease;
    color: var(--text-muted);
}
.clickable-word:hover {
    background-color: rgba(59, 130, 246, 0.12);
    color: var(--text-main);
}
.saved-word {
    color: var(--accent-success) !important;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-style: dotted;
}

/* Voice Capturing Mic Pulses Operations Layer */
@keyframes micPulseEngine {
    0% { background-color: rgba(244, 63, 94, 0.15); }
    50% { background-color: rgba(244, 63, 94, 0.35); }
    100% { background-color: rgba(244, 63, 94, 0.15); }
}
.btn-action-minimal.recording-active {
    background-color: var(--accent-danger) !important;
    color: #ffffff !important;
    animation: micPulseEngine 1.2s infinite ease-in-out;
}

@keyframes textBlinkEngine { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.blink-text { animation: textBlinkEngine 1.4s infinite; }

/* Elegant Narrow Panel Custom Scrollbars */
#transcript-container::-webkit-scrollbar { width: 4px; }
#transcript-container::-webkit-scrollbar-track { background: transparent; }
#transcript-container::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 10px; }
</style>
@endsection

@section('scripts')
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script>
    const youtubeVideoId = "{{ $video->youtube_id }}";
    const savedVocabs = @json($savedVocabs); 
    const savedVocabsArray = Array.isArray(savedVocabs) ? savedVocabs : Object.values(savedVocabs);

    let player;
    let syncInterval;
    const transcriptLines = document.querySelectorAll('.transcript-line');
    const transcriptContainer = document.getElementById('transcript-container');

    const getStyle = (prop) => getComputedStyle(document.documentElement).getPropertyValue(prop).trim();

    // Dynamically generated Swals to lock theme settings standard cleanly
    const getSwalConfig = () => ({
        background: getStyle('--swal-bg') || '#161b26',
        color: getStyle('--text-main') || '#f8fafc',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        customClass: { popup: 'border-minimal rounded-3' }
    });

    // 1. YOUTUBE IFRAME CONFIG
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('youtube-player', {
            videoId: youtubeVideoId,
            playerVars: { 'playsinline': 1, 'rel': 0 },
            events: { 'onStateChange': onPlayerStateChange }
        });
    }

    // 2. TIMELINE SYNCHRONIZER
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            syncInterval = setInterval(syncTranscript, 250);
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
                    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            } else {
                line.classList.remove('active');
            }
        });
    }

    // 3. TOKENIZE PARAGRAPH INTO CLICKABLE WORDS
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
                    if(player && typeof player.pauseVideo === 'function') player.pauseVideo();
                    openDictionary(cleanWord, rawText);
                };
                
                formattedContainer.appendChild(span);
            });
        });
    }

    // 4. DICTIONARY API SUBMODULE
    function openDictionary(word, contextSentence) {
        const currentConf = getSwalConfig();
        Swal.fire({
            ...currentConf,
            title: `Mencari arti "${word}"...`,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        Promise.all([
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.ok ? res.json() : null),
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(word)}`).then(res => res.json())
        ])
        .then(([dictData, transData]) => {
            let translation = transData?.[0]?.[0]?.[0] || "";
            let phonetic = dictData?.[0]?.phonetic || "";
            let partOfSpeech = dictData?.[0]?.meanings?.[0]?.partOfSpeech || "";
            let definition = dictData?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || "Definisi tidak ditemukan.";

            Swal.fire({
                ...currentConf,
                title: `${word}`,
                html: `
                    <p class="text-muted small mb-3">${phonetic} &bull; <i>${partOfSpeech}</i></p>
                    <div class="p-3 text-start border-minimal rounded-3 bg-light mb-3" style="font-size:0.85rem; background:var(--box-bg) !important;">
                        <span class="text-theme-muted">${definition}</span>
                    </div>
                    <input type="text" id="swal-input-translation" class="form-control text-center fw-bold" style="background: var(--box-bg); border: 1px solid var(--card-border); color:var(--text-main);" value="${translation}">
                `,
                showCancelButton: true,
                confirmButtonText: 'Simpan ke Flashcard',
                cancelButtonText: 'Tutup',
                confirmButtonColor: getStyle('--accent-success') || '#10b981',
                preConfirm: () => {
                    const finalTranslation = document.getElementById('swal-input-translation').value;
                    if (!finalTranslation) Swal.showValidationMessage('Terjemahan Indonesia wajib diisi!');
                    return { translation: finalTranslation, definition: definition };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    saveVocabularyToDB(word, result.value.translation, contextSentence, result.value.definition);
                }
            });
        })
        .catch(() => {
            Swal.fire({ ...currentConf, title: 'Error', text: 'Gagal menghubungi server kamus.', icon: 'error' });
        });
    }

    // 5. AJAX BACKEND DISPATCHER
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
            const currentConf = getSwalConfig();
            if(data.status === 'success') {
                Swal.fire({ ...currentConf, title: 'Tersimpan', text: data.message, icon: 'success' }).then(() => location.reload());
            } else {
                Swal.fire({ ...currentConf, title: 'Info', text: data.message, icon: 'info' });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', processTranscriptWords);

    function playLine(startTime) {
        if(player && typeof player.seekTo === 'function') {
            player.seekTo(startTime, true);
            player.playVideo();
        }
    }

    function toggleTranslation(btn) {
        const line = btn.closest('.transcript-line').querySelector('.transcript-translation');
        if (line) {
            line.classList.toggle('d-none');
            btn.classList.toggle('active');
        }
    }

    // 6. FLUENCY SPEECH RECOGNITION MODULE
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    function cleanText(str) { return str.toLowerCase().replace(/[^\w\s\']/gi, '').trim(); }

    function calculateAccuracy(spoken, expected) {
        let spokenWords = cleanText(spoken).split(' ');
        let expectedWords = cleanText(expected).split(' ');
        let matches = 0;
        expectedWords.forEach(w => { if(spokenWords.includes(w)) matches++; });
        return expectedWords.length === 0 ? 0 : Math.min(100, (matches / expectedWords.length) * 100);
    }

    function startSpeakingPractice(btnElement, expectedText) {
        const currentConf = getSwalConfig();
        if (!SpeechRecognition) {
            Swal.fire({ ...currentConf, title: 'Browser Tidak Mendukung', text: 'Gunakan Chrome atau Edge terbaru.', icon: 'error' });
            return;
        }

        if(player && typeof player.pauseVideo === 'function') player.pauseVideo();

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        let hasResult = false;

        recognition.onstart = function() {
            btnElement.classList.add('recording-active');
            
            Swal.fire({
                ...currentConf,
                title: '🎤 Silakan Ucapkan',
                html: `
                    <p class="fw-bold fs-5 mt-2 mb-3">"${expectedText}"</p>
                    <span class="text-danger blink-text small">● Sistem mendengarkan suara anda...</span>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Selesai & Analisis',
                confirmButtonColor: getStyle('--accent-primary') || '#3b82f6',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    recognition.stop();
                    Swal.fire({ ...currentConf, title: 'Menganalisis...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                }
            });
        };

        recognition.onresult = function(event) {
            hasResult = true;
            const spokenText = event.results[0][0].transcript;
            const accuracy = calculateAccuracy(spokenText, expectedText);

            if (accuracy >= 80) {
                confetti({ particleCount: 100, spread: 50, origin: { y: 0.75 }, colors: ['#10b981', '#3b82f6'] });
                Swal.fire({
                    ...currentConf,
                    icon: 'success',
                    title: 'Excellent! 🌟',
                    html: `Akurasi: <span class="text-success fw-bold">${Math.round(accuracy)}%</span><br><small class="text-muted">"${spokenText}"</small>`
                });
            } else {
                Swal.fire({
                    ...currentConf,
                    icon: 'warning',
                    title: 'Coba Lagi! 💪',
                    html: `Akurasi: <span class="text-warning fw-bold">${Math.round(accuracy)}%</span><br><small class="text-danger">"${spokenText}"</small>`
                });
            }
        };

        recognition.onerror = function(event) {
            let msg = 'Terjadi kesalahan mikrofon.';
            if(event.error === 'not-allowed') msg = 'Izin mikrofon ditolak.';
            if(event.error === 'no-speech') { msg = 'Suara tidak terdeteksi.'; hasResult = true; }
            Swal.fire({ ...currentConf, title: 'Gagal', text: msg, icon: 'error' });
            resetBtn();
        };

        recognition.onend = function() {
            resetBtn();
            if (!hasResult && Swal.isVisible()) {
                 Swal.fire({ ...currentConf, title: 'Timeout', text: 'Tidak ada ucapan yang terdeteksi.', icon: 'warning' });
            }
        };

        function resetBtn() {
            btnElement.classList.remove('recording-active');
        }

        recognition.start();
    }
</script>
@endsection