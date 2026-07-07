@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <div class="row mb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="fw-bold mb-2 text-theme-main tracking-tight">Buku Materi Digital 📖</h2>
            <p class="text-theme-muted mb-0 fs-6">Pahami konsep fundamental bahasa Inggris langkah demi langkah.</p>
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

                <div class="minimal-card mb-5 overflow-hidden">
                    <div class="card-body p-4 p-md-5">
                        
                        <div class="d-flex align-items-start align-items-md-center mb-4">
                            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 border-minimal bg-minimal-badge" style="width: 54px; height: 54px; flex-shrink: 0;">
                                <i class="bi {{ $category->icon }} fs-3 text-primary"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h4 class="fw-bold mb-1 text-theme-main">{{ $category->name }}</h4>
                                <p class="text-theme-muted small mb-0">{{ $category->description }}</p>
                            </div>
                        </div>

                        <div class="minimal-box p-3 rounded-3 mb-4">
                            <div class="d-flex justify-content-between align-items-end mb-2">
                                <span class="small fw-semibold text-theme-muted text-uppercase tracking-wider" style="font-size: 0.65rem;">Progres Belajar</span>
                                <span class="fw-semibold text-success small">
                                    {{ $completedCount }} dari {{ $totalLessons }} Bab Selesai ({{ $percentage }}%)
                                </span>
                            </div>
                            <div class="progress progress-minimal">
                                <div class="progress-bar progress-bar-success-minimal" role="progressbar" style="width: {{ $percentage }}%"></div>
                            </div>
                        </div>

                        <div class="d-flex flex-column gap-2 mt-2">
                            @forelse($category->lessons as $lesson)
                                @php
                                    $isDone = in_array($lesson->id, $completedLessonIds);
                                @endphp
                                
                                <a href="{{ route('lessons.user.show', $lesson->slug) }}" class="minimal-list-item text-decoration-none d-flex justify-content-between align-items-center p-3 rounded-3 {{ $isDone ? 'is-done' : '' }}">
                                    <div class="d-flex align-items-center me-3 overflow-hidden">
                                        <span class="badge {{ $isDone ? 'badge-minimal-success' : 'badge-minimal-dark' }} rounded-2 me-3 px-2.5 py-1.5 font-monospace" style="font-size: 0.75rem;">
                                            BAB {{ $lesson->order_number }}
                                        </span>
                                        <span class="fw-semibold text-truncate small {{ $isDone ? 'text-theme-muted text-decoration-line-through opacity-60' : 'text-theme-main' }}">
                                            {{ $lesson->title }}
                                        </span>
                                    </div>
                                    
                                    <div class="flex-shrink-0">
                                        @if($isDone)
                                            <div class="icon-circle text-success d-flex align-items-center justify-content-center rounded-circle bg-light-success">
                                                <i class="bi bi-check-lg fs-6"></i>
                                            </div>
                                        @else
                                            <div class="icon-circle text-theme-muted border-minimal d-flex align-items-center justify-content-center rounded-circle bg-minimal-badge">
                                                <i class="bi bi-chevron-right small"></i>
                                            </div>
                                        @endif
                                    </div>
                                </a>
                            @empty
                                <div class="text-center py-4 border-minimal rounded-3 bg-minimal-badge">
                                    <i class="bi bi-hourglass-split text-theme-muted fs-4 mb-2 d-block opacity-50"></i>
                                    <span class="text-theme-muted small">Materi sedang dipersiapkan oleh tim pengajar.</span>
                                </div>
                            @endforelse
                        </div>
                        
                    </div>
                </div>
            @empty
                <div class="minimal-card text-center py-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 350px;">
                    <i class="bi bi-journal-x display-3 text-theme-muted mb-3 opacity-30"></i>
                    <h5 class="fw-bold text-theme-main mb-1">Buku Digital Kosong</h5>
                    <p class="text-theme-muted small">Belum ada kategori materi yang tersedia saat ini.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - MATERIAL READBOOK             */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --item-hover-bg: rgba(255, 255, 255, 0.02);
    
    --badge-dark-txt: #cbd5e1;
    --accent-success: #10b981;
    --success-light-bg: rgba(16, 185, 129, 0.06);
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --item-hover-bg: #f8fafc;
    
    --badge-dark-txt: #475569;
    --accent-success: #059669;
    --success-light-bg: rgba(5, 150, 105, 0.06);
}

/* Base Flat Containers */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.minimal-box {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }

/* Progress System Elements */
.progress-minimal {
    background-color: var(--card-border) !important;
    height: 5px !important;
    border-radius: 999px;
    overflow: hidden;
}
.progress-bar-success-minimal {
    background: var(--accent-success);
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Minimal Badges Type */
.badge-minimal-dark {
    background: var(--badge-bg);
    border: 1px solid var(--card-border);
    color: var(--badge-dark-txt);
}
.badge-minimal-success {
    background: var(--success-light-bg);
    border: 1px solid rgba(16, 185, 129, 0.15);
    color: var(--accent-success);
}

/* Elegant Table Rows / List Items */
.minimal-list-item {
    background: transparent;
    border: 1px solid var(--card-border);
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.minimal-list-item:hover {
    background: var(--item-hover-bg);
    border-color: var(--text-muted);
    padding-left: 1.25rem !important; /* Memberikan efek geser mikro elegan */
}

/* Completed Chapter States */
.minimal-list-item.is-done {
    background: transparent;
    border-color: var(--card-border);
}
.minimal-list-item.is-done:hover {
    background: var(--success-light-bg);
    border-color: rgba(16, 185, 129, 0.2);
}

/* Indicators Icons Circle */
.icon-circle {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
    transition: all 0.2s ease;
}
.bg-light-success {
    background: var(--success-light-bg);
    border: 1px solid rgba(16, 185, 129, 0.1);
}

.minimal-list-item:hover .icon-circle {
    transform: scale(1.05);
}
</style>
@endsection