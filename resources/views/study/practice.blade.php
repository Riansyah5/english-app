@extends('layouts.app')

@section('content')
<div class="container py-4 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">
            
            <!-- Header Title & Controls -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 class="fw-bold mb-1 text-theme-main opacity-90">Mode Latihan Bebas 🎮</h5>
                    <small class="text-theme-muted fw-medium">Skor tidak akan disimpan</small>
                </div>
                
                <div class="d-flex gap-2 align-items-center">
                    <div id="directionToggle" class="minimal-segmented-control position-relative d-flex rounded-pill user-select-none" style="cursor: pointer;">
                        <div class="segmented-indicator position-absolute rounded-pill"></div>
                        <div id="btnLangIdEn" class="segment-btn flex-fill text-center position-relative z-1 fw-semibold text-white">ID ➔ EN</div>
                        <div id="btnLangEnId" class="segment-btn flex-fill text-center position-relative z-1 fw-semibold text-theme-muted">EN ➔ ID</div>
                    </div>
                    <span class="badge bg-minimal-badge border-minimal text-theme-main fw-semibold rounded-pill px-3 py-2" id="cardCounter" style="font-size: 0.8rem;">0 / 0</span>
                </div>
            </div>

            <!-- Configuration Options Menu -->
            <div class="minimal-card mb-3 p-3">
                <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <span class="fw-semibold text-theme-muted small text-uppercase tracking-wider" style="font-size: 0.7rem;">Sumber Data:</span>
                    <div class="btn-group w-100 w-md-auto border-minimal rounded-3 overflow-hidden" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'today', 'limit' => $limit]) }}" 
                           class="btn btn-sm btn-group-minimal {{ $source == 'today' ? 'active' : '' }}">
                            Hari Ini
                        </a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'all', 'limit' => $limit]) }}" 
                           class="btn btn-sm btn-group-minimal {{ $source == 'all' ? 'active' : '' }}">
                            Semua (Acak)
                        </a>
                    </div>
                </div>
            </div>

            @if($source == 'all')
            <div class="minimal-card border-accent-info mb-3 p-3">
                <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <span class="fw-semibold text-theme-muted small text-uppercase tracking-wider" style="font-size: 0.7rem;">Batas Jumlah:</span>
                    <div class="btn-group w-100 w-md-auto border-minimal rounded-3 overflow-hidden" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '50']) }}" 
                           class="btn btn-sm btn-group-minimal {{ $limit == '50' ? 'active' : '' }}">50</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '100']) }}" 
                           class="btn btn-sm btn-group-minimal {{ $limit == '100' ? 'active' : '' }}">100</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => 'all']) }}" 
                           class="btn btn-sm btn-group-minimal {{ $limit == 'all' ? 'active' : '' }}">Semua</a>
                    </div>
                </div>
            </div>
            @endif

            <!-- Type Selector Buttons -->
            <div class="d-flex flex-wrap gap-2 mb-4 justify-content-center justify-content-md-start">
                <a href="{{ route('study.practice', ['type' => null, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ !$selectedType ? 'active' : '' }}">Semua Tipe</a>
                <a href="{{ route('study.practice', ['type' => 'word', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ $selectedType == 'word' ? 'active' : '' }}">Vocabulary</a>
                <a href="{{ route('study.practice', ['type' => 'phrase', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ $selectedType == 'phrase' ? 'active' : '' }}">Phrases</a>
                <a href="{{ route('study.practice', ['type' => 'grammar_rule', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ $selectedType == 'grammar_rule' ? 'active' : '' }}">Grammar</a>
                <a href="{{ route('study.practice', ['type' => 'idiom', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ $selectedType == 'idiom' ? 'active' : '' }}">Idioms</a>
                <a href="{{ route('study.practice', ['type' => 'speaking_prompt', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-type {{ $selectedType == 'speaking_prompt' ? 'active' : '' }}">Speaking Prompts</a>
            </div>

            <!-- Completion Message View -->
            <div id="completionMessage" class="minimal-card text-center d-none py-5 px-4 mb-4">
                <div class="mb-3">
                    <h1 class="display-3 mb-0">🔁</h1>
                </div>
                <h4 class="fw-bold text-theme-main mb-2">Latihan Selesai</h4>
                <p class="text-theme-muted small mb-4" id="completionDesc">Anda telah mengulang semua materi di pengaturan ini.</p>
                <div class="d-flex justify-content-center gap-2 mt-4 flex-wrap">
                    <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-minimal btn-minimal-secondary px-4 btn-sm">Ulangi Lagi</a>
                    <a href="{{ route('home') }}" class="btn btn-minimal btn-minimal-primary px-4 btn-sm">Ke Dashboard</a>
                </div>
            </div>

            <!-- Flashcard Layout View (Fade Transitions) -->
            <div id="flashcardContainer" class="fade-container mb-4">
                
                <!-- FRONT CARD -->
                <div class="front-card minimal-panel rounded-4 text-center active">
                    <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100">
                        <div class="mt-2">
                            <span class="text-uppercase tracking-wider text-theme-muted fw-bold" id="itemTypeFront" style="font-size: 0.75rem; letter-spacing: 0.05em;">...</span>
                        </div>
                        
                        <div class="my-auto py-4">
                            <h2 class="fw-bold text-theme-main mb-0 tracking-tight" id="itemContent" style="font-size: 2.25rem;">...</h2>
                        </div>
                        
                        <div class="mb-2">
                            <button id="btnShowAnswer" class="btn btn-minimal btn-minimal-primary w-100 py-3 fw-semibold">
                                Lihat Jawaban
                            </button>
                        </div>
                    </div>
                </div>

                <!-- BACK CARD -->
                <div class="back-card minimal-panel rounded-4 text-center">
                    <div class="card-body p-4 d-flex flex-column h-100">
                        <div class="mb-3 text-start">
                            <span class="text-uppercase tracking-wider text-theme-muted fw-bold" id="itemTypeBack" style="font-size: 0.7rem; letter-spacing: 0.05em;">ANSWER</span>
                            <h6 class="fw-medium text-theme-muted mt-2 mb-1" id="itemContentRepeat">...</h6>
                            <h3 class="fw-bold text-success tracking-tight" id="itemTranslation">...</h3>
                        </div>
                        
                        <!-- Example Box -->
                        <div class="minimal-box p-3 rounded-3 mb-3 text-start flex-grow-1 overflow-auto">
                            <span class="text-theme-muted fw-bold d-block mb-1 text-uppercase tracking-wider" style="font-size: 0.65rem;">Example Sentence:</span>
                            <p class="mb-0 fst-italic text-theme-main small" id="itemExample" style="line-height: 1.5;">...</p>
                        </div>

                        <p class="text-theme-muted small mb-3 text-start px-1" id="itemNotes" style="font-size: 0.8rem;"></p>

                        <div class="mt-auto pt-2 border-top-minimal">
                            <button id="btnNextCard" class="btn btn-minimal btn-minimal-primary w-100 py-2.5 fw-semibold">
                                Lanjut ke Kartu Berikutnya &rarr;
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - CONFIGURATIONS                */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.04);
    --seg-bg: #131822;
    
    --accent-primary: #3b82f6;
    --accent-info: #06b6d4;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --seg-bg: #f1f5f9;
    
    --accent-primary: #2563eb;
    --accent-info: #0891b2;
    --accent-success: #059669;
}

