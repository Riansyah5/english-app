@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - FORM INPUTS                   */
    /* ======================================================== */

    body {
        background-color: #0b0f19;
        color: #f8fafc;
        min-height: 100vh;
        position: relative;
    }

    /* Ambient Background Glows */
    .ambient-glow {
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        z-index: 0;
        opacity: 0.4;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-red { color: #fb7185; }
    .neon-blue { color: #38bdf8; }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
    }

    /* Top Accent Line for Card */
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #4f46e5, #38bdf8);
        z-index: 1;
    }

    /* Glass Form Inputs */
    .form-control-glass, .form-select-glass {
        background: rgba(15, 23, 42, 0.4) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: #f8fafc !important;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
    }
    .form-control-glass:focus, .form-select-glass:focus {
        background: rgba(15, 23, 42, 0.8) !important;
        border-color: rgba(56, 189, 248, 0.5) !important;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.2) !important;
        color: #ffffff !important;
    }
    .form-control-glass::placeholder {
        color: #64748b !important;
        opacity: 0.8;
    }

    /* Select Dropdown Options */
    .form-select-glass option {
        background-color: #0f172a;
        color: #f8fafc;
    }

    /* Validation Errors */
    .is-invalid {
        border-color: rgba(244, 63, 94, 0.5) !important;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.1) !important;
    }
    .invalid-feedback {
        color: #fb7185;
        font-weight: 500;
        letter-spacing: 0.3px;
    }

    /* Buttons */
    .btn-glass-back {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        transition: all 0.3s ease;
    }
    .btn-glass-back:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        transform: translateX(-3px);
    }

    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
        color: white;
    }

    /* Labels & Tips */
    .form-label {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        font-size: 0.9rem;
        text-transform: uppercase;
    }

    .tip-box {
        background: rgba(56, 189, 248, 0.05);
        border: 1px solid rgba(56, 189, 248, 0.2);
        color: #94a3b8;
        border-radius: 0.75rem;
    }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>

<div class="container py-4 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.videos.index') }}" class="btn btn-glass-back rounded-circle me-3 shadow-sm" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h3 class="fw-bold mb-1 text-white text-glow" style="letter-spacing: -0.5px;">Tambah Video Baru 🎥</h3>
                    <p class="text-slate mb-0 fw-medium">Upload video pembelajaran beserta transkrip interaktifnya.</p>
                </div>
            </div>

            <div class="glass-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.videos.store') }}" method="POST">
                        @csrf

                        <div class="row g-4 mb-4">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Pilih Folder <span class="neon-red">*</span></label>
                                <select name="video_folder_id" class="form-select form-select-lg form-select-glass @error('video_folder_id') is-invalid @enderror" required>
                                    <option value="" disabled selected>Pilih kategori folder...</option>
                                    @foreach($folders as $folder)
                                        <option value="{{ $folder->id }}" {{ old('video_folder_id') == $folder->id ? 'selected' : '' }}>
                                            {{ $folder->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('video_folder_id')
                                    <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-bold">Tingkat Kesulitan <span class="neon-red">*</span></label>
                                <select name="difficulty" class="form-select form-select-lg form-select-glass @error('difficulty') is-invalid @enderror" required>
                                    <option value="" disabled selected>Pilih tingkat kesulitan...</option>
                                    <option value="beginner" {{ old('difficulty') == 'beginner' ? 'selected' : '' }}>Beginner (Dasar)</option>
                                    <option value="intermediate" {{ old('difficulty') == 'intermediate' ? 'selected' : '' }}>Intermediate (Menengah)</option>
                                    <option value="advanced" {{ old('difficulty') == 'advanced' ? 'selected' : '' }}>Advanced (Mahir)</option>
                                </select>
                                @error('difficulty')
                                    <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold">Judul Video <span class="neon-red">*</span></label>
                            <input type="text" name="title" class="form-control form-control-lg form-control-glass @error('title') is-invalid @enderror" value="{{ old('title') }}" placeholder="Misal: Percakapan di Kantin Sekolah" required>
                            @error('title')
                                <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-5">
                            <label class="form-label fw-bold">YouTube Video ID <span class="neon-red">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-right: none; color: #94a3b8;">youtube.com/watch?v=</span>
                                <input type="text" name="youtube_id" class="form-control form-control-lg form-control-glass @error('youtube_id') is-invalid @enderror" value="{{ old('youtube_id') }}" placeholder="Contoh: dQw4w9WgXcQ" required>
                            </div>
                            @error('youtube_id')
                                <div class="invalid-feedback mt-2 d-block"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <hr class="my-5" style="border-color: rgba(255, 255, 255, 0.1);">

                        <div class="mb-5">
                            <div class="d-flex align-items-center mb-2">
                                <i class="bi bi-card-text neon-blue fs-4 me-2"></i>
                                <label class="form-label fw-bold mb-0" style="color: #38bdf8;">Input Transkrip (Format Bulk) <span class="neon-red">*</span></label>
                            </div>
                            
                            <div class="tip-box p-3 mb-3 d-flex align-items-start gap-2">
                                <i class="bi bi-lightbulb-fill text-warning mt-1"></i>
                                <span class="fw-medium text-slate text-none" style="text-transform: none; letter-spacing: 0;">
                                    Gunakan format: <strong class="text-white">detik_mulai | detik_selesai | teks</strong>. Buat satu baris untuk setiap kalimat.
                                </span>
                            </div>

                            <textarea name="transcripts" class="form-control form-control-glass font-monospace @error('transcripts') is-invalid @enderror" rows="10" placeholder="0.5|2.1|Hello, how are you?&#10;2.5|5.0|I am fine, thank you." required>{{ old('transcripts') }}</textarea>
                            @error('transcripts')
                                <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-grid mt-5 pt-3">
                            <button type="submit" class="btn btn-neon-primary btn-lg fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2">
                                <i class="bi bi-cloud-arrow-up-fill fs-5"></i> Simpan Video & Transkrip
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection