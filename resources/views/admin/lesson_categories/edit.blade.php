@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.lesson-categories.index') }}" class="btn btn-minimal btn-minimal-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h4 class="fw-bold mb-1 text-theme-main tracking-tight">Edit Kategori Materi 📖</h4>
                    <p class="text-theme-muted mb-0 small">Perbarui informasi pengelompokan bab pelajaran.</p>
                </div>
            </div>

            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.lesson-categories.update', $lessonCategory->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="mb-4">
                            <label class="form-label-minimal">Nama Kategori <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control form-control-minimal" placeholder="Misal: Grammar Dasar" required autofocus value="{{ $lessonCategory->name }}">
                        </div>

                        <div class="mb-4">
                            <label class="form-label-minimal">Deskripsi Singkat <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea name="description" class="form-control form-control-minimal" rows="3" placeholder="Pelajaran tentang struktur kalimat bahasa Inggris...">{{ $lessonCategory->description }}</textarea>
                        </div>

                        <div class="border-top-minimal my-4"></div>

                        <div class="mb-5">
                            <label class="form-label-minimal">Ikon Bootstrap <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            
                            <div class="input-group border-minimal rounded-2 overflow-hidden mb-3">
                                <span class="input-group-text px-3 border-0 text-theme-muted" style="background: var(--box-bg);">
                                    <i class="bi bi-bootstrap-fill"></i>
                                </span>
                                <input type="text" name="icon" class="form-control form-control-minimal border-0" style="border-radius: 0;" placeholder="Misal: bi-book-half" value="{{ old('icon', $category->icon ?? 'bi-book-half') }}">
                                <a href="https://icons.getbootstrap.com/" target="_blank" class="btn btn-addon-minimal d-flex align-items-center gap-1.5 px-3 text-white"">
                                    Cari Ikon <i class="bi bi-search" style="font-size: 0.8rem;"></i>
                                </a>
                            </div>

                            <div class="minimal-box p-3 d-flex align-items-start gap-2 rounded-2">
                                <i class="bi bi-lightbulb-fill text-warning mt-0.5"></i>
                                <span class="small text-theme-muted">
                                    Klik tombol "Cari Ikon" untuk membuka galeri, lalu copy-paste nama ikon (contoh: <strong class="text-theme-main">bi-camera-video</strong>) ke dalam kolom input.
                                </span>
                            </div>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                                <i class="bi bi-cloud-arrow-up-fill me-1.5"></i> Perbarui Kategori
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
/* MINIMALIST DESIGN SYSTEM - ADMIN FORM EDITING            */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    --box-bg: rgba(255, 255, 255, 0.02);
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    --box-bg: #f8fafc;
    
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
.border-minimal { border: 1px solid var(--card-border); }
.minimal-box { background: var(--box-bg); border: 1px solid var(--card-border); }

/* Typography Component Labels */
.form-label-minimal {
    color: var(--text-main);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
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
    padding: 0.6rem 1rem;
    font-size: 0.925rem;
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