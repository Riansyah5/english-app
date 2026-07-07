@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <!-- Header Title Section & Action Button -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
            <h3 class="fw-bold mb-2 text-theme-main tracking-tight">Kelola Kategori Materi 📚</h3>
            <p class="text-theme-muted mb-0 small">Kelompokkan bab pelajaran agar rapi dan terstruktur.</p>
        </div>
        <a href="{{ route('admin.lesson-categories.create') }}" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2 d-flex align-items-center gap-2">
            <i class="bi bi-folder-plus"></i> Tambah Kategori
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
                        <th class="ps-4" style="width: 30%;">Kategori</th>
                        <th style="width: 40%;">Deskripsi</th>
                        <th class="text-center" style="width: 15%;">Jumlah Bab</th>
                        <th class="text-end pe-4" style="width: 15%;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($categories as $category)
                    <tr>
                        <td class="ps-4 fw-bold text-theme-main small">
                            <i class="bi {{ $category->icon ?? 'bi-folder2' }} text-primary me-2 fs-5 align-middle"></i> 
                            <span class="align-middle">{{ $category->name }}</span>
                        </td>
                        <td class="text-theme-muted small fw-medium">{{ $category->description ?? '-' }}</td>
                        <td class="text-center">
                            <span class="badge bg-minimal-badge border-minimal text-theme-main font-monospace px-2.5 py-1.5" style="font-size: 0.75rem;">
                                {{ $category->lessons_count }} Bab
                            </span>
                        </td>
                        <td class="text-end pe-4">
                            <div class="d-flex justify-content-end gap-1.5">
                                <a href="{{ route('admin.lesson-categories.edit', $category->id) }}" class="btn-action-flat btn-action-info" title="Edit Kategori">
                                    <i class="bi bi-pencil-square"></i>
                                </a>

                                <form action="{{ route('admin.lesson-categories.destroy', $category->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn-action-flat btn-action-delete" title="Hapus Kategori" onclick="return confirm('PERINGATAN! Menghapus kategori ini juga akan MENGHAPUS SEMUA BAB MATERI di dalamnya. Yakin?')">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5 bg-minimal-badge">
                            <i class="bi bi-journal-x display-4 text-theme-muted opacity-30 d-block mb-2"></i>
                            <span class="text-theme-muted small fw-medium">Belum ada kategori materi yang dibuat saat ini.</span>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Laravel Minimalist Pagination Section Wrapper -->
    <div class="mt-4 d-flex justify-content-center justify-content-md-end">
        {{ $categories->links() }}
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - ADMIN LESSON CATEGORIES       */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --table-header-bg: #141922;
    
    --accent-primary: #3b82f6;
    --accent-info: #06b6d4;
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
    --accent-info: #0891b2;
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

/* Flat Compact Square Action Controls (Edit & Delete) */
.btn-action-flat {
    background: transparent;
    border: 1px solid var(--card-border);
    font-size: 0.85rem;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}
.btn-action-info { color: var(--accent-info); }
.btn-action-info:hover { background: var(--accent-info); color: #ffffff; border-color: transparent; }

.btn-action-delete { color: var(--accent-danger); }
.btn-action-delete:hover { background: var(--accent-danger); color: #ffffff; border-color: transparent; }

/* ======================================================== */
/* CLEAN STRUCTURAL FLAT DATA TABLES                        */
/* ======================================================== */
.table-minimal {
    width: 100%;
    color: var(--text-main);
    border-collapse: collapse;
}
.table-minimal th, .table-minimal td {
    padding: 0.9rem 1.25rem;
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