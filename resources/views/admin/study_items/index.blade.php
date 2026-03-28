@extends('layouts.app')

@section('content')
<div class="container py-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="fw-bold mb-0">Kelola Bank Materi 📚</h2>
      <p class="text-muted">Manajemen kosakata, frasa, dan tata bahasa.</p>
    </div>
    <a href="{{ route('admin.study-items.create') }}" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4">
      + Tambah Materi Baru
    </a>
  </div>

  @if(session('success'))
  <div class="alert alert-success rounded-pill fw-semibold">{{ session('success') }}</div>
  @endif

  <div class="card shadow-sm border-0 rounded-4">
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-4">Teks (Inggris)</th>
              <th>Tipe</th>
              <th>Terjemahan (ID)</th>
              <th class="text-end pe-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            @forelse($items as $item)
            <tr>
              <td class="ps-4 fw-bold">{{ $item->content }}</td>
              <td><span class="badge bg-secondary text-uppercase">{{ $item->type }}</span></td>
              <td>{{ $item->translation }}</td>
              <td class="text-end pe-4">
                <a href="{{ route('admin.study-items.edit', $item->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3 me-1">Edit</a>

                <form action="{{ route('admin.study-items.destroy', $item->id) }}" method="POST" class="d-inline">
                  @csrf @method('DELETE')
                  <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Hapus materi ini secara permanen?')">Hapus</button>
                </form>
              </td>
            </tr>
            @empty
            <tr>
              <td colspan="4" class="text-center py-4 text-muted">Belum ada materi di dalam database.</td>
            </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="mt-4">
    {{ $items->links() }}
  </div>
</div>
@endsection
