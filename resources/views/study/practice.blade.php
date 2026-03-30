@extends('layouts.app')

@section('content')
<div class="container mt-4 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h4 class="fw-bold mb-0">Mode Latihan Bebas</h4>
                    <small class="text-muted">Skor tidak akan disimpan</small>
                </div>
                <div class="d-flex gap-2 align-items-center">
                    <button id="btnToggleDirection" class="btn btn-sm btn-outline-secondary rounded-pill fw-bold shadow-sm">
                        🔄 ID ➔ EN
                    </button>
                    <span class="badge bg-info text-white rounded-pill fs-6 px-3" id="cardCounter">0 / 0</span>
                </div>
            </div>

            <div class="card shadow-sm border-0 rounded-4 mb-3 bg-light">
                <div class="card-body p-3 d-flex align-items-center justify-content-between">
                    <span class="fw-semibold text-muted small text-uppercase">Sumber Data:</span>
                    <div class="btn-group" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'today', 'limit' => $limit]) }}" class="btn btn-sm fw-bold {{ $source == 'today' ? 'btn-primary shadow-sm' : 'btn-outline-primary' }}">
                            Hari Ini
                        </a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => 'all', 'limit' => $limit]) }}" class="btn btn-sm fw-bold {{ $source == 'all' ? 'btn-primary shadow-sm' : 'btn-outline-primary' }}">
                            Semua (Acak)
                        </a>
                    </div>
                </div>
            </div>

            @if($source == 'all')
            <div class="card shadow-sm border-0 rounded-4 mb-3 bg-white border-start border-4 border-info">
                <div class="card-body p-3 d-flex align-items-center justify-content-between">
                    <span class="fw-semibold text-muted small text-uppercase">Batas Jumlah:</span>
                    <div class="btn-group" role="group">
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '50']) }}" class="btn btn-sm fw-bold {{ $limit == '50' ? 'btn-info text-white shadow-sm' : 'btn-outline-info' }}">50</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => '100']) }}" class="btn btn-sm fw-bold {{ $limit == '100' ? 'btn-info text-white shadow-sm' : 'btn-outline-info' }}">100</a>
                        <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => 'all']) }}" class="btn btn-sm fw-bold {{ $limit == 'all' ? 'btn-info text-white shadow-sm' : 'btn-outline-info' }}">Semua</a>
                    </div>
                </div>
            </div>
            @endif

            <div class="d-flex flex-wrap gap-2 mb-4">
                <a href="{{ route('study.practice', ['type' => null, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ !$selectedType ? 'btn-dark' : 'btn-outline-secondary' }}">Semua Tipe</a>
                <a href="{{ route('study.practice', ['type' => 'word', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ $selectedType == 'word' ? 'btn-dark' : 'btn-outline-secondary' }}">Vocabulary</a>
                <a href="{{ route('study.practice', ['type' => 'phrase', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ $selectedType == 'phrase' ? 'btn-dark' : 'btn-outline-secondary' }}">Phrases</a>
                <a href="{{ route('study.practice', ['type' => 'grammar_rule', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ $selectedType == 'grammar_rule' ? 'btn-dark' : 'btn-outline-secondary' }}">Grammar</a>
                <a href="{{ route('study.practice', ['type' => 'idiom', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ $selectedType == 'idiom' ? 'btn-dark' : 'btn-outline-secondary' }}">Idioms</a>
                <a href="{{ route('study.practice', ['type' => 'speaking_prompt', 'source' => $source, 'limit' => $limit]) }}" class="btn btn-sm rounded-pill fw-semibold {{ $selectedType == 'speaking_prompt' ? 'btn-dark' : 'btn-outline-secondary' }}">Speaking Prompts</a>
            </div>

            <div id="completionMessage" class="text-center d-none py-5">
                <h1 class="display-1 text-primary mb-3">🔁</h1>
                <h3 class="fw-bold">Latihan Selesai</h3>
                <p class="text-muted" id="completionDesc">Anda telah mengulang semua materi di pengaturan ini.</p>
                <div class="d-flex justify-content-center gap-2 mt-4">
                    <a href="{{ route('study.practice', ['type' => $selectedType, 'source' => $source, 'limit' => $limit]) }}" class="btn btn-outline-primary rounded-pill px-4 fw-semibold">Ulangi Lagi</a>
                    <a href="{{ route('home') }}" class="btn btn-primary rounded-pill px-4 fw-semibold">Ke Dashboard</a>
                </div>
            </div>

            <div id="flashcardContainer" class="flip-container mb-4">
                <div class="flipper" id="flipperCard">
                    
                    <div class="front-card card shadow-sm border-0 rounded-4 text-center">
                        <div class="card-body p-5 d-flex flex-column justify-content-center h-100">
                            <div>
                                <span class="badge bg-secondary mb-3 text-uppercase" id="itemTypeFront">...</span>
                                <h1 class="display-4 fw-bold text-dark mb-5" id="itemContent">...</h1>
                                <button id="btnShowAnswer" class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                    Lihat Jawaban
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="back-card card shadow border-0 rounded-4 text-center">
                        <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100">
                            <h4 class="fw-bold text-dark mb-1" id="itemContentRepeat">...</h4>
                            <h2 class="fw-bold text-success mb-3" id="itemTranslation">...</h2>
                            
                            <div class="bg-light p-3 rounded-3 mb-3 text-start">
                                <small class="text-muted fw-bold d-block mb-1 text-uppercase">Example:</small>
                                <p class="mb-0 fst-italic fs-6" id="itemExample">...</p>
                            </div>

                            <p class="text-muted small mb-4" id="itemNotes"></p>

                            <hr class="mt-auto mb-3">
                            <button id="btnNextCard" class="btn btn-info text-white btn-lg rounded-pill w-100 fw-bold shadow-sm">
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
.flip-container { perspective: 1500px; position: relative; height: 500px; }
.flipper { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s ease-in-out; }
.flipper.flipped { transform: rotateY(180deg); }
.front-card, .back-card { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #ffffff; backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow-y: auto; }
.front-card { z-index: 2; transform: rotateY(0deg); }
.back-card { transform: rotateY(180deg); }
</style>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    let flashcards = @json($practiceCards);
    let currentIndex = 0;
    let isReversed = false; // Status arah terjemahan

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
    const btnNextCard = document.getElementById('btnNextCard');
    const btnToggleDirection = document.getElementById('btnToggleDirection');

    // EVENT: Toggle Arah Terjemahan
    btnToggleDirection.addEventListener('click', function() {
        isReversed = !isReversed;
        this.innerText = isReversed ? "🔄 EN ➔ ID" : "🔄 ID ➔ EN";
        this.classList.toggle('btn-secondary');
        this.classList.toggle('btn-outline-secondary');
        this.classList.toggle('text-white');
        
        if (currentIndex < flashcards.length) {
            populateCardData(currentIndex);
        }
    });

    function populateCardData(index) {
        const item = flashcards[index].study_item;
        counter.innerText = `${index + 1} / ${flashcards.length}`;
        typeElFront.innerText = item.type.toUpperCase();
        
        // Cek arah bahasa
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

        flipper.classList.remove('flipped');
        
        setTimeout(() => {
            populateCardData(currentIndex);
            btnNextCard.disabled = false;
        }, 500); 
    }

    btnShowAnswer.addEventListener('click', function() {
        flipper.classList.add('flipped');
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