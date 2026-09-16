<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Laravel') }}</title>
  <link rel="icon" type="image/png" href="/icons/icon-512x512.png">

  <!-- PWA Meta Tags -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#ff822d">
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=Nunito:400,500,600,700" rel="stylesheet" />

  <!-- Scripts -->
  @viteReactRefresh
  @vite(['resources/js/app.jsx', 'resources/css/app.css'])
  @inertiaHead

  {{-- Theme Initialization --}}
  <script>
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</head>
<body class="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
  @inertia
</body>
</html>
