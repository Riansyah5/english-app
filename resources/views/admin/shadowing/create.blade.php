@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <h3 class="fw-bold mb-4">Buat Topik Percakapan 🎙️</h3>
                    <form action="{{ route('admin.shadowing.store') }}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label fw-bold">Judul Topik</label>
                            <input type="text" name="title" class="form-control" placeholder="Misal: Memesan Kopi di Cafe" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Level Kesulitan</label>
                            <select name="level" class="form-select" required>
                                <option value="Beginner">Beginner (Pemula)</option>
                                <option value="Intermediate">Intermediate (Menengah)</option>
                                <option value="Advanced">Advanced (Mahir)</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-bold">Konteks / Deskripsi Singkat</label>
                            <textarea name="description" class="form-control" rows="2" placeholder="Praktik simulasi memesan kopi..."></textarea>
                        </div>
                        <div class="form-check form-switch mb-4">
                            <input class="form-check-input" type="checkbox" name="is_published" value="1" checked>
                            <label class="form-check-label fw-bold">Langsung Terbitkan</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 fw-bold rounded-pill">Simpan & Mulai Tulis Naskah &rarr;</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection