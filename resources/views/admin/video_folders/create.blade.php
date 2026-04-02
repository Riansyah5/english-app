@extends('layouts.app')

@section('styles')
<style>
    /* ======================================================== */
    /* PREMIUM GLASSMORPHISM UI - FORM INPUTS                   */
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
    .glow-1 { top: -10%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%); }
    .glow-2 { bottom: -20%; right: -10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%); }

    /* Typography & Utilities */
    .text-slate { color: #94a3b8 !important; }
    .text-glow { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
    .neon-red { color: #fb7185; text-shadow: 0 0 10px rgba(251, 113, 133, 0.4); }
    .neon-blue { color: #38bdf8; }

    /* Glass Components */
    .glass-card {
        background: rgba(20, 25, 40, 0.5);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
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
        height: 3px;
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
    }
    .form-control-glass:focus {
        background: rgba(15, 23, 42, 0.8) !important;
        border-color: rgba(56, 189, 248, 0.5) !important;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.2) !important;
        color: #ffffff !important;
    }
    .form-control-glass::placeholder {
        color: #64748b !important;
        opacity: 0.8;
    }

    /* Buttons */
    .btn-glass-back {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        transition: all 0.3s ease;
    }
    .btn-glass-back:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        transform: translateX(-3px);
    }

    .btn-neon-primary {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        border: none;
        color: white;
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transition: all 0.3s ease;
    }
    .btn-neon-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.6);
        color: white;
    }

    /* Labels & Links */
    .form-label {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        font-size: 0.95rem;
        text-transform: uppercase;
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
</style>
@endsection

@section('content')
<div class="ambient-glow glow-1"></div>
<div class="ambient-glow glow-2"></div>

<div class="container py-4 position-relative z-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            
            <div class="d-flex align-items-center mb-5">
                <a href="{{ route('admin.video-folders.index') }}" class="btn btn-glass-back rounded-circle me-3 shadow-sm" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                    <i class="bi bi-arrow-left fs-5"></i>
                </a>
                <div>
                    <h3 class="fw-bold mb-1 text-white text-glow" style="letter-spacing: -0.5px;">Tambah Folder Baru 📁</h3>
                    <p class="text-slate mb-0 fw-medium">Buat kategori baru untuk mengelompokkan video.</p>
                </div>
            </div>

            <div class="glass-card">
                <div class="card-body p-4 p-md-5">
                    <form action="{{ route('admin.video-folders.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-4">
                            <label class="form-label fw-bold">Nama Folder <span class="neon-red">*</span></label>
                            <input type="text" name="name" class="form-control form-control-lg form-control-glass" placeholder="Misal: School Conversations" required autofocus>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold">Deskripsi <span class="text-slate fw-normal text-capitalize ms-1">(Opsional)</span></label>
                            <textarea name="description" class="form-control form-control-glass" rows="3" placeholder="Penjelasan singkat mengenai isi folder ini..."></textarea>
                        </div>

                        <hr class="my-4" style="border-color: rgba(255, 255, 255, 0.1);">

                        <div class="mb-5">
                            <label class="form-label fw-bold d-flex align-items-center gap-2">
                                Ikon Bootstrap <span class="text-slate fw-normal text-capitalize">(Opsional)</span>
                            </label>
                            
                            <div class="position-relative">
                                <i class="bi bi-bootstrap position-absolute top-50 start-0 translate-middle-y ms-3 text-slate fs-5"></i>
                                <input type="text" name="icon" class="form-control form-control-lg form-control-glass ps-5" placeholder="Misal: bi-camera-video" value="bi-folder-fill">
                            </div>
                            
                            <small class="text-slate mt-2 d-block fw-medium">
                                <i class="bi bi-info-circle me-1"></i>Kosongkan jika ingin menggunakan ikon folder standar. (Referensi: <a href="https://icons.getbootstrap.com/" target="_blank" class="link-neon fw-bold">Bootstrap Icons</a>)
                            </small>
                        </div>

                        <div class="d-grid mt-5 pt-2">
                            <button type="submit" class="btn btn-neon-primary btn-lg fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2">
                                <i class="bi bi-folder-plus fs-5"></i> Simpan Folder
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection