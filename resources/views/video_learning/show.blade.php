@extends('layouts.app')

@section('content')
<div class="container-fluid px-4 py-3">
    <nav aria-label="breadcrumb" class="mb-3">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('videos.user.index') }}" class="text-decoration-none">Video Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $video->title }}</li>
        </ol>
    </nav>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="card shadow-sm border-0 rounded-4 overflow-hidden bg-dark">
                <div class="ratio ratio-16x9">
                    <div id="youtube-player"></div>
                </div>
            </div>
            <h3 class="fw-bold mt-3">{{ $video->title }}</h3>
            <span class="badge bg-primary text-uppercase">{{ $video->difficulty }}</span>
            <p class="text-muted mt-2 small">
                💡 <strong>Tips:</strong> Klik kata manapun pada transkrip di sebelah kanan untuk melihat kamus dan menyimpannya ke Flashcard Anda.
            </p>
        </div>

        <div class="col-lg-4">
            <div class="card shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white border-0 pt-4 pb-2">
                    <h5 class="fw-bold mb-0">Interactive Transcript</h5>
                </div>
                <div class="card-body overflow-auto p-4" id="transcript-container" style="max-height: 500px; position: relative;">
                    
                    @forelse($video->transcripts as $index => $transcript)
                        <div class="transcript-line mb-3 p-3 rounded border" 
                             id="line-{{ $index }}"
                             data-start="{{ $transcript->start_time }}" 
                             data-end="{{ $transcript->end_time }}">
                             
                            <div class="d-flex justify-content-between align-items-start">
                                <div class="flex-grow-1 pe-3">
                                    <span class="raw-text d-none">{{ $transcript->text }}</span>
                                    <span class="formatted-text fs-5 lh-base fw-medium text-dark d-block mb-1"></span>
                                    
                                    @if($transcript->translation)
                                        <div class="text-muted small mt-2 border-start border-3 border-info ps-2 transcript-translation d-none">
                                            {{ $transcript->translation }}
                                        </div>
                                    @endif
                                </div>
                                
                                <div class="d-flex flex-column gap-2 ms-2">
                                    <button class="btn btn-sm btn-primary rounded-circle shadow-sm" onclick="playLine({{ $transcript->start_time }})" title="Putar ulang kalimat ini">
                                        ▶
                                    </button>
                                    
                                    @if($transcript->translation)
                                    <button class="btn btn-sm btn-outline-secondary rounded-circle shadow-sm" onclick="toggleTranslation(this)" title="Lihat terjemahan">
                                        🌐
                                    </button>
                                    @endif
                                </div>
                            </div>

                        </div>
                    @empty
                        <p class="text-muted">Transkrip tidak tersedia untuk video ini.</p>
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
    /* Baris transkrip yang sedang aktif/diucapkan */
    .transcript-line.active {
        background-color: #fff3cd !important; /* Kuning muda khas highlight */
        border-left: 4px solid #ffc107;
        transition: all 0.3s ease;
    }

    /* Styling kata yang bisa diklik */
    .clickable-word {
        cursor: pointer;
        padding: 0 2px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    .clickable-word:hover {
        background-color: #e2e8f0;
    }

    /* Highlight untuk Kosakata yang SUDAH TERSIMPAN di Flashcard */
    .saved-word {
        color: #198754; /* Hijau Success */
        font-weight: 600;
        text-decoration: underline;
        text-decoration-style: dotted;
    }
</style>
@endsection

@section('scripts')
<script src="https://www.youtube.com/iframe_api"></script>

<script>
    // Data dari Laravel
    const youtubeVideoId = "{{ $video->youtube_id }}";
    const savedVocabs = @json($savedVocabs); // Array berisi kata yang sudah disimpan user

    let player;
    let syncInterval;
    const transcriptLines = document.querySelectorAll('.transcript-line');
    const transcriptContainer = document.getElementById('transcript-container');

    // 1. INISIALISASI YOUTUBE PLAYER (Fungsi Bawaan API YouTube)
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

    // 2. KENDALI SINKRONISASI WAKTU YOUTUBE & TRANSKRIP
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            // Jika video play, cek waktu setiap 300ms
            syncInterval = setInterval(syncTranscript, 300);
        } else {
            // Jika pause/stop, hentikan pengecekan
            clearInterval(syncInterval);
        }
    }

    function syncTranscript() {
        const currentTime = player.getCurrentTime();

        transcriptLines.forEach(line => {
            const start = parseFloat(line.getAttribute('data-start'));
            const end = parseFloat(line.getAttribute('data-end'));

            // Jika waktu video berada di rentang baris ini
            if (currentTime >= start && currentTime <= end) {
                if (!line.classList.contains('active')) {
                    // Hapus active dari semua, lalu tambahkan ke yang ini
                    document.querySelectorAll('.transcript-line.active').forEach(el => el.classList.remove('active'));
                    line.classList.add('active');
                    
                    // Auto-scroll pelan agar baris ini tetap di tengah layar transkrip
                    line.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            } else {
                line.classList.remove('active');
            }
        });
    }

    // 3. LOGIKA MEMECAH KALIMAT MENJADI KATA YANG BISA DIKLIK
    function processTranscriptWords() {
        transcriptLines.forEach(line => {
            const rawText = line.querySelector('.raw-text').innerText;
            const formattedContainer = line.querySelector('.formatted-text');
            
            // Pecah berdasarkan spasi
            const words = rawText.split(" ");
            
            words.forEach(word => {
                // Bersihkan tanda baca dari kata untuk pencocokan (misal: "cake." -> "cake")
                const cleanWord = word.replace(/[^\w\s\']/g, "").toLowerCase();
                
                // Cek apakah kata ini ada di array savedVocabs dari Laravel
                const isSaved = savedVocabs.includes(cleanWord);
                const savedClass = isSaved ? "saved-word" : "";

                // Buat elemen span
                const span = document.createElement('span');
                span.className = `clickable-word ${savedClass}`;
                span.innerText = word + " ";
                
                // Tambahkan event klik untuk memanggil kamus
                span.onclick = function() {
                    // Pause video otomatis saat pengguna klik kata
                    if(player && typeof player.pauseVideo === 'function') {
                        player.pauseVideo();
                    }
                    openDictionary(cleanWord, rawText);
                };
                
                formattedContainer.appendChild(span);
            });
        });
    }

    // 4. LOGIKA KAMUS (GABUNGAN DICTIONARY API & TRANSLATION API)
    function openDictionary(word, contextSentence) {
        // Tampilkan loading spinner
        Swal.fire({
            title: `Mencari arti "${word}"...`,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        // Jalankan DUA request API secara bersamaan (Dictionary & Google Translate)
        Promise.all([
            // API 1: Kamus Inggris (Definisi & Phonetic)
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.ok ? res.json() : null),
            
            // API 2: Google Translate (Inggris ke Indonesia)
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(word)}`).then(res => res.json())
        ])
        .then(([dictData, transData]) => {
            // Proses Data Google Translate
            let translation = "";
            // Format array kembalian Google Translate: data[0][0][0] adalah teks terjemahannya
            if (transData && transData[0] && transData[0][0] && transData[0][0][0]) {
                translation = transData[0][0][0];
            }

            // Proses Data Kamus EN (Tetap menggunakan Free Dictionary API untuk phonetic & English definition)
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

            // Tampilkan Popup SweetAlert Interaktif
            Swal.fire({
                title: `<span class="text-primary">${word}</span>`,
                html: `
                    <p class="text-muted mb-3">${phonetic} &bull; <i>${partOfSpeech}</i></p>
                    <div class="bg-light p-3 rounded mb-3 text-start">
                        <strong>English Def:</strong><br> ${definition}
                    </div>
                    <label class="fw-bold text-start w-100 mb-1">Terjemahan (Google Translate):</label>
                    <input type="text" id="swal-input-translation" class="form-control form-control-lg fw-bold text-success" value="${translation}">
                `,
                showCancelButton: true,
                confirmButtonText: '<i class="bi bi-bookmark-plus"></i> Simpan ke Flashcard',
                cancelButtonText: 'Tutup',
                confirmButtonColor: '#198754', 
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
            Swal.fire('Error', 'Gagal menghubungi server kamus atau Google Translate.', 'error');
        });
    }

    // 5. AJAX UNTUK MENYIMPAN KE DATABASE LARAVEL
    function saveVocabularyToDB(word, translation, contextSentence, notes) {
        fetch('{{ route("videos.user.save-vocab") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                word: word,
                translation: translation,
                example_sentence: contextSentence, // Kalimat utuh otomatis terambil!
                notes: notes
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                Swal.fire('Tersimpan!', data.message, 'success').then(() => {
                    // Reload halaman agar kata yang baru disimpan langsung ber-highlight hijau
                    location.reload(); 
                });
            } else {
                Swal.fire('Info', data.message, 'info');
            }
        })
        .catch(error => {
            Swal.fire('Error', 'Gagal menyimpan ke database.', 'error');
        });
    }

    // Jalankan pemecahan kata saat halaman dimuat
    document.addEventListener('DOMContentLoaded', function() {
        processTranscriptWords();
    });

    // 6. FUNGSI PUTAR ULANG KALIMAT (PLAY LINE)
    function playLine(startTime) {
        if(player && typeof player.seekTo === 'function') {
            // Melompat ke detik yang ditentukan dan langsung putar
            player.seekTo(startTime, true);
            player.playVideo();
        }
    }

    // 7. FUNGSI TAMPILKAN/SEMBUNYIKAN TERJEMAHAN KALIMAT
    function toggleTranslation(buttonElement) {
        // Cari elemen terjemahan terdekat di dalam baris yang sama
        const translationDiv = buttonElement.closest('.transcript-line').querySelector('.transcript-translation');
        
        if (translationDiv) {
            translationDiv.classList.toggle('d-none');
            // Ubah gaya tombol saat terjemahan sedang terbuka
            buttonElement.classList.toggle('btn-secondary');
            buttonElement.classList.toggle('btn-outline-secondary');
            buttonElement.classList.toggle('text-white');
        }
    }
</script>
@endsection