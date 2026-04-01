<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\VideoFolder;
use App\Models\StudyItem;
use App\Models\UserFlashcard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class VideoLearningController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // Menampilkan daftar folder video
    public function index()
    {
        // Mengambil folder beserta video di dalamnya
        $folders = VideoFolder::with('videos')->get();
        return view('video_learning.index', compact('folders'));
    }

    // Menampilkan halaman Player Video & Transkrip
    public function show($id)
    {
        $video = Video::with('transcripts')->findOrFail($id);
        $user = Auth::user();

        // 1. Ambil SEMUA data flashcard (lengkap dengan relasi StudyItem)
        $savedFlashcards = UserFlashcard::where('user_id', $user->id)
            ->whereHas('studyItem', function($q) {
                $q->where('type', 'word');
            })
            ->with('studyItem')
            ->latest() // Urutkan dari yang terbaru disimpan
            ->get();

        // 2. Buat array terpisah khusus untuk JS Highlight (huruf kecil semua)
        $savedVocabsArray = $savedFlashcards->pluck('studyItem.content')
            ->map(function ($word) {
                return strtolower(trim($word));
            })
            ->values()
            ->toArray();

        // Kirim $savedFlashcards untuk UI HTML, dan $savedVocabsArray untuk JavaScript
        return view('video_learning.show', [
            'video' => $video,
            'savedFlashcards' => $savedFlashcards,
            'savedVocabs' => $savedVocabsArray 
        ]);
    }

    // Endpoint AJAX untuk menyimpan kosakata baru dari klik transkrip
    public function saveVocab(Request $request)
    {
        $request->validate([
            'word' => 'required|string',
            'translation' => 'required|string',
            'example_sentence' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $user = Auth::user();
        $wordContent = strtolower(trim($request->word));

        // 1. Cek apakah kata ini sudah ada di Master Bank Materi
        $studyItem = StudyItem::firstOrCreate(
            ['content' => $wordContent, 'type' => 'word'],
            [
                'translation' => $request->translation,
                'example_sentence' => $request->example_sentence,
                'notes' => $request->notes,
            ]
        );

        // 2. Cek apakah user sudah punya kartu ini di flashcard mereka
        $existingFlashcard = UserFlashcard::where('user_id', $user->id)
            ->where('study_item_id', $studyItem->id)
            ->first();

        if (!$existingFlashcard) {
            // Jika belum, tambahkan ke antrean belajar mereka (Review besok)
            UserFlashcard::create([
                'user_id' => $user->id,
                'study_item_id' => $studyItem->id,
                'repetition_count' => 0,
                'ease_factor' => 2.5,
                'interval' => 0,
                'next_review_date' => Carbon::tomorrow(),
            ]);
            return response()->json(['status' => 'success', 'message' => 'Kosakata berhasil ditambahkan ke Flashcard!']);
        }

        return response()->json(['status' => 'info', 'message' => 'Kosakata ini sudah ada di daftar belajar Anda.']);
    }
}