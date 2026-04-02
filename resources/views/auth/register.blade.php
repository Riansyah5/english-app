@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - REGISTER PAGE                 */
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
        opacity: 0.4;
        pointer-events: none;
    }
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 70%); } /* Emerald Glow */
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%); } /* Indigo Glow */
    .glow-3 { top: 40%; right: 20%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%); } /* Cyan Glow */

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-green { color: #34d399; text-shadow: 0 0 15px rgba(52, 211, 153, 0.5); }
    .neon-red { color: #fb7185; }

    /* Main Typography */
    .display-custom {
        font-size: 3rem;
        font-weight: 800;
        letter-spacing: -1px;
        line-height: 1.2;
        background: linear-gradient(135deg, #ffffff 0%, #6ee7b7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
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
        background: linear-gradient(90deg, #10b981, #3b82f6);
        z-index: 1;
    }

    /* Glass Form Inputs */
    .form-control-glass {
        background: rgba(15, 23, 42, 0.4) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: #f8fafc !important;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
        padding-left: 2.75rem; /* Space for icons */
    }
    .form-control-glass:focus {
        background: rgba(15, 23, 42, 0.8) !important;
        border-color: rgba(52, 211, 153, 0.5) !important;
        box-shadow: 0 0 15px rgba(52, 211, 153, 0.2) !important;
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

    /* Buttons & Links */
    .btn-neon-success {
        background: linear-gradient(135deg, #059669, #10b981);
        border: none;
        color: white;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        transition: all 0.3s ease;
        letter-spacing: 1px;
    }
    .btn-neon-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.6);
        color: white;
    }

    .link-neon {
        color: #34d399;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    .link-neon:hover {
        color: #fff;
        text-shadow: 0 0 10px rgba(52, 211, 153, 0.8);
    }

    /* Labels */
    .form-label {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        font-size: 0.85rem;
        text-transform: uppercase;
    }

    /* Feature List Styling */
    .feature-list li {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
        transition: all 0.3s ease;
    }
    .feature-list li:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(52, 211, 153, 0.3);
        transform: translateX(10px);
    }

    /* Custom Height Utility */
    .min-vh-75 { min-height: 85vh; }
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>
<div class="ambient-glow glow-3"></div>

<div class="container mt-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75 flex-column-reverse flex-md-row">
        
        <div class="col-md-6 col-lg-5 mb-5 mb-md-0">
            <div class="glass-card">
                <div class="card-body p-4 p-md-5 position-relative z-1">
                    
                    <div class="text-center mb-5">
                        <h3 class="fw-bold text-white text-glow mb-2" style="letter-spacing: -0.5px;">Create Your Account 🚀</h3>
                        <p class="text-slate small fw-medium">Mulai perjalanan belajarmu hari ini.</p>
                    </div>
                    
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="mb-4">
                            <label for="name" class="form-label fw-bold">Full Name</label>
                            <div class="position-relative">
                                <i class="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-slate fs-5"></i>
                                <input id="name" type="text" class="form-control form-control-lg form-control-glass @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="John Doe">
                            </div>
                            @error('name')
                                <span class="invalid-feedback d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="email" class="form-label fw-bold">Email Address</label>
                            <div class="position-relative">
                                <i class="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-slate fs-5"></i>
                                <input id="email" type="email" class="form-control form-control-lg form-control-glass @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="name@example.com">
                            </div>
                            @error('email')
                                <span class="invalid-feedback d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="row g-3 mb-5">
                            <div class="col-md-6">
                                <label for="password" class="form-label fw-bold">Password</label>
                                <div class="position-relative">
                                    <i class="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-slate fs-5"></i>
                                    <input id="password" type="password" class="form-control form-control-lg form-control-glass @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" placeholder="••••••••">
                                </div>
                                @error('password')
                                    <span class="invalid-feedback d-block" role="alert">
                                        <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            
                            <div class="col-md-6">
                                <label for="password-confirm" class="form-label fw-bold">Confirm Password</label>
                                <div class="position-relative">
                                    <i class="bi bi-shield-check position-absolute top-50 start-0 translate-middle-y ms-3 text-slate fs-5"></i>
                                    <input id="password-confirm" type="password" class="form-control form-control-lg form-control-glass" name="password_confirmation" required autocomplete="new-password" placeholder="••••••••">
                                </div>
                            </div>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-neon-success btn-lg fw-bold rounded-pill py-3 d-flex justify-content-center align-items-center gap-2">
                                Sign Up Now <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                        
                        <div class="text-center mt-4 pt-3 border-top" style="border-color: rgba(255,255,255,0.1) !important;">
                            <p class="text-slate mb-0">Sudah punya akun? <a href="{{ route('login') }}" class="link-neon fw-bold">Login di sini</a></p>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-lg-5 offset-lg-1 text-center text-md-start mb-5 mb-md-0">
            <h2 class="display-custom mb-4">Tinggalkan Cara Lama.</h2>
            <p class="fs-5 text-slate mb-5" style="line-height: 1.6;">Bergabunglah hari ini dan rasakan pengalaman belajar bahasa Inggris yang dirancang untuk memori jangka panjang.</p>
            
            <ul class="list-unstyled feature-list text-start">
                <li class="mb-3 d-flex align-items-center">
                    <div class="rounded-circle d-flex align-items-center justify-content-center p-2 me-3" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); height: 40px; width: 40px;">
                        <i class="bi bi-check-lg neon-green fs-5"></i>
                    </div>
                    <span class="text-white fw-medium">Kuasai Grammar tanpa pusing menghafal rumus.</span>
                </li>
                <li class="mb-3 d-flex align-items-center">
                    <div class="rounded-circle d-flex align-items-center justify-content-center p-2 me-3" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); height: 40px; width: 40px;">
                        <i class="bi bi-check-lg neon-green fs-5"></i>
                    </div>
                    <span class="text-white fw-medium">Biasakan lidah dengan frasa (<i class="text-slate">Phrases</i>) native.</span>
                </li>
                <li class="mb-3 d-flex align-items-center">
                    <div class="rounded-circle d-flex align-items-center justify-content-center p-2 me-3" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); height: 40px; width: 40px;">
                        <i class="bi bi-check-lg neon-green fs-5"></i>
                    </div>
                    <span class="text-white fw-medium">Evaluasi progres belajarmu setiap hari.</span>
                </li>
            </ul>
        </div>

    </div>
</div>
@endsection