@extends('layouts.app')

@section('content')
<div class="container py-4 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold text-theme-main mb-0 opacity-90">Daily Review</h5>
                <div class="d-flex gap-2 align-items-center">
                    <button id="btnToggleDirection" class="btn btn-sm btn-minimal-secondary px-3">
                        🔄 ID ➔ EN
                    </button>
                    <span class="badge bg-minimal-badge border-minimal text-theme-main fw-semibold rounded-pill px-3 py-2" id="cardCounter" style="font-size: 0.8rem;">0 / 0</span>
                </div>
            </div>

            <div id="completionMessage" class="minimal-card text-center d-none py-5 px-4 mb-4">
                <div class="mb-3">
                    <h1 class="display-3 mb-0">🎉</h1>
                </div>
                <h4 class="fw-bold text-theme-main mb-2">Luar Biasa!</h4>
                <p class="text-theme-muted small mb-4">Anda telah menyelesaikan semua review hari ini.</p>
                <div class="d-flex justify-content-center gap-2 mt-2 flex-wrap">
                    <a href="{{ route('home') }}" class="btn btn-minimal btn-minimal-primary px-4 btn-sm">Ke Dashboard</a>
                    <a href="{{ route('study.practice') }}" class="btn btn-minimal btn-minimal-secondary px-4 btn-sm">Latihan Bebas</a>
                </div>
            </div>

            <div id="flashcardContainer" class="fade-container mb-4">
                <div class="flipper" id="flipperCard">
                    
                    <div class="front-card glass-panel rounded-4 text-center">
                        <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100">
                            <div class="mt-2">
                                <span class="text-uppercase tracking-wider text-theme-muted fw-bold" id="itemTypeFront" style="font-size: 0.75rem; letter-spacing: 0.05em;">...</span>
                            </div>
                            
                            <div class="my-auto py-4">
                                <h2 class="fw-bold text-theme-main mb-0 tracking-tight" id="itemContent" style="font-size: 2.25rem;">...</h2>
                            </div>
                            
                            <div class="mb-2">
                                <button id="btnShowAnswer" class="btn btn-minimal btn-minimal-primary w-100 py-3 fw-semibold">
                                    Show Answer
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="back-card glass-panel rounded-4 text-center">
                        <div class="card-body p-4 d-flex flex-column h-100">
                            <div class="mb-3 text-start">
                                <span class="text-uppercase tracking-wider text-theme-muted fw-bold" id="itemTypeBack" style="font-size: 0.7rem; letter-spacing: 0.05em;">ANSWER</span>
                                <h6 class="fw-medium text-theme-muted mt-2 mb-1" id="itemContentRepeat">...</h6>
                                <h3 class="fw-bold text-theme-main tracking-tight" id="itemTranslation">...</h3>
                            </div>
                            
                            <div class="minimal-box p-3 rounded-3 mb-3 text-start flex-grow-1 overflow-auto">
                                <span class="text-theme-muted fw-bold d-block mb-1 text-uppercase letter-spacing-wide" style="font-size: 0.65rem;">Example Sentence:</span>
                                <p class="mb-0 fst-italic text-theme-main small" id="itemExample" style="line-height: 1.5;">...</p>
                            </div>

                            <p class="text-theme-muted small mb-3 text-start px-1" id="itemNotes" style="font-size: 0.8rem;"></p>

                            <div class="mt-auto pt-2 border-top-minimal">
                                <p class="mb-3 fw-medium text-theme-muted small">Seberapa mudah materi ini untukmu?</p>
                                <div class="row g-2">
                                    <div class="col-3">
                                        <button class="btn btn-rate btn-rate-danger w-100" data-quality="1">Lupa</button>
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-rate btn-rate-warning w-100" data-quality="3">Sulit</button>
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-rate btn-rate-info w-100" data-quality="4">Bagus</button>
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-rate btn-rate-success w-100" data-quality="5">Mudah</button>
                                    </div>
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
/* MINIMALIST ELEGANT THEME & VARIABLES                     */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --panel-bg: rgba(30, 37, 48, 0.6); /* Glassmorphism background */
    --panel-border: rgba(255, 255, 255, 0.1);
    --panel-shadow: rgba(0, 0, 0, 0.2);
    --panel-inner-shadow: rgba(255, 255, 255, 0.1);
    --badge-bg: rgba(255, 255, 255, 0.04);
    
    --accent-primary: #3b82f6;
    --accent-danger: #f43f5e;
    --accent-warning: #eab308;
    --accent-info: #06b6d4;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --panel-bg: rgba(255, 255, 255, 0.6); /* Glassmorphism background */
    --panel-border: rgba(0, 0, 0, 0.08);
    --panel-shadow: rgba(0, 0, 0, 0.05);
    --panel-inner-shadow: rgba(255, 255, 255, 0.7);
    --badge-bg: rgba(0, 0, 0, 0.02);
    
    --accent-primary: #2563eb;
    --accent-danger: #dc2626;
    --accent-warning: #ca8a04;
    --accent-info: #0891b2;
    --accent-success: #059669;
}

/* Base Layout Components */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 1rem;
}

.minimal-box {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }
.border-top-minimal { border-top: 1px solid var(--card-border); }