/* Base structural blocks */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
}

.minimal-box {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }
.border-top-minimal { border-top: 1px solid var(--card-border); }

.border-accent-info {
    border-left: 3px solid var(--accent-info) !important;
}

/* Base minimal buttons system */
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

/* Flat segmented button groups (Sumber data & Batas jumlah) */
.btn-group-minimal {
    background: var(--card-bg);
    color: var(--text-muted);
    border: none !important;
    padding: 0.45rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
}
.btn-group-minimal:hover {
    color: var(--text-main);
    background: var(--box-bg);
}
.btn-group-minimal.active {
    background: var(--accent-primary) !important;
    color: #ffffff !important;
}

/* Minimalist pill shape category list */
.btn-type {
    background: var(--card-bg);
    color: var(--text-muted);
    border: 1px solid var(--card-border);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    transition: all 0.15rem ease;
}
.btn-type:hover {
    color: var(--text-main);
    border-color: var(--text-muted);
}
.btn-type.active {
    background: var(--accent-success);
    color: #ffffff;
    border-color: transparent;
}

/* ======================================================== */
/* SEGMENTED CONTROL SLIDER SWITCH                          */
/* ======================================================== */
.minimal-segmented-control {
    background: var(--seg-bg);
    border: 1px solid var(--card-border);
    width: 155px;
    padding: 3px;
}

.segment-btn {
    font-size: 0.7rem;
    padding: 5px 0;
    transition: color 0.25s ease;
    letter-spacing: 0.02em;
}

.segmented-indicator {
    top: 3px; bottom: 3px; left: 3px;
    width: calc(50% - 3px);
    background: var(--accent-primary);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 0;
}

.minimal-segmented-control.reversed .segmented-indicator {
    transform: translateX(100%);
}

/* ======================================================== */
/* FLAT FADE-IN TRANSITION ENGINE                           */
/* ======================================================== */
.fade-container {
    position: relative;
    height: 400px; 
    width: 100%;
}

.minimal-panel {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    overflow: hidden; 
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.08);
    
    opacity: 0; visibility: hidden;
    transform: scale(0.98);
    transition: opacity 0.25s ease-in-out, 
                transform 0.25s ease-in-out,
                visibility 0.25s ease-in-out,
                background 0.3s ease, border-color 0.3s ease;
    z-index: 1;
}

.minimal-panel.active {
    opacity: 1; visibility: visible;
    transform: scale(1);
    z-index: 2;
}

.minimal-box::-webkit-scrollbar { width: 4px; }
.minimal-box::-webkit-scrollbar-track { background: transparent; }
.minimal-box::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 10px; }
</style>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    let flashcards = @json($practiceCards);
    let currentIndex = 0;
    let isReversed = false; 

    const container = document.getElementById('flashcardContainer');
    const completionMsg = document.getElementById('completionMessage');
    const counter = document.getElementById('cardCounter');
    
    const directionToggle = document.getElementById('directionToggle');
    const btnIdEn = document.getElementById('btnLangIdEn');
    const btnEnId = document.getElementById('btnLangEnId');

    const frontCard = document.querySelector('.front-card');
    const backCard = document.querySelector('.back-card');
    
    const contentEl = document.getElementById('itemContent');
    const typeElFront = document.getElementById('itemTypeFront');
    const typeElBack = document.getElementById('itemTypeBack');
    const contentElRepeat = document.getElementById('itemContentRepeat');
    const translationEl = document.getElementById('itemTranslation');
    const exampleEl = document.getElementById('itemExample');
    const notesEl = document.getElementById('itemNotes');
    
    const btnShowAnswer = document.getElementById('btnShowAnswer');
    const btnNextCard = document.getElementById('btnNextCard');

    directionToggle.addEventListener('click', function() {
        isReversed = !isReversed;
        this.classList.toggle('reversed');
        
        if (isReversed) {
            btnIdEn.classList.remove('text-white');
            btnIdEn.classList.add('text-theme-muted');
            btnEnId.classList.remove('text-theme-muted');
            btnEnId.classList.add('text-white');
        } else {
            btnIdEn.classList.remove('text-theme-muted');
            btnIdEn.classList.add('text-white');
            btnEnId.classList.remove('text-white');
            btnEnId.classList.add('text-theme-muted');
        }
        
        if (currentIndex < flashcards.length) {
            populateCardData(currentIndex);
        }
    });

    function populateCardData(index) {
        const item = flashcards[index].study_item;
        counter.innerText = `${index + 1} / ${flashcards.length}`;
        const uppercaseType = item.type.toUpperCase().replace('_', ' ');
        typeElFront.innerText = uppercaseType;
        if(typeElBack) typeElBack.innerText = uppercaseType;
        
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

    function loadNextCard() {
        if (currentIndex >= flashcards.length) {
            container.classList.add('d-none');
            completionMsg.classList.remove('d-none');
            return;
        }

        backCard.classList.remove('active');
        
        setTimeout(() => {
            populateCardData(currentIndex);
            frontCard.classList.add('active');
            btnNextCard.disabled = false;
        }, 200); 
    }

    btnShowAnswer.addEventListener('click', function() {
        frontCard.classList.remove('active');
        backCard.classList.add('active');
    });

    btnNextCard.addEventListener('click', function() {
        this.disabled = true;
        currentIndex++;
        loadNextCard();
    });

    if (flashcards.length > 0) {
        populateCardData(currentIndex);
    } else {
        container.classList.add('d-none');
        completionMsg.classList.remove('d-none');
        
        let sourceText = "{{ $source }}" === "today" ? "yang kamu review hari ini" : "di dalam database-mu";
        document.getElementById('completionDesc').innerText = `Belum ada materi untuk kategori ini ${sourceText}. Silakan ubah filter di atas.`;
    }
});
</script>
@endsection