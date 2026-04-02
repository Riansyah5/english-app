@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - LOGIN PAGE                    */
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
        opacity: 0.5;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%); }
    .glow-3 { top: 40%; right: 10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-blue { color: #38bdf8; text-shadow: 0 0 15px rgba(56, 189, 248, 0.5); }
    .neon-red { color: #fb7185; }

    /* Main Typography */
    .display-custom {
        font-size: 3.5rem;
        font-weight: 800;
        letter-spacing: -1.5px;
        line-height: 1.1;
        background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #38bdf8);
        z-index: 1;
    }

    /* Glass Form Inputs */
    .form-control-glass {
        background: rgba(15, 23, 42, 0.4) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: #f8fafc !important;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
        padding-left: 1.25rem;
    }
    .form-control-glass:focus {
        background: rgba(15, 23, 42, 0.8) !important;
        border-color: rgba(56, 189, 248, 0.5) !important;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.2) !important;
        color: #ffffff !important;
    }
    .form-control-glass::placeholder {
        color: #64748b !important;
        opacity: 0.7;
    }

    /* Validation Errors */
    .is-invalid {
        border-color: rgba(244, 63, 94, 0.5) !important;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.1) !important;
    }
    .invalid-feedback {
        color: #fb7185;
        font-weight: 500;
        letter-spacing: 0.3px;
        margin-top: 0.5rem;
    }

    /* Custom Checkbox */
    .form-check-input {
        background-color: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
    }
    .form-check-input:checked {
        background-color: #3b82f6;
        border-color: #3b82f6;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
    .form-check-input:focus {
        box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
    }

    /* Buttons & Links */
    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
        letter-spacing: 1px;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(79, 70, 229, 0.6);
        color: white;
    }

    .link-neon {
        color: #38bdf8;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    .link-neon:hover {
        color: #fff;
        text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
    }

    /* Labels */
    .form-label {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        font-size: 0.85rem;
        text-transform: uppercase;
    }

    /* Custom Height Utility */
    .min-vh-75 { min-height: 80vh; }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>
<div class="ambient-glow glow-3"></div>

<div class="container mt-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75">
        
        <div class="col-md-5 text-center text-md-start mb-5 mb-md-0 pe-md-5">
            <h1 class="display-custom mb-3">Master English Today.</h1>
            <p class="fs-5 text-slate mt-4" style="line-height: 1.6; letter-spacing: 0.5px;">
                Tingkatkan kemampuan <strong class="text-white text-glow">Grammar</strong> dan <strong class="text-white text-glow">Speaking</strong> Anda dengan metode belajar yang terbukti secara ilmiah. Masuk sekarang dan lanjutkan progres belajarmu!
            </p>
            
            <div class="d-none d-md-flex gap-3 mt-5 opacity-75">
                <div class="p-3 rounded-circle d-flex align-items-center justify-content-center" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); height: 60px; width: 60px;">
                    <i class="bi bi-book fs-4 text-white"></i>
                </div>
                <div class="p-3 rounded-circle d-flex align-items-center justify-content-center" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); height: 60px; width: 60px;">
                    <i class="bi bi-mic fs-4 text-white"></i>
                </div>
                <div class="p-3 rounded-circle d-flex align-items-center justify-content-center" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); height: 60px; width: 60px;">
                    <i class="bi bi-graph-up-arrow fs-4 text-white"></i>
                </div>
            </div>
        </div>

        <div class="col-md-5">
            <div class="glass-card">
                <div class="card-body p-4 p-md-5 position-relative z-1">
                    
                    <div class="text-center mb-5">
                        <h3 class="fw-bold text-white text-glow mb-2" style="letter-spacing: -0.5px;">Welcome Back! 👋</h3>
                        <p class="text-slate small fw-medium">Silakan masuk ke akun Anda</p>
                    </div>
                    
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="mb-4">
                            <label for="email" class="form-label fw-bold">Email Address</label>
                            <div class="position-relative">
                                <i class="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-slate"></i>
                                <input id="email" type="email" class="form-control form-control-lg form-control-glass ps-5 @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="name@example.com">
                            </div>
                            @error('email')
                                <span class="invalid-feedback d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <label for="password" class="form-label fw-bold mb-0">Password</label>
                                @if (Route::has('password.request'))
                                    <a class="link-neon small fw-semibold" href="{{ route('password.request') }}">
                                        Forgot Password?
                                    </a>
                                @endif
                            </div>
                            <div class="position-relative mt-2">
                                <i class="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-slate"></i>
                                <input id="password" type="password" class="form-control form-control-lg form-control-glass ps-5 @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="••••••••">
                            </div>
                            @error('password')
                                <span class="invalid-feedback d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-5">
                            <div class="form-check d-flex align-items-center gap-2">
                                <input class="form-check-input mt-0" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="form-check-label text-slate fw-medium pt-1" for="remember" style="cursor: pointer;">
                                    Remember Me
                                </label>
                            </div>
                        </div>

                        <div class="d-grid gap-2 mt-2">
                            <button type="submit" class="btn btn-neon-primary btn-lg fw-bold rounded-pill py-3">
                                Start Learning &rarr;
                            </button>
                        </div>
                        
                        @if (Route::has('register'))
                            <div class="text-center mt-4 pt-2 border-top" style="border-color: rgba(255,255,255,0.1) !important;">
                                <p class="text-slate mb-0">Belum punya akun? <a href="{{ route('register') }}" class="link-neon fw-bold">Daftar sekarang</a></p>
                            </div>
                        @endif
                        
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection