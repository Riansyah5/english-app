@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0">Kelola Kategori Materi 📚</h2>
            <p class="text-muted">Kelompokkan bab pelajaran agar rapi dan terstruktur.</p>
        </div>
        <a href="{{ route('admin.lesson-categories.create') }}" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4">
            + Tambah Kategori
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
                            <th>Deskripsi</th>
                            <th class="text-center">Jumlah Bab</th>
                            <th class="text-end pe-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($categories as $category)
                        <tr>
                            <td class="ps-4 fw-bold">
                                <i class="bi {{ $category->icon }} text-primary me-2 fs-5"></i> 
                                {{ $category->name }}
                            </td>
                            <td class="text-muted">{{ $category->description ?? '-' }}</td>
                            <td class="text-center">
                                <span class="badge bg-secondary rounded-pill px-3">{{ $category->lessons_count }} Bab</span>
                            </td>
                            <td class="text-end pe-4">
                                <a href="{{ route('admin.lesson-categories.edit', $category->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3 me-1">Edit</a>
                                <form action="{{ route('admin.lesson-categories.destroy', $category->id) }}" method="POST" class="d-inline">
                                    @csrf 
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('PERINGATAN! Menghapus kategori ini juga akan MENGHAPUS SEMUA BAB MATERI di dalamnya. Yakin?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-muted">
                                <i class="bi bi-journal-x display-4 d-block mb-3 text-light"></i>
                                Belum ada kategori materi yang dibuat.
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="mt-4">
        {{ $categories->links() }}
    </div>
</div>
@endsection