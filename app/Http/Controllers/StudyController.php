<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserFlashcard;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class StudyController extends Controller
{
    // Pastikan hanya user yang login yang bisa mengakses
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Menampilkan halaman belajar & mengambil kartu yang jatuh tempo hari ini
    public function index()
    {
        $user = Auth::user();
        $today = \Carbon\Carbon::today();

        // 1. Hitung sisa kuota belajar hari ini (Sama seperti logika di Dashboard)
        $reviewedToday = UserFlashcard::where('user_id', $user->id)
            ->whereDate('updated_at', $today)
            ->whereDate('next_review_date', '>', $today)
            ->count();

        $remainingGoal = max(0, $user->daily_goal - $reviewedToday);

        // 2. Jika target sudah tercapai, tidak perlu query data lagi
        if ($remainingGoal == 0) {
            $dueFlashcards = collect(); // Kirim koleksi kosong agar UI memunculkan pesan "Selesai"
        } else {
            // 3. Ambil kartu dengan limit sesuai sisa target
            $dueFlashcards = UserFlashcard::with('studyItem')
                ->where('user_id', $user->id)
                ->whereDate('next_review_date', '<=', $today)
                ->orderBy('next_review_date', 'asc') // Prioritaskan kartu yang paling lama nunggak
                ->limit($remainingGoal) // <-- BATASI DISINI
                ->get();
        }

        return view('study.index', compact('dueFlashcards'));
    }

    // Memproses jawaban user dan menghitung jadwal review berikutnya (Algoritma SRS)
    public function review(Request $request, $flashcardId)
    {
        $request->validate([
            'quality' => 'required|integer|min:0|max:5', 
            // Quality scale: 0 (Lupa total) sampai 5 (Sangat mudah)
        ]);

        $flashcard = UserFlashcard::where('user_id', Auth::id())
                        ->findOrFail($flashcardId);

        $quality = $request->quality;

        // Jika user menjawab salah (quality < 3)
        if ($quality < 3) {
            $flashcard->repetition_count = 0;
            $flashcard->interval = 1; // Ulangi besok
        } 
        // Jika user menjawab benar (quality >= 3)
        else {
            if ($flashcard->repetition_count == 0) {
                $flashcard->interval = 1;
            } elseif ($flashcard->repetition_count == 1) {
                $flashcard->interval = 6;
            } else {
                $flashcard->interval = round($flashcard->interval * $flashcard->ease_factor);
            }
            $flashcard->repetition_count++;
        }

        // Hitung Ease Factor baru (Tingkat kemudahan)
        $flashcard->ease_factor = $flashcard->ease_factor + (0.1 - (5 - $quality) * (0.08 + (5 - $quality) * 0.02));
        
        // Batas minimal Ease Factor agar tidak terlalu kecil (aturan standar SM-2)
        if ($flashcard->ease_factor < 1.3) {
            $flashcard->ease_factor = 1.3;
        }

        // Set jadwal review berikutnya
        $flashcard->next_review_date = Carbon::today()->addDays($flashcard->interval);
        $flashcard->save();

        return response()->json([
            'message' => 'Progres berhasil disimpan!',
            'next_review_date' => $flashcard->next_review_date->format('Y-m-d')
        ]);
    }

    // FUNGSI UPDATE: Mode Latihan Bebas (Dengan Filter Tipe)
    public function practice(Request $request)
    {
        $user = \Illuminate\Support\Facades\Auth::user();
        $today = \Carbon\Carbon::today();
        
        // Menangkap parameter 'type' dari URL (misal: ?type=word)
        $selectedType = $request->query('type');

        // Query dasar: Ambil kartu milik user ini
        $baseQuery = UserFlashcard::with('studyItem')->where('user_id', $user->id);

        // Jika user memilih filter, persempit query-nya dengan whereHas ke tabel relasi study_items
        if ($selectedType) {
            $baseQuery->whereHas('studyItem', function($q) use ($selectedType) {
                $q->where('type', $selectedType);
            });
        }

        // 1. Coba ambil kartu yang sudah di-review HARI INI (berdasarkan filter jika ada)
        $practiceCards = (clone $baseQuery)
            ->whereDate('updated_at', $today)
            ->get();

        // 2. Jika kosong (misal: user belum belajar tipe tersebut hari ini), ambil 50 kartu acak dari tipe itu
        if ($practiceCards->isEmpty()) {
            $practiceCards = (clone $baseQuery)
                ->inRandomOrder()
                ->limit(50)
                ->get();
        }

        return view('study.practice', compact('practiceCards', 'selectedType'));
    }
}