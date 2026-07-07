@extends('layouts.app')

@section('content')
<div id="readingContainer" class="theme-dark py-4 transition-theme position-relative z-1" style="min-height: 100vh;">

    <div class="container mb-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                
                <div class="d-flex justify-content-between align-items-center mb-4 pb-2">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 fw-medium" style="font-size: 0.9rem;">
                            <li class="breadcrumb-item"><a href="{{ route('lessons.user.index') }}" class="text-decoration-none accent-link">Daftar Materi</a></li>
                            <li class="breadcrumb-item active-breadcrumb" aria-current="page">{{ $lesson->category->name }}</li>
                        </ol>
                    </nav>

                    <div class="theme-switch-wrapper">
                      <div class="theme-switch-box">
                          <div class="active-indicator" id="indicator"></div>
                          
                          <button class="btn-theme" onclick="changeTheme(this, 'theme-light', 0)" title="Terang">
                              <i class="fas fa-sun"></i>
                          </button>
                          <button class="btn-theme" onclick="changeTheme(this, 'theme-sepia', 1)" title="Sepia">
                              <i class="fas fa-book-open"></i>
                          </button>
                          <button class="btn-theme active" onclick="changeTheme(this, 'theme-dark', 2)" title="Gelap">
                              <i class="fas fa-moon"></i>
                          </button>
                      </div>
                    </div>
                </div>

                <div class="mb-5 border-bottom-minimal pb-4">
                    <span class="badge badge-minimal-accent text-uppercase px-2.5 py-1.5 mb-3 font-monospace" style="font-size: 0.75rem;">Bab {{ $lesson->order_number }}</span>
                    <h2 class="fw-bold mb-3 text-theme-main tracking-tight line-height-tight" style="font-size: 2.25rem;">{{ $lesson->title }}</h2>
                    
                    @php
                        $wordCount = str_word_count(strip_tags($lesson->content));
                        $readTime = ceil($wordCount / 200);
                    @endphp
                    <div class="d-flex align-items-center text-theme-muted small fw-medium">
                        <i class="bi bi-hourglass-split me-1.5 accent-text"></i> Estimasi waktu baca: {{ $readTime }} menit
                    </div>
                </div>

                @if($lesson->youtube_video_id)
                    <div class="mb-5">
                        <div class="minimal-card p-1">
                            <div class="ratio ratio-16x9 rounded-3 overflow-hidden">
                                <iframe 
                                    src="https://www.youtube.com/embed/{{ $lesson->youtube_video_id }}?rel=0" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                        <div class="text-center mt-2.5 small text-theme-muted fw-medium">
                            <i class="bi bi-info-circle me-1 accent-text"></i> Tonton video di atas sebagai pengantar materi.
                        </div>
                    </div>
                @endif

                <article class="lesson-content minimal-panel p-4 p-md-5 mb-4">
                    {!! $lesson->content !!}
                </article>

                <div class="minimal-card p-4 mb-5">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-box-warning rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 38px; height: 38px;">
                            <i class="bi bi-pin-angle-fill fs-6"></i>
                        </div>
                        <h5 class="fw-bold mb-0 text-theme-main">Catatan Pribadiku</h5>
                    </div>
                    <textarea id="personalNote" class="form-control border-minimal note-textarea p-3 rounded-3" rows="4" placeholder="Ketik ringkasan atau poin penting dari bab ini di sini...">{{ $personalNote }}</textarea>
                    <div class="text-end mt-3">
                        <button id="btnSaveNote" class="btn btn-minimal btn-minimal-secondary btn-sm px-4 fw-semibold">
                            Simpan Catatan
                        </button>
                    </div>
                </div>

                <div class="mt-5 pt-2 text-center" id="completionArea">
                    @if($isCompleted)
                        <div class="badge-minimal-success d-inline-block px-4 py-2.5 rounded-pill fw-semibold mb-4 small border border-success border-opacity-10">
                            <i class="bi bi-check-circle-fill me-1.5"></i> Kamu sudah menyelesaikan bab ini!
                        </div>
                        @if($nextLesson)
                            <div class="mt-2">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-minimal btn-minimal-primary btn-lg px-5 py-2.5 w-100 w-md-auto">
                                    Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                                </a>
                            </div>
                        @endif
                    @else
                        <button id="btnMarkDone" class="btn btn-minimal btn-minimal-success btn-lg px-5 py-2.5 w-100 w-md-auto mb-4" style="background: var(--accent-success);">
                            <i class="bi bi-check-lg me-1.5"></i> Tandai Selesai Dibaca
                        </button>
                        
                        @if($nextLesson)
                            <div id="nextLessonDiv" class="mt-2 d-none transition-fade">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-minimal btn-minimal-primary btn-lg px-5 py-2.5 w-100 w-md-auto">
                                    Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                                </a>
                            </div>
                        @endif
                    @endif
                </div>

            </div>
        </div>
    </div>
