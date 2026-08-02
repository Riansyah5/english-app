@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-5 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-0">Latihan Shadowing 🗣️</h2>
            <p class="text-muted mb-0">Tirukan intonasi native speaker untuk melatih kelancaran berbicara.</p>
        </div>
    </div>

    <div class="row g-4">
        @forelse($topics as $topic)
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm border-0 rounded-4 h-100 hover-elevate transition-all">
                    <div class="card-body p-4 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="badge bg-{{ $topic->level == 'Beginner' ? 'success' : ($topic->level == 'Intermediate' ? 'warning text-dark' : 'danger') }} rounded-pill px-3">
                                {{ $topic->level }}
                            </div>
                            <span class="text-muted small"><i class="bi bi-chat-text me-1"></i> {{ $topic->lines_count }} Dialog</span>
                        </div>
                        <h4 class="fw-bold mb-2">{{ $topic->title }}</h4>
                        <p class="text-muted small flex-grow-1">{{ $topic->description }}</p>
                        <a href="{{ route('shadowing.user.show', $topic->slug) }}" class="btn btn-primary w-100 rounded-pill fw-bold mt-3 shadow-sm">
                            Mulai Latihan &rarr;
                        </a>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-mic-mute display-1 d-block mb-3 opacity-50"></i>
                <h4>Belum ada materi shadowing.</h4>
            </div>
        @endforelse
    </div>
</div>
@endsection

@section('styles')
<style>
    .hover-elevate:hover { transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
    .transition-all { transition: all 0.3s ease; }
</style>
@endsection