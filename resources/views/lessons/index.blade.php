@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-5 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-0">Buku Materi Digital 📖</h2>
            <p class="text-muted mb-0">Pahami konsep fundamental bahasa Inggris langkah demi langkah.</p>
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

                <div class="card shadow-sm border-0 rounded-4 mb-4">
                    <div class="card-body p-4 p-md-5">
                        <div class="d-flex align-items-center mb-3">
                            <div class="bg-primary text-white rounded p-3 me-3 shadow-sm d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                                <i class="bi {{ $category->icon }} fs-3"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h4 class="fw-bold mb-1">{{ $category->name }}</h4>
                                <p class="text-muted small mb-0">{{ $category->description }}</p>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mb-1 mt-4">
                            <span class="small fw-bold text-muted text-uppercase">Progres Belajar</span>
                            <span class="small fw-bold text-primary">{{ $completedCount }} dari {{ $totalLessons }} Bab Selesai ({{ $percentage }}%)</span>
                        </div>
                        <div class="progress mb-4" style="height: 10px; border-radius: 10px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: {{ $percentage }}%"></div>
                        </div>

                        <div class="list-group list-group-flush border-top pt-3">
                            @forelse($category->lessons as $lesson)
                                @php
                                    $isDone = in_array($lesson->id, $completedLessonIds);
                                @endphp
                                <a href="{{ route('lessons.user.show', $lesson->slug) }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 border-0 rounded {{ $isDone ? 'bg-light' : '' }}">
                                    <div>
                                        <span class="badge bg-secondary rounded-pill me-2">Bab {{ $lesson->order_number }}</span>
                                        <span class="fw-medium {{ $isDone ? 'text-muted text-decoration-line-through' : 'text-dark' }}">
                                            {{ $lesson->title }}
                                        </span>
                                    </div>
                                    @if($isDone)
                                        <i class="bi bi-check-circle-fill text-success fs-5"></i>
                                    @else
                                        <i class="bi bi-chevron-right text-muted"></i>
                                    @endif
                                </a>
                            @empty
                                <div class="text-muted small">Materi sedang dipersiapkan.</div>
                            @endforelse
                        </div>
                    </div>
                </div>
            @empty
                <div class="text-center py-5 text-muted">
                    <i class="bi bi-journal-x display-1 d-block mb-3 opacity-50"></i>
                    <h4>Buku digital masih kosong.</h4>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection