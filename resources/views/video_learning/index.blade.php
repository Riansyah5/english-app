@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <div class="row mb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="fw-bold mb-2 text-theme-main tracking-tight">Video Library 🎬</h2>
            <p class="text-theme-muted mb-0 fs-6">Belajar bahasa Inggris langsung dari konteks nyata (Native Speakers).</p>
        </div>
    </div>

    @forelse($folders as $folder)
        <div class="mb-5">
            <div class="d-flex align-items-center mb-4">
                <div class="rounded-3 d-flex align-items-center justify-content-center me-3 border-minimal bg-minimal-badge" style="width: 52px; height: 52px; flex-shrink: 0;">
                    <i class="{{ $folder->icon ?? 'bi bi-folder-fill' }} fs-3 text-primary"></i>
                </div>
                <div>
                    <h4 class="fw-bold text-theme-main mb-1">{{ $folder->name }}</h4>
                    <small class="text-theme-muted fw-semibold text-uppercase tracking-wider" style="font-size: 0.65rem;">
                        <i class="bi bi-film me-1"></i> {{ $folder->videos->count() }} Video tersedia
                    </small>
                </div>
            </div>

            <div class="row g-4">
                @forelse($folder->videos as $video)
                    <div class="col-md-6 col-lg-4">
                        <div class="minimal-card h-100 d-flex flex-column overflow-hidden video-card-hover">
                            
                            <div class="position-relative overflow-hidden thumbnail-wrapper bg-dark">
                                <img src="https://img.youtube.com/vi/{{ $video->youtube_id }}/mqdefault.jpg" class="card-img-top w-100" alt="Thumbnail" style="object-fit: cover; height: 190px; opacity: 0.9;">
                                
                                <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4) 100%);"></div>
                                
                                <div class="position-absolute top-50 start-50 translate-middle play-overlay d-flex align-items-center justify-content-center rounded-circle shadow-sm bg-white" style="width: 46px; height: 46px;">
                                    <i class="bi bi-play-fill text-dark fs-4" style="margin-left: 2px;"></i>
                                </div>

                                <div class="position-absolute bottom-0 end-0 m-3 z-1">
                                    <span class="badge badge-minimal-dark font-monospace text-uppercase px-2 py-1" style="font-size: 0.65rem;">
                                        {{ $video->difficulty }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="card-body p-4 d-flex flex-column flex-grow-1">
                                <h6 class="fw-bold text-theme-main mb-4 line-clamp-2" style="line-height: 1.5; min-height: 2.7rem;">{{ $video->title }}</h6>
                                <div class="mt-auto">
                                    <a href="{{ route('videos.user.show', $video->id) }}" class="btn btn-minimal btn-minimal-secondary w-100 btn-sm py-2">
                                        Tonton & Belajar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center py-4 border-dashed rounded-3 bg-minimal-badge">
                            <i class="bi bi-camera-video-off text-theme-muted fs-4 mb-2 d-block opacity-50"></i>
                            <span class="text-theme-muted small">Belum ada materi video di dalam folder ini.</span>
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    @empty
        <div class="minimal-card text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 350px;">
            <i class="bi bi-inbox display-3 text-theme-muted mb-3 opacity-30"></i>
            <h5 class="fw-bold text-theme-main mb-1">Perpustakaan Kosong</h5>
            <p class="text-theme-muted small mb-0">Belum ada folder atau video yang tersedia saat ini.</p>
        </div>
    @endforelse
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - VIDEO LIBRARY                 */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --badge-dark-txt: #cbd5e1;
    --accent-primary: #3b82f6;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --badge-dark-txt: #475569;
    --accent-primary: #2563eb;
}

/* Base Structural Blocks */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }

.border-dashed {
    border: 1px dashed var(--card-border) !important;
    background: var(--box-bg);
}

.badge-minimal-dark {
    background: rgba(0, 0, 0, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    backdrop-filter: blur(4px);
}

/* Elegant Custom Buttons */
.btn-minimal {
    font-weight: 500;
    padding: 0.45rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-secondary {
    background: transparent;
    color: var(--text-main) !important;
    border: 1px solid var(--card-border);
}
.btn-minimal-secondary:hover {
    background: var(--accent-primary);
    border-color: transparent;
    color: #ffffff !important;
}

/* Card Interaction Core Mechanics */
.video-card-hover:hover {
    border-color: var(--text-muted);
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.thumbnail-wrapper img {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.video-card-hover:hover .thumbnail-wrapper img {
    transform: scale(1.04);
}

.play-overlay {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9) !important;
    transition: all 0.25s ease-in-out;
    pointer-events: none;
    z-index: 3;
}

.video-card-hover:hover .play-overlay {
    opacity: 0.95;
    transform: translate(-50%, -50%) scale(1) !important;
}

/* Typography Line Restrictions */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
@endsection