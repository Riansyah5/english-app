@extends('layouts.app')

@section('content')
<div class="container py-5 position-relative z-1">
    <div class="row justify-content-center align-items-center min-vh-75">
        <div class="col-md-7 col-lg-5">
            
            <!-- Main Verification Card -->
            <div class="minimal-card text-center">
                <div class="card-body p-4 p-md-5">
                    
                    <!-- Decorative Graphic Icon -->
                    <div class="mb-4">
                        <div class="rounded-3 d-flex align-items-center justify-content-center mx-auto border-minimal bg-minimal-badge" style="height: 56px; width: 54px;">
                            <i class="bi bi-envelope-check text-primary fs-3"></i>
                        </div>
                    </div>

                    <!-- Header Titles -->
                    <h4 class="fw-bold text-theme-main mb-2 tracking-tight">{{ __('Verify Your Email Address') }}</h4>
                    <p class="text-theme-muted small mb-4 mx-auto" style="max-width: 320px;">
                        {{ __('Before proceeding, please check your email for a verification link.') }}
                    </p>

                    <!-- Alert Notification Resent Link State -->
                    @if (session('resent'))
                        <div class="badge-minimal-success rounded-3 fw-medium p-3 mb-4 d-flex align-items-center justify-content-center small" role="alert">
                            <i class="bi bi-check-circle-fill me-2 fs-6"></i>
                            <span>{{ __('A fresh verification link has been sent to your email address.') }}</span>
                        </div>
                    @endif

                    <div class="border-top-minimal my-4"></div>

                    <!-- Action Trigger Link -->
                    <div class="small text-theme-muted mb-0">
                        <span>{{ __('If you did not receive the email') }},</span>
                        <form class="d-inline ms-1" method="POST" action="{{ route('verification.resend') }}">
                            @csrf
                            <button type="submit" class="link-minimal-accent fw-bold border-0 bg-transparent p-0 align-baseline">{{ __('click here to request another') }}</button>.
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
@endsection

@section('styles')
<style>
/* ======================================================== */
/* MINIMALIST EMAIL VERIFICATION DESIGN SYSTEM               */
/* ======================================================== */

[data-theme="dark"] {
    --card-bg: #1e2530;
    --card-border: rgba(255, 255, 255, 0.04);
    --badge-bg: rgba(255, 255, 255, 0.03);
    
    --accent-primary: #3b82f6;
    --accent-success: #10b981;
}

[data-theme="light"] {
    --card-bg: #ffffff;
    --card-border: rgba(0, 0, 0, 0.05);
    --badge-bg: rgba(0, 0, 0, 0.02);
    
    --accent-primary: #2563eb;
    --accent-success: #059669;
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

/* Interactive Links Override Hooks */
.link-minimal-accent {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.15s ease;
}
.link-minimal-accent:hover {
    color: var(--text-main);
}

.min-vh-75 { min-height: 70vh; }
</style>
@endsection