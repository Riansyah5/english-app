@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center align-items-center min-vh-75">
        
        <div class="col-md-5 text-center text-md-start mb-5 mb-md-0 pe-md-5">
            <h1 class="fw-bold text-primary display-5">Master English Today.</h1>
            <p class="lead text-muted mt-3">
                Tingkatkan kemampuan <strong>Grammar</strong> dan <strong>Speaking</strong> Anda dengan metode belajar yang terbukti secara ilmiah. Masuk sekarang dan lanjutkan progres belajarmu!
            </p>
        </div>

        <div class="col-md-5">
            <div class="card shadow border-0 rounded-4">
                <div class="card-body p-4 p-md-5">
                    <h3 class="fw-bold mb-4 text-center">Welcome Back! 👋</h3>
                    
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="email" class="form-label fw-semibold">Email Address</label>
                            <input id="email" type="email" class="form-control form-control-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="name@example.com">
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="password" class="form-label fw-semibold">Password</label>
                            <input id="password" type="password" class="form-control form-control-lg @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="••••••••">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-4 d-flex justify-content-between align-items-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="form-check-label text-muted" for="remember">
                                    Remember Me
                                </label>
                            </div>
                            @if (Route::has('password.request'))
                                <a class="text-decoration-none small text-primary fw-semibold" href="{{ route('password.request') }}">
                                    Forgot Password?
                                </a>
                            @endif
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-3">
                                Start Learning
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
@section('styles')
<style>
    /* Sedikit custom CSS untuk memastikan area vertikal cukup tinggi */
    .min-vh-75 { min-height: 75vh; }
</style>
@endsection
@endsection