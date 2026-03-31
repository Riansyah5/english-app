@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-4">
        <div class="col-md-12">
            <h2 class="fw-bold">Welcome back, {{ $user->name }}! 🚀</h2>
            <p class="text-muted">Target belajar harianmu adalah <strong>{{ $user->daily_goal }} materi</strong>.</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-md-8">
            <div class="card shadow-sm border-0 rounded-4 h-100 bg-primary text-white">
                <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
                    <h3 class="fw-bold mb-3">Daily Review</h3>
                    
                    @php 
                        $progressPercentage = $user->daily_goal > 0 ? min(100, ($reviewedToday / $user->daily_goal) * 100) : 0; 
                    @endphp
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="small text-light">Progress Hari Ini</span>
                            <span class="small fw-bold">{{ $reviewedToday }} / {{ $user->daily_goal }} Selesai</span>
                        </div>
                        <div class="progress" style="height: 10px; background-color: rgba(255,255,255,0.3);">
                            <div class="progress-bar bg-success rounded-pill" role="progressbar" style="width: {{ $progressPercentage }}%" aria-valuenow="{{ $progressPercentage }}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    @if($cardsToStudyToday > 0)
                        <p class="fs-5 mb-4">
                            Kamu masih memiliki <strong>{{ $cardsToStudyToday }} materi</strong> untuk diselesaikan hari ini demi mencapai targetmu.
                        </p>
                        <div>
                            <a href="{{ route('study.index') }}" class="btn btn-light btn-lg fw-bold rounded-pill px-5 text-primary">
                                Lanjutkan Belajar
                            </a>
                        </div>
                    @else
                        <p class="fs-5 mb-4">
                            Luar biasa! Kamu sudah memenuhi target belajar harianmu hari ini. Otakmu butuh istirahat agar memori tersimpan permanen.
                        </p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-success btn-lg fw-bold rounded-pill px-4" disabled>
                                Target Tercapai 🎉
                            </button>
                            <a href="{{ route('study.practice') }}" class="btn btn-outline-light btn-lg fw-bold rounded-pill px-4">
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
                    <div class="card shadow-sm border-0 rounded-4 h-100">
                        <div class="card-body p-4 text-center">
                            <h6 class="text-muted fw-semibold text-uppercase tracking-wide">Total Menunggak</h6>
                            <h1 class="display-4 fw-bold text-danger mb-0">{{ $dueCardsCount }}</h1>
                            <small class="text-muted">Akan dicicil setiap hari</small>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card shadow-sm border-0 rounded-4 h-100">
                        <div class="card-body p-4 text-center">
                            <h6 class="text-muted fw-semibold text-uppercase tracking-wide">Koleksi Materi</h6>
                            <h1 class="display-4 fw-bold text-dark mb-0">{{ $totalCardsCount }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow-sm border-0 rounded-4 mt-4 bg-white overflow-hidden">
        <div class="row g-0">
            @if($dailyVideo)
                <div class="col-md-4">
                    <div class="position-relative h-100">
                        <img src="https://img.youtube.com/vi/{{ $dailyVideo->youtube_id }}/mqdefault.jpg" 
                                class="img-fluid h-100 w-100" 
                                alt="Thumbnail" 
                                style="object-fit: cover; min-height: 150px;">
                        <div class="position-absolute top-50 start-50 translate-middle">
                            <div class="bg-white rounded-circle p-2 shadow-sm opacity-75">
                                <i class="bi bi-play-fill text-primary fs-3"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-light text-primary border border-primary-subtle rounded-pill px-3">
                                Video Recommendation 🎥
                            </span>
                            <small class="text-muted text-uppercase fw-bold" style="font-size: 0.7rem;">
                                {{ $dailyVideo->difficulty }}
                            </small>
                        </div>
                        <h4 class="fw-bold text-dark mb-1">{{ $dailyVideo->title }}</h4>
                        <p class="text-muted mb-3">
                            <i class="bi bi-folder2-open me-1"></i> {{ $dailyVideo->folder->name }}
                        </p>
                        <div class="d-flex gap-2">
                            <a href="{{ route('videos.user.show', $dailyVideo->id) }}" class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
                                Mulai Belajar Sekarang
                            </a>
                            <a href="{{ route('videos.user.index') }}" class="btn btn-link text-decoration-none text-muted fw-semibold">
                                Lihat Library
                            </a>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-12 p-5 text-center">
                    <div class="mb-3">
                        <i class="bi bi-camera-video-off display-4 text-light"></i>
                    </div>
                    <h5 class="fw-bold">Belum ada materi video</h5>
                    <p class="text-muted">Hubungi Admin untuk menambahkan video pembelajaran baru.</p>
                </div>
            @endif
        </div>
    </div>

    {{-- Rekomendasi Materi Hari Ini --}}
    <div class="card shadow-sm border-0 rounded-4 mt-4 overflow-hidden border-start border-4 border-success">
        <div class="card-body p-4">
            @if($randomCategory && $nextLessonToRead)
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="d-flex align-items-center mb-2">
                            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 32px; height: 32px;">
                                <i class="bi {{ $randomCategory->icon }} small"></i>
                            </div>
                            <span class="fw-bold text-success text-uppercase small tracking-wider">Materi Rekomendasi</span>
                        </div>
                        <h4 class="fw-bold mb-1">{{ $nextLessonToRead->title }}</h4>
                        <p class="text-muted mb-3">Kategori: <strong>{{ $randomCategory->name }}</strong></p>
                        
                        <div class="d-flex align-items-center">
                            <a href="{{ route('lessons.user.show', $nextLessonToRead->slug) }}" class="btn btn-success rounded-pill px-4 fw-bold shadow-sm me-3">
                                Lanjut Membaca
                            </a>
                            <div class="flex-grow-1 d-none d-md-block" style="max-width: 200px;">
                                <div class="d-flex justify-content-between mb-1">
                                    <small class="text-muted">Progres Kategori</small>
                                    <small class="fw-bold">{{ $categoryProgress }}%</small>
                                </div>
                                <div class="progress" style="height: 6px;">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: {{ $categoryProgress }}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 d-none d-md-flex justify-content-end">
                        <i class="bi bi-book-half display-1 text-light opacity-50"></i>
                    </div>
                </div>
            @else
                <div class="text-center py-3">
                    <p class="text-muted mb-0 italic">Belum ada materi pelajaran yang tersedia untuk dipelajari.</p>
                </div>
            @endif
        </div>
    </div>

    <div class="row g-4 mt-2">
        <div class="col-md-4">
            <div class="card shadow-sm border-0 rounded-4 h-100" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);">
                <div class="card-body p-4 text-center d-flex flex-column justify-content-center">
                    <h5 class="fw-bold text-dark mb-1">Study Streak</h5>
                    <h1 class="display-1 fw-bold mb-0">
                        {{ $streak }} <span class="fs-1">🔥</span>
                    </h1>
                    <p class="text-dark fw-medium mt-2 mb-0">Hari Berturut-turut!</p>
                    @if($streak == 0)
                        <small class="text-dark opacity-75 mt-2">Ayo mulai belajarmu hari ini!</small>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <div class="card shadow-sm border-0 rounded-4 h-100">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold mb-0">Aktivitas 7 Hari Terakhir 📈</h5>
                    </div>
                    <div style="position: relative; height:200px; width:100%">
                        <canvas id="activityChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        
        // Mengambil data dari controller Laravel
        const labels = @json($chartLabels);
        const dataPoints = @json($chartData);

        // Membuat gradient untuk warna grafik agar terlihat premium
        let gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(13, 110, 253, 0.4)'); // Biru Bootstrap transparan atas
        gradient.addColorStop(1, 'rgba(13, 110, 253, 0.0)'); // Transparan bawah

        const activityChart = new Chart(ctx, {
            type: 'line', // Jenis grafik garis
            data: {
                labels: labels,
                datasets: [{
                    label: 'Flashcard Di-review',
                    data: dataPoints,
                    backgroundColor: gradient,
                    borderColor: '#0d6efd', // Warna garis biru terang
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#0d6efd',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true, // Mengisi area di bawah garis
                    tension: 0.4 // Membuat garisnya melengkung halus (smooth curve)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Sembunyikan legenda agar lebih bersih
                    },
                    tooltip: {
                        backgroundColor: '#212529',
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10 // Kelipatan angka di sumbu Y
                        },
                        grid: {
                            color: '#f8f9fa' // Warna garis bantu belakang yang sangat pudar
                        }
                    },
                    x: {
                        grid: {
                            display: false // Hilangkan garis bantu vertikal
                        }
                    }
                }
            }
        });
    });
</script>
@endsection