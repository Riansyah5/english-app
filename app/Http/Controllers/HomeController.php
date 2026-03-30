<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFlashcard;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();
        $today = Carbon::today();

        // 1. Hitung berapa kartu yang SUDAH di-review hari ini
        // Kita cek dari 'updated_at' hari ini, dan 'next_review_date' yang sudah dilempar ke masa depan
        $reviewedToday = UserFlashcard::where('user_id', $user->id)
            ->whereDate('updated_at', $today)
            ->whereDate('next_review_date', '>', $today)
            ->count();

        // 2. Hitung sisa kuota target belajar hari ini
        $remainingGoal = max(0, $user->daily_goal - $reviewedToday);

        // 3. Hitung total kartu yang secara jadwal memang sedang menunggak (jatuh tempo)
        $dueCardsCount = UserFlashcard::where('user_id', $user->id)
            ->whereDate('next_review_date', '<=', $today)
            ->count();

        // 4. Kartu yang benar-benar wajib diselesaikan hari ini (ambil nilai terkecil)
        $cardsToStudyToday = min($dueCardsCount, $remainingGoal);

        // Total koleksi materi
        $totalCardsCount = UserFlashcard::where('user_id', $user->id)->count();

        // 1. DATA GRAFIK: Aktivitas Belajar 7 Hari Terakhir
        $chartLabels = [];
        $chartData = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            // Label sumbu X (Misal: 24 Mar)
            $chartLabels[] = $date->translatedFormat('d M');

            // Hitung berapa kartu yang di-review pada tanggal tersebut
            $count = UserFlashcard::where('user_id', $user->id)
                ->whereDate('updated_at', $date)
                ->count();
            
            $chartData[] = $count;
        }

        // 2. LOGIKA STREAK (Hari Berturut-turut)
        $streak = 0;
        for ($i = 0; $i < 365; $i++) {
            $date = Carbon::today()->subDays($i);
            
            $hasStudied = UserFlashcard::where('user_id', $user->id)
                ->whereDate('updated_at', $date)
                ->exists();

            if ($hasStudied) {
                $streak++;
            } else {
                // Jika hari ini belum belajar, jangan putus streak kemarin dulu
                if ($i == 0) continue; 
                break; // Putus jika kemarin tidak belajar
            }
        }

        // 3. LOGIKA RANDOM VIDEO REMINDER
        // Mengambil satu video secara acak dari database
        $dailyVideo = Video::with('folder')->inRandomOrder()->first();

        return view('home', compact(
            'cardsToStudyToday', 
            'reviewedToday', 
            'dueCardsCount', 
            'totalCardsCount', 
            'user', 
            'chartLabels', 
            'chartData', 
            'streak', 
            'dailyVideo'
        ));
    }
}