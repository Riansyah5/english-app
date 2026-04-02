@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - EXAM MODULE                   */
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
        opacity: 0.3;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }

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
        height: 3px;
        background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
        z-index: 1;
    }

    /* Badges */
    .badge-glass-timer {
        background: rgba(244, 63, 94, 0.15);
        border: 1px solid rgba(244, 63, 94, 0.4);
        color: #fb7185;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 20px rgba(244, 63, 94, 0.2);
    }

    /* Custom Radio Buttons */
    .custom-radio {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
        padding: 1rem 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .custom-radio:hover {
        background: rgba(56, 189, 248, 0.05);
        border-color: rgba(56, 189, 248, 0.2);
        transform: translateX(5px);
    }

    .form-check-input {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        width: 1.5em;
        height: 1.5em;
        margin-top: 0;
        transition: all 0.2s;
    }

    .form-check-input:checked {
        background-color: #38bdf8;
        border-color: #38bdf8;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
    }

    /* Style container when radio is checked */
    .custom-radio:has(input:checked) {
        background: rgba(56, 189, 248, 0.1);
        border-color: rgba(56, 189, 248, 0.4);
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.1);
        transform: translateX(5px);
    }

    .form-check-label {
        cursor: pointer;
        width: 100%;
        color: #e2e8f0;
        padding-left: 0.75rem;
        transition: color 0.2s;
    }

    .custom-radio:has(input:checked) .form-check-label {
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .option-letter {
        color: #38bdf8;
        font-weight: 800;
        margin-right: 0.5rem;
        opacity: 0.8;
    }

    .custom-radio:has(input:checked) .option-letter {
        opacity: 1;
        text-shadow: 0 0 15px rgba(56, 189, 248, 0.6);
    }

    /* Buttons */
    .btn-neon-success {
        background: linear-gradient(135deg, #059669, #10b981);
        border: none;
        color: white;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        transition: all 0.3s ease;
        letter-spacing: 1px;
    }
    .btn-neon-success:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.6);
        color: white;
    }

    .sticky-header {
        position: sticky;
        top: 20px;
        z-index: 1020;
        backdrop-filter: blur(12px);
        background: rgba(11, 15, 25, 0.8);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1.5rem 0;
        margin-bottom: 2rem;
        margin-top: -1.5rem;
    }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>

<div class="position-relative z-1">
    
    <div class="sticky-header shadow-sm">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8 mb-3 mb-md-0">
                    <h2 class="fw-bold mb-1 text-white text-glow display-6" style="letter-spacing: -1px;">{{ $exam->title }}</h2>
                    <p class="text-slate mb-0 fw-medium">Pastikan koneksi internet stabil sebelum mengirimkan jawaban.</p>
                </div>
                <div class="col-md-4 text-md-end">
                    <div class="badge badge-glass-timer px-4 py-3 fs-5 rounded-pill d-inline-flex align-items-center gap-2">
                        <i class="bi bi-stopwatch"></i> Waktu: {{ $exam->duration_minutes }} Menit
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container pb-5">
        <form action="{{ route('exams.submit', $exam->id) }}" method="POST">
            @csrf
            <div class="row justify-content-center">
                <div class="col-lg-9 col-xl-8">
                    
                    @foreach($exam->questions as $index => $question)
                        <div class="glass-card mb-5">
                            <div class="card-body p-4 p-md-5">
                                
                                <div class="d-flex align-items-start mb-4 pb-3 border-bottom" style="border-color: rgba(255,255,255,0.1) !important;">
                                    <div class="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm flex-shrink-0" style="width: 45px; height: 45px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">
                                        <span class="fs-5 fw-bold text-white">{{ $index + 1 }}</span>
                                    </div>
                                    <h4 class="fw-bold lh-base text-white text-glow mb-0 pt-1" style="letter-spacing: 0.5px;">{{ $question->question_text }}</h4>
                                </div>

                                <div class="ms-md-2 mt-4">
                                    @foreach($question->options as $key => $optionText)
                                        <div class="form-check custom-radio mb-3">
                                            <input class="form-check-input ms-2" type="radio" 
                                                   name="answers[{{ $question->id }}]" 
                                                   id="q{{ $question->id }}_opt{{ $key }}" 
                                                   value="{{ $key }}" required>
                                            <label class="form-check-label fs-5" for="q{{ $question->id }}_opt{{ $key }}">
                                                <span class="option-letter">{{ strtoupper($key) }}.</span> {{ $optionText }}
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                                
                            </div>
                        </div>
                    @endforeach

                    <div class="glass-card mt-5 p-4 p-md-5 text-center">
                        <i class="bi bi-shield-check display-4 neon-blue d-block mb-3"></i>
                        <h4 class="text-white fw-bold mb-2 text-glow">Selesai Mengerjakan?</h4>
                        <p class="text-slate mb-4">Pastikan Anda telah meninjau kembali seluruh jawaban sebelum mengirimkan hasil ujian ini.</p>
                        
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="submit" class="btn btn-neon-success btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2" onclick="return confirm('Apakah Anda yakin sudah selesai dan ingin mengumpulkan ujian ini?')">
                                <i class="bi bi-send-check fs-5"></i> Selesai & Kumpulkan
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</div>

@section('scripts')
<script>
    // Script to allow clicking the whole custom radio box to select the input
    document.addEventListener('DOMContentLoaded', function() {
        const radioContainers = document.querySelectorAll('.custom-radio');
        
        radioContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                // Prevent double triggering if the input itself or label is clicked
                if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                    const input = this.querySelector('input[type="radio"]');
                    if(input) {
                        input.checked = true;
                        // Dispatch change event to trigger CSS :has selector updates immediately
                        input.dispatchEvent(new Event('change')); 
                    }
                }
            });
        });
    });
</script>
@endsection
@endsection