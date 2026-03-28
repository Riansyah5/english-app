@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-4">
        <div class="col-12">
            <h2 class="fw-bold">Modul Evaluasi 📝</h2>
            <p class="text-muted">Uji pemahaman tata bahasa dan kosakata Anda di sini.</p>
        </div>
    </div>

    <div class="row g-4">
        @forelse($exams as $exam)
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm border-0 rounded-4 h-100">
                    <div class="card-body p-4 d-flex flex-column">
                        <h4 class="fw-bold mb-2">{{ $exam->title }}</h4>
                        <p class="text-muted mb-4">{{ $exam->description ?? 'Tidak ada deskripsi.' }}</p>
                        
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="badge bg-light text-dark border p-2">
                                ⏱️ {{ $exam->duration_minutes }} Menit
                            </span>
                            <a href="{{ route('exams.show', $exam->id) }}" class="btn btn-primary rounded-pill px-4 fw-semibold">
                                Mulai Ujian
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12 text-center py-5">
                <h4 class="text-muted">Belum ada paket ujian yang tersedia saat ini.</h4>
            </div>
        @endforelse
    </div>
</div>
@endsection