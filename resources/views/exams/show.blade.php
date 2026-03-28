@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-4 align-items-center">
        <div class="col-md-8">
            <h3 class="fw-bold mb-0">{{ $exam->title }}</h3>
            <p class="text-muted mb-0">Pastikan koneksi internet stabil sebelum mengirimkan jawaban.</p>
        </div>
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
            <div class="badge bg-danger p-3 fs-5 rounded-pill shadow-sm">
                Waktu: {{ $exam->duration_minutes }} Menit
            </div>
        </div>
    </div>

    <form action="{{ route('exams.submit', $exam->id) }}" method="POST">
        @csrf
        <div class="row">
            <div class="col-lg-8 mx-auto">
                @foreach($exam->questions as $index => $question)
                    <div class="card shadow-sm border-0 rounded-4 mb-4">
                        <div class="card-body p-4 p-md-5">
                            <div class="d-flex mb-4">
                                <h5 class="fw-bold me-3">{{ $index + 1 }}.</h5>
                                <h5 class="fw-normal lh-base">{{ $question->question_text }}</h5>
                            </div>

                            <div class="ms-md-4">
                                @foreach($question->options as $key => $optionText)
                                    <div class="form-check mb-3 custom-radio">
                                        <input class="form-check-input fs-5" type="radio" 
                                               name="answers[{{ $question->id }}]" 
                                               id="q{{ $question->id }}_opt{{ $key }}" 
                                               value="{{ $key }}" required>
                                        <label class="form-check-label fs-5 ms-2" for="q{{ $question->id }}_opt{{ $key }}">
                                            <strong>{{ strtoupper($key) }}.</strong> {{ $optionText }}
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endforeach

                <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-5">
                    <button type="submit" class="btn btn-success btn-lg px-5 rounded-pill fw-bold shadow-sm" onclick="return confirm('Apakah Anda yakin sudah selesai dan ingin mengumpulkan ujian ini?')">
                        Selesai & Kumpulkan
                    </button>
                </div>

            </div>
        </div>
    </form>
</div>

@section('styles')
<style>
    /* Sedikit styling tambahan agar radio button lebih nyaman diklik di HP */
    .custom-radio .form-check-input { cursor: pointer; }
    .custom-radio .form-check-label { cursor: pointer; width: 100%; }
    .custom-radio:hover { background-color: #f8f9fa; border-radius: 8px; }
</style>
@endsection
@endsection