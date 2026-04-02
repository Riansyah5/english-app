@extends('layouts.app')

@section('content')
<style>
    /* Premium Glassmorphism Fintech/Crypto UI Custom Styles */
    body {
        background-color: #0b0f19;
        color: #f8fafc;
        position: relative;
        min-height: 100vh;
        overflow-x: hidden;
    }

    /* Ambient Background Glows */
    body::before, body::after {
        content: '';
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        z-index: -1;
        opacity: 0.5;
        pointer-events: none;
    }
    body::before {
        top: -10%;
        left: -10%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%);
    }
    body::after {
        bottom: -20%;
        right: -10%;
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%);
    }

    /* Glass Card Base */
    .glass-card {
        background: rgba(20, 25, 40, 0.4);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .glass-card:hover {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.15);
        transform: translateY(-2px);
    }

    /* Highlight Accents inside Glass Cards */
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        z-index: 1;
    }

    /* Typography Overrides */
    .text-muted, .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 15px rgba(255,255,255,0.3); }
    .neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
    .neon-red { color: #fb7185; text-shadow: 0 0 15px rgba(251, 113, 133, 0.4); }
    .neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }

    /* Button Styling */
    .btn-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: #fff;
        font-weight: 600;
        transition: all 0.2s ease;
    }
    .btn-glass:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        font-weight: 600;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
    }
    .btn-neon-primary:hover {
        box-shadow: 0 0 25px rgba(79, 70, 229, 0.6);
        color: white;
    }
    .btn-neon-success {
        background: linear-gradient(135deg, #059669, #10b981);
        border: none;
        color: white;
        font-weight: 600;
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
    }

    /* Progress Bar */
    .progress-glass {
        background-color: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: 8px !important;
        border-radius: 20px;
        overflow: hidden;
    }
    .progress-bar-neon {
        background: linear-gradient(90deg, #38bdf8, #818cf8);
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
    }

    /* Badges & Icons */
    .badge-glass {
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.3);
        color: #38bdf8;
    }
    .play-btn-glass {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.2s ease;
    }
    .play-btn-glass:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(255,255,255,0.2);
    }

    /* Specialty Card Highlights */
    .border-glow-success {
        border-left: 4px solid #34d399 !important;
        box-shadow: -5px 0 15px -5px rgba(52, 211, 153, 0.3), 0 16px 32px rgba(0, 0, 0, 0.3) !important;
    }
</style>

