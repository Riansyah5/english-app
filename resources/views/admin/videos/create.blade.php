@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <h3 class="fw-bold mb-4">Tambah Video Baru 🎥</h3>
            
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.videos.store') }}" method="POST">
                        @csrf
                        <div class="row g-3">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Pilih Folder</label>
                                <select name="video_folder_id" class="form-select" required>
                                    @foreach($folders as $folder)
                                        <option value="{{ $folder->id }}">{{ $folder->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Tingkat Kesulitan</label>
                                <select name="difficulty" class="form-select" required>
                                    <option value="beginner">Beginner (Dasar)</option>
                                    <option value="intermediate">Intermediate (Menengah)</option>
                                    <option value="advanced">Advanced (Mahir)</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Judul Video</label>
                            <input type="text" name="title" class="form-control" placeholder="Misal: Percakapan di Kantin Sekolah" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">YouTube Video ID</label>
                            <input type="text" name="youtube_id" class="form-control" placeholder="Contoh: dQw4w9WgXcQ (ID saja, bukan URL)" required>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold text-primary">Input Transkrip (Format Bulk)</label>
                            <textarea name="transcripts" class="form-control" rows="10" placeholder="Format: start|end|text&#10;Contoh:&#10;0.5|2.1|Hello, how are you?&#10;2.5|5.0|I am fine, thank you."></textarea>
                            <small class="text-muted mt-2 d-block bg-light p-2 rounded">
                                💡 Gunakan format: <strong>detik_mulai | detik_selesai | teks</strong> (Satu baris untuk satu kalimat).
                            </small>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm">Simpan Video & Transkrip</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection