@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <!-- Header Title Section & Action Button -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
            <h3 class="fw-bold mb-2 text-theme-main tracking-tight">Kelola Video 🎥</h3>
            <p class="text-theme-muted mb-0 small">Manajemen video YouTube dan transkrip interaktif.</p>
        </div>
        <a href="{{ route('admin.videos.create') }}" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2 d-flex align-items-center gap-2">
            <i class="bi bi-plus-circle-fill"></i> Tambah Video Baru
        </a>
    </div>

    <!-- Alert Notification State -->
    @if(session('success'))
        <div class="badge-minimal-success rounded-3 fw-medium px-4 py-3 mb-4 d-flex align-items-center small">
            <i class="bi bi-check-circle-fill me-2 fs-6"></i>
            {{ session('success') }}
        </div>
    @endif

    <!-- Data Table Container Block -->
    <div class="minimal-card mb-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table-minimal table-hover-minimal align-middle mb-0">
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
                            <div class="fw-bold text-theme-main small mb-1">{{ $video->title }}</div>
                            <div class="text-theme-muted" style="font-size: 0.8rem;">
                                <i class="bi bi-card-text me-1"></i> {{ $video->transcripts()->count() }} baris transkrip
                            </div>
                        </td>
                        <td>
                            <span class="badge bg-minimal-badge border-minimal text-theme-main px-2.5 py-1.5 font-sans" style="font-size: 0.75rem;">
                                <i class="{{ $video->folder->icon ?? 'bi bi-folder2' }} me-1 text-theme-muted"></i>
                                {{ $video->folder->name ?? 'Tanpa Folder' }}
                            </span>
                        </td>
                        <td>
                            @if($video->difficulty == 'beginner')
                                <span class="badge badge-minimal-success text-uppercase px-2.5 py-1.5" style="font-size: 0.7rem; font-weight: 600;">Beginner</span>
                            @elseif($video->difficulty == 'intermediate')
                                <span class="badge badge-minimal-warning text-uppercase px-2.5 py-1.5" style="font-size: 0.7rem; font-weight: 600;">Intermediate</span>
                            @else
                                <span class="badge badge-minimal-danger text-uppercase px-2.5 py-1.5" style="font-size: 0.7rem; font-weight: 600;">Advanced</span>
                            @endif
                        </td>
                        <td>
                            <a href="https://youtube.com/watch?v={{ $video->youtube_id }}" target="_blank" class="text-decoration-none yt-link d-inline-flex align-items-center font-monospace">
                                {{ $video->youtube_id }}
                                <i class="bi bi-box-arrow-up-right ms-1.5" style="font-size: 0.75rem;"></i>
                            </a>
                        </td>
                        <td class="text-end pe-4">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.videos.edit', $video->id) }}" class="btn-action-edit">
                                    <i class="bi bi-pencil-square me-1"></i> Edit
                                </a>
                                <form action="{{ route('admin.videos.destroy', $video->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn-action-delete" onclick="return confirm('Apakah Anda yakin ingin menghapus video ini beserta seluruh transkripnya?')">
                                        <i class="bi bi-trash3 me-1"></i> Hapus
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="text-center py-5 bg-minimal-badge">
                            <i class="bi bi-camera-video display-4 text-theme-muted opacity-30 d-block mb-2"></i>
                            <span class="text-theme-muted small fw-medium">Belum ada video yang diunggah saat ini.</span>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Laravel Minimalist Pagination Section Wrapper -->
    <div class="mt-4 d-flex justify-content-center justify-content-md-end">
        {{ $videos->links() }}
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - ADMIN VIDEOS MANAGEMENT       */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --table-header-bg: #141922;
    --yt-link-bg: rgba(56, 189, 248, 0.06);
    --yt-link-hover: #38bdf8;
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-warning: #eab308;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --table-header-bg: #f1f5f9;
    --yt-link-bg: rgba(37, 99, 235, 0.04);
    --yt-link-hover: #2563eb;
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
    --accent-warning: #ca8a04;
    --accent-danger: #dc2626;
}

/* Base Structural Block Containers */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.border-minimal { border: 1px solid var(--card-border); }
.bg-minimal-badge { background: var(--badge-bg); }

/* Badge Level Variants Mapping */
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }
.badge-minimal-warning { background: rgba(234, 179, 8, 0.06); color: var(--accent-warning); }
.badge-minimal-danger { background: rgba(244, 63, 94, 0.06); color: var(--accent-danger); }

/* Elegant Custom Button Architecture */
.btn-minimal {
    font-weight: 500;
    padding: 0.45rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary { background: var(--accent-primary); color: #ffffff !important; border: none; }
.btn-minimal-primary:hover { filter: brightness(1.08); }

.btn-action-edit {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.35rem 0.85rem;
    border-radius: 0.375rem;
    transition: all 0.15s ease;
    text-decoration: none;
}
.btn-action-edit:hover {
    background: var(--box-bg);
    color: var(--accent-primary);
}
.btn-action-delete {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--accent-danger);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.35rem 0.85rem;
    border-radius: 0.375rem;
    transition: all 0.15s ease;
}
.btn-action-delete:hover {
    background: var(--accent-danger);
    color: #ffffff;
    border-color: transparent;
}

/* Flat Monospace YouTube External Link */
.yt-link {
    color: var(--text-muted);
    background: var(--yt-link-bg);
    border: 1px solid var(--card-border);
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 0.375rem;
    transition: all 0.15s ease;
}
.yt-link:hover {
    color: var(--yt-link-hover);
    border-color: var(--yt-link-hover);
}

/* ======================================================== */
/* CLEAN STRUCTURAL FLAT DATA TABLES                        */
/* ======================================================== */
.table-minimal {
    width: 100%;
    color: var(--text-main);
    border-collapse: collapse;
}
.table-minimal th, .table-minimal td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--card-border);
}
.table-minimal thead th {
    background: var(--table-header-bg);
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
}

.table-hover-minimal tbody tr {
    transition: background-color 0.15s ease;
}
.table-hover-minimal tbody tr:hover {
    background-color: var(--box-bg);
}
.table-hover-minimal tbody tr:last-child td {
    border-bottom: none;
}

/* ======================================================== */
/* FLAT LARAVEL REUSABLE PAGINATION SYSTEM OVERRIDES        */
/* ======================================================== */
.pagination .page-item .page-link {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    color: var(--text-muted);
    margin: 0 2px;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    box-shadow: none;
}
.pagination .page-item .page-link:hover {
    background: var(--box-bg);
    color: var(--text-main);
    border-color: var(--text-muted);
}
.pagination .page-item.active .page-link {
    background: var(--accent-primary) !important;
    border-color: transparent;
    color: #ffffff !important;
}
.pagination .page-item.disabled .page-link {
    background: var(--box-bg);
    color: var(--text-muted);
    opacity: 0.4;
    border-color: var(--card-border);
}
</style>
@endsection