<div class="container py-5 position-relative z-1">
    <div class="row mb-5">
        <div class="col-md-12">
            <h2 class="fw-bold text-white text-glow mb-2">Welcome back, {{ $user->name }}! 🚀</h2>
            <p class="text-slate fs-5">Target belajar harianmu adalah <strong class="text-white">{{ $user->daily_goal }} materi</strong>.</p>
        </div>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-8">
            <div class="glass-card h-100 p-4 p-md-5 d-flex flex-column justify-content-center">
                <div class="position-absolute top-0 end-0 opacity-25" style="width: 250px; height: 250px; background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%); transform: translate(20%, -20%); pointer-events: none;"></div>
                
                <div class="position-relative z-1">
                    <h3 class="fw-bold text-white mb-4">Daily Review</h3>
                    
                    @php 
                        $progressPercentage = $user->daily_goal > 0 ? min(100, ($reviewedToday / $user->daily_goal) * 100) : 0; 
                    @endphp
                    
                    <div class="mb-5">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="small text-slate fw-semibold">Progress Hari Ini</span>
                            <span class="small fw-bold text-white">{{ $reviewedToday }} / {{ $user->daily_goal }} Selesai</span>
                        </div>
                        <div class="progress progress-glass">
                            <div class="progress-bar progress-bar-neon rounded-pill" role="progressbar" style="width: {{ $progressPercentage }}%" aria-valuenow="{{ $progressPercentage }}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    @if($cardsToStudyToday > 0)
                        <p class="fs-5 mb-4 text-slate">
                            Kamu masih memiliki <strong class="text-white">{{ $cardsToStudyToday }} materi</strong> untuk diselesaikan hari ini demi mencapai targetmu.
                        </p>
                        <div>
                            <a href="{{ route('study.index') }}" class="btn btn-neon-primary btn-lg rounded-pill px-5">
                                Lanjutkan Belajar
                            </a>
                        </div>
                    @else
                        <p class="fs-5 mb-4 text-slate">
                            Luar biasa! Kamu sudah memenuhi target belajar harianmu hari ini. Otakmu butuh istirahat agar memori tersimpan permanen.
                        </p>
                        <div class="d-flex gap-3 flex-wrap">
                            <button class="btn btn-neon-success btn-lg rounded-pill px-4" disabled>
                                Target Tercapai 🎉
                            </button>
                            <a href="{{ route('study.practice') }}" class="btn btn-glass btn-lg rounded-pill px-4">
                                Latihan Bebas
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="row g-4 h-100">
                <div class="col-12">
                    <div class="glass-card h-100 p-4 text-center d-flex flex-column justify-content-center">
                        <h6 class="text-slate fw-semibold text-uppercase tracking-wide mb-2" style="font-size: 0.75rem; letter-spacing: 1.5px;">Total Menunggak</h6>
                        <h1 class="display-4 fw-bold neon-red mb-1">{{ $dueCardsCount }}</h1>
                        <small class="text-slate opacity-75">Akan dicicil setiap hari</small>
                    </div>
                </div>
                <div class="col-12">
                    <div class="glass-card h-100 p-4 text-center d-flex flex-column justify-content-center">
                        <h6 class="text-slate fw-semibold text-uppercase tracking-wide mb-2" style="font-size: 0.75rem; letter-spacing: 1.5px;">Koleksi Materi</h6>
                        <h1 class="display-4 fw-bold text-white mb-0">{{ $totalCardsCount }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="glass-card mb-4 p-0">
        <div class="row g-0">
            @if($dailyVideo)
                <div class="col-md-4 position-relative">
                    <img src="https://img.youtube.com/vi/{{ $dailyVideo->youtube_id }}/mqdefault.jpg" 
                            class="img-fluid h-100 w-100" 
                            alt="Thumbnail" 
                            style="object-fit: cover; min-height: 220px; opacity: 0.85;">
                    <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(90deg, transparent 50%, rgba(20, 25, 40, 0.4) 100%);"></div>
                    
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <div class="play-btn-glass rounded-circle p-3 d-flex align-items-center justify-content-center" style="width: 65px; height: 65px;">
                            <i class="bi bi-play-fill fs-2 text-white" style="margin-left: 4px;"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 d-flex align-items-center">
                    <div class="p-4 p-md-5 w-100">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <span class="badge badge-glass rounded-pill px-3 py-2 fw-semibold">
                                Video Recommendation 🎥
                            </span>
                            <small class="neon-blue text-uppercase fw-bold" style="font-size: 0.7rem; letter-spacing: 1px;">
                                {{ $dailyVideo->difficulty }}
                            </small>
                        </div>
                        <h4 class="fw-bold text-white mb-2">{{ $dailyVideo->title }}</h4>
                        <p class="text-slate mb-4">
                            <i class="bi bi-folder2-open me-2"></i> {{ $dailyVideo->folder->name }}
                        </p>
                        <div class="d-flex align-items-center gap-3">
                            <a href="{{ route('videos.user.show', $dailyVideo->id) }}" class="btn btn-neon-primary rounded-pill px-4 py-2">
                                Mulai Belajar Sekarang
                            </a>
                            <a href="{{ route('videos.user.index') }}" class="btn btn-link text-decoration-none text-slate hover-white fw-semibold">
                                Lihat Library <i class="bi bi-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-12 p-5 text-center d-flex flex-column justify-content-center" style="min-height: 250px;">
                    <div class="mb-3">
                        <i class="bi bi-camera-video-off display-4 text-slate opacity-50"></i>
                    </div>
                    <h5 class="fw-bold text-white">Belum ada materi video</h5>
                    <p class="text-slate mb-0">Hubungi Admin untuk menambahkan video pembelajaran baru.</p>
                </div>
            @endif
        </div>
    </div>

    {{-- Rekomendasi Materi Hari Ini --}}
    <div class="glass-card border-glow-success mb-4 p-4 p-md-5">
        @if($randomCategory && $nextLessonToRead)
            <div class="row align-items-center">
                <div class="col-md-8 position-relative z-1">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.3);">
                            <i class="bi {{ $randomCategory->icon }} neon-green"></i>
                        </div>
                        <span class="fw-bold neon-green text-uppercase" style="font-size: 0.75rem; letter-spacing: 1.5px;">Materi Rekomendasi</span>
                    </div>
                    <h3 class="fw-bold text-white mb-2">{{ $nextLessonToRead->title }}</h3>
                    <p class="text-slate mb-4">Kategori: <strong class="text-white">{{ $randomCategory->name }}</strong></p>
                    
                    <div class="d-flex align-items-center gap-4">
                        <a href="{{ route('lessons.user.show', $nextLessonToRead->slug) }}" class="btn btn-neon-success rounded-pill px-4 py-2">
                            Lanjut Membaca
                        </a>
                        <div class="flex-grow-1 d-none d-md-block" style="max-width: 250px;">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="text-slate fw-semibold">Progres Kategori</small>
                                <small class="fw-bold neon-green">{{ $categoryProgress }}%</small>
                            </div>
                            <div class="progress progress-glass">
                                <div class="progress-bar rounded-pill" role="progressbar" style="width: {{ $categoryProgress }}%; background: linear-gradient(90deg, #10b981, #34d399); box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-none d-md-flex justify-content-end align-items-center">
                    <i class="bi bi-book-half text-white opacity-10" style="font-size: 8rem; filter: blur(2px);"></i>
                </div>
            </div>
        @else
            <div class="text-center py-4">
                <p class="text-slate mb-0 fst-italic">Belum ada materi pelajaran yang tersedia untuk dipelajari.</p>
            </div>
        @endif
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-4">
            <div class="glass-card h-100 p-4 p-md-5 text-center d-flex flex-column justify-content-center position-relative">
                <div class="position-absolute top-50 start-50 translate-middle" style="width: 150px; height: 150px; background: radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%); filter: blur(20px); pointer-events: none;"></div>
                
                <div class="position-relative z-1">
                    <h6 class="fw-semibold text-slate text-uppercase tracking-wide mb-3" style="font-size: 0.8rem; letter-spacing: 1.5px;">Study Streak</h6>
                    <h1 class="display-1 fw-bold text-white mb-2" style="text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);">
                        {{ $streak }} <span class="fs-2 align-middle" style="filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.6));">🔥</span>
                    </h1>
                    <p class="text-slate fw-medium mt-2 mb-0">Hari Berturut-turut!</p>
                    @if($streak == 0)
                        <div class="mt-3 px-3 py-2 rounded-3 d-inline-block" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
                            <small class="text-white">Ayo mulai belajarmu hari ini!</small>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="glass-card h-100 p-4 p-md-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-white mb-0">Aktivitas 7 Hari Terakhir <span style="opacity: 0.8;">📈</span></h5>
                </div>
                <div style="position: relative; height: 220px; width: 100%;">
                    <canvas id="activityChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        
        // Mengambil data dari controller Laravel
        const labels = @json($chartLabels);
        const dataPoints = @json($chartData);

        // Premium glassmorphism glow gradient for chart
        let gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)'); // Neon cyan
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)'); // Transparent fade

        const activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Flashcard Di-review',
                    data: dataPoints,
                    backgroundColor: gradient,
                    borderColor: '#38bdf8', // Neon Cyan
                    borderWidth: 3,
                    pointBackgroundColor: '#0f172a',
                    pointBorderColor: '#38bdf8',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#38bdf8',
                    pointHoverBorderColor: '#fff',
                    fill: true,
                    tension: 0.4 // Smooth bezier curve
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false 
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(10px)',
                        titleColor: '#f8fafc',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' Materi Di-review';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10,
                            color: '#64748b', // Text slate
                            font: { size: 11, family: "'Inter', sans-serif" }
                        },
                        border: { display: false },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)', // Very faint glass grid
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#64748b',
                            font: { size: 11, family: "'Inter', sans-serif" }
                        },
                        border: { display: false },
                        grid: {
                            display: false 
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });
    });
</script>
@endsection