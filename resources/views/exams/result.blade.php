@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - EXAM RESULTS                  */
    /* ======================================================== */

    body {
        background-color: #0b0f19;
        color: #f8fafc;
        min-height: 100vh;
        position: relative;
    }

    /* Ambient Background Glows */
    .ambient-glow {
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        z-index: 0;
        opacity: 0.4;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }
    .neon-red { color: #fb7185; text-shadow: 0 0 15px rgba(251, 113, 133, 0.4); }
    .neon-warning { color: #fbbf24; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
    .neon-blue { color: #38bdf8; }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
    }

    /* Top Accent Line for Card */
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #38bdf8);
        z-index: 1;
    }

    /* Score Circle */
    .score-circle {
        width: 160px; 
        height: 160px;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(10px);
        border: 6px solid transparent;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }
    
    .score-success {
        border-color: #10b981;
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.2);
    }
    
    .score-danger {
        border-color: #e11d48;
        box-shadow: 0 0 30px rgba(225, 29, 72, 0.3), inset 0 0 20px rgba(225, 29, 72, 0.2);
    }

    /* Buttons */
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
        color: white;
    }

    .btn-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        transition: all 0.2s ease;
    }
    .btn-glass:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        transform: translateY(-2px);
    }

    /* Alert */
    .alert-glass-success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
        backdrop-filter: blur(10px);
    }

    /* Glass Accordion Override */
    .glass-accordion .accordion-item {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.08);
        margin-bottom: 1rem;
        border-radius: 1rem !important;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .glass-accordion .accordion-button {
        background: rgba(15, 23, 42, 0.6);
        color: #f8fafc;
        border: none;
        box-shadow: none;
        padding: 1.25rem 1.5rem;
    }
    
    .glass-accordion .accordion-button:not(.collapsed) {
        background: rgba(56, 189, 248, 0.1);
        color: #38bdf8;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .glass-accordion .accordion-button::after {
        filter: invert(1); /* Makes the arrow white in dark mode */
        transition: all 0.3s ease;
    }
    
    .glass-accordion .accordion-button:not(.collapsed)::after {
        filter: invert(0.6) sepia(1) saturate(3) hue-rotate(180deg); /* Cyan tint for active */
    }

    .glass-accordion .accordion-body {
        background: rgba(20, 25, 40, 0.8);
        color: #cbd5e1;
        padding: 1.5rem;
    }

    /* Inner Glass Elements */
    .glass-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .badge-glass-success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #34d399;
    }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>

<div class="container py-5 text-center position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            <div class="glass-card">
                <div class="card-body p-4 p-md-5">

                    @if(session('success'))
                        <div class="alert alert-glass-success rounded-pill mb-4 fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center px-4 py-2">
                            <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                            {{ session('success') }}
                        </div>
                    @endif

                    <h2 class="fw-bold mb-2 text-white text-glow display-6">Hasil Evaluasi</h2>
                    <h5 class="text-slate fw-medium mb-5" style="letter-spacing: 0.5px;">{{ $exam->title }}</h5>

                    <div class="d-inline-flex justify-content-center align-items-center rounded-circle score-circle {{ $attempt->score >= 70 ? 'score-success' : 'score-danger' }} mb-5">
                        <h1 class="display-2 fw-bold mb-0 text-white text-glow">{{ $attempt->score }}</h1>
                    </div>

                    <div class="row text-center mb-5 g-4 justify-content-center">
                        <div class="col-5 col-md-4">
                            <div class="glass-box p-3 rounded-4">
                                <h3 class="fw-bold neon-green mb-1">{{ $attempt->total_correct }}</h3>
                                <span class="text-slate small text-uppercase fw-semibold" style="letter-spacing: 0.5px;">Jawaban Benar</span>
                            </div>
                        </div>
                        <div class="col-5 col-md-4">
                            <div class="glass-box p-3 rounded-4">
                                <h3 class="fw-bold neon-red mb-1">{{ $attempt->total_questions - $attempt->total_correct }}</h3>
                                <span class="text-slate small text-uppercase fw-semibold" style="letter-spacing: 0.5px;">Jawaban Salah</span>
                            </div>
                        </div>
                    </div>

                    @if($attempt->score >= 70)
                        <h4 class="fw-bold neon-green mb-2">Kerja Bagus! 🎉</h4>
                        <p class="text-slate mb-5">Pemahaman tata bahasa Anda sudah sangat baik. Pertahankan!</p>
                    @else
                        <h4 class="fw-bold neon-warning mb-2">Jangan Menyerah! 💪</h4>
                        <p class="text-slate mb-5">Masih ada ruang untuk perbaikan. Terus gunakan fitur <i class="text-white">Flashcard</i> setiap hari untuk memperkuat insting bahasa Anda.</p>
                    @endif

                    <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
                        <a href="{{ route('exams.index') }}" class="btn btn-glass rounded-pill px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                            <i class="bi bi-card-list"></i> Kembali ke Daftar Ujian
                        </a>
                        <a href="{{ route('home') }}" class="btn btn-neon-primary rounded-pill px-4 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                            <i class="bi bi-house-door"></i> Ke Dashboard
                        </a>
                    </div>

                    <hr class="my-5" style="border-color: rgba(255,255,255,0.1);">

                    <div class="d-flex align-items-center mb-4">
                        <i class="bi bi-lightbulb-fill text-warning fs-4 me-2"></i>
                        <h4 class="fw-bold text-white text-start mb-0">Kunci Jawaban & Pembahasan</h4>
                    </div>

                    <div class="accordion glass-accordion text-start" id="accordionExplanations">
                        @foreach($exam->questions as $index => $question)
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading{{ $question->id }}">
                                    <button class="accordion-button collapsed fw-bold fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $question->id }}" aria-expanded="false" aria-controls="collapse{{ $question->id }}">
                                        Soal {{ $index + 1 }}
                                    </button>
                                </h2>
                                <div id="collapse{{ $question->id }}" class="accordion-collapse collapse" aria-labelledby="heading{{ $question->id }}" data-bs-parent="#accordionExplanations">
                                    <div class="accordion-body">
                                        <p class="mb-4 fw-medium text-white lh-base">{{ $question->question_text }}</p>

                                        <div class="mb-4">
                                            <span class="badge badge-glass-success mb-3 px-3 py-2 fw-semibold text-uppercase" style="letter-spacing: 0.5px;">
                                                Jawaban Benar: {{ strtoupper($question->correct_answer) }}
                                            </span>
                                            <ul class="list-unstyled ms-2 mb-0 p-3 rounded-3" style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.1);">
                                                <li class="text-white"><strong class="neon-green me-2">{{ strtoupper($question->correct_answer) }}.</strong> {{ $question->options[$question->correct_answer] }}</li>
                                            </ul>
                                        </div>

                                        <div class="glass-box p-4 rounded-4 border-start border-4 border-info">
                                            <small class="neon-blue text-uppercase fw-bold d-flex align-items-center gap-2 mb-2" style="letter-spacing: 1px;">
                                                <i class="bi bi-chat-left-text"></i> Pembahasan:
                                            </small>
                                            <p class="mb-0 text-slate lh-lg">{{ $question->explanation ?? 'Tidak ada pembahasan untuk soal ini.' }}</p>
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