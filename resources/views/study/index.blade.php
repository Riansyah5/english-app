@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-bold mb-0">Daily Review</h4>
                <span class="badge bg-primary rounded-pill fs-6" id="cardCounter">
                    0 / 0
                </span>
            </div>

            <div id="completionMessage" class="text-center d-none py-5">
                <h1 class="display-1 text-success mb-3">🎉</h1>
                <h3 class="fw-bold">Luar Biasa!</h3>
                <p class="text-muted">Anda telah menyelesaikan semua review hari ini.</p>
                <a href="/home" class="btn btn-primary mt-3">Kembali ke Dashboard</a>
            </div>

            <div id="flashcardContainer">
                <div class="card shadow-sm border-0 rounded-4 text-center">
                    <div class="card-body p-5">
                        
                        <span class="badge bg-secondary mb-3" id="itemType">Tipe Materi</span>
                        
                        <h1 class="display-4 fw-bold text-dark mb-4" id="itemContent">...</h1>
                        
                        <button id="btnShowAnswer" class="btn btn-outline-primary btn-lg rounded-pill px-5">
                            Show Answer
                        </button>

                        <div id="answerArea" class="d-none mt-4 pt-4 border-top">
                            <h3 class="fw-semibold text-success mb-3" id="itemTranslation">...</h3>
                            
                            <div class="bg-light p-3 rounded-3 mb-4 text-start">
                                <small class="text-muted d-block mb-1">Example:</small>
                                <p class="mb-0 fst-italic" id="itemExample">...</p>
                            </div>

                            <p class="text-muted small" id="itemNotes"></p>

                            <p class="mb-2 fw-semibold mt-4">Seberapa mudah ini untukmu?</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button class="btn btn-danger flex-fill rate-btn" data-quality="1">Lupa</button>
                                <button class="btn btn-warning flex-fill rate-btn" data-quality="3">Sulit</button>
                                <button class="btn btn-info text-white flex-fill rate-btn" data-quality="4">Bagus</button>
                                <button class="btn btn-success flex-fill rate-btn" data-quality="5">Mudah</button>
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

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Memasukkan data flashcards dari PHP/Laravel ke variabel JavaScript
    let flashcards = @json($dueFlashcards);
    let currentIndex = 0;

    const container = document.getElementById('flashcardContainer');
    const completionMsg = document.getElementById('completionMessage');
    const counter = document.getElementById('cardCounter');
    
    const contentEl = document.getElementById('itemContent');
    const typeEl = document.getElementById('itemType');
    const translationEl = document.getElementById('itemTranslation');
    const exampleEl = document.getElementById('itemExample');
    const notesEl = document.getElementById('itemNotes');
    
    const btnShowAnswer = document.getElementById('btnShowAnswer');
    const answerArea = document.getElementById('answerArea');
    const rateBtns = document.querySelectorAll('.rate-btn');

    // Fungsi untuk memuat kartu saat ini ke layar
    function loadCard() {
        if (currentIndex >= flashcards.length) {
            // Jika semua kartu sudah di-review
            container.classList.add('d-none');
            completionMsg.classList.remove('d-none');
            counter.innerText = `${flashcards.length} / ${flashcards.length}`;
            return;
        }

        const card = flashcards[currentIndex];
        const item = card.study_item;

        counter.innerText = `${currentIndex + 1} / ${flashcards.length}`;
        
        contentEl.innerText = item.content;
        typeEl.innerText = item.type.toUpperCase();
        translationEl.innerText = item.translation;
        exampleEl.innerText = item.example_sentence || 'Tidak ada contoh kalimat.';
        notesEl.innerText = item.notes || '';

        // Reset tampilan: sembunyikan jawaban, tampilkan tombol "Show Answer"
        answerArea.classList.add('d-none');
        btnShowAnswer.classList.remove('d-none');
    }

    // Event listener untuk tombol "Show Answer"
    btnShowAnswer.addEventListener('click', function() {
        btnShowAnswer.classList.add('d-none');
        answerArea.classList.remove('d-none');
    });

    // Event listener untuk tombol penilaian (Lupa, Sulit, Bagus, Mudah)
    rateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quality = this.getAttribute('data-quality');
            const flashcardId = flashcards[currentIndex].id;

            // Menonaktifkan tombol sementara proses request berjalan
            rateBtns.forEach(b => b.disabled = true);

            // Kirim request POST ke Laravel Controller tanpa reload halaman
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
                // Lanjut ke kartu berikutnya
                currentIndex++;
                loadCard();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan progres.');
            })
            .finally(() => {
                // Mengaktifkan kembali tombol
                rateBtns.forEach(b => b.disabled = false);
            });
        });
    });

    // Mulai dengan memuat kartu pertama
    if (flashcards.length > 0) {
        loadCard();
    } else {
        // Jika tidak ada kartu untuk di-review hari ini
        container.classList.add('d-none');
        completionMsg.classList.remove('d-none');
        completionMsg.querySelector('p').innerText = "Tidak ada materi yang perlu di-review hari ini. Waktunya bersantai!";
    }
});
</script>
@endsection