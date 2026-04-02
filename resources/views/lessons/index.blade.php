@extends('layouts.app')

@section('content')
<div class="container py-4 position-relative z-1">
    
    <div class="position-absolute top-0 start-50 translate-middle-x opacity-25" style="width: 800px; height: 400px; background: radial-gradient(ellipse, rgba(56, 189, 248, 0.3) 0%, transparent 70%); z-index: -1; pointer-events: none;"></div>

    <div class="row mb-5 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-2 text-white text-glow display-5" style="letter-spacing: -1px;">Buku Materi Digital 📖</h2>
            <p class="text-slate fs-5 mb-0" style="letter-spacing: 0.5px;">Pahami konsep fundamental bahasa Inggris langkah demi langkah.</p>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-lg-10">
            @forelse($categories as $category)
                @php
                    $totalLessons = $category->lessons->count();
                    $completedCount = 0;
                    foreach($category->lessons as $lesson) {
                        if(in_array($lesson->id, $completedLessonIds)) {
                            $completedCount++;
                        }
                    }
                    $percentage = $totalLessons > 0 ? round(($completedCount / $totalLessons) * 100) : 0;
                @endphp

                <div class="glass-card mb-5 overflow-hidden position-relative">
                    <div class="position-absolute top-0 end-0 opacity-20" style="width: 300px; height: 300px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%); transform: translate(30%, -30%); pointer-events: none;"></div>
                    
                    <div class="card-body p-4 p-md-5 position-relative z-1">
                        
                        <div class="d-flex align-items-center mb-4">
                            <div class="rounded-circle d-flex align-items-center justify-content-center me-4 shadow-sm" style="width: 65px; height: 65px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);">
                                <i class="bi {{ $category->icon }} fs-2 neon-blue"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h3 class="fw-bold mb-1 text-white text-glow">{{ $category->name }}</h3>
                                <p class="text-slate fw-medium mb-0" style="font-size: 0.95rem;">{{ $category->description }}</p>
                            </div>
                        </div>

                        <div class="bg-dark-glass p-4 rounded-4 mb-4">
                            <div class="d-flex justify-content-between align-items-end mb-2">
                                <span class="small fw-bold text-slate text-uppercase" style="letter-spacing: 1.5px;">Progres Belajar</span>
                                <span class="fw-bold neon-green" style="font-size: 0.9rem;">
                                    {{ $completedCount }} dari {{ $totalLessons }} Bab Selesai ({{ $percentage }}%)
                                </span>
                            </div>
                            <div class="progress progress-glass" style="height: 8px;">
                                <div class="progress-bar-neon" role="progressbar" style="width: {{ $percentage }}%"></div>
                            </div>
                        </div>

                        <div class="d-flex flex-column gap-3 mt-2">
                            @forelse($category->lessons as $lesson)
                                @php
                                    $isDone = in_array($lesson->id, $completedLessonIds);
                                @endphp
                                
                                <a href="{{ route('lessons.user.show', $lesson->slug) }}" class="glass-list-item text-decoration-none d-flex justify-content-between align-items-center p-3 rounded-4 {{ $isDone ? 'is-done' : '' }}">
                                    <div class="d-flex align-items-center">
                                        <span class="badge {{ $isDone ? 'badge-glass-success' : 'badge-glass-dark' }} rounded-pill me-3 px-3 py-2 fw-bold shadow-sm" style="letter-spacing: 1px;">
                                            Bab {{ $lesson->order_number }}
                                        </span>
                                        
                                        <span class="fw-bold fs-6 {{ $isDone ? 'text-slate text-decoration-line-through opacity-75' : 'text-white' }}">
                                            {{ $lesson->title }}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        @if($isDone)
                                            <div class="icon-circle bg-success-glass d-flex align-items-center justify-content-center rounded-circle" style="width: 35px; height: 35px;">
                                                <i class="bi bi-check-lg neon-green fs-5"></i>
                                            </div>
                                        @else
                                            <div class="icon-circle bg-dark-glass d-flex align-items-center justify-content-center rounded-circle border border-secondary border-opacity-25" style="width: 35px; height: 35px;">
                                                <i class="bi bi-chevron-right text-slate"></i>
                                            </div>
                                        @endif
                                    </div>
                                </a>
                            @empty
                                <div class="text-center py-4 glass-list-item rounded-4">
                                    <i class="bi bi-hourglass-split text-slate fs-3 mb-2 d-block opacity-50"></i>
                                    <div class="text-slate fw-medium">Materi sedang dipersiapkan.</div>
                                </div>
                            @endforelse
                        </div>
                        
                    </div>
                </div>
            @empty
                <div class="glass-card text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 400px;">
                    <i class="bi bi-journal-x display-1 text-slate mb-4 d-block opacity-25"></i>
                    <h3 class="fw-bold text-white text-glow mb-2">Buku Digital Kosong</h3>
                    <p class="text-slate">Belum ada kategori materi yang ditambahkan saat ini.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* PREMIUM GLASSMORPHISM UI - BUKU MATERI DIGITAL           */
/* ======================================================== */

/* Typography & Colors */
.text-slate { color: #94a3b8 !important; }
.text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
.neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.5); }
.neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }

/* Main Glass Card */
.glass-card {
    background: rgba(20, 25, 40, 0.5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.5rem;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

/* Inner Glass Elements */
.bg-dark-glass {
    background: rgba(11, 15, 25, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-success-glass {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}

/* Badges */
.badge-glass-dark {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
}

.badge-glass-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
}

/* Progress Bar */
.progress-glass {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.progress-bar-neon {
    background: linear-gradient(90deg, #10b981, #34d399);
    box-shadow: 0 0 15px rgba(52, 211, 153, 0.5);
    border-radius: 10px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* List Items (Chapters) */
.glass-list-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-list-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(56, 189, 248, 0.3);
    transform: translateX(8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 1px 0 0 rgba(255, 255, 255, 0.1);
}

.glass-list-item:hover .icon-circle {
    background: rgba(56, 189, 248, 0.15);
    border-color: rgba(56, 189, 248, 0.4) !important;
}

.glass-list-item:hover .icon-circle i {
    color: #38bdf8 !important;
}

/* Completed List Item State */
.glass-list-item.is-done {
    background: rgba(16, 185, 129, 0.02);
    border: 1px solid rgba(16, 185, 129, 0.1);
}

.glass-list-item.is-done:hover {
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.2);
    transform: translateX(4px);
}

.icon-circle {
    transition: all 0.3s ease;
}
</style>
@endsection