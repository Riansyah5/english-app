@extends('layouts.app')

@section('content')
<div class="container py-4 mb-5">
    
    <a href="{{ route('admin.shadowing.index') }}" class="text-decoration-none mb-3 d-inline-block text-muted">&larr; Kembali ke Daftar Topik</a>
    
    <div class="d-flex align-items-center mb-4">
        <h2 class="fw-bold mb-0 me-3">{{ $shadowing->title }}</h2>
        <span class="badge bg-primary rounded-pill">{{ $shadowing->level }}</span>
    </div>

    <!-- AREA PREVIEW NASKAH -->
    <div class="card shadow-sm border-0 rounded-4 mb-4 bg-light">
        <div class="card-header bg-white border-0 pt-4 pb-2">
            <h5 class="fw-bold mb-0">Preview Naskah ({{ $shadowing->lines->count() }} Baris)</h5>
        </div>
        <div class="card-body p-4">
            @if($shadowing->lines->isEmpty())
                <div class="text-center text-muted py-4">Naskah masih kosong. Mulai tambahkan dialog di bawah!</div>
            @else
                <div class="d-flex flex-column gap-3">
                    @foreach($shadowing->lines as $line)
                        <div class="bg-white p-3 rounded-4 shadow-sm border-start border-4 {{ $line->voice_gender == 'male' ? 'border-primary' : 'border-danger' }} d-flex justify-content-between align-items-center">
                            <div>
                                <div class="badge {{ $line->voice_gender == 'male' ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger' }} mb-2">
                                    {{ $line->character_name }} ({{ ucfirst($line->voice_gender) }})
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ $line->text_en }}</h5>
                                <p class="text-muted mb-0 small">{{ $line->text_id }}</p>
                            </div>
                            <!-- Tombol Hapus Baris -->
                            <form action="{{ route('admin.shadowing.lines.destroy', $line->id) }}" method="POST">
                                @csrf @method('DELETE')
                                <button class="btn btn-sm btn-light text-danger rounded-circle" onclick="return confirm('Hapus dialog ini?')" title="Hapus baris ini">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </form>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    <!-- FORM TAMBAH BARIS DIALOG (Sticky / Tetap di Bawah) -->
    <div class="card shadow border-0 rounded-4 border-top border-4 border-success">
        <div class="card-body p-4">
            <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-success me-2"></i>Tambah Baris Selanjutnya</h5>
            <form action="{{ route('admin.shadowing.lines.store', $shadowing->id) }}" method="POST">
                @csrf
                <div class="row g-3 align-items-end">
                    <div class="col-md-2">
                        <label class="form-label small fw-bold">Nama Karakter</label>
                        <input type="text" name="character_name" class="form-control" placeholder="Misal: John" required>
                    </div>
                    <div class="col-md-2">
                        <label class="form-label small fw-bold">Jenis Suara (AI)</label>
                        <select name="voice_gender" class="form-select" required>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label small fw-bold">Kalimat (Inggris) 🇺🇸</label>
                        <textarea name="text_en" class="form-control" rows="2" placeholder="How are you?" required></textarea>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label small fw-bold">Terjemahan (Indonesia) 🇮🇩</label>
                        <textarea name="text_id" class="form-control" rows="2" placeholder="Apa kabar?" required></textarea>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-success w-100 fw-bold rounded-pill h-100" style="min-height: 58px;">Tambah ↵</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</div>
@endsection