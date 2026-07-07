@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <div class="row mb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="fw-bold mb-2 text-theme-main tracking-tight">Modul Evaluasi (CBT) 📝</h2>
            <p class="text-theme-muted mb-0 fs-6">Uji pemahaman tata bahasa dan kosakata Anda secara berkala.</p>
        </div>
    </div>

    <div class="row g-4">
        @forelse($exams as $exam)
            <div class="col-md-6 col-lg-4">
                <div class="minimal-card exam-card-hover h-100 d-flex flex-column">
                    <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-between h-100">
                        
                        <div>
                            <div class="d-flex align-items-center mb-4">
                                <div class="rounded-3 d-flex align-items-center justify-content-center border-minimal bg-minimal-badge" style="width: 48px; height: 48px; flex-shrink: 0;">
                                    <i class="bi bi-file-earmark-text fs-4 text-primary"></i>
                                </div>
                            </div>

                            <h5 class="fw-bold mb-3 text-theme-main tracking-tight" style="line-height: 1.4;">{{ $exam->title }}</h5>
                            
                            <div class="minimal-box p-3 mb-4">
                                <p class="text-theme-muted mb-0 small fw-medium line-clamp-2" style="line-height: 1.6; min-height: 2.5rem;">
                                    {{ $exam->description ?? 'Tidak ada deskripsi untuk paket ujian ini.' }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center mt-auto pt-2">
                            <span class="badge bg-minimal-badge border-minimal text-theme-main fw-medium d-flex align-items-center gap-1.5 px-3 py-2" style="font-size: 0.75rem;">
                                <i class="bi bi-stopwatch text-theme-muted"></i> {{ $exam->duration_minutes }} Menit
                            </span>
                            
                            <a href="{{ route('exams.show', $exam->id) }}" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2">
                                Mulai Ujian
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="minimal-card text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 350px;">
                    <i class="bi bi-inbox display-3 text-theme-muted mb-3 opacity-30"></i>
                    <h5 class="fw-bold text-theme-main mb-1">Belum Ada Ujian</h5>
                    <p class="text-theme-muted small mb-0">Belum ada paket ujian yang dijadwalkan atau tersedia saat ini.</p>
                </div>
            </div>
        @endforelse
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - EXAM MODULE                   */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --accent-primary: #3b82f6;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --accent-primary: #2563eb;
}

/* Base Structural Container Elements */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.minimal-box {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.5rem;
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }

/* Elegant Interactive Action Buttons */
.btn-minimal {
    font-weight: 500;
    padding: 0.45rem 1.25rem;
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

/* Subtle Micro Card Interactions on Hover */
.exam-card-hover:hover {
    border-color: var(--text-muted);
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

/* Typography Utilities & Constraints */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
@endsection