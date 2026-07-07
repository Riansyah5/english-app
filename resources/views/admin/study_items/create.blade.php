@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.study-items.index') }}" class="btn btn-minimal btn-minimal-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h4 class="fw-bold mb-1 text-theme-main tracking-tight">Tambah Materi Baru 📝</h4>
                    <p class="text-theme-muted mb-0 small">Masukkan kosakata, frasa, atau aturan grammar baru.</p>
                </div>
            </div>

            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.study-items.store') }}" method="POST">
                        @csrf

                        <div class="row g-4 mb-4">
                            <div class="col-md-8">
                                <label for="content" class="form-label-minimal">Teks (Bahasa Inggris) <span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-minimal @error('content') is-invalid-minimal @enderror" id="content" name="content" value="{{ old('content') }}" placeholder="Contoh: Make up your mind" required autofocus>
                                @error('content')
                                    <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-4">
                                <label for="type" class="form-label-minimal">Tipe Materi <span class="text-danger">*</span></label>
                                <select class="form-select form-control-minimal @error('type') is-invalid-minimal @enderror" id="type" name="type" required>
                                    <option value="" disabled selected>Pilih tipe...</option>
                                    <option value="word" {{ old('type') == 'word' ? 'selected' : '' }}>Word (Kata Tunggal)</option>
                                    <option value="phrase" {{ old('type') == 'phrase' ? 'selected' : '' }}>Phrase (Frasa)</option>
                                    <option value="idiom" {{ old('type') == 'idiom' ? 'selected' : '' }}>Idiom</option>
                                    <option value="grammar_rule" {{ old('type') == 'grammar_rule' ? 'selected' : '' }}>Grammar Rule</option>
                                    <option value="speaking_prompt" {{ old('type') == 'speaking_prompt' ? 'selected' : '' }}>Speaking Prompt</option>
                                </select>
                                @error('type')
                                    <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="translation" class="form-label-minimal">Terjemahan (Bahasa Indonesia) <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-minimal @error('translation') is-invalid-minimal @enderror" id="translation" name="translation" value="{{ old('translation') }}" placeholder="Contoh: Buatlah keputusan / Putuskanlah" required>
                            @error('translation')
                                <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="border-top-minimal my-4"></div>

                        <div class="mb-4">
                            <label for="example_sentence" class="form-label-minimal">Contoh Kalimat <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea class="form-control form-control-minimal @error('example_sentence') is-invalid-minimal @enderror" id="example_sentence" name="example_sentence" rows="3" placeholder="Contoh: You need to make up your mind before the deadline.">{{ old('example_sentence') }}</textarea>
                            
                            <div class="minimal-box p-2.5 mt-2.5 d-flex align-items-start gap-2 rounded-2">
                                <i class="bi bi-info-circle text-primary mt-0.5" style="font-size: 0.85rem;"></i>
                                <span class="text-theme-muted" style="font-size: 0.8rem;">Sangat disarankan untuk diisi agar pengguna bisa memahami konteks penggunaannya.</span>
                            </div>
                            @error('example_sentence')
                                <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="notes" class="form-label-minimal">Catatan Tambahan <span class="text-theme-muted fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea class="form-control form-control-minimal @error('notes') is-invalid-minimal @enderror" id="notes" name="notes" rows="2" placeholder="Contoh: Sangat umum digunakan dalam percakapan informal.">{{ old('notes') }}</textarea>
                            @error('notes')
                                <div class="invalid-feedback-minimal mt-1.5"><i class="bi bi-exclamation-circle me-1"></i>{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex justify-content-end align-items-center mt-5 gap-2">
                            <a href="{{ route('admin.study-items.index') }}" class="btn btn-minimal btn-minimal-secondary btn-sm px-4 py-2 text-decoration-none">Batal</a>
                            <button type="submit" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2">
                                <i class="bi bi-save me-1.5"></i> Simpan Materi
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
/* MINIMALIST DESIGN SYSTEM - ADMIN BANK MATERI INPUT       */
/* ======================================================== */

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
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }

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

/* Validation System Mapping Hook */
.is-invalid-minimal {
    border-color: var(--accent-danger) !important;
}
.invalid-feedback-minimal {
    color: var(--accent-danger);
    font-size: 0.825rem;
    font-weight: 500;
}

/* Reusable Custom Button Layouts */
.btn-minimal {
    font-weight: 500;
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
</style>
@endsection