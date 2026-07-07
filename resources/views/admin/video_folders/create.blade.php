@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.video-folders.index') }}" class="btn btn-minimal btn-minimal-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h4 class="fw-bold mb-1 text-theme-main tracking-tight">Tambah Folder Baru 📁</h4>
                    <p class="text-theme-muted mb-0 small">Buat kategori baru untuk mengelompokkan video.</p>
                </div>
            </div>

            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.video-folders.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-4">
                            <label class="form-label-minimal">Nama Folder <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control form-control-minimal" placeholder="Misal: School Conversations" required autofocus>
                        </div>

                        <div class="mb-4">
                            <label class="form-label-minimal">Deskripsi <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea name="description" class="form-control form-control-minimal" rows="3" placeholder="Penjelasan singkat mengenai isi folder ini..."></textarea>
                        </div>

                        <div class="border-top-minimal my-4"></div>

                        <div class="mb-5">
                            <label class="form-label-minimal">Ikon Bootstrap <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            
                            <div class="position-relative">
                                <i class="bi bi-bootstrap position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-60"></i>
                                <input type="text" name="icon" class="form-control form-control-minimal ps-5" placeholder="Misal: bi-camera-video" value="bi-folder-fill">
                            </div>
                            
                            <small class="text-theme-muted mt-2 d-block small" style="font-size: 0.8rem;">
                                <i class="bi bi-info-circle me-1"></i>Kosongkan jika ingin menggunakan ikon standar. (Referensi: <a href="https://icons.getbootstrap.com/" target="_blank" class="link-minimal-accent fw-semibold">Bootstrap Icons</a>)
                            </small>
                        </div>

                        <div class="d-grid pt-2">
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                                <i class="bi bi-folder-plus me-1.5"></i> Simpan Folder
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - ADMIN FORM INPUTS             */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
}

/* Base Structural Block Containers */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.border-top-minimal { border-top: 1px solid var(--card-border); }

/* Typography & Links Component Labels */
.form-label-minimal {
    color: var(--text-main);
    font-size: 0.825rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 0.5rem;
    display: block;
}

.link-minimal-accent {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.15s ease;
}
.link-minimal-accent:hover {
    color: var(--text-main);
}

/* ======================================================== */
/* FLAT CLEAN FORM CONTROL FIELDS                           */
/* ======================================================== */
.form-control-minimal {
    background: var(--input-bg) !important;
    border: 1px solid var(--card-border) !important;
    color: var(--text-main) !important;
    border-radius: 0.5rem;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}
.form-control-minimal:focus {
    background: var(--input-focus-bg) !important;
    border-color: var(--text-muted) !important;
    box-shadow: none !important;
}
.form-control-minimal::placeholder {
    color: var(--text-muted) !important;
    opacity: 0.4;
}

/* Reusable Elegant Custom Button System */
.btn-minimal {
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary {
    background: var(--accent-primary);
    color: #ffffff !important;
    border: none;
}
.btn-minimal-primary:hover {
    filter: brightness(1.08);
}
.btn-minimal-secondary {
    background: transparent;
    color: var(--text-main) !important;
    border: 1px solid var(--card-border);
}
.btn-minimal-secondary:hover {
    background: var(--input-bg);
}
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }
</style>
@endsection