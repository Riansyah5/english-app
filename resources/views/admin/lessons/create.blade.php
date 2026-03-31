@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex align-items-center mb-4">
        <a href="{{ route('admin.lessons.index') }}" class="btn btn-outline-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            <i class="fw-bold">&larr;</i>
        </a>
        <h3 class="fw-bold mb-0">Tulis Materi Baru ✍️</h3>
    </div>

    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-4 p-md-5">
            <form action="{{ route('admin.lessons.store') }}" method="POST">
                @csrf
                
                <div class="row g-3 mb-3">
                    <div class="col-md-4">
                        <label class="form-label fw-bold">Kategori Materi</label>
                        <select name="lesson_category_id" class="form-select" required>
                            <option value="">Pilih Kategori...</option> 
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Judul Bab</label>
                        <input type="text" name="title" class="form-control" placeholder="Misal: Bab 1 - Pengenalan Tenses" required>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label fw-bold">Urutan</label>
                        <input type="number" name="order_number" class="form-control" value="1" required>
                    </div>
                </div>

                <div class="mb-4 mt-4">
                    <label class="form-label fw-bold text-primary fs-5">Isi Materi</label>
                    <textarea name="content" id="summernote" required></textarea>
                </div>

                <div class="form-check form-switch mb-4">
                    <input class="form-check-input" type="checkbox" name="is_published" id="publishSwitch" value="1" checked>
                    <label class="form-check-label fw-bold" for="publishSwitch">Langsung Terbitkan (Publish)</label>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm">Simpan Materi</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('styles')
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
<style>
    /* Sedikit penyesuaian UI Summernote agar cocok dengan Bootstrap 5 */
    .note-editor .note-toolbar { background-color: #f8f9fa; border-bottom: 1px solid #dee2e6; }
    .note-editor.note-frame { border: 1px solid #dee2e6; border-radius: 10px; overflow: hidden; }
</style>
@endsection

@section('scripts')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

<script>
    $(document).ready(function() {
        // Inisialisasi Summernote pada textarea
        $('#summernote').summernote({
            placeholder: 'Mulai ketik materi pelajaran di sini...',
            tabsize: 2,
            height: 400, // Tinggi default editor
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