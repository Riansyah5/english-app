@extends('layouts.app')

@section('content')
<div class="container py-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75 g-5">
        
        <!-- Left Column: Branding Content -->
        <div class="col-md-6 col-lg-5 text-center text-md-start pe-lg-5">
            <h1 class="display-custom mb-4 tracking-tight">Master English Today.</h1>
            <p class="fs-6 text-theme-muted mt-3" style="line-height: 1.6;">
                Tingkatkan kemampuan <span class="text-theme-main fw-semibold">Grammar</span> dan <span class="text-theme-main fw-semibold">Speaking</span> Anda dengan metode belajar yang terbukti secara ilmiah. Masuk sekarang dan lanjutkan progres belajarmu!
            </p>
            
            <!-- Minimal Geometric Icons Badge Row -->
            <div class="d-none d-md-flex gap-2.5 mt-5 opacity-60">
                <div class="rounded-3 d-flex align-items-center justify-content-center border-minimal bg-minimal-badge" style="height: 44px; width: 44px;">
                    <i class="bi bi-book text-theme-main fs-5"></i>
                </div>
                <div class="rounded-3 d-flex align-items-center justify-content-center border-minimal bg-minimal-badge" style="height: 44px; width: 44px;">
                    <i class="bi bi-mic text-theme-main fs-5"></i>
                </div>
                <div class="rounded-3 d-flex align-items-center justify-content-center border-minimal bg-minimal-badge" style="height: 44px; width: 44px;">
                    <i class="bi bi-graph-up-arrow text-theme-main fs-5"></i>
                </div>
            </div>
        </div>

        <!-- Right Column: Login Credential Form Card -->
        <div class="col-md-6 col-lg-5">
            <div class="minimal-card shadow-sm">
                <div class="card-body p-4 p-md-5">
                    
                    <div class="text-center mb-5">
                        <h4 class="fw-bold text-theme-main mb-1 tracking-tight">Welcome Back! 👋</h4>
                        <p class="text-theme-muted small fw-medium">Silakan masuk ke akun Anda</p>
                    </div>
                    
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <!-- Email Input Address Box -->
                        <div class="mb-4">
                            <label for="email" class="form-label-minimal">Email Address</label>
                            <div class="position-relative">
                                <i class="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                <input id="email" type="email" class="form-control form-control-minimal ps-5 @error('email') is-invalid-minimal @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="name@example.com">
                            </div>
                            @error('email')
                                <span class="invalid-feedback-minimal mt-1.5 d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <!-- Password Input Credentials Box -->
                        <div class="mb-4">
                            <div class="d-flex justify-content-between align-items-center mb-1.5">
                                <label for="password" class="form-label-minimal mb-0">Password</label>
                                @if (Route::has('password.request'))
                                    <a class="link-minimal-accent small fw-semibold" href="{{ route('password.request') }}" style="font-size: 0.8rem;">
                                        Forgot Password?
                                    </a>
                                @endif
                            </div>
                            <div class="position-relative">
                                <i class="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                <input id="password" type="password" class="form-control form-control-minimal ps-5 @error('password') is-invalid-minimal @enderror" name="password" required autocomplete="current-password" placeholder="••••••••">
                            </div>
                            @error('password')
                                <span class="invalid-feedback-minimal mt-1.5 d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <!-- Remember Active Session State -->
                        <div class="mb-4">
                            <div class="form-check d-flex align-items-center gap-2">
                                <input class="form-check-input mt-0" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="form-check-label text-theme-muted small fw-medium pt-0.5" for="remember" style="cursor: pointer; user-select: none;">
                                    Remember Me
                                </label>
                            </div>
                        </div>

                        <!-- Submit CTA Action -->
                        <div class="d-grid gap-2 mt-2">
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                                Start Learning &rarr;
                            </button>
                        </div>
                        
                        <!-- Anchor Register Navigation Link -->
                        @if (Route::has('register'))
                            <div class="text-center mt-4 pt-4 border-top-minimal">
                                <p class="text-theme-muted small mb-0">Belum punya akun? <a href="{{ route('register') }}" class="link-minimal-accent fw-bold ms-1">Daftar sekarang</a></p>
                            </div>
                        @endif
                        
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST AUTH LOG-IN DESIGN SYSTEM                     */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --box-bg: rgba(255, 255, 255, 0.02);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    --text-gradient-end: #cbd5e1;
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --box-bg: #f8fafc;
    --badge-bg: rgba(0, 0, 0, 0.02);
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    --text-gradient-end: #1e293b;
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
    --accent-danger: #dc2626;
}

/* Base Structural Containers Layout */
.minimal-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 20px -10px rgba(0, 0, 0, 0.08);
}

.border-top-minimal { border-top: 1px solid var(--card-border); }
.border-minimal { border: 1px solid var(--card-border); }
.bg-minimal-badge { background: var(--badge-bg); }
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }

/* Editorial Hero Header Typography */
.display-custom {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    background: linear-gradient(135deg, var(--text-main) 30%, var(--text-gradient-end) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.form-label-minimal {
    color: var(--text-main);
    font-size: 0.775rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
    display: block;
}

.link-minimal-accent {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.15s ease;
}
.link-minimal-accent:hover {
    color: var(--text-main);
}

/* ======================================================== */
/* FLAT CLEAN FORM CONTROL FIELDS                           */
/* ======================================================== */
.form-control-minimal {
    background: var(--input-bg) !important;
    border: 1px solid var(--card-border) !important;
    color: var(--text-main) !important;
    border-radius: 0.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.925rem;
    transition: all 0.2s ease-in-out;
}
.form-control-minimal:focus {
    background: var(--input-focus-bg) !important;
    border-color: var(--text-muted) !important;
    box-shadow: none !important;
}
.form-control-minimal::placeholder {
    color: var(--text-muted) !important;
    opacity: 0.4;
}

/* Bootstrap Checkbox Clean Customization Override */
.form-check-input {
    background-color: var(--input-bg);
    border: 1px solid var(--card-border);
    cursor: pointer;
    width: 1.15em;
    height: 1.15em;
}
.form-check-input:checked {
    background-color: var(--accent-primary);
    border-color: transparent;
    box-shadow: none;
}
.form-check-input:focus {
    box-shadow: none;
    border-color: var(--text-muted);
}

/* Validation Exceptions Handling Mapping Hooks */
.is-invalid-minimal {
    border-color: var(--accent-danger) !important;
}
.invalid-feedback-minimal {
    color: var(--accent-danger);
    font-size: 0.8rem;
    font-weight: 500;
}

/* Reusable Custom Button Component Architecture */
.btn-minimal {
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}
.btn-minimal-primary {
    background: var(--accent-primary);
    color: #ffffff !important;
    border: none;
}
.btn-minimal-primary:hover {
    filter: brightness(1.08);
}
.btn-minimal-secondary {
    background: transparent;
    color: var(--text-main) !important;
    border: 1px solid var(--card-border);
}
.btn-minimal-secondary:hover {
    background: var(--input-bg);
}

.min-vh-75 { min-height: 75vh; }
</style>
@endsection