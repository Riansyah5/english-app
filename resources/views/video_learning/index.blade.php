@extends('layouts.app')

@section('content')
<div class="container py-4 position-relative z-1">
    
    <div class="row mb-5 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-2 text-white text-glow display-5" style="letter-spacing: -1px;">Video Library 🎬</h2>
            <p class="text-slate fs-5 mb-0" style="letter-spacing: 0.5px;">Belajar bahasa Inggris langsung dari konteks nyata (Native Speakers).</p>
        </div>
    </div>

    @forelse($folders as $folder)
        <div class="mb-5 position-relative">
            <div class="d-flex align-items-center mb-4">
                <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 55px; height: 55px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);">
                    <i class="{{ $folder->icon ?? 'bi bi-folder-fill' }} fs-3 neon-blue"></i>
                </div>
                <div>
                    <h3 class="fw-bold text-white mb-1">{{ $folder->name }}</h3>
                    <small class="text-slate fw-semibold text-uppercase" style="letter-spacing: 1.5px; font-size: 0.75rem;">
                        <i class="bi bi-film me-1"></i> {{ $folder->videos->count() }} Video tersedia
                    </small>
                </div>
            </div>

            <div class="row g-4">
                @forelse($folder->videos as $video)
                    <div class="col-md-6 col-lg-4">
                        <div class="glass-card h-100 d-flex flex-column text-decoration-none p-0 overflow-hidden video-card-hover">
                            
                            <div class="position-relative overflow-hidden thumbnail-wrapper">
                                <img src="https://img.youtube.com/vi/{{ $video->youtube_id }}/mqdefault.jpg" class="card-img-top w-100" alt="Thumbnail" style="object-fit: cover; height: 210px; opacity: 0.85;">
                                
                                <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.95) 100%);"></div>
                                
                                <div class="position-absolute top-50 start-50 translate-middle play-overlay d-flex align-items-center justify-content-center rounded-circle" style="width: 60px; height: 60px; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2);">
                                    <i class="bi bi-play-fill text-white fs-1" style="margin-left: 4px;"></i>
                                </div>

                                <div class="position-absolute bottom-0 end-0 m-3 z-1">
                                    <span class="badge badge-glass px-3 py-2 fw-bold shadow-sm" style="letter-spacing: 1px;">
                                        {{ strtoupper($video->difficulty) }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="card-body p-4 d-flex flex-column flex-grow-1 position-relative z-1">
                                <h5 class="fw-bold text-white mb-4 line-clamp-2" style="line-height: 1.5;">{{ $video->title }}</h5>
                                <div class="mt-auto">
                                    <a href="{{ route('videos.user.show', $video->id) }}" class="btn btn-glass btn-neon-hover rounded-pill w-100 fw-bold py-2 d-flex justify-content-center align-items-center gap-2" style="letter-spacing: 0.5px;">
                                        Tonton & Belajar <i class="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="glass-card p-4 text-center border-dashed">
                            <i class="bi bi-camera-video-off fs-1 text-slate mb-3 d-block opacity-50"></i>
                            <p class="text-slate mb-0 fw-medium">Belum ada video di dalam folder ini.</p>
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    @empty
        <div class="d-flex flex-column justify-content-center align-items-center py-5 glass-card" style="min-height: 300px;">
            <i class="bi bi-inbox fs-1 text-slate mb-3 opacity-50"></i>
            <h4 class="text-white fw-bold mb-2">Perpustakaan Kosong</h4>
            <p class="text-slate mb-0">Belum ada folder atau video yang tersedia saat ini.</p>
        </div>
    @endforelse
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* PREMIUM GLASSMORPHISM UI - VIDEO LIBRARY                 */
/* ======================================================== */

/* Typography & Colors */
.text-slate { color: #94a3b8 !important; }
.text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
.neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }

/* Glass Components */
.badge-glass {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8;
    backdrop-filter: blur(8px);
}

.glass-card {
    background: rgba(20, 25, 40, 0.5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.border-dashed {
    border: 1px dashed rgba(255, 255, 255, 0.15) !important;
    background: rgba(20, 25, 40, 0.2);
}

/* Buttons */
.btn-glass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #cbd5e1;
    transition: all 0.3s ease;
}

.btn-neon-hover:hover {
    background: linear-gradient(135deg, #4f46e5, #3b82f6);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
    transform: translateY(-2px);
}

/* Video Card Hover Effects */
.video-card-hover:hover {
    border-color: rgba(56, 189, 248, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.1);
    transform: translateY(-4px);
}

.thumbnail-wrapper img {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card-hover:hover .thumbnail-wrapper img {
    transform: scale(1.08);
}

.play-overlay {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8) !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card-hover:hover .play-overlay {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) !important;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

/* Utilities */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
@endsection