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
</div>
@endsection