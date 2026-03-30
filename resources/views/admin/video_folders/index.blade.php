@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0">Kelola Folder Video 📁</h2>
            <p class="text-muted">Kategorikan video Anda agar mudah ditemukan pelajar.</p>
        </div>
        <a href="{{ route('admin.video-folders.create') }}" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4">
            + Tambah Folder
        </a>
    </div>

    @if(session('success'))
        <div class="alert alert-success rounded-pill fw-semibold d-none d-md-block">{{ session('success') }}</div>
    @endif

    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Nama Folder</th>
                            <th>Deskripsi</th>
                            <th class="text-center">Jumlah Video</th>
                            <th class="text-end pe-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($folders as $folder)
                        <tr>
                            <td class="ps-4 fw-bold">
                                <i class="bi {{ $folder->icon }} text-primary me-2 fs-5"></i> 
                                {{ $folder->name }}
                            </td>
                            <td class="text-muted">{{ $folder->description ?? '-' }}</td>
                            <td class="text-center">
                                <span class="badge bg-secondary rounded-pill px-3">{{ $folder->videos_count }} Video</span>
                            </td>
                            <td class="text-end pe-4">
                                <form action="{{ route('admin.video-folders.destroy', $folder->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('PERINGATAN! Menghapus folder ini juga akan MENGHAPUS SEMUA VIDEO di dalamnya. Yakin ingin melanjutkan?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-muted">
                                <i class="bi bi-folder-x display-4 d-block mb-3 text-light"></i>
                                Belum ada folder yang dibuat.
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="mt-4">
        {{ $folders->links() }}
    </div>
</div>
@endsection