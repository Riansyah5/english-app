@extends('layouts.app')

@section('content')
<div class="container mt-4 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 class="fw-bold mb-0">Mode Latihan Bebas</h4>
                    <small class="text-muted">Skor tidak akan disimpan</small>
                </div>
                <span class="badge bg-info text-white rounded-pill fs-6" id="cardCounter">0 / 0</span>
            </div>

            <div id="completionMessage" class="text-center d-none py-5">
                <h1 class="display-1 text-primary mb-3">🔁</h1>
                <h3 class="fw-bold">Latihan Selesai</h3>
                <p class="text-muted">Anda telah mengulang semua materi. Ingatan Anda semakin kuat!</p>
                <div class="d-flex justify-content-center gap-2 mt-4">
                    <a href="{{ route('study.practice') }}" class="btn btn-outline-primary rounded-pill px-4 fw-semibold">Ulangi Lagi</a>
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
/* CSS Animasi 3D Tetap Sama */
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

    function populateCardData(index) {
        const item = flashcards[index].study_item;
        counter.innerText = `${index + 1} / ${flashcards.length}`;
        
        contentEl.innerText = item.content;
        typeElFront.innerText = item.type.toUpperCase();
        
        contentElRepeat.innerText = item.content;
        translationEl.innerText = item.translation;
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
            // Tombol diaktifkan kembali setelah rotasi selesai
            btnNextCard.disabled = false;
        }, 500); 
    }

    btnShowAnswer.addEventListener('click', function() {
        flipper.classList.add('flipped');
    });

    // EVENT BARU: Langsung lanjut tanpa Fetch API ke Backend
    btnNextCard.addEventListener('click', function() {
        this.disabled = true; // Cegah double click
        currentIndex++;
        loadNextCard();
    });

    if (flashcards.length > 0) {
        populateCardData(currentIndex);
    } else {
        container.classList.add('d-none');
        completionMsg.classList.remove('d-none');
        completionMsg.querySelector('p').innerText = "Belum ada materi untuk dilatih.";
    }
});
</script>
@endsection