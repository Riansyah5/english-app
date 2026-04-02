<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'English-App') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito:400,600,700" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <style>
        /* Base Dark Theme */
        body {
            background-color: #0b0f19;
            color: #f8fafc;
            min-height: 100vh;
            font-family: 'Nunito', sans-serif;
            position: relative;
            overflow-x: hidden;
        }

        /* Ambient Background Glows (Global) */
        body::before, body::after {
            content: '';
            position: fixed;
            border-radius: 50%;
            filter: blur(120px);
            z-index: -1;
            opacity: 0.4;
            pointer-events: none;
        }
        body::before {
            top: -10%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%);
        }
        body::after {
            bottom: -20%;
            right: -10%;
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%);
        }

        /* Glass Navbar */
        .glass-navbar {
            background: rgba(11, 15, 25, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
            color: #ffffff !important;
            font-weight: 700;
            letter-spacing: 1px;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        /* Nav Links */
        .nav-link {
            color: #94a3b8 !important;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-link:hover, .nav-link.active {
            color: #38bdf8 !important; /* Neon Blue */
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }

        /* Admin Nav Link Exception */
        .nav-link.admin-link {
            color: #fb7185 !important;
        }
        .nav-link.admin-link:hover {
            color: #f43f5e !important;
            text-shadow: 0 0 10px rgba(244, 63, 94, 0.4);
        }

        /* Glass Dropdown Menus */
        .dropdown-menu {
            background: rgba(20, 25, 40, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-radius: 12px;
            padding: 0.5rem 0;
        }

        .dropdown-item {
            color: #cbd5e1;
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 0.5rem 1.5rem;
        }

        .dropdown-item:hover, .dropdown-item:focus {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }

        .dropdown-header {
            color: #38bdf8;
            font-weight: 700;
            letter-spacing: 1px;
            font-size: 0.75rem;
        }

        .dropdown-divider {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Navbar Toggler for Mobile */
        .navbar-toggler {
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
        }
        .navbar-toggler:focus {
            box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25);
        }
        .navbar-toggler-icon {
            filter: invert(1) opacity(0.8);
        }

        /* Utilities */
        .border-start {
            border-left-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        /* SweetAlert Dark Theme Override */
        .glass-swal {
            background: rgba(20, 25, 40, 0.9) !important;
            backdrop-filter: blur(16px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: #fff !important;
            box-shadow: 0 15px 50px rgba(0,0,0,0.5) !important;
        }
    </style>

    @yield('styles')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md glass-navbar sticky-top">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        @auth
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">Dashboard</a>
                        </li>
                        <li class="nav-item dropdown border-start ms-2 ps-2">
                            <a class="nav-link dropdown-toggle {{ request()->routeIs('study.*') ? 'active' : '' }}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ruang Belajar
                            </a>
                            <ul class="dropdown-menu mt-2">
                                <li><a class="dropdown-item" href="{{ route('study.index') }}">Flashcard Interaktif</a></li>
                                <li><a class="dropdown-item" href="{{ route('lessons.user.index') }}">Buku Materi Digital</a></li>
                                {{-- <li><a class="dropdown-item" href="{{ route('study.lessons') }}">Buku Materi Digital</a></li>
                                <li><a class="dropdown-item" href="{{ route('study.videos') }}">Video Learning</a></li> --}}
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('videos.user.index') ? 'active' : '' }}" href="{{ route('videos.user.index') }}">Video Learning</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('exams.*') ? 'active' : '' }}" href="{{ route('exams.index') }}">Evaluasi (CBT)</a>
                        </li>
                        @endauth
                        
                        @if(Auth::check() && Auth::user()->is_admin)
                        <li class="nav-item dropdown border-start ms-2 ps-2">
                            <a class="nav-link dropdown-toggle admin-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin Panel 🔒
                            </a>
                            <ul class="dropdown-menu mt-2">
                                <li><a class="dropdown-item" href="{{ route('admin.study-items.index') }}">Kelola Materi Flashcard</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><h6 class="dropdown-header">Video Learning</h6></li>
                                <li><a class="dropdown-item" href="{{ route('admin.video-folders.index') }}">Kelola Folder</a></li>
                                <li><a class="dropdown-item" href="{{ route('admin.videos.index') }}">Kelola Video</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><h6 class="dropdown-header">Buku & Materi</h6></li>
                                <li><a class="dropdown-item" href="{{ route('admin.lesson-categories.index') }}">Kelola Kategori</a></li>
                                <li><a class="dropdown-item" href="{{ route('admin.lessons.index') }}">Tulis Materi</a></li>
                            </ul>
                        </li>
                        @endif
                    </ul>

                    <ul class="navbar-nav ms-auto">
                        @guest
                            @if (Route::has('login'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @endif

                            @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link border-start ms-2 ps-3" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="bi bi-person-circle me-1"></i> {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('profile.edit') }}">
                                        <i class="bi bi-gear me-2 opacity-75"></i> Profil & Target
                                    </a>

                                    <a class="dropdown-item text-danger mt-1" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="bi bi-box-arrow-right me-2 opacity-75"></i> {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4 position-relative z-1">
            @yield('content')
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    @if(session('success'))
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: "{{ session('success') }}",
            showConfirmButton: false,
            timer: 2000,
            background: 'rgba(20, 25, 40, 0.95)',
            color: '#ffffff',
            backdrop: 'rgba(0, 0, 0, 0.6)',
            customClass: {
                popup: 'glass-swal',
                title: 'text-glow'
            }
        });
    </script>
    @endif

    @yield('scripts')
</body>
</html>