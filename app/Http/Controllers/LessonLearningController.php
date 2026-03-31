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

        // Cari data progres user untuk bab ini (termasuk catatan pribadinya)
        $progress = LessonProgress::where('user_id', $user->id)
                                  ->where('lesson_id', $lesson->id)
                                  ->first();

        $isCompleted = $progress ? true : false;
        $personalNote = $progress ? $progress->personal_note : '';

        // Cari bab selanjutnya
        $nextLesson = Lesson::where('lesson_category_id', $lesson->lesson_category_id)
                            ->where('is_published', true)
                            ->where('order_number', '>', $lesson->order_number)
                            ->orderBy('order_number', 'asc')
                            ->first();

        return view('lessons.show', compact('lesson', 'isCompleted', 'nextLesson', 'personalNote'));
    }

    // Fungsi Baru: Simpan Catatan
    public function saveNote(Request $request, $id)
    {
        $user = Auth::user();
        
        // Gunakan updateOrCreate agar catatan bisa disimpan walau bab belum ditandai 'selesai'
        LessonProgress::updateOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $id],
            ['personal_note' => $request->note]
        );

        return response()->json([
            'status' => 'success', 
            'message' => 'Catatan pribadimu berhasil disimpan!'
        ]);
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