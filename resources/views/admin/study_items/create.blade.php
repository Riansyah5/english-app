@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            
            <div class="d-flex align-items-center mb-4">
                <a href="{{ route('admin.study-items.index') }}" class="btn btn-outline-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fw-bold">&larr;</i>
                </a>
                <div>
                    <h3 class="fw-bold mb-0">Tambah Materi Baru 📝</h3>
                    <p class="text-muted mb-0">Masukkan kosakata, frasa, atau aturan grammar baru.</p>
                </div>
            </div>

            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.study-items.store') }}" method="POST">
                        @csrf

                        <div class="row g-3">
                            <div class="col-md-8 mb-3">
                                <label for="content" class="form-label fw-semibold">Teks (Bahasa Inggris) <span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg @error('content') is-invalid @enderror" id="content" name="content" value="{{ old('content') }}" placeholder="Contoh: Make up your mind" required autofocus>
                                @error('content')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="type" class="form-label fw-semibold">Tipe Materi <span class="text-danger">*</span></label>
                                <select class="form-select form-select-lg @error('type') is-invalid @enderror" id="type" name="type" required>
                                    <option value="" disabled selected>Pilih tipe...</option>
                                    <option value="word" {{ old('type') == 'word' ? 'selected' : '' }}>Word (Kata Tunggal)</option>
                                    <option value="phrase" {{ old('type') == 'phrase' ? 'selected' : '' }}>Phrase (Frasa)</option>
                                    <option value="idiom" {{ old('type') == 'idiom' ? 'selected' : '' }}>Idiom</option>
                                    <option value="grammar_rule" {{ old('type') == 'grammar_rule' ? 'selected' : '' }}>Grammar Rule</option>
                                    <option value="speaking_prompt" {{ old('type') == 'speaking_prompt' ? 'selected' : '' }}>Speaking Prompt</option>
                                </select>
                                @error('type')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="translation" class="form-label fw-semibold">Terjemahan (Bahasa Indonesia) <span class="text-danger">*</span></label>
                            <input type="text" class="form-control @error('translation') is-invalid @enderror" id="translation" name="translation" value="{{ old('translation') }}" placeholder="Contoh: Buatlah keputusan / Putuskanlah" required>
                            @error('translation')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <hr class="my-4 text-muted">

                        <div class="mb-4">
                            <label for="example_sentence" class="form-label fw-semibold">Contoh Kalimat (Opsional)</label>
                            <textarea class="form-control @error('example_sentence') is-invalid @enderror" id="example_sentence" name="example_sentence" rows="3" placeholder="Contoh: You need to make up your mind before the deadline.">{{ old('example_sentence') }}</textarea>
                            <small class="text-muted mt-1 d-block">Sangat disarankan untuk diisi agar pengguna bisa memahami konteks penggunaannya.</small>
                            @error('example_sentence')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="notes" class="form-label fw-semibold">Catatan Tambahan (Opsional)</label>
                            <textarea class="form-control @error('notes') is-invalid @enderror" id="notes" name="notes" rows="2" placeholder="Contoh: Sangat umum digunakan dalam percakapan informal.">{{ old('notes') }}</textarea>
                            @error('notes')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex justify-content-end mt-5">
                            <a href="{{ route('admin.study-items.index') }}" class="btn btn-light fw-bold rounded-pill px-4 me-3">Batal</a>
                            <button type="submit" class="btn btn-primary fw-bold rounded-pill px-5 shadow-sm">
                                Simpan Materi
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection