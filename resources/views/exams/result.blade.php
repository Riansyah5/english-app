@extends('layouts.app')

@section('content')
<div class="container py-4 text-center position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">

                    <!-- Alert Toast State -->
                    @if(session('success'))
                        <div class="badge-minimal-success rounded-pill mb-4 fw-medium d-inline-flex align-items-center justify-content-center px-4 py-2 small">
                            <i class="bi bi-check-circle-fill me-2 fs-6"></i>
                            {{ session('success') }}
                        </div>
                    @endif

                    <!-- Header Titles -->
                    <h3 class="fw-bold mb-2 text-theme-main tracking-tight">Hasil Evaluasi</h3>
                    <h6 class="text-theme-muted fw-medium mb-5">{{ $exam->title }}</h6>

                    <!-- Score Geometric Circle Display -->
                    <div class="d-inline-flex justify-content-center align-items-center rounded-circle score-circle {{ $attempt->score >= 70 ? 'score-success' : 'score-danger' }} mb-5">
                        <h1 class="display-3 fw-bold mb-0 text-theme-main tracking-tight">{{ $attempt->score }}</h1>
                    </div>

                    <!-- Statistics Micro Boxes Grid -->
                    <div class="row text-center mb-5 g-3 justify-content-center">
                        <div class="col-6 col-sm-4">
                            <div class="minimal-box p-3 rounded-3">
                                <h4 class="fw-bold text-success mb-1">{{ $attempt->total_correct }}</h4>
                                <span class="text-theme-muted small text-uppercase tracking-wider" style="font-size: 0.65rem;">Jawaban Benar</span>
                            </div>
                        </div>
                        <div class="col-6 col-sm-4">
                            <div class="minimal-box p-3 rounded-3">
                                <h4 class="fw-bold text-danger mb-1">{{ $attempt->total_questions - $attempt->total_correct }}</h4>
                                <span class="text-theme-muted small text-uppercase tracking-wider" style="font-size: 0.65rem;">Jawaban Salah</span>
                            </div>
                        </div>
                    </div>

                    <!-- Motivational Response Messages -->
                    @if($attempt->score >= 70)
                        <h5 class="fw-bold text-success mb-2">Kerja Bagus! 🎉</h5>
                        <p class="text-theme-muted small mb-5 mx-auto" style="max-width: 480px;">Pemahaman tata bahasa Anda sudah sangat baik. Pertahankan progres belajarmu!</p>
                    @else
                        <h5 class="fw-bold text-warning mb-2">Jangan Menyerah! 💪</h5>
                        <p class="text-theme-muted small mb-5 mx-auto" style="max-width: 480px;">Masih ada ruang untuk perbaikan. Terus gunakan fitur <i>Flashcard</i> setiap hari untuk memperkuat insting bahasa Anda.</p>
                    @endif

                    <!-- Operational Navigation Footer Actions -->
                    <div class="d-flex flex-column flex-sm-row justify-content-center gap-2 mb-5">
                        <a href="{{ route('exams.index') }}" class="btn btn-minimal btn-minimal-secondary btn-sm px-4 py-2.5">
                            <i class="bi bi-card-list me-1"></i> Daftar Ujian
                        </a>
                        <a href="{{ route('home') }}" class="btn btn-minimal btn-minimal-primary btn-sm px-4 py-2.5">
                            <i class="bi bi-house me-1"></i> Dashboard
                        </a>
                    </div>

                    <!-- INTERACTIVE ACCORDION EXPLANATIONS KEY -->
                    <div class="border-top-minimal pt-5 text-start">
                        <div class="d-flex align-items-center mb-4">
                            <i class="bi bi-lightbulb-fill text-warning fs-5 me-2"></i>
                            <h5 class="fw-bold text-theme-main mb-0 tracking-tight">Kunci Jawaban & Pembahasan</h5>
                        </div>

                        <div class="accordion minimal-accordion" id="accordionExplanations">
                            @foreach($exam->questions as $index => $question)
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="heading{{ $question->id }}">
                                        <button class="accordion-button collapsed fw-semibold small" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $question->id }}" aria-expanded="false" aria-controls="collapse{{ $question->id }}">
                                            Soal {{ $index + 1 }}
                                        </button>
                                    </h2>
                                    <div id="collapse{{ $question->id }}" class="accordion-collapse collapse" aria-labelledby="heading{{ $question->id }}" data-bs-parent="#accordionExplanations">
                                        <div class="accordion-body p-4 bg-minimal-body">
                                            <p class="mb-4 fw-semibold text-theme-main small lh-base">{{ $question->question_text }}</p>

                                            <!-- Correct Option Section -->
                                            <div class="mb-4">
                                                <span class="badge badge-minimal-success mb-2 px-2.5 py-1.5 font-monospace" style="font-size: 0.7rem;">
                                                    JAWABAN BENAR: {{ strtoupper($question->correct_answer) }}
                                                </span>
                                                <div class="p-3 border-minimal bg-minimal-badge rounded-3 mt-1">
                                                    <span class="text-theme-main small"><strong class="text-success me-1.5">{{ strtoupper($question->correct_answer) }}.</strong> {{ $question->options[$question->correct_answer] }}</span>
                                                </div>
                                            </div>

                                            <!-- Explanation Block -->
                                            <div class="minimal-box p-3 rounded-3 border-accent-info">
                                                <span class="text-primary small text-uppercase fw-bold tracking-wider d-block mb-1.5" style="font-size: 0.65rem;">
                                                    <i class="bi bi-chat-left-text me-1"></i> Pembahasan:
                                                </span>
                                                <p class="mb-0 text-theme-muted small lh-lg">{{ $question->explanation ?? 'Tidak ada pembahasan untuk soal ini.' }}</p>
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
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - EXAM RESULTS SUBMODULE        */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: #131822;
    --badge-bg: rgba(255, 255, 255, 0.03);
    --bg-body-panel: #141922;
    
    --accent-primary: #3b82f6;
    --accent-info: #06b6d4;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --bg-body-panel: #f8fafc;
    
    --accent-primary: #2563eb;
    --accent-info: #0891b2;
    --accent-success: #059669;
    --accent-danger: #dc2626;
}

/* Base Structural Container Blocks */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.minimal-box {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }
.border-top-minimal { border-top: 1px solid var(--card-border); }
.border-accent-info { border-left: 3px solid var(--accent-info) !important; }

.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }

/* Score Circle Block Components */
.score-circle {
    width: 140px; 
    height: 140px;
    background: var(--box-bg);
    border: 4px solid transparent;
}
.score-success { border-color: var(--accent-success); }
.score-danger { border-color: var(--accent-danger); }

/* Elegant Custom Buttons Framework */
.btn-minimal {
    font-weight: 500;
    padding: 0.45rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary { background: var(--accent-primary); color: #ffffff !important; border: none; }
.btn-minimal-primary:hover { filter: brightness(1.08); }
.btn-minimal-secondary { background: transparent; color: var(--text-main) !important; border: 1px solid var(--card-border); }
.btn-minimal-secondary:hover { background: var(--card-border); }

/* ======================================================== */
/* FLAT SEGMENTED ACCORDION MECHANICS                       */
/* ======================================================== */
.minimal-accordion .accordion-item {
    background: transparent;
    border: 1px solid var(--card-border);
    margin-bottom: 0.5rem;
    border-radius: 0.5rem !important;
    overflow: hidden;
}

.minimal-accordion .accordion-button {
    background: var(--box-bg);
    color: var(--text-main);
    border: none;
    box-shadow: none;
    padding: 1rem 1.25rem;
}

.minimal-accordion .accordion-button:not(.collapsed) {
    background: var(--box-bg);
    color: var(--accent-primary);
    border-bottom: 1px solid var(--card-border);
}

.minimal-accordion .accordion-button::after {
    filter: var(--text-main) === '#ffffff' ? 'invert(1)' : 'none';
    opacity: 0.5;
    transform: scale(0.85);
    transition: transform 0.2s ease;
}

.minimal-accordion .accordion-body {
    background: var(--bg-body-panel);
    color: var(--text-muted);
}
</style>
@endsection