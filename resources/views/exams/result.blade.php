@extends('layouts.app')

@section('content')
<div class="container py-5 text-center">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow border-0 rounded-4">
        <div class="card-body p-5">

          @if(session('success'))
          <div class="alert alert-success rounded-pill mb-4 border-0 fw-semibold">
            {{ session('success') }}
          </div>
          @endif

          <h2 class="fw-bold mb-2">Hasil Evaluasi</h2>
          <h5 class="text-muted mb-5">{{ $exam->title }}</h5>

          <div class="d-inline-flex justify-content-center align-items-center rounded-circle border border-5 {{ $attempt->score >= 70 ? 'border-success text-success' : 'border-danger text-danger' }} mb-4" style="width: 150px; height: 150px;">
            <h1 class="display-3 fw-bold mb-0">{{ $attempt->score }}</h1>
          </div>

          <div class="row text-center mb-4">
            <div class="col-6">
              <h4 class="fw-bold text-success">{{ $attempt->total_correct }}</h4>
              <span class="text-muted small text-uppercase">Jawaban Benar</span>
            </div>
            <div class="col-6">
              <h4 class="fw-bold text-danger">{{ $attempt->total_questions - $attempt->total_correct }}</h4>
              <span class="text-muted small text-uppercase">Jawaban Salah</span>
            </div>
          </div>

          @if($attempt->score >= 70)
          <h4 class="fw-bold text-success">Kerja Bagus! 🎉</h4>
          <p class="text-muted">Pemahaman tata bahasa Anda sudah sangat baik. Pertahankan!</p>
          @else
          <h4 class="fw-bold text-warning">Jangan Menyerah! 💪</h4>
          <p class="text-muted">Masih ada ruang untuk perbaikan. Terus gunakan fitur <i>Flashcard</i> setiap hari untuk memperkuat insting bahasa Anda.</p>
          @endif

          <hr class="my-4">

          <a href="{{ route('exams.index') }}" class="btn btn-primary rounded-pill px-4 fw-semibold me-2">
            Kembali ke Daftar Ujian
          </a>
          <a href="{{ route('home') }}" class="btn btn-outline-secondary rounded-pill px-4 fw-semibold">
            Ke Dashboard
          </a>
          <hr class="my-5">

          <h4 class="fw-bold text-start mb-4">Kunci Jawaban & Pembahasan</h4>

          <div class="accordion text-start" id="accordionExplanations">
            @foreach($exam->questions as $index => $question)
            <div class="accordion-item border-0 shadow-sm mb-3 rounded-4 overflow-hidden">
              <h2 class="accordion-header" id="heading{{ $question->id }}">
                <button class="accordion-button collapsed fw-semibold bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $question->id }}" aria-expanded="false" aria-controls="collapse{{ $question->id }}">
                  Soal {{ $index + 1 }}
                </button>
              </h2>
              <div id="collapse{{ $question->id }}" class="accordion-collapse collapse" aria-labelledby="heading{{ $question->id }}" data-bs-parent="#accordionExplanations">
                <div class="accordion-body">
                  <p class="mb-3 fw-medium">{{ $question->question_text }}</p>

                  <div class="mb-3">
                    <span class="badge bg-success mb-2">Jawaban Benar: {{ strtoupper($question->correct_answer) }}</span>
                    <ul class="list-unstyled ms-2 mb-0">
                      <li><strong>{{ strtoupper($question->correct_answer) }}.</strong> {{ $question->options[$question->correct_answer] }}</li>
                    </ul>
                  </div>

                  <div class="bg-light p-3 rounded-3 border-start border-4 border-info">
                    <small class="text-muted text-uppercase fw-bold d-block mb-1">Pembahasan:</small>
                    <p class="mb-0">{{ $question->explanation ?? 'Tidak ada pembahasan untuk soal ini.' }}</p>
                  </div>
                </div>
              </div>
            </div>
            @endforeach
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
