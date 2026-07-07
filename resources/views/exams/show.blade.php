@extends('layouts.app')

@section('content')
<div class="position-relative z-1">
    
    <div class="sticky-header shadow-sm">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8 mb-3 mb-md-0 text-center text-md-start">
                    <h4 class="fw-bold mb-1 text-theme-main tracking-tight">{{ $exam->title }}</h4>
                    <p class="text-theme-muted mb-0 small">Pastikan koneksi internet stabil sebelum mengirimkan jawaban.</p>
                </div>
                <div class="col-md-4 text-center text-md-end">
                    <div class="badge bg-minimal-timer border-minimal text-theme-main fw-bold px-4 py-2.5 fs-6 rounded-pill d-inline-flex align-items-center gap-2">
                        <i class="bi bi-stopwatch"></i> Sisa Waktu: {{ $exam->duration_minutes }} Menit
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
                        <div class="minimal-card mb-4">
                            <div class="card-body p-4 p-md-5">
                                
                                <div class="d-flex align-items-start mb-4 pb-3 border-bottom-minimal">
                                    <div class="rounded-3 d-flex align-items-center justify-content-center me-3 border-minimal bg-minimal-badge flex-shrink-0" style="width: 40px; height: 40px;">
                                        <span class="fs-6 fw-bold text-theme-main">{{ $index + 1 }}</span>
                                    </div>
                                    <h5 class="fw-bold lh-base text-theme-main mb-0 pt-1 tracking-tight" style="font-size: 1.15rem;">{{ $question->question_text }}</h5>
                                </div>

                                <div class="mt-4 gap-2 d-flex flex-column">
                                    @foreach($question->options as $key => $optionText)
                                        <div class="form-check custom-radio">
                                            <input class="form-check-input ms-1" type="radio" 
                                                   name="answers[{{ $question->id }}]" 
                                                   id="q{{ $question->id }}_opt{{ $key }}" 
                                                   value="{{ $key }}" required>
                                            <label class="form-check-label small" for="q{{ $question->id }}_opt{{ $key }}">
                                                <span class="option-letter">{{ strtoupper($key) }}.</span> {{ $optionText }}
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                                
                            </div>
                        </div>
                    @endforeach

                    <div class="minimal-card mt-5 p-4 p-md-5 text-center">
                        <i class="bi bi-shield-check display-5 text-primary d-block mb-3"></i>
                        <h5 class="text-theme-main fw-bold mb-1">Selesai Mengerjakan?</h5>
                        <p class="text-theme-muted small mb-4">Pastikan Anda telah meninjau kembali seluruh jawaban sebelum mengirimkan hasil ujian ini.</p>
                        
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="submit" class="btn btn-minimal btn-minimal-success px-5 py-2.5 fw-semibold d-inline-flex align-items-center justify-content-center gap-2" style="background: var(--accent-success);" onclick="return confirm('Apakah Anda yakin sudah selesai dan ingin mengumpulkan ujian ini?')">
                                <i class="bi bi-send-check fs-5"></i> Selesai & Kumpulkan Ujian
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST DESIGN SYSTEM - EXAM SHEET CORE               */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: #131822;
    --badge-bg: rgba(255, 255, 255, 0.03);
    --header-sticky-bg: rgba(15, 19, 26, 0.9);
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-timer-bg: rgba(244, 63, 94, 0.06);
    --accent-timer-border: rgba(244, 63, 94, 0.15);
    --accent-timer-txt: #fb7185;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --header-sticky-bg: rgba(248, 250, 252, 0.9);
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
    --accent-timer-bg: rgba(220, 38, 38, 0.04);
    --accent-timer-border: rgba(220, 38, 38, 0.1);
    --accent-timer-txt: #dc2626;
}

/* Base Structural Container Blocks */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
}

.bg-minimal-badge { background: var(--badge-bg); }
.border-minimal { border: 1px solid var(--card-border); }
.border-bottom-minimal { border-bottom: 1px solid var(--card-border) !important; }

/* Sticky Timer Header System */
.sticky-header {
    position: sticky;
    top: 55px; /* Sinkronisasi ketebalan layout navbar utama */
    z-index: 1020;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: var(--header-sticky-bg);
    border-bottom: 1px solid var(--card-border);
    padding: 1.25rem 0;
    margin-bottom: 2.5rem;
}

.bg-minimal-timer {
    background: var(--accent-timer-bg);
    border: 1px solid var(--accent-timer-border);
    color: var(--accent-timer-txt) !important;
}

/* ======================================================== */
/* FLAT SELECTION RADIO INTERACTION PATTERNS                */
/* ======================================================== */
.custom-radio {
    background: var(--box-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.5rem;
    padding: 0.85rem 1.25rem;
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: pointer;
    display: flex;
    align-items: center;
}

.custom-radio:hover {
    background: var(--card-border);
    padding-left: 1.5rem !important; /* Efek geser mikro yang menenangkan */
}

/* Standard Bootstrap Radio overrides mapping */
.form-check-input {
    background-color: var(--badge-bg);
    border: 1px solid var(--card-border);
    cursor: pointer;
    width: 1.25em;
    height: 1.25em;
    margin-top: 0;
    transition: all 0.15s ease-in-out;
}
.form-check-input:checked {
    background-color: var(--accent-primary);
    border-color: transparent;
    box-shadow: none;
}

/* Checked container status trigger */
.custom-radio:has(input:checked) {
    background: var(--card-bg);
    border-color: var(--accent-primary);
    padding-left: 1.5rem !important;
}

.form-check-label {
    cursor: pointer;
    width: 100%;
    color: var(--text-muted);
    padding-left: 0.5rem;
    transition: color 0.15s ease;
}
.custom-radio:has(input:checked) .form-check-label {
    color: var(--text-main);
    font-weight: 500;
}

.option-letter {
    color: var(--accent-primary);
    font-weight: 700;
    margin-right: 0.25rem;
    opacity: 0.8;
}
.custom-radio:has(input:checked) .option-letter {
    opacity: 1;
}

/* Custom Action Button Rules */
.btn-minimal {
    font-weight: 500;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-success { color: #ffffff !important; border: none; }
.btn-minimal-success:hover { filter: brightness(1.08); }
</style>
@endsection

@section('scripts')
<script>
    // Memastikan klik di seluruh baris container radio mengaktifkan input didalamnya
    document.addEventListener('DOMContentLoaded', function() {
        const radioContainers = document.querySelectorAll('.custom-radio');
        
        radioContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                    const input = this.querySelector('input[type="radio"]');
                    if(input) {
                        input.checked = true;
                        input.dispatchEvent(new Event('change', { bubbles: true })); 
                    }
                }
            });
        });
    });
</script>
@endsection