@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-4 align-items-center">
        <div class="col-md-8">
            <h2 class="fw-bold mb-0">Video Library 🎬</h2>
            <p class="text-muted mb-0">Belajar bahasa Inggris langsung dari konteks nyata (Native Speakers).</p>
        </div>
    </div>

    @forelse($folders as $folder)
        <div class="mb-5">
            <div class="d-flex align-items-center mb-3">
                <div class="bg-primary text-white rounded p-2 me-3 shadow-sm">
                    <i class="{{ $folder->icon ?? 'bi bi-folder-fill' }} fs-4"></i>
                </div>
                <div>
                    <h4 class="fw-bold mb-0">{{ $folder->name }}</h4>
                    <small class="text-muted">{{ $folder->videos->count() }} Video tersedia</small>
                </div>
            </div>

            <div class="row g-4">
                @forelse($folder->videos as $video)
                    <div class="col-md-6 col-lg-4">
                        <div class="card shadow-sm border-0 rounded-4 h-100 text-decoration-none">
                            <div class="position-relative">
                                <img src="https://img.youtube.com/vi/{{ $video->youtube_id }}/mqdefault.jpg" class="card-img-top rounded-top-4" alt="Thumbnail" style="object-fit: cover; height: 200px;">
                                <div class="position-absolute bottom-0 end-0 m-2">
                                    <span class="badge bg-dark text-white shadow-sm">{{ strtoupper($video->difficulty) }}</span>
                                </div>
                            </div>
                            
                            <div class="card-body p-4">
                                <h5 class="fw-bold text-dark mb-3">{{ $video->title }}</h5>
                                <a href="{{ route('videos.user.show', $video->id) }}" class="btn btn-outline-primary rounded-pill w-100 fw-bold">
                                    Tonton & Belajar
                                </a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-light border-0 text-muted" role="alert">
                            Belum ada video di dalam folder ini.
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    @empty
        <div class="text-center py-5">
            <h4 class="text-muted">Belum ada folder atau video yang tersedia.</h4>
        </div>
    @endforelse
</div>
@endsection