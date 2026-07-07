@extends('layouts.app')

@section('content')
<div class="container py-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75">
        <div class="col-md-7 col-lg-5">
            
            <!-- Main Request Reset Card -->
            <div class="minimal-card">
                <div class="card-body p-4 p-md-5">
                    
                    <!-- Graphic Icon Section -->
                    <div class="text-center mb-4">
                        <div class="rounded-3 d-flex align-items-center justify-content-center mx-auto border-minimal bg-minimal-badge" style="height: 52px; width: 52px;">
                            <i class="bi bi-shield-lock text-primary fs-4"></i>
                        </div>
                    </div>

                    <!-- Header Titles -->
                    <div class="text-center mb-5">
                        <h4 class="fw-bold text-theme-main mb-1 tracking-tight">{{ __('Reset Password') }}</h4>
                        <p class="text-theme-muted small mb-0 mx-auto" style="max-width: 280px;">
                            Masukkan email Anda untuk menerima tautan pemulihan kata sandi.
                        </p>
                    </div>

                    <!-- Session Notification Alert Status State -->
                    @if (session('status'))
                        <div class="badge-minimal-success rounded-3 fw-medium p-3 mb-4 d-flex align-items-center justify-content-center small" role="alert">
                            <i class="bi bi-check-circle-fill me-2 fs-6"></i>
                            <span>{{ session('status') }}</span>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <!-- Email Input Address Block -->
                        <div class="mb-4">
                            <label for="email" class="form-label-minimal">{{ __('Email Address') }}</label>
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

                        <!-- Submit Action Button -->
                        <div class="d-grid mt-4">
                            <button type="submit" class="btn btn-minimal btn-minimal-primary py-2.5">
                                {{ __('Send Password Reset Link') }}
                            </button>
                        </div>
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
/* MINIMALIST REQUEST RESET PASSWORD DESIGN SYSTEM         */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --badge-bg: rgba(255, 255, 255, 0.03);
    --input-bg: #131822;
    --input-focus-bg: #10141d;
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
    --accent-danger: #f43f5e;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --badge-bg: rgba(0, 0, 0, 0.02);
    --input-bg: #f8fafc;
    --input-focus-bg: #ffffff;
    
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

.border-minimal { border: 1px solid var(--card-border); }
.bg-minimal-badge { background: var(--badge-bg); }
.badge-minimal-success { background: rgba(16, 185, 129, 0.06); color: var(--accent-success); }

/* Form Component Labels */
.form-label-minimal {
    color: var(--text-main);
    font-size: 0.775rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
    display: block;
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

.min-vh-75 { min-height: 70vh; }
</style>
@endsection