@extends('layouts.app')

@section('content')
<div id="readingContainer" class="theme-light py-4 transition-theme" style="min-height: 100vh;">
    <div class="container mb-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="{{ route('lessons.user.index') }}" class="text-decoration-none fw-bold">Daftar Materi</a></li>
                            <li class="breadcrumb-item active opacity-75">{{ $lesson->category->name }}</li>
                        </ol>
                    </nav>

                    <div class="theme-switch-wrapper">
                      <div class="theme-switch-box shadow-sm">
                          <div class="active-indicator" id="indicator"></div>
                          
                          <button class="btn-theme active" onclick="changeTheme(this, 'theme-light', 0)" title="Terang">
                              <i class="fas fa-sun"></i>
                          </button>
                          <button class="btn-theme" onclick="changeTheme(this, 'theme-sepia', 1)" title="Sepia">
                              <i class="fas fa-book-open"></i>
                          </button>
                          <button class="btn-theme" onclick="changeTheme(this, 'theme-dark', 2)" title="Gelap">
                              <i class="fas fa-moon"></i>
                          </button>
                      </div>
                    </div>
                </div>

                <div class="mb-5 border-bottom pb-4 article-header">
                    <span class="badge bg-primary text-uppercase mb-2">Bab {{ $lesson->order_number }}</span>
                    <h1 class="display-5 fw-bold mb-3 article-title">{{ $lesson->title }}</h1>
                    
                    @php
                        // Menghitung estimasi waktu (Rata-rata kecepatan baca: 200 kata/menit)
                        $wordCount = str_word_count(strip_tags($lesson->content));
                        $readTime = ceil($wordCount / 200);
                    @endphp
                    <div class="d-flex align-items-center opacity-75 small fw-medium">
                        <i class="bi bi-hourglass-split me-2"></i> Estimasi waktu baca: {{ $readTime }} menit
                    </div>
                </div>

                @if($lesson->youtube_video_id)
                    <div class="mb-5">
                        <div class="card shadow-sm border-0 rounded-4 overflow-hidden bg-dark">
                            <div class="ratio ratio-16x9">
                                <iframe 
                                    src="https://www.youtube.com/embed/{{ $lesson->youtube_video_id }}?rel=0" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                        <div class="text-center mt-2 small text-muted opacity-75">
                            <i class="bi bi-info-circle me-1"></i> Tonton video di atas sebagai pengantar materi.
                        </div>
                    </div>
                @endif

                <article class="lesson-content">
                    {!! $lesson->content !!}
                </article>

                <div class="mt-5 p-4 rounded-4 shadow-sm note-board">
                    <div class="d-flex align-items-center mb-3">
                        <i class="bi bi-pin-angle-fill text-warning fs-4 me-2"></i>
                        <h5 class="fw-bold mb-0">Catatan Pribadiku</h5>
                    </div>
                    <textarea id="personalNote" class="form-control border-0 bg-transparent note-textarea" rows="4" placeholder="Ketik ringkasan atau poin penting dari bab ini di sini...">{{ $personalNote }}</textarea>
                    <div class="text-end mt-2">
                        <button id="btnSaveNote" class="btn btn-sm btn-outline-secondary rounded-pill px-3 fw-bold">
                            Simpan Catatan
                        </button>
                    </div>
                </div>

                <div class="mt-5 pt-4 text-center" id="completionArea">
                    @if($isCompleted)
                        <div class="alert alert-success d-inline-block px-4 py-3 rounded-pill fw-bold shadow-sm border-0 bg-success text-white">
                            <i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!
                        </div>
                        @if($nextLesson)
                            <div class="mt-4">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                    Lanjut ke Bab {{ $nextLesson->order_number }} &rarr;
                                </a>
                            </div>
                        @endif
                    @else
                        <button id="btnMarkDone" class="btn btn-success btn-lg rounded-pill px-5 fw-bold shadow">
                            <i class="bi bi-check-lg me-2"></i> Tandai Selesai Dibaca
                        </button>
                        
                        @if($nextLesson)
                            <div id="nextLessonDiv" class="mt-4 d-none">
                                <a href="{{ route('lessons.user.show', $nextLesson->slug) }}" class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
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
    /* CSS VARIABEL UNTUK TEMA */
    .theme-light {
        --bg-color: #ffffff;
        --text-color: #2b2b2b;
        --title-color: #1a1a1a;
        --note-bg: #fff9c4; /* Kuning sticky note */
        --note-text: #424242;
        --border-color: #dee2e6;
    }
    .theme-sepia {
        --bg-color: #f4ecd8;
        --text-color: #433422;
        --title-color: #2c2214;
        --note-bg: #eaddb6;
        --note-text: #433422;
        --border-color: #d1c7b1;
    }
    .theme-dark {
        --bg-color: #121212;
        --text-color: #e0e0e0;
        --title-color: #ffffff;
        --note-bg: #2d2d2d;
        --note-text: #e0e0e0;
        --border-color: #333333;
    }

    :root {
        --bg-switcher: #eeeeee;
        --indicator-color: #ffffff;
    }

    .theme-switch-wrapper {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .theme-switch-box {
        position: relative;
        display: flex;
        background-color: var(--bg-switcher);
        padding: 5px;
        border-radius: 50px;
        width: fit-content;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }

    /* Kotak indikator yang bergerak */
    .active-indicator {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 40px; /* Harus sama dengan lebar button */
        height: 40px; /* Harus sama dengan tinggi button */
        background-color: var(--indicator-color);
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1;
    }

    .btn-theme {
        position: relative;
        border: none;
        background: transparent;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 2;
        color: #666;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
    }

    .btn-theme.active {
        color: #000;
    }

    /* Warna khusus saat tema aktif */
    .btn-theme[title="Terang"].active ~ .active-indicator { background-color: #fff; }
    /* Kita atur warna indikator via JS agar lebih dinamis */

    /* TRANSISI HALUS SAAT GANTI TEMA */
    .transition-theme { transition: background-color 0.4s ease, color 0.4s ease; }
    
    /* PENERAPAN TEMA KE ELEMEN */
    #readingContainer { background-color: var(--bg-color); color: var(--text-color); }
    .article-title, .lesson-content h1, .lesson-content h2, .lesson-content h3 { color: var(--title-color) !important; }
    .border-bottom { border-color: var(--border-color) !important; }
    
    .note-board { background-color: var(--note-bg); transition: background-color 0.4s ease; }
    .note-textarea { color: var(--note-text); resize: none; font-family: 'Inter', sans-serif; }
    .note-textarea:focus { box-shadow: none; background-color: transparent; }
    .note-textarea::placeholder { color: var(--note-text); opacity: 0.6; }

    /* TIPOGRAFI ARTIKEL */
    .lesson-content {
        font-family: 'Cambria', serif;
        font-size: 1.15rem;
        line-height: 1.8;
    }
    .lesson-content h1, .lesson-content h2, .lesson-content h3 {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .lesson-content p { margin-bottom: 1.5rem; }
    
    /* Penyesuaian Tabel & Gambar di berbagai tema */
    .lesson-content table { width: 100% !important; margin-bottom: 2rem; border-collapse: collapse; }
    .lesson-content table td, .lesson-content table th { border: 1px solid var(--border-color); padding: 0.75rem; }
    .lesson-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 1.5rem 0; }
</style>
@endsection

@section('scripts')
<script>
    // 1. LOGIKA THEME SWITCHER
    const readingContainer = document.getElementById('readingContainer');
    
    // Cek apakah user pernah memilih tema sebelumnya di browser ini
    const savedTheme = localStorage.getItem('lessonTheme') || 'theme-light';
    readingContainer.className = `py-4 transition-theme ${savedTheme}`;

    function setTheme(themeName) {
        readingContainer.className = `py-4 transition-theme ${themeName}`;
        localStorage.setItem('lessonTheme', themeName); // Simpan ke storage
    }

    // 2. LOGIKA SIMPAN CATATAN (AJAX)
    document.getElementById('btnSaveNote').addEventListener('click', function() {
        const noteText = document.getElementById('personalNote').value;
        const btn = this;
        
        btn.disabled = true; // Nonaktifkan tombol untuk mencegah klik ganda
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Menyimpan...';

        fetch("{{ route('lessons.user.save-note', $lesson->id) }}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json' // Mengharapkan respons JSON
            },
            body: JSON.stringify({ note: noteText })
        })
        .then(response => {
            // Periksa apakah respons dari server sukses (status code 200-299)
            if (!response.ok) {
                // Jika tidak, lemparkan error agar ditangkap oleh blok .catch()
                throw new Error('Server merespons dengan error: ' + response.status);
            }
            return response.json(); // Ubah respons menjadi format JSON
        })
        .then(data => {
            if(data.status === 'success') {
                // Tampilkan notifikasi toast sukses menggunakan SweetAlert
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: data.message,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                // Ubah tampilan tombol untuk menandakan berhasil disimpan
                btn.innerHTML = 'Tersimpan ✔️';
                btn.classList.remove('btn-outline-secondary');
                btn.classList.add('btn-success');

                setTimeout(() => {
                    // Kembalikan tombol ke kondisi semula setelah 2 detik
                    btn.innerHTML = 'Simpan Catatan';
                    btn.classList.replace('btn-success', 'btn-outline-secondary');
                    btn.disabled = false;
                }, 2000);
            }
        })
        .catch(error => {
            // Blok ini akan berjalan jika fetch gagal atau ada error yang dilempar
            console.error('Error saat menyimpan catatan:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal menyimpan catatan. Periksa koneksi internet Anda dan coba lagi.',
            });

            // Aktifkan kembali tombol agar pengguna bisa mencoba lagi
            btn.disabled = false;
            btn.innerHTML = 'Simpan Catatan';
        });
    });

    // 3. LOGIKA TANDAI SELESAI (Sama seperti sebelumnya)
    const btnMarkDone = document.getElementById('btnMarkDone');
    const nextLessonDiv = document.getElementById('nextLessonDiv');

    if (btnMarkDone) {
        btnMarkDone.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Menyimpan...';

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
                    if(typeof confetti === "function") confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    
                    Swal.fire({ icon: 'success', title: 'Hebat!', text: data.message, timer: 2000, showConfirmButton: false });

                    btnMarkDone.className = "alert alert-success d-inline-block px-4 py-3 rounded-pill fw-bold shadow-sm border-0 bg-success text-white";
                    btnMarkDone.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Kamu sudah menyelesaikan bab ini!';
                    
                    if (nextLessonDiv) nextLessonDiv.classList.remove('d-none');
                }
            });
        });
    }
</script>

<script>
    function changeTheme(element, themeName, index) {
        // 1. Pindahkan class 'active'
        const buttons = document.querySelectorAll('.btn-theme');
        buttons.forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');

        // 2. Hitung pergeseran (index * lebar tombol)
        const indicator = document.getElementById('indicator');
        const shiftSize = index * 40; // 40 adalah lebar tombol
        indicator.style.transform = `translateX(${shiftSize}px)`;

        // 3. Ganti warna indikator berdasarkan tema (Opsional)
        const colors = ['#ffffff', '#f4ecd8', '#212529'];
        const iconColors = ['#ff9800', '#795548', '#f1c40f'];
        
        indicator.style.backgroundColor = colors[index];
        element.style.color = iconColors[index];

        // 4. Panggil fungsi asli Anda untuk mengganti tema website
        if (typeof setTheme === "function") {
            setTheme(themeName);
        }
        
        console.log("Tema diganti ke: " + themeName);
    }
</script>
@endsection