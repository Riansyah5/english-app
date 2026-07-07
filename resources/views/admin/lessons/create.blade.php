@extends('layouts.app')

@section('content')
<div class="container py-4">
    
    <!-- Header Navigation & Title -->
    <div class="d-flex align-items-center mb-5">
        <a href="{{ route('admin.lessons.index') }}" class="btn btn-minimal btn-minimal-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;">
            <i class="bi bi-arrow-left fs-5"></i>
        </a>
        <div>
            <h4 class="fw-bold mb-1 text-theme-main tracking-tight">Tulis Materi Baru ✍️</h4>
            <p class="text-theme-muted mb-0 small">Buat bab materi pembelajaran teks digital baru.</p>
        </div>
    </div>

    <!-- Main Card Body Container -->
    <div class="minimal-card">
        <div class="card-body p-4 p-md-5">
            <form action="{{ route('admin.lessons.store') }}" method="POST">
                @csrf
                
                <!-- Metadata Controls Row Grid -->
                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <label class="form-label-minimal">Kategori Materi <span class="text-danger">*</span></label>
                        <select name="lesson_category_id" class="form-select form-control-minimal" required>
                            <option value="" disabled selected>Pilih Kategori...</option> 
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-minimal">Judul Bab <span class="text-danger">*</span></label>
                        <input type="text" name="title" class="form-control form-control-minimal" placeholder="Misal: Bab 1 - Pengenalan Tenses" required>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label-minimal">Urutan <span class="text-danger">*</span></label>
                        <input type="number" name="order_number" class="form-control form-control-minimal" value="1" required>
                    </div>
                </div>

                <!-- Video Learning Optional Container Block -->
                <div class="minimal-box p-3 rounded-3 mb-4">
                    <label class="form-label-minimal text-danger mb-2"><i class="bi bi-youtube"></i> Video Pembahasan <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                    <input type="text" name="youtube_url" class="form-control form-control-minimal" placeholder="Tempel URL YouTube di sini (Misal: https://www.youtube.com/watch?v=...)">
                    <small class="text-theme-muted mt-2 d-block small" style="font-size: 0.8rem;">
                        <i class="bi bi-info-circle me-1"></i>Video ini akan ditampilkan di bagian atas materi bacaan pengguna.
                    </small>
                </div>

                <!-- WYSIWYG Content Area Editor -->
                <div class="mb-4">
                    <label class="form-label-minimal text-primary">Isi Materi <span class="text-danger">*</span></label>
                    <div class="editor-wrapper rounded-3 overflow-hidden">
                        <textarea name="content" id="summernote" required></textarea>
                    </div>
                </div>

                <!-- Publish Switch Toggler -->
                <div class="form-check form-switch custom-switch mb-5">
                    <input class="form-check-input" type="checkbox" name="is_published" id="publishSwitch" value="1" checked>
                    <label class="form-check-label text-theme-main fw-semibold small ms-2" for="publishSwitch">Langsung Terbitkan (Publish)</label>
                </div>

                <!-- Submit Action Layout -->
                <div class="d-grid">
                    <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                        <i class="bi bi-cloud-arrow-up-fill me-1.5"></i> Simpan Materi Pembelajaran
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('styles')
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - ADMIN LESSON CREATION         */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    --editor-btn-hover: rgba(255, 255, 255, 0.05);
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    --editor-btn-hover: rgba(0, 0, 0, 0.03);
    
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

.minimal-box { background: var(--box-bg); border: 1px solid var(--card-border); }
.border-minimal { border: 1px solid var(--card-border); }

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

select.form-control-minimal option {
    background-color: var(--card-bg);
    color: var(--text-main);
}

/* Custom Checkbox Toggle Switch Styles */
.custom-switch .form-check-input {
    width: 2.5em;
    height: 1.25em;
    background-color: var(--badge-bg);
    border: 1px solid var(--card-border);
    cursor: pointer;
}
.custom-switch .form-check-input:checked {
    background-color: var(--accent-success);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -2 22 22'%3e%3cpath fill='%23fff' d='M0 11a11 11 0 1 0 22 0A11 11 0 0 0 0 11zm15.707-3.293-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 11.586l5.293-5.293a1 1 0 0 1 1.414 1.414z'/%3e%3c/svg%3e");
    border-color: transparent;
}

/* Reusable Custom Button Layouts */
.btn-minimal {
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary { background: var(--accent-primary); color: #ffffff !important; border: none; }
.btn-minimal-primary:hover { filter: brightness(1.08); }
.btn-minimal-secondary { background: transparent; color: var(--text-main) !important; border: 1px solid var(--card-border); }
.btn-minimal-secondary:hover { background: var(--input-bg); }

/* ======================================================== */
/* SUMMERNOTE FLAT SKIN ADAPTATION ENGINE                   */
/* ======================================================== */
.editor-wrapper {
    border: 1px solid var(--card-border);
    background: var(--input-bg);
}
.note-editor.note-frame {
    border: none !important;
}
.note-editor .note-toolbar {
    background: var(--card-bg) !important;
    border-bottom: 1px solid var(--card-border) !important;
    padding: 0.5rem !important;
}
.note-btn {
    background: transparent !important;
    border: 1px solid var(--card-border) !important;
    color: var(--text-main) !important;
    border-radius: 0.375rem !important;
    padding: 0.25rem 0.5rem !important;
}
.note-btn:hover, .note-btn.active {
    background: var(--editor-btn-hover) !important;
    border-color: var(--text-muted) !important;
}
.note-editable {
    background: var(--input-bg) !important;
    color: var(--text-main) !important;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
}
.note-dropdown-menu {
    background: var(--card-bg) !important;
    border: 1px solid var(--card-border) !important;
}
.note-dropdown-item:hover {
    background: var(--box-bg) !important;
}
</style>
@endsection

@section('scripts')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

<script>
    $(document).ready(function() {
        $('#summernote').summernote({
            placeholder: 'Mulai ketik materi pelajaran di sini...',
            tabsize: 2,
            height: 400,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'italic', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });
    });
</script>
@endsection