@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            
            <!-- Header Navigation & Title -->
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.videos.index') }}" class="btn btn-minimal btn-minimal-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h4 class="fw-bold mb-1 text-theme-main tracking-tight">Edit Video 🎥</h4>
                    <p class="text-theme-muted mb-0 small">Perbarui informasi video pembelajaran dan transkripnya.</p>
                </div>
            </div>

            <!-- Main Form Card -->
            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.videos.update', $video->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <!-- Row Grid: Folder Selection & Difficulty -->
                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <label class="form-label-minimal">Pilih Folder <span class="text-danger">*</span></label>
                                <select name="video_folder_id" class="form-select form-control-minimal @error('video_folder_id') is-invalid-minimal @enderror" required>
                                    <option value="" disabled>Pilih kategori folder...</option>
                                    @foreach($folders as $folder)
                                        <option value="{{ $folder->id }}" {{ old('video_folder_id', $video->video_folder_id) == $folder->id ? 'selected' : '' }}>
                                            {{ $folder->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('video_folder_id')
                                    <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-6">
                                <label class="form-label-minimal">Tingkat Kesulitan <span class="text-danger">*</span></label>
                                <select name="difficulty" class="form-select form-control-minimal @error('difficulty') is-invalid-minimal @enderror" required>
                                    <option value="" disabled>Pilih tingkat kesulitan...</option>
                                    <option value="beginner" {{ old('difficulty', $video->difficulty) == 'beginner' ? 'selected' : '' }}>Beginner (Dasar)</option>
                                    <option value="intermediate" {{ old('difficulty', $video->difficulty) == 'intermediate' ? 'selected' : '' }}>Intermediate (Menengah)</option>
                                    <option value="advanced" {{ old('difficulty', $video->difficulty) == 'advanced' ? 'selected' : '' }}>Advanced (Mahir)</option>
                                </select>
                                @error('difficulty')
                                    <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <!-- Video Title Input -->
                        <div class="mb-4">
                            <label class="form-label-minimal">Judul Video <span class="text-danger">*</span></label>
                            <input type="text" name="title" class="form-control form-control-minimal @error('title') is-invalid-minimal @enderror" value="{{ old('title', $video->title) }}" placeholder="Misal: Percakapan di Kantin Sekolah" required>
                            @error('title')
                                <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- YouTube ID Input -->
                        <div class="mb-4">
                            <label class="form-label-minimal">YouTube Video ID <span class="text-danger">*</span></label>
                            <div class="input-group border-minimal rounded-2 overflow-hidden">
                                <span class="input-group-text small px-3 border-0 text-theme-muted" style="background: var(--box-bg); font-size: 0.85rem;">youtube.com/watch?v=</span>
                                <input type="text" name="youtube_id" class="form-control form-control-minimal border-0 @error('youtube_id') is-invalid-minimal @enderror" value="{{ old('youtube_id', $video->youtube_id) }}" placeholder="Contoh: dQw4w9WgXcQ" required style="border-radius: 0;">
                            </div>
                            @error('youtube_id')
                                <div class="invalid-feedback-minimal mt-1.5 d-block"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="border-top-minimal my-4"></div>

                        <!-- Transcript Bulk Input -->
                        <div class="mb-5">
                            <label class="form-label-minimal text-primary">Input Transkrip (Format Bulk) <span class="text-danger">*</span></label>
                            
                            <!-- Minimalist Notification Tip Box -->
                            <div class="minimal-box p-3 mb-3 d-flex align-items-start gap-2 rounded-2">
                                <i class="bi bi-lightbulb-fill text-warning mt-0.5"></i>
                                <span class="small text-theme-muted">
                                    Gunakan format: <strong class="text-theme-main">detik_mulai | detik_selesai | teks</strong>. Buat satu baris baru untuk setiap kalimat.
                                </span>
                            </div>

                            <textarea name="transcripts" class="form-control form-control-minimal font-monospace @error('transcripts') is-invalid-minimal @enderror" rows="12" placeholder="0.5|2.1|Hello, how are you?&#10;2.5|5.0|I am fine, thank you." required style="font-size: 0.85rem; line-height: 1.5;">{{ old('transcripts', $formattedTranscripts) }}</textarea>
                            @error('transcripts')
                                <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Action Submit Button -->
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="{{ route('admin.videos.index') }}" class="btn btn-minimal btn-minimal-secondary py-2.5 px-4">Batal</a>
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5 px-5">
                                <i class="bi bi-save-fill me-1.5"></i> Simpan Perubahan
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
/* Style sama persis seperti di create.blade.php Anda */
[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    --accent-primary: #2563eb;
    --accent-success: #059669;
    --accent-danger: #dc2626;
}

.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.minimal-box { background: var(--box-bg); border: 1px solid var(--card-border); }
.border-top-minimal { border-top: 1px solid var(--card-border); }
.border-minimal { border: 1px solid var(--card-border); }

.form-label-minimal {
    color: var(--text-main);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
    display: block;
}

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

.is-invalid-minimal { border-color: var(--accent-danger) !important; }
.invalid-feedback-minimal { color: var(--accent-danger); font-size: 0.825rem; font-weight: 500; }

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
.btn-minimal-primary:hover { filter: brightness(1.08); }
.btn-minimal-secondary {
    background: transparent;
    color: var(--text-main) !important;
    border: 1px solid var(--card-border);
}
.btn-minimal-secondary:hover { background: var(--input-bg); }
</style>
@endsection