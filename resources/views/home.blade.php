@extends('layouts.app')

@section('content')
<style>
    /* CSS Variabel Khusus Komponen Home - Minimalist & Elegant */
    [data-theme="dark"] {
        --bg-surface: #121620;
        --card-bg: #1e2530;
        --card-border: rgba(255, 255, 255, 0.04);
        --text-muted: #94a3b8;
        --text-main: #f8fafc;
        --accent-primary: #3b82f6;
        --accent-success: #10b981;
        --accent-danger: #f43f5e;
        --chart-grid-color: rgba(255, 255, 255, 0.03);
        --chart-text-color: #64748b;
    }
    
    [data-theme="light"] {
        --bg-surface: #f8fafc;
        --card-bg: #ffffff;
        --card-border: rgba(0, 0, 0, 0.05);
        --text-muted: #64748b;
        --text-main: #0f172a;
        --accent-primary: #2563eb;
        --accent-success: #059669;
        --accent-danger: #dc2626;
        --chart-grid-color: rgba(0, 0, 0, 0.03);
        --chart-text-color: #94a3b8;
    }

    /* Minimalist Elegant Card Base */
    .minimal-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 1.25rem;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
    }
    
    .minimal-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
    }

    /* Subtle Accent Left Border for Recommendations */
    .border-accent-success {
        border-left: 4px solid var(--accent-success) !important;
    }

    /* Elegant Custom Buttons */
    .btn-minimal {
        font-weight: 500;
        padding: 0.625rem 1.5rem;
        border-radius: 0.75rem;
        transition: all 0.2s ease;
    }
    .btn-minimal-primary {
        background: var(--accent-primary);
        color: #ffffff !important;
        border: none;
    }
    .btn-minimal-primary:hover {
        background: opacity-80;
        filter: brightness(1.1);
    }
    .btn-minimal-secondary {
        background: transparent;
        color: var(--text-main) !important;
        border: 1px solid var(--card-border);
    }
    .btn-minimal-secondary:hover {
        background: rgba(0, 0, 0, 0.02);
    }

    /* Custom Slim Progress Bar */
    .progress-minimal {
        background-color: var(--card-border) !important;
        height: 6px !important;
        border-radius: 999px;
        overflow: hidden;
    }
    .progress-bar-minimal {
        background: var(--accent-primary);
    }
    .progress-bar-success-minimal {
        background: var(--accent-success);
    }

    /* Text & Utilities */
    .text-theme-main { color: var(--text-main) !important; }
    .text-theme-muted { color: var(--text-muted) !important; }
    .letter-spacing-wide { letter-spacing: 0.05em; }
</style>

