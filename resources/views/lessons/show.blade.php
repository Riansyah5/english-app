@extends('layouts.app')

@section('content')
<div class="container py-4 mb-5">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{ route('lessons.user.index') }}" class="text-decoration-none">Daftar Materi</a></li>
                    <li class="breadcrumb-item text-muted">{{ $lesson->category->name }}</li>
                </ol>
            </nav>

            <div class="mb-5 border-bottom pb-4">
                <span class="badge bg-primary text-uppercase mb-2">Bab {{ $lesson->order_number }}</span>
                <h1 class="display-5 fw-bold text-dark">{{ $lesson->title }}</h1>
            </div>

            <article class="lesson-content">
                {!! $lesson->content !!}
            </article>

            <div class="mt-5 pt-5 border-top text-center" id="completionArea">
                @if($isCompleted)
                    <div class="alert alert-success d-inline-block px-4 py-3 rounded-pill fw-bold shadow-sm">
                        <i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!
                    </div>
                    @if($nextLesson)
                        <div class="mt-4">
                            <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-outline-primary btn-lg rounded-pill px-5 fw-bold">
                                Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                            </a>
                        </div>
                    @endif
                @else
                    <button id="btnMarkDone" class="btn btn-success btn-lg rounded-pill px-5 fw-bold shadow">
                        <i class="bi bi-check-lg me-2"></i> Tandai Selesai Dibaca
                    </button>
                    
                    @if($nextLesson)
                        <div id="nextLessonDiv" class="mt-4 d-none">
                            <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-outline-primary btn-lg rounded-pill px-5 fw-bold">
                                Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                            </a>
                        </div>
                    @endif
                @endif
            </div>

        </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('styles')
<style>
    /* Tipografi Mode Baca (Medium Style) */
    .lesson-content {
        font-family: 'Cambria', serif; /* Font serif sangat nyaman untuk baca panjang */
        font-size: 1.15rem;
        line-height: 1.8;
        color: #2b2b2b;
    }
    
    .lesson-content h1, .lesson-content h2, .lesson-content h3 {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #1a1a1a;
    }

    .lesson-content p { margin-bottom: 1.5rem; }
    
    /* Mempercantik tabel bawaan Summernote */
    .lesson-content table {
        width: 100% !important;
        margin-bottom: 2rem;
        border-collapse: collapse;
    }
    .lesson-content table td, .lesson-content table th {
        border: 1px solid #dee2e6;
        padding: 0.75rem;
    }
    .lesson-content table th { background-color: #f8f9fa; }
    
    /* Mempercantik gambar bawaan */
    .lesson-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1.5rem 0;
    }
</style>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const btnMarkDone = document.getElementById('btnMarkDone');
    const nextLessonDiv = document.getElementById('nextLessonDiv');

    if (btnMarkDone) {
        btnMarkDone.addEventListener('click', function() {
            // Ubah tombol jadi status loading
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Menyimpan...';

            fetch("{{ route('lessons.user.complete', $lesson->id) }}", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    // Tembakkan konfeti perayaan kecil
                    if(typeof confetti === "function") {
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    }

                    // Tampilkan SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Hebat!',
                        text: data.message,
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Ubah wujud tombol menjadi hijau statis
                    btnMarkDone.className = "alert alert-success d-inline-block px-4 py-3 rounded-pill fw-bold shadow-sm border-0";
                    btnMarkDone.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!';
                    
                    // Munculkan tombol Lanjut ke Bab Berikutnya (jika ada)
                    if (nextLessonDiv) {
                        nextLessonDiv.classList.remove('d-none');
                    }
                }
            })
            .catch(error => {
                Swal.fire('Error', 'Terjadi kesalahan saat menyimpan progres.', 'error');
                btnMarkDone.disabled = false;
                btnMarkDone.innerHTML = '<i class="bi bi-check-lg me-2"></i> Tandai Selesai Dibaca';
            });
        });
    }
});
</script>
@endsection