@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex align-items-center mb-4">
                <a href="{{ route('admin.lesson-categories.index') }}" class="btn btn-outline-secondary rounded-circle me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fw-bold">&larr;</i>
                </a>
                <div>
                    <h3 class="fw-bold mb-0">Tambah Kategori Materi 📖</h3>
                </div>
            </div>

            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.lesson-categories.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-3">
                            <label class="form-label fw-bold">Nama Kategori <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control form-control-lg" placeholder="Misal: Grammar Dasar" required autofocus>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Deskripsi Singkat</label>
                            <textarea name="description" class="form-control" rows="3" placeholder="Pelajaran tentang struktur kalimat bahasa Inggris..."></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold">Ikon Bootstrap</label>
                            <input type="text" name="icon" class="form-control" placeholder="Misal: bi-book" value="bi-book-half">
                        </div>

                        <div class="d-grid mt-4">
                            <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill shadow-sm">Simpan Kategori</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection