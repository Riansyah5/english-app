@extends('layouts.app')

@section('content')
<div class="container py-4 mb-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{ route('shadowing.user.index') }}" class="text-decoration-none">Shadowing</a></li>
                    <li class="breadcrumb-item active">{{ $topic->title }}</li>
                </ol>
            </nav>

            <div class="text-center mb-4">
                <h2 class="fw-bold">{{ $topic->title }}</h2>
                <p class="text-muted">{{ $topic->description }}</p>
            </div>

            <!-- AREA CHAT INTERAKTIF -->
            <div class="card shadow border-0 rounded-4" style="background-color: #f0f2f5;">
                <div class="card-body p-4 p-md-5 d-flex flex-column gap-4" id="chatContainer">
                    
                    @php
                        // Logika sederhana penentuan posisi Kiri/Kanan
                        $firstCharacter = $topic->lines->first()->character_name ?? '';
                    @endphp

                    @foreach($topic->lines as $index => $line)
                        @php
                            $isLeft = ($line->character_name === $firstCharacter);
                        @endphp
                        
                        <!-- Chat Bubble -->
                        <div class="d-flex w-100 {{ $isLeft ? 'justify-content-start' : 'justify-content-end' }}" id="line-{{ $index }}">
                            <div style="max-width: 85%;">
                                <div class="small text-muted mb-1 {{ $isLeft ? 'ms-2' : 'me-2 text-end' }} fw-bold">
                                    {{ $line->character_name }}
                                </div>
                                <div class="d-flex align-items-center {{ $isLeft ? 'flex-row' : 'flex-row-reverse' }} gap-2">
                                    
                                    <!-- Bubble Teks -->
                                    <div class="p-3 shadow-sm rounded-4 {{ $isLeft ? 'bg-white rounded-top-start-0' : 'bg-primary text-white rounded-top-end-0' }}">
                                        <h5 class="mb-1 fw-bold line-text">{{ $line->text_en }}</h5>
                                        <p class="mb-0 small {{ $isLeft ? 'text-muted' : 'text-white-50' }}">{{ $line->text_id }}</p>
                                    </div>

                                    <!-- Panel Tombol Aksi (Tampil vertikal di samping bubble) -->
                                    <div class="d-flex flex-column gap-1">
                                        <!-- Tombol Play Normal (1x speed) -->
                                        <button class="btn btn-sm btn-light shadow-sm rounded-circle text-primary btn-action" 
                                            onclick="playLine('{{ addslashes($line->text_en) }}', '{{ $line->voice_gender }}', 1.0, this)" title="Putar">
                                            ▶️
                                        </button>
                                        <!-- Tombol Play Lambat (0.7x speed) -->
                                        <button class="btn btn-sm btn-light shadow-sm rounded-circle text-warning btn-action" 
                                            onclick="playLine('{{ addslashes($line->text_en) }}', '{{ $line->voice_gender }}', 0.7, this)" title="Putar Lambat">
                                            🐢
                                        </button>
                                        <!-- Tombol Latihan Bicara (Integrasi Web Speech API yang sudah ada!) -->
                                        <button class="btn btn-sm btn-light shadow-sm rounded-circle text-success btn-action" 
                                            onclick="startSpeakingPractice(this, '{{ addslashes($line->text_en) }}')" title="Latihan Bicara">
                                            🎤
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    @endforeach

                </div>
            </div>

        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    // ==========================================
    // THE SECRET SAUCE: PREMIUM AI VOICE HUNTER
    // ==========================================
    let availableVoices = [];

    // Fungsi untuk memuat daftar suara yang ada di device pengguna
    function loadVoices() {
        availableVoices = window.speechSynthesis.getVoices();
    }

    // Eksekusi loadVoices saat resource selesai dimuat browser
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Algoritma pencari suara premium (Google Cloud / Microsoft Neural)
    function getBestNaturalVoice(gender) {
        if(availableVoices.length === 0) loadVoices();
        
        // Filter hanya bahasa Inggris, prioritaskan yang berlabel 'Neural', 'Online', atau 'Google'
        let premiumVoices = availableVoices.filter(v => 
            v.lang.startsWith('en') && 
            (v.name.includes('Neural') || v.name.includes('Online') || v.name.includes('Google'))
        );
        
        let bestVoice = null;
        
        if(gender === 'male') {
            // Cari kata kunci pria di nama suara
            bestVoice = premiumVoices.find(v => v.name.includes('Male') || v.name.includes('Guy') || v.name.includes('Christopher') || v.name.includes('Eric'));
        } else {
            // Google US English secara default adalah suara wanita yang sangat natural di Chrome
            bestVoice = premiumVoices.find(v => v.name === 'Google US English' || v.name.includes('Female') || v.name.includes('Jenny') || v.name.includes('Aria'));
        }

        // Fallback: Jika tidak nemu yang premium, pakai suara bahasa Inggris standar, jika tidak nemu juga pakai suara pertama
        return bestVoice || premiumVoices[0] || availableVoices.find(v => v.lang.startsWith('en-US')) || availableVoices[0];
    }

    // ==========================================
    // FUNGSI PEMUTAR AUDIO (TTS)
    // ==========================================
    let currentUtterance = null;

    function playLine(text, gender, speed, btnElement) {
        // Matikan suara yang mungkin sedang jalan
        window.speechSynthesis.cancel();
        
        // Hapus efek glow dari tombol lain
        document.querySelectorAll('.btn-action').forEach(b => b.classList.remove('border', 'border-success', 'border-2'));
        
        // Beri efek glow ke tombol yang sedang ditekan
        btnElement.classList.add('border', 'border-success', 'border-2');

        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.voice = getBestNaturalVoice(gender);
        currentUtterance.rate = speed;
        currentUtterance.pitch = gender === 'male' ? 0.9 : 1.1; // Pria sedikit berat, wanita sedikit tinggi
        
        // Jika selesai, hilangkan efek glow
        currentUtterance.onend = function() {
            btnElement.classList.remove('border', 'border-success', 'border-2');
        };

        window.speechSynthesis.speak(currentUtterance);
    }
</script>

<!-- Opsional: Panggil file JS/Script Web Speech API Latihan Berbicara yang sudah kita buat sebelumnya di sini -->
<!-- Jika fungsi startSpeakingPractice() sudah ada di layouts.app atau file eksternal, fitur 🎤 akan langsung jalan! -->
@endsection