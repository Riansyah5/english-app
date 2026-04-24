<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
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

    <script>
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>

    <style>
        /* CSS Variables - Dark Mode (Default) */
        :root, [data-theme="dark"] {
            --bg-body: #0b0f19;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --glow-1: rgba(99, 102, 241, 0.5);
            --glow-2: rgba(236, 72, 153, 0.3);
            --nav-bg: rgba(11, 15, 25, 0.7);
            --nav-border: rgba(255, 255, 255, 0.08);
            --nav-link: #94a3b8;
            --dropdown-bg: rgba(20, 25, 40, 0.85);
            --dropdown-item: #cbd5e1;
            --dropdown-hover: rgba(255, 255, 255, 0.1);
            --dropdown-border: rgba(255, 255, 255, 0.1);
            --swal-bg: rgba(20, 25, 40, 0.95);
            --swal-color: #ffffff;
            --toggler-bg: rgba(255, 255, 255, 0.1);
        }

        /* CSS Variables - Light Mode */
        [data-theme="light"] {
            --bg-body: #f8fafc;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --glow-1: rgba(99, 102, 241, 0.15);
            --glow-2: rgba(236, 72, 153, 0.15);
            --nav-bg: rgba(255, 255, 255, 0.7);
            --nav-border: rgba(0, 0, 0, 0.05);
            --nav-link: #475569;
            --dropdown-bg: rgba(255, 255, 255, 0.9);
            --dropdown-item: #334155;
            --dropdown-hover: rgba(0, 0, 0, 0.05);
            --dropdown-border: rgba(0, 0, 0, 0.05);
            --swal-bg: rgba(255, 255, 255, 0.95);
            --swal-color: #0f172a;
            --toggler-bg: rgba(0, 0, 0, 0.05);
        }

        /* Base Theme Application */
        body {
            background-color: var(--bg-body);
            color: var(--text-main);
            min-height: 100vh;
            font-family: 'Nunito', sans-serif;
            position: relative;
            overflow-x: hidden;
            transition: background-color 0.4s ease, color 0.4s ease;
        }

        /* Ambient Background Glows */
        body::before, body::after {
            content: '';
            position: fixed;
            border-radius: 50%;
            filter: blur(120px);
            z-index: -1;
            pointer-events: none;
            transition: background 0.4s ease;
        }
        body::before {
            top: -10%; left: -10%; width: 600px; height: 600px;
            background: radial-gradient(circle, var(--glow-1), transparent 70%);
        }
        body::after {
            bottom: -20%; right: -10%; width: 700px; height: 700px;
            background: radial-gradient(circle, var(--glow-2), transparent 70%);
        }

        /* Utility Classes (to replace static text-white/text-muted) */
        .text-theme-main { color: var(--text-main) !important; transition: color 0.4s ease; }
        .text-theme-muted { color: var(--text-muted) !important; transition: color 0.4s ease; }

        /* Glass Navbar */
        .glass-navbar {
            background: var(--nav-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--nav-border);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
            transition: background 0.4s ease, border-color 0.4s ease;
        }

        .navbar-brand {
            color: var(--text-main) !important;
            font-weight: 700;
            letter-spacing: 1px;
            text-shadow: 0 0 15px rgba(148, 163, 184, 0.2);
            transition: color 0.4s ease;
        }

        .nav-link {
            color: var(--nav-link) !important;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
        }
        .nav-link:hover, .nav-link.active {
            color: #38bdf8 !important; 
            text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }
        .nav-link.admin-link { color: #fb7185 !important; }
        .nav-link.admin-link:hover { color: #f43f5e !important; text-shadow: 0 0 10px rgba(244, 63, 94, 0.4); }

        /* Dropdowns */
        .dropdown-menu {
            background: var(--dropdown-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--dropdown-border);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            padding: 0.5rem 0;
            transition: background 0.4s ease, border-color 0.4s ease;
        }
        .dropdown-item {
            color: var(--dropdown-item);
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 0.5rem 1.5rem;
        }
        .dropdown-item:hover, .dropdown-item:focus {
            background: var(--dropdown-hover);
            color: var(--text-main);
        }
        .dropdown-header { color: #38bdf8; font-weight: 700; letter-spacing: 1px; font-size: 0.75rem; }
        .dropdown-divider { border-top: 1px solid var(--dropdown-border); }

        /* Theme Toggler Button */
        .theme-toggle-btn {
            background: var(--toggler-bg);
            border: 1px solid var(--dropdown-border);
            color: var(--text-main);
            border-radius: 50%;
            width: 38px; height: 38px;
            display: flex; justify-content: center; align-items: center;
            cursor: pointer; transition: all 0.3s ease;
        }
        .theme-toggle-btn:hover { transform: scale(1.1); box-shadow: 0 0 15px rgba(56, 189, 248, 0.3); }

        /* Navbar Toggler for Mobile */
        .navbar-toggler { border: 1px solid var(--nav-border); background: var(--toggler-bg); }
        .navbar-toggler:focus { box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25); }
        .navbar-toggler-icon { filter: grayscale(1) contrast(2); }

        .border-start { border-left-color: var(--dropdown-border) !important; }
        
        .glass-swal {
            background: var(--swal-bg) !important;
            backdrop-filter: blur(16px) !important;
            border: 1px solid var(--dropdown-border) !important;
            color: var(--swal-color) !important;
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
                            <a class="nav-link dropdown-toggle {{ request()->routeIs('study.*') ? 'active' : '' }}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ruang Belajar</a>
                            <ul class="dropdown-menu mt-2">
                                <li><a class="dropdown-item" href="{{ route('study.index') }}">Flashcard Interaktif</a></li>
                                <li><a class="dropdown-item" href="{{ route('lessons.user.index') }}">Buku Materi Digital</a></li>
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
                            <a class="nav-link dropdown-toggle admin-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin Panel 🔒</a>
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

                    <ul class="navbar-nav ms-auto align-items-center">
                        <li class="nav-item me-3">
                            <button class="theme-toggle-btn" id="theme-toggler" aria-label="Toggle Dark Mode">
                                <i class="bi bi-sun-fill" id="theme-icon"></i>
                            </button>
                        </li>

                        @guest
                            @if (Route::has('login'))
                            <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                            @endif
                            @if (Route::has('register'))
                            <li class="nav-item"><a class="nav-link border-start ms-2 ps-3" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="bi bi-person-circle me-1"></i> {{ Auth::user()->name }}
                                </a>
                                <div class="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('profile.edit') }}"><i class="bi bi-gear me-2 opacity-75"></i> Profil & Target</a>
                                    <a class="dropdown-item text-danger mt-1" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="bi bi-box-arrow-right me-2 opacity-75"></i> {{ __('Logout') }}</a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">@csrf</form>
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

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggler = document.getElementById('theme-toggler');
            const themeIcon = document.getElementById('theme-icon');
            const root = document.documentElement;
            
            function updateIcon(theme) {
                if(theme === 'light') {
                    themeIcon.className = 'bi bi-moon-stars-fill text-slate';
                } else {
                    themeIcon.className = 'bi bi-sun-fill text-warning';
                }
            }
            
            updateIcon(root.getAttribute('data-theme'));

            themeToggler.addEventListener('click', () => {
                let currentTheme = root.getAttribute('data-theme');
                let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                root.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateIcon(newTheme);
                
                // Dispatch event untuk merender ulang Chart.js agar merespon ganti tema
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme }}));
            });
        });
    </script>

    @if(session('success'))
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: "{{ session('success') }}",
            showConfirmButton: false,
            timer: 2000,
            customClass: { popup: 'glass-swal', title: 'text-glow' }
        });
    </script>
    @endif

    @yield('scripts')
</body>
</html>