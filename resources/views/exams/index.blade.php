@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - EXAM MODULE                   */
    /* ======================================================== */

    body {
        background-color: #0b0f19;
        color: #f8fafc;
        min-height: 100vh;
        position: relative;
    }

    /* Ambient Background Glows */
    .ambient-glow {
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        z-index: 0;
        opacity: 0.4;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%); }
    .glow-3 { top: 40%; left: 40%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .exam-card-hover:hover {
        border-color: rgba(56, 189, 248, 0.4);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.15);
        transform: translateY(-5px);
    }

    /* Top Accent Line for Card */
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #38bdf8);
        z-index: 1;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    .exam-card-hover:hover::before {
        opacity: 1;
        background: linear-gradient(90deg, #38bdf8, #6ee7b7);
    }

    /* Inner Glass Elements */
    .glass-box {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
    }

    /* Badges */
    .badge-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        backdrop-filter: blur(8px);
    }

    /* Buttons */
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
        color: white;
    }

    /* Line Clamp */
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>
<div class="ambient-glow glow-3"></div>

<div class="container py-5 position-relative z-1">
    
    <div class="row mb-5 align-items-center">
        <div class="col-12 text-center text-md-start">
            <h2 class="fw-bold mb-2 text-white text-glow display-5" style="letter-spacing: -1px;">Modul Evaluasi <span style="opacity: 0.9;">📝</span></h2>
            <p class="text-slate fs-5 mb-0" style="letter-spacing: 0.5px;">Uji pemahaman tata bahasa dan kosakata Anda di sini.</p>
        </div>
    </div>

    <div class="row g-4">
        @forelse($exams as $exam)
            <div class="col-md-6 col-lg-4">
                <div class="glass-card exam-card-hover h-100 d-flex flex-column">
                    <div class="position-absolute top-0 end-0 opacity-20" style="width: 150px; height: 150px; background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%); transform: translate(30%, -30%); pointer-events: none;"></div>

                    <div class="card-body p-4 p-md-5 d-flex flex-column position-relative z-1">
                        
                        <div class="d-flex align-items-start justify-content-between mb-4">
                            <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 50px; height: 50px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3);">
                                <i class="bi bi-file-earmark-code fs-4 neon-blue"></i>
                            </div>
                        </div>

                        <h4 class="fw-bold mb-3 text-white text-glow line-height-tight">{{ $exam->title }}</h4>
                        
                        <div class="glass-box p-3 mb-4 flex-grow-1">
                            <p class="text-slate mb-0 fw-medium line-clamp-2" style="font-size: 0.95rem; line-height: 1.6;">
                                {{ $exam->description ?? 'Tidak ada deskripsi.' }}
                            </p>
                        </div>
                        
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="badge badge-glass px-3 py-2 fw-bold d-flex align-items-center gap-2" style="font-size: 0.85rem; letter-spacing: 0.5px;">
                                <i class="bi bi-stopwatch text-slate"></i> {{ $exam->duration_minutes }} Menit
                            </span>
                            
                            <a href="{{ route('exams.show', $exam->id) }}" class="btn btn-neon-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2" style="letter-spacing: 0.5px;">
                                Mulai Ujian <i class="bi bi-arrow-right-short fs-5"></i>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="glass-card text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 400px;">
                    <div class="mb-4 position-relative">
                        <div class="position-absolute top-50 start-50 translate-middle" style="width: 100px; height: 100px; background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%); filter: blur(10px);"></div>
                        <i class="bi bi-inbox display-1 text-slate position-relative z-1 opacity-50"></i>
                    </div>
                    <h3 class="fw-bold text-white text-glow mb-2">Belum Ada Ujian</h3>
                    <p class="text-slate fs-5 mb-0">Belum ada paket ujian yang tersedia saat ini. Silakan kembali lagi nanti.</p>
                </div>
            </div>
        @endforelse
    </div>
</div>
@endsection