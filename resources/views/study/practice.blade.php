@extends('layouts.app')

@section('content')
<div class="container mt-4 mb-5 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 class="fw-bold mb-1 text-theme-main text-glow">Mode Latihan Bebas 🎮</h4>
                    <small class="text-theme-muted fw-semibold letter-spacing-wide">Skor tidak akan disimpan</small>
                </div>
                
                <div class="d-flex gap-3 align-items-center">
                    <div id="directionToggle" class="glass-segmented-control position-relative d-flex rounded-pill user-select-none" style="cursor: pointer;">
                        <div class="segmented-indicator position-absolute rounded-pill"></div>
                        <div id="btnLangIdEn" class="segment-btn flex-fill text-center position-relative z-1 fw-bold text-white">ID ➔ EN</div>
                        <div id="btnLangEnId" class="segment-btn flex-fill text-center position-relative z-1 fw-bold text-theme-muted">EN ➔ ID</div>
                    </div>
                    <span class="badge badge-glass rounded-pill fs-6 px-3 py-2" id="cardCounter">0 / 0</span>
                </div>
            </div>

            <div class="glass-card mb-3 p-3">
                <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <span class="fw-bold text-theme-muted small text-uppercase" style="letter-spacing: 1px;">Sumber Data:</span>
                    <div class="btn-group w-100 w-md-auto glass-btn-group" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'today', 'limit' => $limit]) }}" 
                           class="btn btn-sm fw-bold {{ $source == 'today' ? 'btn-neon-primary' : 'btn-glass' }}">
                            Hari Ini
                        </a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'all', 'limit' => $limit]) }}" 
                           class="btn btn-sm fw-bold {{ $source == 'all' ? 'btn-neon-primary' : 'btn-glass' }}">
                            Semua (Acak)
                        </a>
                    </div>
                </div>
            </div>

            @if($source == 'all')
            <div class="glass-card mb-3 p-3 border-glow-info">
                <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                    <span class="fw-bold text-theme-muted small text-uppercase" style="letter-spacing: 1px;">Batas Jumlah:</span>
                    <div class="btn-group w-100 w-md-auto glass-btn-group" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '50']) }}" 
                           class="btn btn-sm fw-bold {{ $limit == '50' ? 'btn-neon-info' : 'btn-glass' }}">50</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '100']) }}" 
                           class="btn btn-sm fw-bold {{ $limit == '100' ? 'btn-neon-info' : 'btn-glass' }}">100</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => 'all']) }}" 
                           class="btn btn-sm fw-bold {{ $limit == 'all' ? 'btn-neon-info' : 'btn-glass' }}">Semua</a>
                    </div>
                </div>
            </div>
            @endif

            <div class="d-flex flex-wrap gap-2 mb-4 justify-content-center justify-content-md-start">
                <a href="{{ route('study.practice', ['type' => null, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ !$selectedType ? 'btn-neon-success' : 'btn-glass' }}">Semua Tipe</a>
                <a href="{{ route('study.practice', ['type' => 'word', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ $selectedType == 'word' ? 'btn-neon-success' : 'btn-glass' }}">Vocabulary</a>
                <a href="{{ route('study.practice', ['type' => 'phrase', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ $selectedType == 'phrase' ? 'btn-neon-success' : 'btn-glass' }}">Phrases</a>
                <a href="{{ route('study.practice', ['type' => 'grammar_rule', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ $selectedType == 'grammar_rule' ? 'btn-neon-success' : 'btn-glass' }}">Grammar</a>
                <a href="{{ route('study.practice', ['type' => 'idiom', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ $selectedType == 'idiom' ? 'btn-neon-success' : 'btn-glass' }}">Idioms</a>
                <a href="{{ route('study.practice', ['type' => 'speaking_prompt', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold px-3 {{ $selectedType == 'speaking_prompt' ? 'btn-neon-success' : 'btn-glass' }}">Speaking Prompts</a>
            </div>

            <div id="completionMessage" class="glass-card text-center d-none py-5 px-4 mb-4">
                <div class="mb-4 position-relative">
                    <div class="position-absolute top-50 start-50 translate-middle ambient-glow-primary"></div>
                    <h1 class="display-1 mb-0 position-relative z-1 text-glow">🔁</h1>
                </div>
                <h3 class="fw-bold text-theme-main mb-2 text-glow">Latihan Selesai</h3>
                <p class="text-theme-muted mb-4" id="completionDesc">Anda telah mengulang semua materi di pengaturan ini.</p>
                <div class="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                    <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-glass rounded-pill px-4 py-2 fw-semibold">Ulangi Lagi</a>
                    <a href="{{ route('home') }}" class="btn btn-neon-primary rounded-pill px-4 py-2 fw-semibold">Ke Dashboard</a>
                </div>
            </div>

            <div id="flashcardContainer" class="fade-container mb-4">
                
                <div class="front-card glass-panel rounded-4 text-center active">
                    <div class="position-absolute top-0 end-0 ambient-glow-success-corner"></div>
                    
                    <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100 position-relative z-1">
                        <div>
                            <span class="badge badge-glass mb-4 text-uppercase px-3 py-2 fw-semibold" id="itemTypeFront" style="letter-spacing: 1px;">...</span>
                            <h1 class="display-4 fw-bold text-theme-main mb-5 text-glow" id="itemContent">...</h1>
                            <button id="btnShowAnswer" class="btn btn-neon-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm" style="letter-spacing: 1px;">
                                Lihat Jawaban
                            </button>
                        </div>
                    </div>
                </div>

                <div class="back-card glass-panel rounded-4 text-center">
                    <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100 position-relative z-1">
                        <h4 class="fw-semibold text-theme-muted mb-2" id="itemContentRepeat">...</h4>
                        <h2 class="fw-bold neon-green mb-4 display-6" id="itemTranslation">...</h2>
                        
                        <div class="glass-box p-4 rounded-4 mb-4 text-start flex-grow-1">
                            <small class="text-theme-muted fw-bold d-block mb-2 text-uppercase" style="letter-spacing: 1.5px; font-size: 0.75rem;">Example:</small>
                            <p class="mb-0 fst-italic fs-5 text-theme-main" id="itemExample" style="line-height: 1.6;">...</p>
                        </div>

                        <p class="text-theme-muted small mb-4" id="itemNotes"></p>

                        <div class="mt-auto">
                            <hr class="border-theme-muted opacity-25 mb-4">
                            <button id="btnNextCard" class="btn btn-neon-info btn-lg rounded-pill w-100 fw-bold shadow-sm py-3" style="letter-spacing: 1px;">
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
/* PREMIUM GLASSMORPHISM UI - PRACTICE MODE                 */
/* ======================================================== */

/* Theme Variables */
[data-theme="dark"] {
    --card-bg: rgba(20, 25, 40, 0.5);
    --card-border: rgba(255, 255, 255, 0.08);
    --card-shadow: rgba(0, 0, 0, 0.3);
    
    --box-bg: rgba(255, 255, 255, 0.03);
    --box-border: rgba(255, 255, 255, 0.05);
    
    --badge-bg: rgba(56, 189, 248, 0.1);
    --badge-border: rgba(56, 189, 248, 0.3);
    --badge-text: #38bdf8;
    
    --glow-text: rgba(255, 255, 255, 0.3);
    --hr-color: #64748b;
    
    --btn-glass-bg: rgba(255, 255, 255, 0.05);
    --btn-glass-border: rgba(255, 255, 255, 0.1);
    --btn-glass-hover: rgba(255, 255, 255, 0.1);
    --btn-glass-text: #cbd5e1;
    
    --seg-bg: rgba(15, 23, 42, 0.4);
    --seg-border: rgba(255, 255, 255, 0.08);
    
    --panel-bg: rgba(15, 23, 42, 0.6);
    --panel-border: rgba(255, 255, 255, 0.08);
    --panel-shadow: rgba(0, 0, 0, 0.4);
    --panel-inner-shadow: rgba(255, 255, 255, 0.1);
}

[data-theme="light"] {
    --card-bg: rgba(255, 255, 255, 0.6);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: rgba(0, 0, 0, 0.05);
    
    --box-bg: rgba(0, 0, 0, 0.03);
    --box-border: rgba(0, 0, 0, 0.05);
    
    --badge-bg: rgba(14, 165, 233, 0.1);
    --badge-border: rgba(14, 165, 233, 0.3);
    --badge-text: #0ea5e9;
    
    --glow-text: rgba(148, 163, 184, 0.3);
    --hr-color: #cbd5e1;
    
    --btn-glass-bg: rgba(0, 0, 0, 0.03);
    --btn-glass-border: rgba(0, 0, 0, 0.1);
    --btn-glass-hover: rgba(0, 0, 0, 0.08);
    --btn-glass-text: #475569;
    
    --seg-bg: rgba(255, 255, 255, 0.5);
    --seg-border: rgba(0, 0, 0, 0.1);
    
    --panel-bg: rgba(255, 255, 255, 0.7);
    --panel-border: rgba(0, 0, 0, 0.1);
    --panel-shadow: rgba(0, 0, 0, 0.1);
    --panel-inner-shadow: rgba(0, 0, 0, 0.05);
}

/* Typography & Colors */
.text-glow { text-shadow: 0 0 15px var(--glow-text); transition: text-shadow 0.4s ease; }
.neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }
.border-theme-muted { border-color: var(--hr-color) !important; transition: border-color 0.4s ease; }
.letter-spacing-wide { letter-spacing: 1px; }

/* Base Glass Components */
.badge-glass {
    background: var(--badge-bg);
    border: 1px solid var(--badge-border);
    color: var(--badge-text);
    backdrop-filter: blur(8px);
    transition: all 0.4s ease;
}

.glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--card-border);
    border-radius: 1.25rem;
    box-shadow: 0 16px 32px var(--card-shadow);
    transition: all 0.4s ease;
}

.glass-box {
    background: var(--box-bg);
    border: 1px solid var(--box-border);
    border-radius: 1rem;
    transition: all 0.4s ease;
}

.border-glow-info {
    border-left: 4px solid #38bdf8 !important;
    box-shadow: -5px 0 15px -5px rgba(56, 189, 248, 0.3), 0 16px 32px var(--card-shadow) !important;
}

/* Abstract Ambient Glows */
.ambient-glow-primary {
    width: 100px; height: 100px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%);
    filter: blur(15px); pointer-events: none;
}
.ambient-glow-success-corner {
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%);
    transform: translate(20%, -20%); pointer-events: none; opacity: 0.6;
}

/* Button Group Styling */
.glass-btn-group .btn { border: 1px solid var(--btn-glass-border); transition: border-color 0.4s ease; }
.glass-btn-group .btn:not(:first-child) { margin-left: -1px; }

/* Buttons */
.btn-glass {
    background: var(--btn-glass-bg);
    border: 1px solid var(--btn-glass-border);
    backdrop-filter: blur(10px);
    color: var(--btn-glass-text);
    transition: all 0.2s ease;
}
.btn-glass:hover {
    background: var(--btn-glass-hover);
    border-color: var(--badge-border);
    color: var(--text-main);
    transform: translateY(-1px);
}

.btn-neon-primary {
    background: linear-gradient(135deg, #4f46e5, #3b82f6);
    border: 1px solid transparent; color: white;
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
}
.btn-neon-primary:hover { box-shadow: 0 0 25px rgba(79, 70, 229, 0.6); color: white; transform: translateY(-2px); }

.btn-neon-info {
    background: linear-gradient(135deg, #0284c7, #38bdf8);
    border: 1px solid transparent; color: white;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
}
.btn-neon-info:hover { box-shadow: 0 0 25px rgba(56, 189, 248, 0.6); color: white; transform: translateY(-2px); }

.btn-neon-success {
    background: linear-gradient(135deg, #059669, #10b981);
    border: 1px solid transparent; color: white;
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}
.btn-neon-success:hover { box-shadow: 0 0 25px rgba(16, 185, 129, 0.6); color: white; transform: translateY(-2px); }

/* ======================================================== */
/* ELEGANT SEGMENTED SWITCH CSS                             */
/* ======================================================== */
.glass-segmented-control {
    background: var(--seg-bg);
    border: 1px solid var(--seg-border);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 170px;
    padding: 4px;
    transition: background 0.4s ease, border-color 0.4s ease;
}

.segment-btn {
    font-size: 0.75rem;
    padding: 6px 0;
    transition: color 0.3s ease;
    letter-spacing: 0.5px;
}

.segmented-indicator {
    top: 4px; bottom: 4px; left: 4px;
    width: calc(50% - 4px);
    background: linear-gradient(135deg, #38bdf8, #0284c7);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
}

/* State Reversed */
.glass-segmented-control.reversed .segmented-indicator {
    transform: translateX(100%);
}

/* ======================================================== */
/* SMOOTH FADE GLASSMORPHISM MECHANICS                      */
/* ======================================================== */

.fade-container {
    position: relative;
    height: 520px; 
    width: 100%;
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
    z-index: 1;
}

.glass-panel.active {
    opacity: 1; visibility: visible;
    transform: scale(1); filter: blur(0);
    z-index: 2;
}

.glass-panel::-webkit-scrollbar { width: 6px; }
.glass-panel::-webkit-scrollbar-track { background: transparent; }
.glass-panel::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.3); border-radius: 10px; }
.glass-panel::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.5); }
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
    const contentElRepeat = document.getElementById('itemContentRepeat');
    const translationEl = document.getElementById('itemTranslation');
    const exampleEl = document.getElementById('itemExample');
    const notesEl = document.getElementById('itemNotes');
    
    const btnShowAnswer = document.getElementById('btnShowAnswer');
    const btnNextCard = document.getElementById('btnNextCard');

    directionToggle.addEventListener('click', function() {
        isReversed = !isReversed;
        this.classList.toggle('reversed');
        
        // Atur styling teks secara dinamis berdasarkan arah yang aktif
        // Teks yang aktif akan selalu putih (di atas background biru neon), 
        // yang tidak aktif menggunakan var text-theme-muted
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
        }, 350); 
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