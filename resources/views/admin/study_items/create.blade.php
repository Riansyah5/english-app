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

    /* Validation Errors (Neon Red) */
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

    .btn-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        transition: all 0.2s ease;
    }
    .btn-glass:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
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

    /* Labels */
    .form-label {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        font-size: 0.9rem;
        text-transform: uppercase;
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
                <a href="{{ route('admin.study-items.index') }}" class="btn btn-glass-back rounded-circle me-3 shadow-sm" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h3 class="fw-bold mb-1 text-white text-glow" style="letter-spacing: -0.5px;">Tambah Materi Baru 📝</h3>
                    <p class="text-slate mb-0 fw-medium">Masukkan kosakata, frasa, atau aturan grammar baru.</p>
                </div>
            </div>

            <div class="glass-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.study-items.store') }}" method="POST">
                        @csrf

                        <div class="row g-4">
                            <div class="col-md-8">
                                <label for="content" class="form-label fw-bold">Teks (Bahasa Inggris) <span class="neon-red">*</span></label>
                                <input type="text" class="form-control form-control-lg form-control-glass @error('content') is-invalid @enderror" id="content" name="content" value="{{ old('content') }}" placeholder="Contoh: Make up your mind" required autofocus>
                                @error('content')
                                    <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-4">
                                <label for="type" class="form-label fw-bold">Tipe Materi <span class="neon-red">*</span></label>
                                <select class="form-select form-select-lg form-select-glass @error('type') is-invalid @enderror" id="type" name="type" required>
                                    <option value="" disabled selected>Pilih tipe...</option>
                                    <option value="word" {{ old('type') == 'word' ? 'selected' : '' }}>Word (Kata Tunggal)</option>
                                    <option value="phrase" {{ old('type') == 'phrase' ? 'selected' : '' }}>Phrase (Frasa)</option>
                                    <option value="idiom" {{ old('type') == 'idiom' ? 'selected' : '' }}>Idiom</option>
                                    <option value="grammar_rule" {{ old('type') == 'grammar_rule' ? 'selected' : '' }}>Grammar Rule</option>
                                    <option value="speaking_prompt" {{ old('type') == 'speaking_prompt' ? 'selected' : '' }}>Speaking Prompt</option>
                                </select>
                                @error('type')
                                    <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mt-4">
                            <label for="translation" class="form-label fw-bold">Terjemahan (Bahasa Indonesia) <span class="neon-red">*</span></label>
                            <input type="text" class="form-control form-control-lg form-control-glass @error('translation') is-invalid @enderror" id="translation" name="translation" value="{{ old('translation') }}" placeholder="Contoh: Buatlah keputusan / Putuskanlah" required>
                            @error('translation')
                                <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <hr class="my-5" style="border-color: rgba(255, 255, 255, 0.1);">

                        <div class="mb-4">
                            <label for="example_sentence" class="form-label fw-bold">Contoh Kalimat <span class="text-slate fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea class="form-control form-control-glass @error('example_sentence') is-invalid @enderror" id="example_sentence" name="example_sentence" rows="3" placeholder="Contoh: You need to make up your mind before the deadline.">{{ old('example_sentence') }}</textarea>
                            <small class="text-slate mt-2 d-block fw-medium"><i class="bi bi-info-circle me-1"></i>Sangat disarankan untuk diisi agar pengguna bisa memahami konteks penggunaannya.</small>
                            @error('example_sentence')
                                <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="notes" class="form-label fw-bold">Catatan Tambahan <span class="text-slate fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea class="form-control form-control-glass @error('notes') is-invalid @enderror" id="notes" name="notes" rows="2" placeholder="Contoh: Sangat umum digunakan dalam percakapan informal.">{{ old('notes') }}</textarea>
                            @error('notes')
                                <div class="invalid-feedback mt-2"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex justify-content-end align-items-center mt-5 pt-3">
                            <a href="{{ route('admin.study-items.index') }}" class="btn btn-glass fw-bold rounded-pill px-4 py-2 me-3 text-decoration-none">Batal</a>
                            <button type="submit" class="btn btn-neon-primary fw-bold rounded-pill px-5 py-2 d-flex align-items-center gap-2">
                                <i class="bi bi-save"></i> Simpan Materi
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection