@extends('layouts.app')

@section('content')
<div class="container py-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75 flex-column-reverse flex-md-row g-5">
        
        <!-- Left Column: Register Form Card -->
        <div class="col-md-6 col-lg-5">
            <div class="minimal-card shadow-sm">
                <div class="card-body p-4 p-md-5">
                    
                    <div class="text-center mb-5">
                        <h4 class="fw-bold text-theme-main mb-1 tracking-tight">Create Your Account 🚀</h4>
                        <p class="text-theme-muted small fw-medium">Mulai perjalanan belajarmu hari ini.</p>
                    </div>
                    
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <!-- Full Name Input Address Box -->
                        <div class="mb-4">
                            <label for="name" class="form-label-minimal">Full Name</label>
                            <div class="position-relative">
                                <i class="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                <input id="name" type="text" class="form-control form-control-minimal ps-5 @error('name') is-invalid-minimal @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="John Doe">
                            </div>
                            @error('name')
                                <span class="invalid-feedback-minimal mt-1.5 d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <!-- Email Input Address Box -->
                        <div class="mb-4">
                            <label for="email" class="form-label-minimal">Email Address</label>
                            <div class="position-relative">
                                <i class="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                <input id="email" type="email" class="form-control form-control-minimal ps-5 @error('email') is-invalid-minimal @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="name@example.com">
                            </div>
                            @error('email')
                                <span class="invalid-feedback-minimal mt-1.5 d-block" role="alert">
                                    <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <!-- Password Row Inputs Credentials Box -->
                        <div class="row g-3 mb-5">
                            <div class="col-md-6">
                                <label for="password" class="form-label-minimal">Password</label>
                                <div class="position-relative">
                                    <i class="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                    <input id="password" type="password" class="form-control form-control-minimal ps-5 @error('password') is-invalid-minimal @enderror" name="password" required autocomplete="new-password" placeholder="••••••••">
                                </div>
                                @error('password')
                                    <span class="invalid-feedback-minimal mt-1.5 d-block" role="alert">
                                        <i class="bi bi-exclamation-circle me-1"></i> <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            
                            <div class="col-md-6">
                                <label for="password-confirm" class="form-label-minimal">Confirm Password</label>
                                <div class="position-relative">
                                    <i class="bi bi-shield-check position-absolute top-50 start-0 translate-middle-y ms-3 text-theme-muted opacity-50"></i>
                                    <input id="password-confirm" type="password" class="form-control form-control-minimal ps-5" name="password_confirmation" required autocomplete="new-password" placeholder="••••••••">
                                </div>
                            </div>
                        </div>

                        <!-- Submit CTA Action -->
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                                Sign Up Now &rarr;
                            </button>
                        </div>
                        
                        <!-- Anchor Login Navigation Link -->
                        <div class="text-center mt-4 pt-4 border-top-minimal">
                            <p class="text-theme-muted small mb-0">Sudah punya akun? <a href="{{ route('login') }}" class="link-minimal-accent fw-bold ms-1">Login di sini</a></p>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

        <!-- Right Column: Branding & Features Content -->
        <div class="col-md-6 col-lg-5 offset-lg-1 text-center text-md-start">
            <h1 class="display-custom mb-4 tracking-tight">Tinggalkan Cara Lama.</h1>
            <p class="fs-6 text-theme-muted mb-5" style="line-height: 1.6;">Bergabunglah hari ini dan rasakan pengalaman belajar bahasa Inggris yang dirancang untuk memori jangka panjang.</p>
            
            <!-- Minimal Reusable Feature List Rows -->
            <ul class="list-unstyled feature-list text-start d-flex flex-column gap-3">
                <li class="d-flex align-items-center p-3 rounded-3 border-minimal">
                    <div class="rounded-3 d-flex align-items-center justify-content-center p-2 me-3 bg-minimal-badge border-minimal" style="height: 38px; width: 38px; flex-shrink: 0;">
                        <i class="bi bi-check-lg text-success fs-5"></i>
                    </div>
                    <span class="text-theme-main small fw-medium">Kuasai Grammar tanpa pusing menghafal rumus.</span>
                </li>
                <li class="d-flex align-items-center p-3 rounded-3 border-minimal">
                    <div class="rounded-3 d-flex align-items-center justify-content-center p-2 me-3 bg-minimal-badge border-minimal" style="height: 38px; width: 38px; flex-shrink: 0;">
                        <i class="bi bi-check-lg text-success fs-5"></i>
                    </div>
                    <span class="text-theme-main small fw-medium">Biasakan lidah dengan frasa (<span class="text-theme-muted">Phrases</span>) native.</span>
                </li>
                <li class="d-flex align-items-center p-3 rounded-3 border-minimal">
                    <div class="rounded-3 d-flex align-items-center justify-content-center p-2 me-3 bg-minimal-badge border-minimal" style="height: 38px; width: 38px; flex-shrink: 0;">
                        <i class="bi bi-check-lg text-success fs-5"></i>
                    </div>
                    <span class="text-theme-main small fw-medium">Evaluasi progres belajarmu setiap hari.</span>
                </li>
            </ul>
        </div>

    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST AUTH REGISTRATION DESIGN SYSTEM               */
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

/* Feature Checklist Row Interaction Shifts */
.feature-list li {
    background: var(--card-bg);
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
.feature-list li:hover {
    background-color: var(--box-bg);
    border-color: var(--text-muted);
    padding-left: 1.25rem !important; /* Efek geser mikro halus */
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