/* Elegant Custom Buttons */
.btn-minimal {
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary {
    background: var(--accent-primary);
    color: #ffffff !important;
    border: none;
}
.btn-minimal-primary:hover {
    filter: brightness(1.08);
}
.btn-minimal-secondary {
    background: transparent;
    color: var(--text-main) !important;
    border: 1px solid var(--card-border);
}
.btn-minimal-secondary:hover {
    background: var(--box-bg);
}

/* Minimalist Rate Style Buttons */
.btn-rate {
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.5rem 0.25rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    transition: all 0.15s ease;
}
.btn-rate-danger { background: rgba(244, 63, 94, 0.06); color: var(--accent-danger); border-color: rgba(244, 63, 94, 0.1); }
.btn-rate-danger:hover { background: var(--accent-danger); color: #fff; }

.btn-rate-warning { background: rgba(234, 179, 8, 0.06); color: var(--accent-warning); border-color: rgba(234, 179, 8, 0.1); }
.btn-rate-warning:hover { background: var(--accent-warning); color: #fff; }

.btn-rate-info { background: rgba(6, 180, 212, 0.06); color: var(--accent-info); border-color: rgba(6, 180, 212, 0.1); }
.btn-rate-info:hover { background: var(--accent-info); color: #fff; }

.btn-rate-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); border-color: rgba(16, 185, 129, 0.1); }
.btn-rate-success:hover { background: var(--accent-success); color: #fff; }

/* ======================================================== */
/* SMOOTH FADE GLASSMORPHISM MECHANICS                      */
/* ======================================================== */
.fade-container {
    position: relative;
    height: 440px; /* Adjusted from 520px to match original layout */
    width: 100%;
}

.flipper {
    width: 100%;
    height: 100%;
    position: relative;
    /* The parent flipper needs perspective for 3D-like transitions if ever needed */
    perspective: 1200px;
}

.glass-panel {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    overflow: hidden; 
    
    background: var(--panel-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--panel-border);
    box-shadow: 0 16px 40px var(--panel-shadow), inset 0 1px 0 var(--panel-inner-shadow);
    
    opacity: 0; visibility: hidden;
    transform: scale(0.95); filter: blur(5px);
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), 
                transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                visibility 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                filter 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.front-card { opacity: 1; visibility: visible; transform: scale(1); filter: blur(0); z-index: 2; }
.back-card  { z-index: 1; }

.flipper.flipped .front-card { opacity: 0; visibility: hidden; transform: scale(0.95); filter: blur(5px); z-index: 1; }
.flipper.flipped .back-card  { opacity: 1; visibility: visible; transform: scale(1); filter: blur(0); z-index: 2; }

/* Scrollbar Customization */
.minimal-box::-webkit-scrollbar { width: 4px; }
.minimal-box::-webkit-scrollbar-track { background: transparent; }
.minimal-box::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 10px; }
</style>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    let flashcards = @json($dueFlashcards);
    let currentIndex = 0;

    const container = document.getElementById('flashcardContainer');
    const flipper = document.getElementById('flipperCard'); 
    const completionMsg = document.getElementById('completionMessage');
    const counter = document.getElementById('cardCounter');
    
    const contentEl = document.getElementById('itemContent');
    const typeElFront = document.getElementById('itemTypeFront');
    
    const contentElRepeat = document.getElementById('itemContentRepeat');
    const translationEl = document.getElementById('itemTranslation');
    const exampleEl = document.getElementById('itemExample');
    const notesEl = document.getElementById('itemNotes');
    
    const btnShowAnswer = document.getElementById('btnShowAnswer');
    const rateBtns = document.querySelectorAll('.rate-btn, .btn-rate');
    
    const btnToggleDirection = document.getElementById('btnToggleDirection');
    let isReversed = false; 

    btnToggleDirection.addEventListener('click', function() {
        isReversed = !isReversed; 
        this.innerText = isReversed ? "🔄 EN ➔ ID" : "🔄 ID ➔ EN";
        
        if (currentIndex < flashcards.length) {
            populateCardData(currentIndex);
        }
    });

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

    function loadCard() {
        if (currentIndex >= flashcards.length) {
            container.classList.add('d-none');
            completionMsg.classList.remove('d-none');
            counter.innerText = `${flashcards.length} / ${flashcards.length}`;
            return;
        }

        // 1. Fade out the current card
        flipper.style.opacity = '0';
        flipper.style.transition = 'opacity 0.2s ease-out';

        // 2. Wait for the fade-out to complete
        setTimeout(() => {
            // 3. Update content and reset card state while it's invisible
            populateCardData(currentIndex);
            flipper.classList.remove('flipped');
            
            // Remove inline transition to use the CSS class transition for the next flip
            flipper.style.transition = ''; 

            // 4. Fade in the new card
            flipper.style.opacity = '1';
        }, 200); // This duration should match the transition time above
    }

    btnShowAnswer.addEventListener('click', function() {
        flipper.classList.add('flipped');
    });

    rateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quality = this.getAttribute('data-quality');
            const flashcardId = flashcards[currentIndex].id;

            rateBtns.forEach(b => b.disabled = true);

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