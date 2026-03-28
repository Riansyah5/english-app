@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <h3 class="fw-bold mb-4">Pengaturan Profil ⚙️</h3>

                    @if(session('success'))
                        <div class="alert alert-success rounded-pill mb-4 border-0 fw-semibold">
                            {{ session('success') }}
                        </div>
                    @endif

                    <form action="{{ route('profile.update') }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="mb-3">
                            <label for="name" class="form-label fw-semibold">Nama Lengkap</label>
                            <input type="text" class="form-control form-control-lg" id="name" name="name" value="{{ old('name', $user->name) }}" required>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label fw-semibold">Email (Tidak bisa diubah)</label>
                            <input type="email" class="form-control form-control-lg text-muted" id="email" value="{{ $user->email }}" disabled>
                        </div>

                        <div class="mb-4">
                            <label for="daily_goal" class="form-label fw-semibold">Target Belajar Harian (Flashcard)</label>
                            <div class="input-group input-group-lg">
                                <input type="number" class="form-control" id="daily_goal" name="daily_goal" value="{{ old('daily_goal', $user->daily_goal) }}" min="5" max="100" required>
                                <span class="input-group-text bg-light">Kartu / Hari</span>
                            </div>
                            <small class="text-muted mt-2 d-block">Direkomendasikan 15-30 kartu per hari untuk retensi memori yang optimal tanpa membuat otak kelelahan.</small>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection