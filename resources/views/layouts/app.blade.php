<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'English-App') }}</title>

    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito:400,500,600,700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">

    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <script>
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    </script>

    <style>
        /* CSS Variables - Minimalist Elegant Mode */
        :root, [data-theme="dark"] {
            --bg-body: #0f131a;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --nav-bg: rgba(15, 19, 26, 0.85);
            --nav-border: rgba(255, 255, 255, 0.05);
            --nav-link: #94a3b8;
            --nav-link-hover: #3b82f6;
            --dropdown-bg: #161b26;
            --dropdown-item: #cbd5e1;
            --dropdown-hover: rgba(255, 255, 255, 0.04);
            --dropdown-border: rgba(255, 255, 255, 0.05);
            --swal-bg: #161b26;
            --swal-color: #ffffff;
            --toggler-bg: rgba(255, 255, 255, 0.03);
            --accent-danger: #f43f5e;
        }

        [data-theme="light"] {
            --bg-body: #f8fafc;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --nav-bg: rgba(255, 255, 255, 0.85);
            --nav-border: rgba(0, 0, 0, 0.04);
            --nav-link: #475569;
            --nav-link-hover: #2563eb;
            --dropdown-bg: #ffffff;
            --dropdown-item: #334155;
            --dropdown-hover: rgba(0, 0, 0, 0.02);
            --dropdown-border: rgba(0, 0, 0, 0.05);
            --swal-bg: #ffffff;
            --swal-color: #0f172a;
            --toggler-bg: rgba(0, 0, 0, 0.02);
            --accent-danger: #dc2626;
        }

        /* Base Theme Application */
        body {
            background-color: var(--bg-body);
            color: var(--text-main);
            min-height: 100vh;
            font-family: 'Nunito', sans-serif;
            position: relative;
            overflow-x: hidden;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Ambient Background - Subtly Muted */
        body::before {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, var(--nav-border), transparent);
            z-index: 1000;
        }

        /* Utility Classes */
        .text-theme-main { color: var(--text-main) !important; }
        .text-theme-muted { color: var(--text-muted) !important; }

        /* Elegant Thin Navbar */
        .glass-navbar {
            background: var(--nav-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--nav-border);
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            transition: background 0.3s ease, border-color 0.3s ease;
        }

        .navbar-brand {
            color: var(--text-main) !important;
            font-weight: 700;
            letter-spacing: -0.02em;
            transition: color 0.3s ease;
        }

        .nav-link {
            color: var(--nav-link) !important;
            font-weight: 500;
            font-size: 0.925rem;
            padding: 0.5rem 0.75rem !important;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
        }
        .nav-link:hover, .nav-link.active {
            color: var(--nav-link-hover) !important;
            background: var(--toggler-bg);
        }
        .nav-link.admin-link { color: var(--accent-danger) !important; opacity: 0.9; }
        .nav-link.admin-link:hover { opacity: 1; background: rgba(244, 63, 94, 0.05); }

        /* Minimal Menus */
        .dropdown-menu {
            background: var(--dropdown-bg);
            border: 1px solid var(--dropdown-border);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
            border-radius: 0.75rem;
            padding: 0.375rem;
            animation: fadeInMenu 0.15s ease-out;
        }
        @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-item {
            color: var(--dropdown-item);
            font-weight: 500;
            font-size: 0.9rem;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            transition: all 0.15s ease;
        }
        .dropdown-item:hover, .dropdown-item:focus {
            background: var(--dropdown-hover);
            color: var(--text-main);
        }
        .dropdown-header { 
            color: var(--text-muted); 
            font-weight: 600; 
            font-size: 0.7rem; 
            text-uppercase: uppercase; 
            letter-spacing: 0.05em;
            padding: 0.5rem 1rem 0.25rem;
        }
        .dropdown-divider { border-top: 1px solid var(--dropdown-border); margin: 0.375rem 0; }

        /* Round Theme Toggler */
        .theme-toggle-btn {
            background: var(--toggler-bg);
            border: 1px solid var(--dropdown-border);
            color: var(--text-main);
            border-radius: 50%;
            width: 36px; height: 36px;
            display: flex; justify-content: center; align-items: center;
            cursor: pointer; transition: all 0.2s ease;
        }
        .theme-toggle-btn:hover { transform: translateY(-1px); background: var(--dropdown-hover); }

        /* Toggler Mobile */
        .navbar-toggler { border: 1px solid var(--nav-border); background: var(--toggler-bg); padding: 0.4rem 0.6rem; }
        .navbar-toggler:focus { box-shadow: none; border-color: var(--nav-link-hover); }
        .navbar-toggler-icon { filter: initial; opacity: 0.7; }

        .border-divider { border-left: 1px solid var(--dropdown-border) !important; }
        
        .minimal-swal {
            background: var(--swal-bg) !important;
            border: 1px solid var(--dropdown-border) !important;
            color: var(--swal-color) !important;
            border-radius: 1rem !important;
        }
    </style>
    @yield('styles')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md glass-navbar sticky-top">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-2" href="{{ url('/') }}">
                    <i class="bi bi-journal-bookmark-fill text-primary fs-5"></i>
                    <span>{{ config('app.name', 'Laravel') }}</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon small"><i class="bi bi-list text-theme-main"></i></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto gap-1 mt-2 mt-md-0">
                        @auth
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">Dashboard</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle {{ request()->routeIs('study.*') || request()->routeIs('lessons.*') ? 'active' : '' }}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ruang Belajar</a>
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
                        <li class="nav-item dropdown border-divider-md-start ms-md-2 ps-md-2">
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

                    <ul class="navbar-nav ms-auto align-items-center gap-2 mt-2 mt-md-0">
                        <li class="nav-item">
                            <button class="theme-toggle-btn" id="theme-toggler" aria-label="Toggle Dark Mode">
                                <i class="bi bi-sun-fill" id="theme-icon"></i>
                            </button>
                        </li>

                        @guest
                            @if (Route::has('login'))
                            <li class="nav-item"><a class="nav-link px-3" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                            @endif
                            @if (Route::has('register'))
                            <li class="nav-item"><a class="nav-link px-3 border-divider ms-1 ps-3" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                            @endif
                        @else
                            <li class="nav-item dropdown w-100 text-center text-md-start">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle d-inline-flex align-items-center gap-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="bi bi-person-circle opacity-75"></i> <span>{{ Auth::user()->name }}</span>
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

        <main class="py-5">
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
                    themeIcon.className = 'bi bi-moon-stars-fill text-secondary';
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
                
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme }}));
            });
        });
    </script>

    @if(session('success'))
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: "{{ session('success') }}",
            showConfirmButton: false,
            timer: 1800,
            customClass: { popup: 'minimal-swal' }
        });
    </script>
    @endif

    @yield('scripts')
</body>
</html>