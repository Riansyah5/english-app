@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <!-- Header Title Section & Action Button -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
            <h3 class="fw-bold mb-2 text-theme-main tracking-tight">Kelola Folder Video 📁</h3>
            <p class="text-theme-muted mb-0 small">Kategorikan video Anda agar mudah ditemukan pelajar.</p>
        </div>
        <a href="{{ route('admin.video-folders.create') }}" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2 d-flex align-items-center gap-2">
            <i class="bi bi-folder-plus"></i> Tambah Folder
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
                        <th class="ps-4" style="width: 30%;">Nama Folder</th>
                        <th style="width: 40%;">Deskripsi</th>
                        <th class="text-center" style="width: 15%;">Jumlah Video</th>
                        <th class="text-end pe-4" style="width: 15%;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($folders as $folder)
                    <tr>
                        <td class="ps-4 fw-bold text-theme-main small">
                            <i class="bi {{ $folder->icon ?? 'bi-folder2' }} text-primary me-2 fs-5 align-middle"></i> 
                            <span class="align-middle">{{ $folder->name }}</span>
                        </td>
                        <td class="text-theme-muted small fw-medium">{{ $folder->description ?? '-' }}</td>
                        <td class="text-center">
                            <span class="badge bg-minimal-badge border-minimal text-theme-main font-monospace px-2.5 py-1.5" style="font-size: 0.75rem;">
                                {{ $folder->videos_count }} Video
                            </span>
                        </td>
                        <td class="text-end pe-4">
                            <form action="{{ route('admin.video-folders.destroy', $folder->id) }}" method="POST" class="d-inline">
                                @csrf 
                                @method('DELETE')
                                <button type="submit" class="btn-action-delete" onclick="return confirm('PERINGATAN! Menghapus folder ini juga akan MENGHAPUS SEMUA VIDEO di dalamnya. Yakin ingin melanjutkan?')">
                                    <i class="bi bi-trash3 me-1"></i> Hapus
                                </button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5 bg-minimal-badge">
                            <i class="bi bi-folder-x display-4 text-theme-muted opacity-30 d-block mb-2"></i>
                            <span class="text-theme-muted small fw-medium">Belum ada folder yang dibuat saat ini.</span>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Laravel Minimalist Pagination Section Wrapper -->
    <div class="mt-4 d-flex justify-content-center justify-content-md-end">
        {{ $folders->links() }}
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - ADMIN VIDEO FOLDERS           */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --table-header-bg: #141922;
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --table-header-bg: #f1f5f9;
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
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
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }

/* Elegant Custom Button Architecture */
.btn-minimal {
    font-weight: 500;
    padding: 0.45rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary { background: var(--accent-primary); color: #ffffff !important; border: none; }
.btn-minimal-primary:hover { filter: brightness(1.08); }

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

/* Rows micro transition indicators */
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