</div>

<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('styles')
<style>
    /* ======================================================== */
    /* MINIMALIST ADAPTIVE LITERACY DESIGN SYSTEM               */
    /* ======================================================== */

    :root {
        --transition-speed: 0.35s;
    }

    /* 1. DARK MODE */
    .theme-dark {
        --bg-page: #0f131a;
        --card-bg: #1e2530;
        --card-border: rgba(255, 255, 255, 0.04);
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --accent-color: #3b82f6;
        --accent-glow: rgba(59, 130, 246, 0.15);
        --accent-success: #10b981;
        --indicator-bg: rgba(255, 255, 255, 0.04);
        --switch-bg: #141922;
        --note-input-bg: #131822;
    }

    /* 2. LIGHT MODE */
    .theme-light {
        --bg-page: #f8fafc;
        --card-bg: #ffffff;
        --card-border: rgba(0, 0, 0, 0.05);
        --text-main: #0f172a;
        --text-muted: #64748b;
        --accent-color: #2563eb;
        --accent-glow: rgba(37, 99, 235, 0.08);
        --accent-success: #059669;
        --indicator-bg: #ffffff;
        --switch-bg: #e2e8f0;
        --note-input-bg: #f8fafc;
    }

    /* 3. SEPIA MODE */
    .theme-sepia {
        --bg-page: #fbf0d9;
        --card-bg: #f4e7cd;
        --card-border: rgba(76, 64, 51, 0.06);
        --text-main: #433422;
        --text-muted: #7c6a52;
        --accent-color: #b45309;
        --accent-glow: rgba(180, 83, 9, 0.08);
        --accent-success: #15803d;
        --indicator-bg: #fbf0d9;
        --switch-bg: #eaddc1;
        --note-input-bg: #fdf6e7;
    }

    /* Base Core Blocks Container */
    #readingContainer {
        background-color: var(--bg-page);
        color: var(--text-main);
    }

    .transition-theme, .transition-theme * {
        transition: background-color var(--transition-speed) ease, 
                    border-color var(--transition-speed) ease, 
                    color var(--transition-speed) ease, 
                    box-shadow var(--transition-speed) ease;
    }

    .minimal-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 0.75rem;
    }

    .minimal-panel {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 0.75rem;
    }

    /* Utilities Mapping */
    .text-theme-main { color: var(--text-main) !important; }
    .text-theme-muted { color: var(--text-muted) !important; }
    .accent-text { color: var(--accent-color) !important; }
    .border-bottom-minimal { border-bottom: 1px solid var(--card-border) !important; }
    .border-minimal { border: 1px solid var(--card-border) !important; }
    .line-height-tight { line-height: 1.25; }

    /* Custom Badges */
    .badge-minimal-accent {
        background: var(--accent-glow);
        border: 1px solid var(--card-border);
        color: var(--accent-color);
    }
    .badge-minimal-success {
        background: rgba(16, 185, 129, 0.06);
        color: var(--accent-success);
    }

    .accent-link { color: var(--accent-color); font-weight: 500; }
    .accent-link:hover { opacity: 0.8; }
    .active-breadcrumb { color: var(--text-muted); }
    .breadcrumb-item + .breadcrumb-item::before { color: var(--text-muted); }

    /* ======================================================== */
    /* THEME SWITCHER CONTROL BAR                               */
    /* ======================================================== */
    .theme-switch-wrapper {
        position: relative;
        z-index: 10;
    }

    .theme-switch-box {
        position: relative;
        display: flex;
        padding: 3px;
        border-radius: 999px;
        background: var(--switch-bg);
        border: 1px solid var(--card-border);
    }

    .active-indicator {
        position: absolute;
        top: 3px; left: 3px;
        width: 34px; height: 34px; 
        background-color: var(--indicator-bg);
        border: 1px solid var(--card-border);
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        z-index: 1;
    }

    .btn-theme {
        position: relative;
        border: none;
        background: transparent;
        width: 34px; height: 34px;
        cursor: pointer;
        z-index: 2;
        color: var(--text-muted);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.95rem;
    }
    .btn-theme.active { color: var(--accent-color) !important; }

    /* ======================================================== */
    /* PREMIUM READABILITY ENGINE CORE                          */
    /* ======================================================== */
    .lesson-content {
        font-family: 'Georgia', 'Cambria', serif;
        font-size: 1.125rem;
        line-height: 1.85;
    }
    .lesson-content h1, .lesson-content h2, .lesson-content h3 {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        margin-top: 2.25rem;
        margin-bottom: 1.15rem;
        color: var(--text-main);
    }
    .lesson-content h4, .lesson-content h5 {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 600;
        color: var(--text-main);
    }
    .lesson-content p { margin-bottom: 1.35rem; }
    .lesson-content table { width: 100% !important; margin-bottom: 1.5rem; border-collapse: collapse; }
    .lesson-content table td, .lesson-content table th { border: 1px solid var(--card-border); padding: 0.75rem 1rem; font-size: 0.95rem; }
    .lesson-content th { background: rgba(0,0,0,0.02); font-family: 'Inter', sans-serif; font-weight: 600; }
    .theme-dark .lesson-content th { background: rgba(255,255,255,0.02); }
    .lesson-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0; }

    /* Personal Notepad Textarea Elements */
    .icon-box-warning { background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.15); color: #d97706; }
    .note-textarea { 
        color: var(--text-main); 
        resize: none; 
        font-family: 'Inter', sans-serif; 
        font-size: 0.9rem;
        background: var(--note-input-bg) !important;
    }
    .note-textarea:focus { outline: none; border-color: var(--text-muted); box-shadow: none; }
    .note-textarea::placeholder { color: var(--text-muted); opacity: 0.5; }

    /* Minimal Button Override Configurations */
    .btn-minimal {
        font-weight: 500;
        padding: 0.45rem 1.25rem;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        font-size: 0.9rem;
    }
    .btn-minimal-primary { background: var(--accent-color); color: #ffffff !important; border: none; }
    .btn-minimal-primary:hover { filter: brightness(1.08); }
    .btn-minimal-secondary { background: transparent; color: var(--text-main) !important; border: 1px solid var(--card-border); }
    .btn-minimal-secondary:hover { background: var(--card-border); }
    .btn-minimal-success { background: var(--accent-success); color: #ffffff !important; border: none; }

    .transition-fade { animation: fadeIn 0.4s ease forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
</style>
@endsection

@section('scripts')
<script>
    // 1. ADAPTIVE THREE-WAY THEME SWITCHER ENGINE LOGIC
    const readingContainer = document.getElementById('readingContainer');
    const indicator = document.getElementById('indicator');
    const themeButtons = document.querySelectorAll('.btn-theme');
    
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('lessonTheme') || 'theme-dark';
        readingContainer.className = `py-4 transition-theme position-relative z-1 ${savedTheme}`;
        
        let indexToSet = 2; // Dark Default
        if(savedTheme === 'theme-light') indexToSet = 0;
        if(savedTheme === 'theme-sepia') indexToSet = 1;
        
        themeButtons.forEach(btn => btn.classList.remove('active'));
        themeButtons[indexToSet].classList.add('active');
        updateIndicatorPosition(indexToSet);
    });

    function updateIndicatorPosition(index) {
        const buttonWidth = 34; // Sync matching CSS block sizing 
        indicator.style.transform = `translateX(${index * buttonWidth}px)`;
    }

    function changeTheme(element, themeName, index) {
        themeButtons.forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
        updateIndicatorPosition(index);

        readingContainer.className = `py-4 transition-theme position-relative z-1 ${themeName}`;
        localStorage.setItem('lessonTheme', themeName);

        // Dispatch a custom event to notify the global theme switcher
        // Only dispatch for light/dark to sync with the global toggle
        if (themeName === 'theme-light' || themeName === 'theme-dark') {
            window.dispatchEvent(new CustomEvent('lessonThemeChanged', { detail: { theme: themeName.replace('theme-', '') } }));
        }
    }

    // 4. GLOBAL THEME SYNCHRONIZER
    // Listen for the global theme change from the navbar
    window.addEventListener('themeChanged', (e) => {
        const newGlobalTheme = e.detail.theme; // 'light' or 'dark'
        
        if (newGlobalTheme === 'light') {
            // Trigger this page's light theme
            changeTheme(themeButtons[0], 'theme-light', 0);
        } else if (newGlobalTheme === 'dark') {
            // Trigger this page's dark theme
            changeTheme(themeButtons[2], 'theme-dark', 2);
        }
    });

    // 2. AJAX SAVE POINTER LOGIC
    document.getElementById('btnSaveNote').addEventListener('click', function() {
        const noteText = document.getElementById('personalNote').value;
        const btn = this;
        
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1.5" role="status" aria-hidden="true"></span> Menyimpan...';

        fetch("{{ route('lessons.user.save-note', $lesson->id) }}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ note: noteText })
        })
        .then(response => {
            if (!response.ok) throw new Error('Server Error: ' + response.status);
            return response.json();
        })
        .then(data => {
            if(data.status === 'success') {
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: data.message,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                    background: 'var(--card-bg)',
                    color: 'var(--text-main)',
                    customClass: { popup: 'border-minimal' }
                });

                btn.innerHTML = 'Tersimpan ✓';
                btn.style.background = 'var(--accent-success)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'transparent';

                setTimeout(() => {
                    btn.innerHTML = 'Simpan Catatan';
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--text-main)';
                    btn.style.borderColor = 'var(--card-border)';
                    btn.disabled = false;
                }, 1800);
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal menyimpan catatan. Periksa koneksi internet Anda.',
                background: 'var(--card-bg)',
                color: 'var(--text-main)'
            });
            btn.disabled = false;
            btn.innerHTML = 'Simpan Catatan';
        });
    });

    // 3. AJAX COMPLETE ACTIONS ENGINE LOGIC
    const btnMarkDone = document.getElementById('btnMarkDone');
    const nextLessonDiv = document.getElementById('nextLessonDiv');

    if (btnMarkDone) {
        btnMarkDone.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-1.5"></span> Memproses...';

            fetch("{{ route('lessons.user.complete', $lesson->id) }}", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    if(typeof confetti === "function") confetti({ particleCount: 120, spread: 60, origin: { y: 0.75 }, colors: ['#3b82f6', '#10b981', '#f59e0b'] });
                    
                    Swal.fire({ 
                        icon: 'success', 
                        title: 'Hebat!', 
                        text: data.message, 
                        timer: 1800, 
                        showConfirmButton: false,
                        background: 'var(--card-bg)',
                        color: 'var(--text-main)'
                    });

                    btnMarkDone.outerHTML = `
                        <div class="badge-minimal-success d-inline-block px-4 py-2.5 rounded-pill fw-semibold mb-4 small transition-fade border border-success border-opacity-10">
                            <i class="bi bi-check-circle-fill me-1.5"></i> Kamu sudah menyelesaikan bab ini!
                        </div>
                    `;
                    
                    if (nextLessonDiv) nextLessonDiv.classList.remove('d-none');
                }
            });
        });
    }
</script>
@endsection