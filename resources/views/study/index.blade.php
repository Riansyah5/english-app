@extends('layouts.app')

@section('content')
<div class="container mt-4 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-bold mb-0">Daily Review</h4>
                <span class="badge bg-primary rounded-pill fs-6" id="cardCounter">0 / 0</span>
            </div>

            <div id="completionMessage" class="text-center d-none py-5">
                <h1 class="display-1 text-success mb-3">🎉</h1>
                <h3 class="fw-bold">Luar Biasa!</h3>
                <p class="text-muted">Anda telah menyelesaikan semua review hari ini.</p>
                <div class="mt-4">
                    <a href="{{ route('home') }}" class="btn btn-primary rounded-pill px-4 fw-semibold me-2">Ke Dashboard</a>
                    <a href="{{ route('study.practice') }}" class="btn btn-outline-primary rounded-pill px-4 fw-semibold">Latihan Bebas</a>
                </div>
            </div>

            <div id="flashcardContainer" class="flip-container mb-4">
                <div class="flipper" id="flipperCard">
                    
                    <div class="front-card card shadow-sm border-0 rounded-4 text-center">
                        <div class="card-body p-5 d-flex flex-column justify-content-center h-100">
                            <div>
                                <span class="badge bg-secondary mb-3 text-uppercase" id="itemTypeFront">...</span>
                                <h1 class="display-3 fw-bold text-dark mb-5" id="itemContent">...</h1>
                                <button id="btnShowAnswer" class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                    Show Answer
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="back-card card shadow border-0 rounded-4 text-center bg-white">
                        <div class="card-body p-5">
                            <h3 class="fw-bold text-dark mb-1" id="itemContentRepeat">...</h3>
                            <h2 class="fw-bold text-success mb-3" id="itemTranslation">...</h2>
                            
                            <div class="bg-light p-3 rounded-3 mb-4 text-start">
                                <small class="text-muted fw-bold d-block mb-1 text-uppercase">Example:</small>
                                <p class="mb-0 fst-italic fs-5" id="itemExample">...</p>
                            </div>

                            <p class="text-muted small" id="itemNotes"></p>

                            <hr class="my-4">
                            <p class="mb-3 fw-semibold">Seberapa mudah ini untukmu?</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button class="btn btn-danger flex-fill rate-btn rounded-pill" data-quality="1">Lupa</button>
                                <button class="btn btn-warning flex-fill rate-btn rounded-pill" data-quality="3">Sulit</button>
                                <button class="btn btn-info text-white flex-fill rate-btn rounded-pill" data-quality="4">Bagus</button>
                                <button class="btn btn-success flex-fill rate-btn rounded-pill" data-quality="5">Mudah</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div> </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">

@endsection

@section('styles')
<style>
/* ======================================================== */
/* CSS MURNI UNTUK ANIMASI FLIP 3D */
/* ======================================================== */

/* 1. Kontainer Utama: Menetapkan Ruang 3D */
.flip-container {
    perspective: 1500px; /* Jarak pandang 3D (makin kecil makin dramatis) */
    position: relative;
    height: 480px; /* Tentukan tinggi tetap agar animasi mulus */
}

/* 2. Kontainer yang Berputar: Mendefinisikan Kecepatan & Jenis Rotasi */
.flipper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d; /* Wajib agar anak-anaknya tetap 3D */
    -webkit-transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); /* Transisi halus */
}

/* 3. Kelas Pemicu: Ditambahkan via JS untuk memutar kartu */
.flipped {
    transform: rotateY(180deg);
}

/* 4. Pengaturan Umum Sisi Depan & Belakang */
.front-card, .back-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* Sembunyikan sisi belakang saat kartu dibalik */
    -webkit-backface-visibility: hidden;
    overflow-y: auto; /* Jika konten kepanjangan, bisa di-scroll internal */
}

/* 5. Sisi Depan: Harus berada di depan (z-index tinggi) */
.front-card {
    z-index: 2;
    transform: rotateY(0deg); /* Posisi awal */
}

/* 6. Sisi Belakang: Sudah diputar 180 derajat sejak awal */
.back-card {
    transform: rotateY(180deg);
}

/* Sedikit penyesuaian visual untuk tombol rate */
.rate-btn {
    font-weight: 600;
}
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
    const flipper = document.getElementById('flipperCard'); // Element yang dianimasikan
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

    // Fungsi: Memuat kartu ke layar
    function loadCard() {
        if (currentIndex >= flashcards.length) {
            container.classList.add('d-none');
            completionMsg.classList.remove('d-none');
            counter.innerText = `${flashcards.length} / ${flashcards.length}`;
            return;
        }

        // Reset: Kembalikan kartu ke posisi depan (tidak terbalik) sebelum memuat konten baru
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
            contentElRepeat.innerText = item.content; // Ulangi kata di belakang
            translationEl.innerText = item.translation;
            exampleEl.innerText = item.example_sentence || 'No example sentence provided.';
            notesEl.innerText = item.notes || '';
        }, 150); // Jeda 150ms agar animasi reset mulus
    }

    // Event: Tombol "Show Answer" (Memicu Animasi Putar)
    btnShowAnswer.addEventListener('click', function() {
        // Cukup tambahkan kelas 'flipped', CSS akan menangani rotasinya
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
                loadCard(); // Otomatis reset posisi depan & muat kartu berikutnya
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