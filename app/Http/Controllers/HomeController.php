<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFlashcard;
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

        return view('home', compact(
            'cardsToStudyToday', 
            'reviewedToday', 
            'dueCardsCount', 
            'totalCardsCount', 
            'user'
        ));
    }
}