<div class="container py-5">
    <!-- Header Section -->
    <div class="row mb-5 align-items-center">
        <div class="col-md-12">
            <h2 class="fw-bold text-theme-main tracking-tight mb-2">Welcome back, {{ $user->name }}</h2>
            <p class="text-theme-muted mb-0 fs-6">Target belajar harianmu adalah <span class="text-theme-main fw-semibold">{{ $user->daily_goal }} materi</span>.</p>
        </div>
    </div>

    <!-- Main Content Grid -->
    <div class="row g-4 mb-4">
        <!-- Daily Review Card -->
        <div class="col-lg-8">
            <div class="minimal-card h-100 p-4 p-md-5 d-flex flex-column justify-content-between">
                <div>
                    <h5 class="fw-bold text-theme-main mb-4 opacity-90">Daily Review</h5>
                    
                    @php 
                        $progressPercentage = $user->daily_goal > 0 ? min(100, ($reviewedToday / $user->daily_goal) * 100) : 0; 
                    @endphp
                    
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="small text-theme-muted fw-medium">Progress Hari Ini</span>
                            <span class="small fw-semibold text-theme-main">{{ $reviewedToday }} / {{ $user->daily_goal }} Selesai</span>
                        </div>
                        <div class="progress progress-minimal">
                            <div class="progress-bar progress-bar-minimal" role="progressbar" style="width: {{ $progressPercentage }}%" aria-valuenow="{{ $progressPercentage }}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    @if($cardsToStudyToday > 0)
                        <p class="text-theme-muted mb-4 fs-6">
                            Kamu masih memiliki <span class="text-theme-main fw-semibold">{{ $cardsToStudyToday }} materi</span> untuk diselesaikan hari ini.
                        </p>
                    @else
                        <p class="text-theme-muted mb-4 fs-6">
                            Luar biasa! Target belajar harianmu sudah terpenuhi. Waktunya mengistirahatkan otakmu.
                        </p>
                    @endif
                </div>

                <div>
                    @if($cardsToStudyToday > 0)
                        <a href="{{ route('study.index') }}" class="btn btn-minimal btn-minimal-primary px-4">Lanjutkan Belajar</a>
                    @else
                        <div class="d-flex gap-2 flex-wrap">
                            <button class="btn btn-minimal btn-minimal-secondary opacity-70" disabled>Target Tercapai ✓</button>
                            <a href="{{ route('study.practice') }}" class="btn btn-minimal btn-minimal-secondary px-4">Latihan Bebas</a>
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <!-- Quick Stats Cards -->
        <div class="col-lg-4">
            <div class="row g-4 h-100">
                <div class="col-12 col-md-6 col-lg-12">
                    <div class="minimal-card h-100 p-4 d-flex flex-column justify-content-center">
                        <span class="text-theme-muted small fw-semibold text-uppercase letter-spacing-wide mb-2" style="font-size: 0.7rem;">Total Menunggak</span>
                        <h2 class="fw-bold mb-1" style="color: var(--accent-danger);">{{ $dueCardsCount }}</h2>
                        <small class="text-theme-muted opacity-70">Akan dicicil bertahap</small>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-12">
                    <div class="minimal-card h-100 p-4 d-flex flex-column justify-content-center">
                        <span class="text-theme-muted small fw-semibold text-uppercase letter-spacing-wide mb-2" style="font-size: 0.7rem;">Koleksi Materi</span>
                        <h2 class="fw-bold text-theme-main mb-0">{{ $totalCardsCount }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Video Recommendation Card -->
    <div class="minimal-card mb-4 overflow-hidden">
        <div class="row g-0">
            @if($dailyVideo)
                <div class="col-md-4 position-relative">
                    <img src="https://img.youtube.com/vi/{{ $dailyVideo->youtube_id }}/mqdefault.jpg" class="img-fluid h-100 w-100" alt="Thumbnail" style="object-fit: cover; min-height: 200px; filter: grayscale(20%);">
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <div class="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; opacity: 0.9;">
                            <i class="bi bi-play-fill fs-4 text-dark" style="margin-left: 2px;"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 d-flex align-items-center">
                    <div class="p-4 p-md-5 w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-theme-muted small fw-semibold text-uppercase letter-spacing-wide" style="font-size: 0.7rem;">Video Recommendation</span>
                            <span class="badge bg-light text-dark text-uppercase fw-bold" style="font-size: 0.65rem;">{{ $dailyVideo->difficulty }}</span>
                        </div>
                        <h5 class="fw-bold text-theme-main mb-2">{{ $dailyVideo->title }}</h5>
                        <p class="text-theme-muted small mb-4"><i class="bi bi-folder2-open me-1"></i> {{ $dailyVideo->folder->name }}</p>
                        <div class="d-flex align-items-center gap-3">
                            <a href="{{ route('videos.user.show', $dailyVideo->id) }}" class="btn btn-minimal btn-minimal-primary px-4 btn-sm">Mulai Belajar</a>
                            <a href="{{ route('videos.user.index') }}" class="text-decoration-none text-theme-muted small fw-medium">Lihat Library <i class="bi bi-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-12 p-5 text-center d-flex flex-column justify-content-center" style="min-height: 200px;">
                    <p class="text-theme-muted small mb-0">Belum ada materi video yang ditambahkan oleh admin.</p>
                </div>
            @endif
        </div>
    </div>

    <!-- Lesson Recommendation Card -->
    <div class="minimal-card border-accent-success mb-4 p-4 p-md-5">
        @if($randomCategory && $nextLessonToRead)
            <div class="row align-items-center">
                <div class="col-md-8">
                    <div class="d-flex align-items-center mb-3">
                        <i class="bi {{ $randomCategory->icon }} me-2 text-success"></i>
                        <span class="text-theme-muted small fw-semibold text-uppercase letter-spacing-wide" style="font-size: 0.7rem;">Materi Rekomendasi</span>
                    </div>
                    <h5 class="fw-bold text-theme-main mb-2">{{ $nextLessonToRead->title }}</h5>
                    <p class="text-theme-muted small mb-4">Kategori: <span class="text-theme-main fw-medium">{{ $randomCategory->name }}</span></p>
                    
                    <div class="d-flex align-items-center gap-4">
                        <a href="{{ route('lessons.user.show', $nextLessonToRead->slug) }}" class="btn btn-minimal btn-minimal-primary px-4 btn-sm" style="background: var(--accent-success);">Lanjut Membaca</a>
                        <div class="flex-grow-1 d-none d-md-block" style="max-width: 200px;">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="text-theme-muted style" style="font-size: 0.7rem;">Progres Kategori</span>
                                <span class="fw-semibold text-success small">{{ $categoryProgress }}%</span>
                            </div>
                            <div class="progress progress-minimal">
                                <div class="progress-bar progress-bar-success-minimal" role="progressbar" style="width: {{ $categoryProgress }}%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @else
            <div class="text-center py-2">
                <p class="text-theme-muted small mb-0 fst-italic">Belum ada materi pelajaran yang tersedia.</p>
            </div>
        @endif
    </div>

    <!-- Activity & Streak Section -->
    <div class="row g-4">
        <!-- Streak Card -->
        <div class="col-md-4">
            <div class="minimal-card h-100 p-4 p-md-5 text-center d-flex flex-column justify-content-center">
                <span class="text-theme-muted small fw-semibold text-uppercase letter-spacing-wide mb-3" style="font-size: 0.7rem;">Study Streak</span>
                <h1 class="display-3 fw-bold text-theme-main mb-0 tracking-tight">
                    {{ $streak }}<span class="fs-4 ms-1 align-baseline">🔥</span>
                </h1>
                <p class="text-theme-muted small mt-2 mb-0">Hari berturut-turut</p>
            </div>
        </div>

        <!-- Chart Card -->
        <div class="col-md-8">
            <div class="minimal-card h-100 p-4 p-md-5">
                <h6 class="fw-bold text-theme-main mb-4 opacity-90">Aktivitas 7 Hari Terakhir</h6>
                <div style="position: relative; height: 200px; width: 100%;">
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
        
        const labels = @json($chartLabels);
        const dataPoints = @json($chartData);

        // Mengambil style dinamis untuk Chart
        const getStyle = (property) => getComputedStyle(document.documentElement).getPropertyValue(property).trim();

        let activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Flashcard Di-review',
                    data: dataPoints,
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--accent-primary') || '#3b82f6', 
                    borderWidth: 2,
                    pointBackgroundColor: getStyle('--card-bg') || '#ffffff',
                    pointBorderColor: getStyle('--accent-primary') || '#3b82f6',
                    pointBorderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0.2 // Kurva lebih halus namun tetap presisi dan formal
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10,
                            color: getStyle('--chart-text-color') || '#64748b',
                            font: { size: 11 }
                        },
                        border: { display: false },
                        grid: {
                            color: getStyle('--chart-grid-color') || 'rgba(0, 0, 0, 0.03)',
                        }
                    },
                    x: {
                        ticks: { 
                            color: getStyle('--chart-text-color') || '#64748b',
                            font: { size: 11 }
                        },
                        border: { display: false },
                        grid: { display: false }
                    }
                }
            }
        });

        window.addEventListener('themeChanged', () => {
            const primaryColor = getStyle('--accent-primary');
            activityChart.data.datasets[0].borderColor = primaryColor;
            activityChart.data.datasets[0].pointBorderColor = primaryColor;
            activityChart.data.datasets[0].pointBackgroundColor = getStyle('--card-bg');
            activityChart.options.scales.y.ticks.color = getStyle('--chart-text-color');
            activityChart.options.scales.y.grid.color = getStyle('--chart-grid-color');
            activityChart.options.scales.x.ticks.color = getStyle('--chart-text-color');
            activityChart.update();
        });
    });
</script>
@endsection