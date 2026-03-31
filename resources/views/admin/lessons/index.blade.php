@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0">Kelola Isi Materi 📝</h2>
            <p class="text-muted">Manajemen bab pelajaran yang akan dibaca oleh pengguna.</p>
        </div>
        <a href="{{ route('admin.lessons.create') }}" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4">
            + Tulis Materi Baru
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
                            <th class="ps-4">Kategori</th>
                            <th>Urutan</th>
                            <th>Judul Bab</th>
                            <th>Status</th>
                            <th class="text-end pe-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($lessons as $lesson)
                        <tr>
                            <td class="ps-4 text-muted">
                                {{ $lesson->category->name ?? 'Tanpa Kategori' }}
                            </td>
                            <td>
                                <span class="badge bg-secondary rounded-pill">Bab {{ $lesson->order_number }}</span>
                            </td>
                            <td class="fw-bold text-dark">
                                {{ $lesson->title }}
                            </td>
                            <td>
                                @if($lesson->is_published)
                                    <span class="badge bg-success">Terbit</span>
                                @else
                                    <span class="badge bg-warning text-dark">Draft</span>
                                @endif
                            </td>
                            <td class="text-end pe-4">
                                <a href="{{ route('admin.lessons.edit', $lesson->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3 me-1">Edit</a>
                                
                                <form action="{{ route('admin.lessons.destroy', $lesson->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Yakin ingin menghapus bab materi ini secara permanen?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="text-center py-5 text-muted">
                                <i class="bi bi-file-earmark-text display-4 d-block mb-3 text-light"></i>
                                Belum ada materi yang ditulis.
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="mt-4">
        {{ $lessons->links() }}
    </div>
</div>
@endsection