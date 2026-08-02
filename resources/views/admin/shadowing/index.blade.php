@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0">Kelola Shadowing 🗣️</h2>
            <p class="text-muted">Modul latihan pelafalan dan percakapan AI.</p>
        </div>
        <a href="{{ route('admin.shadowing.create') }}" class="btn btn-primary fw-bold rounded-pill px-4 shadow-sm">+ Buat Topik Baru</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success rounded-pill fw-semibold">{{ session('success') }}</div>
    @endif

    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-0 table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-4">Topik</th>
                        <th>Level</th>
                        <th>Jumlah Dialog</th>
                        <th class="text-end pe-4">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($topics as $topic)
                    <tr>
                        <td class="ps-4 fw-bold text-dark">{{ $topic->title }}</td>
                        <td>
                            <span class="badge bg-{{ $topic->level == 'Beginner' ? 'success' : ($topic->level == 'Intermediate' ? 'warning text-dark' : 'danger') }} rounded-pill">
                                {{ $topic->level }}
                            </span>
                        </td>
                        <td><span class="badge bg-secondary rounded-pill">{{ $topic->lines_count }} Baris</span></td>
                        <td class="text-end pe-4">
                            <a href="{{ route('admin.shadowing.show', $topic->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3 me-1">Susun Naskah</a>
                            <form action="{{ route('admin.shadowing.destroy', $topic->id) }}" method="POST" class="d-inline">
                                @csrf @method('DELETE')
                                <button class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Hapus topik dan semua dialognya?')">Hapus</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection