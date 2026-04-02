@extends('layouts.app')

@section('content')
<div class="container mt-4 mb-5 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-bold text-white text-glow mb-0">Daily Review</h4>
                <div class="d-flex gap-3 align-items-center">
                    <button id="btnToggleDirection" class="btn btn-sm btn-glass rounded-pill fw-bold px-3">
                        🔄 ID ➔ EN
                    </button>
                    <span class="badge badge-glass rounded-pill fs-6 px-3 py-2" id="cardCounter">0 / 0</span>
                </div>
            </div>

            <div id="completionMessage" class="glass-card text-center d-none py-5 px-4 mb-4">
                <div class="mb-4 position-relative">
                    <div class="position-absolute top-50 start-50 translate-middle" style="width: 100px; height: 100px; background: radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, transparent 70%); filter: blur(15px); pointer-events: none;"></div>
                    <h1 class="display-1 mb-0 position-relative z-1" style="filter: drop-shadow(0 0 15px rgba(52, 211, 153, 0.5));">🎉</h1>
                </div>
                <h3 class="fw-bold text-white mb-2 text-glow">Luar Biasa!</h3>
                <p class="text-slate mb-4">Anda telah menyelesaikan semua review hari ini.</p>
                <div class="d-flex justify-content-center gap-3 mt-2 flex-wrap">
                    <a href="{{ route('home') }}" class="btn btn-neon-primary rounded-pill px-4 py-2 fw-semibold">Ke Dashboard</a>
                    <a href="{{ route('study.practice') }}" class="btn btn-glass rounded-pill px-4 py-2 fw-semibold">Latihan Bebas</a>
                </div>
            </div>

            <div id="flashcardContainer" class="flip-container mb-4">
                <div class="flipper" id="flipperCard">
                    
                    <div class="front-card glass-panel rounded-4 text-center">
                        <div class="position-absolute top-0 end-0 opacity-25" style="width: 200px; height: 200px; background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%); transform: translate(30%, -30%); pointer-events: none;"></div>
                        
                        <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100 position-relative z-1">
                            <div>
                                <span class="badge badge-glass mb-4 text-uppercase px-3 py-2 fw-semibold" id="itemTypeFront">...</span>
                                <h1 class="display-4 fw-bold text-white mb-5 text-glow" id="itemContent" style="letter-spacing: 1px;">...</h1>
                                <button id="btnShowAnswer" class="btn btn-neon-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" style="letter-spacing: 1px;">
                                    Show Answer
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="back-card glass-panel rounded-4 text-center">
                        <div class="card-body p-4 p-md-5 d-flex flex-column h-100 position-relative z-1">
                            <h4 class="fw-semibold text-slate mb-2" id="itemContentRepeat">...</h4>
                            <h2 class="fw-bold neon-green mb-4 display-6" id="itemTranslation">...</h2>
                            
                            <div class="glass-box p-4 rounded-4 mb-4 text-start flex-grow-1">
                                <small class="text-slate fw-bold d-block mb-2 text-uppercase" style="letter-spacing: 1.5px; font-size: 0.75rem;">Example:</small>
                                <p class="mb-0 fst-italic fs-5 text-white" id="itemExample" style="line-height: 1.6;">...</p>
                            </div>

                            <p class="text-slate small mb-4" id="itemNotes"></p>

                            <div class="mt-auto">
                                <hr class="border-slate opacity-25 mb-4">
                                <p class="mb-3 fw-semibold text-slate text-uppercase" style="font-size: 0.8rem; letter-spacing: 1px;">Seberapa mudah ini untukmu?</p>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <button class="btn btn-neon-danger flex-fill rate-btn rounded-pill py-2" data-quality="1">Lupa</button>
                                    <button class="btn btn-neon-warning flex-fill rate-btn rounded-pill py-2" data-quality="3">Sulit</button>
                                    <button class="btn btn-neon-info flex-fill rate-btn rounded-pill py-2" data-quality="4">Bagus</button>
                                    <button class="btn btn-neon-success flex-fill rate-btn rounded-pill py-2" data-quality="5">Mudah</button>
                                </div>
                            </div>
                        </div>
                    </div>

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
/* PREMIUM GLASSMORPHISM & FLIP ANIMATION STYLES            */
/* ======================================================== */

/* Typography & Colors */
.text-slate { color: #94a3b8 !important; }
.text-glow { text-shadow: 0 0 15px rgba(255,255,255,0.3); }
.neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }
.border-slate { border-color: #64748b !important; }

/* Base Glass Components */
.badge-glass {
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    backdrop-filter: blur(8px);
}

.glass-card {
    background: rgba(20, 25, 40, 0.5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.5rem;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
}

.glass-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
}

/* Base Buttons */
.btn-glass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #fff;
    transition: all 0.2s ease;
}
.btn-glass:hover, .btn-glass.active-glass {
    background: rgba(56, 189, 248, 0.15);
    border-color: rgba(56, 189, 248, 0.4);
    color: #38bdf8;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2), 0 0 15px rgba(56, 189, 248, 0.2);
}

.btn-neon-primary {
    background: linear-gradient(135deg, #4f46e5, #3b82f6);
    border: none;
    color: white;
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
    transition: all 0.2s ease;
}
.btn-neon-primary:hover {
    box-shadow: 0 0 25px rgba(79, 70, 229, 0.6);
    color: white;
    transform: translateY(-2px);
}

/* Rate Buttons */
.rate-btn { font-weight: 600; letter-spacing: 0.5px; transition: all 0.2s ease; border: none; color: white; }
.btn-neon-danger { background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.4); color: #fb7185; }
.btn-neon-danger:hover { background: #f43f5e; box-shadow: 0 0 20px rgba(244, 63, 94, 0.6); color: white; }

.btn-neon-warning { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; }
.btn-neon-warning:hover { background: #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.6); color: white; }

.btn-neon-info { background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; }
.btn-neon-info:hover { background: #0ea5e9; box-shadow: 0 0 20px rgba(56, 189, 248, 0.6); color: white; }

.btn-neon-success { background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; }
.btn-neon-success:hover { background: #10b981; box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); color: white; }

/* ======================================================== */
/* 3D FLIP MECHANICS                                        */
/* ======================================================== */

.flip-container {
    perspective: 1500px; 
    position: relative;
    height: 520px; /* Slightly taller for premium spacing */
}

.flipper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d; 
    -webkit-transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1); /* Smoother premium easing */
}

.flipped {
    transform: rotateY(180deg);
}

/* Glass Panels applied to Flip sides */
.glass-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; 
    -webkit-backface-visibility: hidden;
    overflow-y: auto; 
    background: rgba(15, 23, 42, 0.6);
    /* Note: backdrop-filter is applied here cautiously as it can bug out with 3D transforms in some webkit browsers.
       We rely heavily on the dark semi-transparent bg to sell the glass effect during the flip. */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.front-card {
    z-index: 2;
    transform: rotateY(0deg); 
}

.back-card {
    transform: rotateY(180deg);
}

/* Custom Scrollbar for Glass Panels */
.glass-panel::-webkit-scrollbar { width: 6px; }
.glass-panel::-webkit-scrollbar-track { background: transparent; }
.glass-panel::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
.glass-panel::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
</style>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Data dari Laravel
    let flashcards = @json($dueFlashcards);
    let currentIndex = 0;

    // Referensi Element HTML
    const container = document.getElementById('flashcardContainer');
    const flipper = document.getElementById('flipperCard'); 
    const completionMsg = document.getElementById('completionMessage');
    const counter = document.getElementById('cardCounter');
    
    // Element Sisi Depan
    const contentEl = document.getElementById('itemContent');
    const typeElFront = document.getElementById('itemTypeFront');
    
    // Element Sisi Belakang
    const contentElRepeat = document.getElementById('itemContentRepeat');
    const translationEl = document.getElementById('itemTranslation');
    const exampleEl = document.getElementById('itemExample');
    const notesEl = document.getElementById('itemNotes');
    
    // Tombol Aksi
    const btnShowAnswer = document.getElementById('btnShowAnswer');
    const rateBtns = document.querySelectorAll('.rate-btn');
    
    // ELEMEN BARU
    const btnToggleDirection = document.getElementById('btnToggleDirection');
    let isReversed = false; // Status awal: Inggris ke Indonesia

    // EVENT BARU: Tombol Toggle Arah
    btnToggleDirection.addEventListener('click', function() {
        isReversed = !isReversed; 
        
        // Ubah tampilan tombol untuk tema Glassmorphism
        this.innerText = isReversed ? "🔄 EN ➔ ID" : "🔄 ID ➔ EN";
        this.classList.toggle('active-glass');
        
        // Render ulang teks di kartu yang sedang tampil secara instan
        if (currentIndex < flashcards.length) {
            populateCardData(currentIndex);
        }
    });

    // FUNGSI UPDATE: Memasukkan teks dengan kondisi arah
    function populateCardData(index) {
        const item = flashcards[index].study_item;
        counter.innerText = `${index + 1} / ${flashcards.length}`;
        typeElFront.innerText = item.type.toUpperCase();
        
        if (!isReversed) {
            contentEl.innerText = item.content;
            contentElRepeat.innerText = item.content;
            translationEl.innerText = item.translation;
        } else {
            contentEl.innerText = item.translation;
            contentElRepeat.innerText = item.translation;
            translationEl.innerText = item.content;
        }

        exampleEl.innerText = item.example_sentence || 'Tidak ada contoh kalimat.';
        notesEl.innerText = item.notes || '';
    }

    // Fungsi: Memuat kartu ke layar
    function loadCard() {
        if (currentIndex >= flashcards.length) {
            container.classList.add('d-none');
            completionMsg.classList.remove('d-none');
            counter.innerText = `${flashcards.length} / ${flashcards.length}`;
            return;
        }

        // Reset: Kembalikan kartu ke posisi depan
        flipper.classList.remove('flipped');

        // Sedikit jeda agar konten tidak berubah sebelum kartu selesai berputar kembali
        setTimeout(() => {
            const card = flashcards[currentIndex];
            const item = card.study_item;

            // Update Counter
            counter.innerText = `${currentIndex + 1} / ${flashcards.length}`;
            
            // Update Sisi Depan
            contentEl.innerText = item.content;
            typeElFront.innerText = item.type.toUpperCase();
            
            // Update Sisi Belakang
            contentElRepeat.innerText = item.content; 
            translationEl.innerText = item.translation;
            exampleEl.innerText = item.example_sentence || 'No example sentence provided.';
            notesEl.innerText = item.notes || '';

            // Pastikan sinkron dengan status isReversed jika di-toggle saat review berjalan
            populateCardData(currentIndex);

        }, 200); // Diperpanjang sedikit untuk animasi glass yang lebih smooth
    }

    // Event: Tombol "Show Answer"
    btnShowAnswer.addEventListener('click', function() {
        flipper.classList.add('flipped');
    });

    // Event: Tombol Penilaian (Mengirim data SRS)
    rateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quality = this.getAttribute('data-quality');
            const flashcardId = flashcards[currentIndex].id;

            rateBtns.forEach(b => b.disabled = true);

            // Fetch API untuk menyimpan progres
            fetch(`/study/${flashcardId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ quality: quality })
            })
            .then(response => response.json())
            .then(data => {
                currentIndex++;
                loadCard(); 
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving progress.');
            })
            .finally(() => {
                rateBtns.forEach(b => b.disabled = false);
            });
        });
    });

    // Jalankan pertama kali
    if (flashcards.length > 0) {
        loadCard();
    } else {
        container.classList.add('d-none');
        completionMsg.classList.remove('d-none');
        completionMsg.querySelector('p').innerText = "Tidak ada materi yang perlu di-review hari ini.";
    }
});
</script>
@endsection