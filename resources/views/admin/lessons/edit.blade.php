@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex align-items-center mb-4">
        <a href="{{ route('admin.lessons.index') }}" class="btn btn-outline-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            <i class="fw-bold">&larr;</i>
        </a>
        <h3 class="fw-bold mb-0">Edit Materi 📝</h3>
    </div>

    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-4 p-md-5">
            <form action="{{ route('admin.lessons.update', $lesson->id) }}" method="POST">
                @csrf
                @method('PUT')
                
                <div class="row g-3 mb-3">
                    <div class="col-md-4">
                        <label class="form-label fw-bold">Kategori Materi</label>
                        <select name="lesson_category_id" class="form-select" required>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ $lesson->lesson_category_id == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Judul Bab</label>
                        <input type="text" name="title" class="form-control" value="{{ $lesson->title }}" required>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label fw-bold">Urutan</label>
                        <input type="number" name="order_number" class="form-control" value="{{ $lesson->order_number }}" required>
                    </div>
                </div>

                <div class="mb-4 bg-light p-3 rounded border">
                    <label class="form-label fw-bold text-danger"><i class="bi bi-youtube"></i> Video Pembahasan (Opsional)</label>
                    <input type="text" name="youtube_url" class="form-control" value="{{ $lesson->youtube_video_id ? 'https://www.youtube.com/watch?v=' . $lesson->youtube_video_id : '' }}" placeholder="Tempel URL YouTube di sini (Misal: https://www.youtube.com/watch?v=...)">
                    <small class="text-muted mt-1 d-block">Video ini akan ditampilkan di bagian atas materi bacaan. Kosongkan jika materi ini hanya berupa teks.</small>
                </div>

                <div class="mb-4 mt-4">
                    <label class="form-label fw-bold text-primary fs-5">Isi Materi</label>
                    <textarea name="content" id="summernote" required>{{ $lesson->content }}</textarea>
                </div>

                <div class="form-check form-switch mb-4">
                    <input class="form-check-input" type="checkbox" name="is_published" id="publishSwitch" value="1" {{ $lesson->is_published ? 'checked' : '' }}>
                    <label class="form-check-label fw-bold" for="publishSwitch">Terbitkan Materi Ini</label>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm">Update Materi</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('styles')
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
<style>
    .note-editor .note-toolbar { background-color: #f8f9fa; border-bottom: 1px solid #dee2e6; }
    .note-editor.note-frame { border: 1px solid #dee2e6; border-radius: 10px; overflow: hidden; }
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