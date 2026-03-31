<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonCategory;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonLearningController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // 1. Halaman Daftar Isi (Library)
    public function index()
    {
        $user = Auth::user();
        
        // Ambil semua kategori beserta materi yang berstatus 'published'
        $categories = LessonCategory::with(['lessons' => function($query) {
            $query->where('is_published', true)->orderBy('order_number', 'asc');
        }])->get();

        // Ambil ID materi apa saja yang sudah diselesaikan user ini
        $completedLessonIds = LessonProgress::where('user_id', $user->id)
                                ->pluck('lesson_id')
                                ->toArray();

        return view('lessons.index', compact('categories', 'completedLessonIds'));
    }

    // 2. Halaman Mode Baca
    public function show($slug)
    {
        $user = Auth::user();
        $lesson = Lesson::where('slug', $slug)->where('is_published', true)->firstOrFail();

        // Cek apakah user sudah menyelesaikan bab ini
        $isCompleted = LessonProgress::where('user_id', $user->id)
                                     ->where('lesson_id', $lesson->id)
                                     ->exists();

        // Cari bab selanjutnya di kategori yang sama
        $nextLesson = Lesson::where('lesson_category_id', $lesson->lesson_category_id)
                            ->where('is_published', true)
                            ->where('order_number', '>', $lesson->order_number)
                            ->orderBy('order_number', 'asc')
                            ->first();

        return view('lessons.show', compact('lesson', 'isCompleted', 'nextLesson'));
    }

    // 3. Endpoint AJAX untuk "Tandai Selesai"
    public function markAsDone(Request $request, $id)
    {
        $user = Auth::user();
        
        // Gunakan firstOrCreate agar tidak ada data ganda (error SQL)
        LessonProgress::firstOrCreate([
            'user_id' => $user->id,
            'lesson_id' => $id
        ]);

        return response()->json([
            'status' => 'success', 
            'message' => 'Luar biasa! Progres belajarmu telah disimpan.'
        ]);
    }
}