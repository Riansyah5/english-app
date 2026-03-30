<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'English-App') }}</title>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

  <!-- Scripts -->
  @vite(['resources/sass/app.scss', 'resources/js/app.js'])

  @yield('styles')
</head>
<body>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="{{ url('/') }}">
          {{ config('app.name', 'Laravel') }}
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left Side Of Navbar -->
          <ul class="navbar-nav me-auto">
            @auth
            <li class="nav-item">
              <a class="nav-link fw-semibold {{ request()->routeIs('home') ? 'active text-primary' : '' }}" href="{{ route('home') }}">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold {{ request()->routeIs('study.index') ? 'active text-primary' : '' }}" href="{{ route('study.index') }}">Ruang Belajar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold {{ request()->routeIs('videos.user.index') ? 'active text-primary' : '' }}" href="{{ route('videos.user.index') }}">Video Learning</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold {{ request()->routeIs('exams.*') ? 'active text-primary' : '' }}" href="{{ route('exams.index') }}">Evaluasi (CBT)</a>
            </li>
            @endauth
            @if(Auth::check() && Auth::user()->is_admin)
            <li class="nav-item dropdown border-start ms-2 ps-2">
              <a class="nav-link dropdown-toggle fw-bold text-danger" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin Panel 🔒
              </a>
              <ul class="dropdown-menu shadow border-0 mt-2">
                <li><a class="dropdown-item" href="{{ route('admin.study-items.index') }}">Kelola Materi Flashcard</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Video Learning</h6></li>
                <li><a class="dropdown-item" href="{{ route('admin.video-folders.index') }}">Kelola Folder</a></li>
                <li><a class="dropdown-item" href="{{ route('admin.videos.index') }}">Kelola Video</a></li>
              </ul>
            </li>
            @endif
          </ul>

          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav ms-auto">
            <!-- Authentication Links -->
            @guest
            @if (Route::has('login'))
            <li class="nav-item">
              <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
            </li>
            @endif

            @if (Route::has('register'))
            <li class="nav-item">
              <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
            </li>
            @endif
            @else
            <li class="nav-item dropdown">
              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                {{ Auth::user()->name }}
              </a>

              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="{{ route('profile.edit') }}">
                  Profil & Target
                </a>

                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                  {{ __('Logout') }}
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

    <main class="py-4">
      @yield('content')
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  @if(session('success'))
  <script>
      Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: "{{ session('success') }}",
          showConfirmButton: false,
          timer: 2000,
          border: 'none',
          borderRadius: '15px'
      });
  </script>
  @endif

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>  
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  @yield('scripts')
</body>
</html>
