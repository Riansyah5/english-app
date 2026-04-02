@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - ADMIN PANEL                   */
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
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }

    /* Badges */
    .badge-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        backdrop-filter: blur(8px);
    }
    
    .badge-neon-success {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
    }
    
    .badge-neon-warning {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: #fbbf24;
    }
    
    .badge-neon-danger {
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.3);
        color: #fb7185;
    }

    /* Buttons */
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
        color: white;
    }

    .btn-glass-danger {
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.3);
        color: #fb7185;
        transition: all 0.2s ease;
    }
    .btn-glass-danger:hover {
        background: rgba(244, 63, 94, 0.2);
        border-color: rgba(244, 63, 94, 0.5);
        color: #fff;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.3);
        transform: translateY(-1px);
    }

    /* Alert */
    .alert-glass-success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
        backdrop-filter: blur(10px);
    }

    /* Table Styling */
    .table-glass {
        width: 100%;
        margin-bottom: 0;
        color: #f8fafc;
        border-collapse: separate;
        border-spacing: 0;
    }
    .table-glass th, .table-glass td {
        padding: 1.2rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        background: transparent;
    }
    .table-glass thead th {
        background: rgba(0, 0, 0, 0.2);
        color: #94a3b8;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 1px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .table-hover-glass tbody tr {
        transition: all 0.2s ease;
    }
    .table-hover-glass tbody tr:hover {
        background: rgba(255, 255, 255, 0.03);
        box-shadow: inset 2px 0 0 #38bdf8;
    }
    .table-hover-glass tbody tr:last-child td {
        border-bottom: none;
    }

    /* YouTube Link Styles */
    .yt-link {
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.1);
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid rgba(56, 189, 248, 0.2);
        transition: all 0.2s;
    }
    .yt-link:hover {
        background: rgba(56, 189, 248, 0.2);
        color: #fff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
    }

    /* Laravel Pagination Dark Glass Override */
    .pagination { margin-bottom: 0; }
    .page-item .page-link {
        background: rgba(20, 25, 40, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        backdrop-filter: blur(10px);
        margin: 0 3px;
        border-radius: 8px;
        transition: all 0.2s;
    }
    .page-item .page-link:hover {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.4);
        color: #38bdf8;
    }
    .page-item.active .page-link {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border-color: transparent;
        color: white;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
    .page-item.disabled .page-link {
        background: rgba(0, 0, 0, 0.2);
        color: #64748b;
        border-color: rgba(255, 255, 255, 0.05);
    }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>

<div class="container py-4 position-relative z-1">
    
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
            <h2 class="fw-bold mb-2 text-white text-glow display-6" style="letter-spacing: -1px;">Kelola Video 🎥</h2>
            <p class="text-slate mb-0 fw-medium" style="letter-spacing: 0.5px;">Manajemen video YouTube dan transkrip interaktif.</p>
        </div>
        <a href="{{ route('admin.videos.create') }}" class="btn btn-neon-primary fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2">
            <i class="bi bi-plus-circle-fill"></i> Tambah Video Baru
        </a>
    </div>

    @if(session('success'))
        <div class="alert alert-glass-success rounded-pill fw-semibold px-4 py-3 shadow-lg mb-4 d-none d-md-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2 fs-5"></i>
            {{ session('success') }}
        </div>
    @endif

    <div class="glass-card mb-4 position-relative">
        <div class="position-absolute top-0 start-0 w-100" style="height: 3px; background: linear-gradient(90deg, #4f46e5, #38bdf8);"></div>
        
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table-glass table-hover-glass align-middle">
                    <thead>
                        <tr>
                            <th class="ps-4" style="width: 35%;">Judul Video</th>
                            <th style="width: 20%;">Folder</th>
                            <th style="width: 15%;">Tingkat</th>
                            <th style="width: 15%;">YouTube ID</th>
                            <th class="text-end pe-4" style="width: 15%;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($videos as $video)
                        <tr>
                            <td class="ps-4">
                                <div class="fw-bold text-white mb-1" style="letter-spacing: 0.5px;">{{ $video->title }}</div>
                                <div class="text-slate small fw-medium">
                                    <i class="bi bi-card-text me-1"></i> {{ $video->transcripts()->count() }} baris transkrip
                                </div>
                            </td>
                            <td>
                                <span class="badge badge-glass text-uppercase px-3 py-2 fw-semibold" style="letter-spacing: 0.5px;">
                                    <i class="{{ $video->folder->icon ?? 'bi bi-folder' }} me-1 text-slate"></i>
                                    {{ $video->folder->name ?? 'Tanpa Folder' }}
                                </span>
                            </td>
                            <td>
                                @if($video->difficulty == 'beginner')
                                    <span class="badge badge-neon-success text-uppercase px-3 py-2 fw-bold" style="letter-spacing: 1px;">Beginner</span>
                                @elseif($video->difficulty == 'intermediate')
                                    <span class="badge badge-neon-warning text-uppercase px-3 py-2 fw-bold" style="letter-spacing: 1px;">Intermediate</span>
                                @else
                                    <span class="badge badge-neon-danger text-uppercase px-3 py-2 fw-bold" style="letter-spacing: 1px;">Advanced</span>
                                @endif
                            </td>
                            <td>
                                <a href="https://youtube.com/watch?v={{ $video->youtube_id }}" target="_blank" class="text-decoration-none yt-link d-inline-flex align-items-center fw-semibold font-monospace small">
                                    {{ $video->youtube_id }}
                                    <i class="bi bi-box-arrow-up-right ms-2" style="font-size: 0.8rem;"></i>
                                </a>
                            </td>
                            <td class="text-end pe-4">
                                <form action="{{ route('admin.videos.destroy', $video->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-glass-danger rounded-pill px-3 fw-semibold d-flex align-items-center gap-1 ms-auto" onclick="return confirm('Apakah Anda yakin ingin menghapus video ini beserta seluruh transkripnya?')">
                                        <i class="bi bi-trash3"></i> Hapus
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="text-center py-5">
                                <i class="bi bi-camera-video display-4 text-slate opacity-25 d-block mb-3"></i>
                                <p class="text-slate fw-medium mb-0">Belum ada video yang diunggah.</p>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <div class="mt-4 d-flex justify-content-center justify-content-md-end">
        {{ $videos->links() }}
    </div>
</div>
@endsection