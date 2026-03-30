@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0">Kelola Video 🎥</h2>
            <p class="text-muted">Manajemen video YouTube dan transkrip interaktif.</p>
        </div>
        <a href="{{ route('admin.videos.create') }}" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4">
            + Tambah Video Baru
        </a>
    </div>

    @if(session('success'))
        <div class="alert alert-success rounded-pill fw-semibold d-none d-md-block">{{ session('success') }}</div>
    @endif

    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Judul Video</th>
                            <th>Folder</th>
                            <th>Tingkat</th>
                            <th>YouTube ID</th>
                            <th class="text-end pe-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($videos as $video)
                        <tr>
                            <td class="ps-4 fw-bold">
                                {{ $video->title }}
                                <br>
                                <small class="text-muted fw-normal">{{ $video->transcripts()->count() }} baris transkrip</small>
                            </td>
                            <td>
                                <span class="badge bg-light text-dark border">
                                    <i class="{{ $video->folder->icon ?? 'bi bi-folder' }} me-1"></i>
                                    {{ $video->folder->name ?? 'Tanpa Folder' }}
                                </span>
                            </td>
                            <td>
                                @if($video->difficulty == 'beginner')
                                    <span class="badge bg-success text-uppercase">Beginner</span>
                                @elseif($video->difficulty == 'intermediate')
                                    <span class="badge bg-warning text-dark text-uppercase">Intermediate</span>
                                @else
                                    <span class="badge bg-danger text-uppercase">Advanced</span>
                                @endif
                            </td>
                            <td>
                                <a href="https://youtube.com/watch?v={{ $video->youtube_id }}" target="_blank" class="text-decoration-none">
                                    <code>{{ $video->youtube_id }}</code>
                                    <i class="bi bi-box-arrow-up-right ms-1 small"></i>
                                </a>
                            </td>
                            <td class="text-end pe-4">
                                <form action="{{ route('admin.videos.destroy', $video->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Apakah Anda yakin ingin menghapus video ini beserta seluruh transkripnya?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="text-center py-5 text-muted">
                                <i class="bi bi-camera-video display-4 d-block mb-3 text-light"></i>
                                Belum ada video yang diunggah.
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="mt-4">
        {{ $videos->links() }}
    </div>
</div>
@endsection