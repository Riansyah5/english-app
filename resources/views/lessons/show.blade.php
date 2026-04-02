@extends('layouts.app')

@section('content')
<div id="readingContainer" class="theme-dark py-4 transition-theme position-relative z-1" style="min-height: 100vh; overflow-x: hidden;">
    
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="container mb-5 position-relative z-1">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 fw-semibold" style="letter-spacing: 0.5px;">
                            <li class="breadcrumb-item"><a href="{{ route('lessons.user.index') }}" class="text-decoration-none accent-link">Daftar Materi</a></li>
                            <li class="breadcrumb-item active-breadcrumb" aria-current="page">{{ $lesson->category->name }}</li>
                        </ol>
                    </nav>

                    <div class="theme-switch-wrapper">
                      <div class="theme-switch-box glass-panel">
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

                <div class="mb-5 border-bottom-glass pb-4 article-header">
                    <span class="badge badge-glass-accent text-uppercase px-3 py-2 mb-3 fw-bold shadow-sm" style="letter-spacing: 1.5px;">Bab {{ $lesson->order_number }}</span>
                    <h1 class="display-4 fw-bold mb-3 article-title text-glow line-height-tight">{{ $lesson->title }}</h1>
                    
                    @php
                        $wordCount = str_word_count(strip_tags($lesson->content));
                        $readTime = ceil($wordCount / 200);
                    @endphp
                    <div class="d-flex align-items-center text-muted-adaptive fw-medium" style="letter-spacing: 0.5px;">
                        <i class="bi bi-hourglass-split me-2 accent-text"></i> Estimasi waktu baca: {{ $readTime }} menit
                    </div>
                </div>

                @if($lesson->youtube_video_id)
                    <div class="mb-5">
                        <div class="glass-panel p-2 rounded-4">
                            <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg">
                                <iframe 
                                    src="https://www.youtube.com/embed/{{ $lesson->youtube_video_id }}?rel=0" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                        <div class="text-center mt-3 small text-muted-adaptive fw-medium">
                            <i class="bi bi-info-circle me-1 accent-text"></i> Tonton video di atas sebagai pengantar materi.
                        </div>
                    </div>
                @endif

                <article class="lesson-content glass-panel p-4 p-md-5 mb-5 shadow-lg">
                    {!! $lesson->content !!}
                </article>

                <div class="note-board glass-panel p-4 p-md-5 mb-5 shadow-lg position-relative overflow-hidden">
                    <div class="position-absolute top-0 start-0 w-100 h-100 bg-note-overlay pointer-events-none"></div>
                    <div class="position-relative z-1">
                        <div class="d-flex align-items-center mb-3">
                            <div class="icon-box-warning rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px;">
                                <i class="bi bi-pin-angle-fill fs-5"></i>
                            </div>
                            <h4 class="fw-bold mb-0 article-title">Catatan Pribadiku</h4>
                        </div>
                        <textarea id="personalNote" class="form-control border-0 note-textarea p-4 rounded-4 shadow-inner" rows="4" placeholder="Ketik ringkasan atau poin penting dari bab ini di sini...">{{ $personalNote }}</textarea>
                        <div class="text-end mt-3">
                            <button id="btnSaveNote" class="btn btn-glass-accent rounded-pill px-4 py-2 fw-bold shadow-sm transition-all">
                                Simpan Catatan
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-5 pt-4 text-center" id="completionArea">
                    @if($isCompleted)
                        <div class="alert-glass-success d-inline-block px-5 py-3 rounded-pill fw-bold shadow-lg mb-4">
                            <i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!
                        </div>
                        @if($nextLesson)
                            <div class="mt-3">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-neon-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg w-100 w-md-auto">
                                    Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                                </a>
                            </div>
                        @endif
                    @else
                        <button id="btnMarkDone" class="btn btn-neon-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg w-100 w-md-auto mb-4">
                            <i class="bi bi-check-lg me-2 fs-5"></i> Tandai Selesai Dibaca
                        </button>
                        
                        @if($nextLesson)
                            <div id="nextLessonDiv" class="mt-2 d-none transition-fade">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-neon-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg w-100 w-md-auto">
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
    /* ADAPTIVE GLASSMORPHISM THEME SYSTEM                      */
    /* ======================================================== */

    :root {
        --transition-speed: 0.5s;
    }

    /* 1. DARK THEME (Futuristic Crypto/Fintech Vibe) */
    .theme-dark {
        --bg-page: #0b0f19;
        --glass-bg: rgba(20, 25, 40, 0.5);
        --glass-border: rgba(255, 255, 255, 0.08);
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --accent-color: #38bdf8;
        --accent-glow: rgba(56, 189, 248, 0.4);
        --note-bg: rgba(255, 255, 255, 0.02);
        --shadow-color: rgba(0, 0, 0, 0.4);
        --ambient-opacity: 0.4;
        --indicator-bg: rgba(56, 189, 248, 0.2);
        --switch-bg: rgba(0, 0, 0, 0.3);
    }

    /* 2. LIGHT THEME (Clean Frosted Glass) */
    .theme-light {
        --bg-page: #f8fafc;
        --glass-bg: rgba(255, 255, 255, 0.8);
        --glass-border: rgba(226, 232, 240, 0.8);
        --text-main: #0f172a;
        --text-muted: #64748b;
        --accent-color: #3b82f6;
        --accent-glow: rgba(59, 130, 246, 0.2);
        --note-bg: rgba(253, 224, 71, 0.15); /* Soft yellow tint */
        --shadow-color: rgba(0, 0, 0, 0.05);
        --ambient-opacity: 0;
        --indicator-bg: #ffffff;
        --switch-bg: rgba(226, 232, 240, 0.5);
    }

    /* 3. SEPIA THEME (Warm Vintage Glass) */
    .theme-sepia {
        --bg-page: #fdf6e3;
        --glass-bg: rgba(253, 246, 227, 0.8);
        --glass-border: rgba(238, 232, 213, 0.9);
        --text-main: #4c4033;
        --text-muted: #837563;
        --accent-color: #b58900;
        --accent-glow: rgba(181, 137, 0, 0.2);
        --note-bg: rgba(238, 232, 213, 0.5);
        --shadow-color: rgba(76, 64, 51, 0.08);
        --ambient-opacity: 0;
        --indicator-bg: #fdf6e3;
        --switch-bg: rgba(213, 203, 179, 0.4);
    }

    /* CORE COMPONENT STYLES (Adaptive based on variables) */
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

    /* Ambient Glows */
    .ambient-glow {
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        z-index: 0;
        opacity: var(--ambient-opacity);
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%); }

    /* Glass Panels */
    .glass-panel {
        background: var(--glass-bg);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid var(--glass-border);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px var(--shadow-color);
    }

    /* Typography & Utilities */
    .article-title { color: var(--text-main) !important; }
    .text-muted-adaptive { color: var(--text-muted) !important; }
    .accent-text { color: var(--accent-color) !important; }
    .border-bottom-glass { border-bottom: 1px solid var(--glass-border) !important; }
    .line-height-tight { line-height: 1.2; }
    
    .theme-dark .text-glow { text-shadow: 0 0 20px rgba(255,255,255,0.2); }
    .theme-light .text-glow, .theme-sepia .text-glow { text-shadow: none; }

    /* Badges & Links */
    .badge-glass-accent {
        background: rgba(var(--accent-color), 0.1);
        border: 1px solid var(--accent-glow);
        color: var(--accent-color);
    }
    .theme-dark .badge-glass-accent { background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3); color: #38bdf8; }
    .theme-light .badge-glass-accent { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3); color: #3b82f6; }
    .theme-sepia .badge-glass-accent { background: rgba(181, 137, 0, 0.1); border-color: rgba(181, 137, 0, 0.3); color: #b58900; }

    .accent-link { color: var(--accent-color); transition: all 0.2s; }
    .accent-link:hover { filter: brightness(1.2); text-shadow: 0 0 10px var(--accent-glow); }
    .active-breadcrumb { color: var(--text-muted); }
    .breadcrumb-item + .breadcrumb-item::before { color: var(--text-muted); }

    /* Theme Switcher Box */
    .theme-switch-box {
        position: relative;
        display: flex;
        padding: 6px;
        border-radius: 50px;
        background: var(--switch-bg);
        border: 1px solid var(--glass-border);
    }

    .active-indicator {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 42px; 
        height: 42px; 
        background-color: var(--indicator-bg);
        border: 1px solid var(--accent-glow);
        border-radius: 50%;
        box-shadow: 0 4px 12px var(--shadow-color);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy spring */
        z-index: 1;
    }

    .btn-theme {
        position: relative;
        border: none;
        background: transparent;
        width: 42px;
        height: 42px;
        cursor: pointer;
        z-index: 2;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
    }
    .theme-dark .btn-theme.active { color: #38bdf8; text-shadow: 0 0 10px rgba(56,189,248,0.5); }
    .theme-light .btn-theme.active { color: #f59e0b; }
    .theme-sepia .btn-theme.active { color: #8b4513; }

    /* Article Formatting */
    .lesson-content {
        font-family: 'Georgia', 'Cambria', serif;
        font-size: 1.15rem;
        line-height: 1.9;
    }
    .lesson-content h1, .lesson-content h2, .lesson-content h3 {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
        color: var(--text-main);
    }
    .lesson-content p { margin-bottom: 1.5rem; }
    .lesson-content table { width: 100% !important; margin-bottom: 2rem; border-collapse: collapse; }
    .lesson-content table td, .lesson-content table th { border: 1px solid var(--glass-border); padding: 1rem; }
    .lesson-content th { background: rgba(0,0,0,0.05); }
    .theme-dark .lesson-content th { background: rgba(255,255,255,0.05); }
    .lesson-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 2rem 0; box-shadow: 0 10px 30px var(--shadow-color); }

    /* Notes Board */
    .bg-note-overlay { background: var(--note-bg); }
    .icon-box-warning { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b; }
    .note-textarea { 
        color: var(--text-main); 
        resize: none; 
        font-family: 'Inter', sans-serif; 
        background: rgba(0,0,0,0.02) !important;
    }
    .theme-dark .note-textarea { background: rgba(255,255,255,0.02) !important; }
    .note-textarea:focus { outline: none; box-shadow: 0 0 0 2px var(--accent-glow); }
    .note-textarea::placeholder { color: var(--text-muted); opacity: 0.7; }
    .shadow-inner { box-shadow: inset 0 2px 6px rgba(0,0,0,0.05); }

    /* Buttons */
    .btn-glass-accent {
        background: transparent;
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
    }
    .btn-glass-accent:hover {
        background: var(--accent-color);
        color: #fff;
        box-shadow: 0 0 20px var(--accent-glow);
        transform: translateY(-2px);
    }
    
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
    }
    .theme-dark .btn-neon-primary { box-shadow: 0 0 20px rgba(79, 70, 229, 0.4); }
    .btn-neon-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6); color: white; }

    .btn-neon-success {
        background: linear-gradient(135deg, #059669, #10b981);
        border: none;
        color: white;
    }
    .theme-dark .btn-neon-success { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
    .btn-neon-success:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(16, 185, 129, 0.6); color: white; }

    .alert-glass-success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #10b981;
        backdrop-filter: blur(10px);
    }

    .transition-fade { animation: fadeIn 0.5s ease forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
@endsection

@section('scripts')
<script>
    // 1. ADAPTIVE THEME SWITCHER LOGIC
    const readingContainer = document.getElementById('readingContainer');
    const indicator = document.getElementById('indicator');
    const themeButtons = document.querySelectorAll('.btn-theme');
    
    // Check saved theme or default to dark (matches overall app theme)
    const savedTheme = localStorage.getItem('lessonTheme') || 'theme-dark';
    
    // Initial Setup based on saved theme
    document.addEventListener('DOMContentLoaded', () => {
        readingContainer.className = `py-4 transition-theme position-relative z-1 ${savedTheme}`;
        
        let indexToSet = 2; // Default Dark
        if(savedTheme === 'theme-light') indexToSet = 0;
        if(savedTheme === 'theme-sepia') indexToSet = 1;
        
        // Setup initial UI without animation
        indicator.style.transition = 'none';
        updateIndicatorPosition(indexToSet);
        
        themeButtons.forEach(btn => btn.classList.remove('active'));
        themeButtons[indexToSet].classList.add('active');
        
        // Restore animation after a tiny delay
        setTimeout(() => {
            indicator.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 50);
    });

    function updateIndicatorPosition(index) {
        const buttonWidth = 42; 
        const shiftSize = index * buttonWidth; 
        indicator.style.transform = `translateX(${shiftSize}px)`;
    }

    function changeTheme(element, themeName, index) {
        // UI Updates
        themeButtons.forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
        updateIndicatorPosition(index);

        // Apply Theme
        readingContainer.className = `py-4 transition-theme position-relative z-1 ${themeName}`;
        localStorage.setItem('lessonTheme', themeName);
    }

    // 2. AJAX SAVE NOTE
    document.getElementById('btnSaveNote').addEventListener('click', function() {
        const noteText = document.getElementById('personalNote').value;
        const btn = this;
        
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Menyimpan...';

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
                    timer: 3000,
                    background: 'var(--glass-bg)',
                    color: 'var(--text-main)',
                    customClass: { popup: 'backdrop-blur-md border border-light border-opacity-10' }
                });

                btn.innerHTML = 'Tersimpan ✔️';
                btn.classList.add('btn-success', 'text-white', 'border-success');
                btn.classList.remove('btn-glass-accent');

                setTimeout(() => {
                    btn.innerHTML = 'Simpan Catatan';
                    btn.classList.remove('btn-success', 'text-white', 'border-success');
                    btn.classList.add('btn-glass-accent');
                    btn.disabled = false;
                }, 2000);
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal menyimpan catatan. Periksa koneksi internet Anda.',
                background: 'var(--bg-page)',
                color: 'var(--text-main)'
            });
            btn.disabled = false;
            btn.innerHTML = 'Simpan Catatan';
        });
    });

    // 3. MARK AS DONE AJAX
    const btnMarkDone = document.getElementById('btnMarkDone');
    const nextLessonDiv = document.getElementById('nextLessonDiv');

    if (btnMarkDone) {
        btnMarkDone.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Memproses...';

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
                    if(typeof confetti === "function") confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#10b981', '#38bdf8', '#fbbf24'] });
                    
                    Swal.fire({ 
                        icon: 'success', 
                        title: 'Hebat!', 
                        text: data.message, 
                        timer: 2000, 
                        showConfirmButton: false,
                        background: 'var(--bg-page)',
                        color: 'var(--text-main)'
                    });

                    // Update UI to success state
                    btnMarkDone.outerHTML = `
                        <div class="alert-glass-success d-inline-block px-5 py-3 rounded-pill fw-bold shadow-lg mb-4 transition-fade">
                            <i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!
                        </div>
                    `;
                    
                    if (nextLessonDiv) nextLessonDiv.classList.remove('d-none');
                }
            });
        });
    }
</script>
@endsection