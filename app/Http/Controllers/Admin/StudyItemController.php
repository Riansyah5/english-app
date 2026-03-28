<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudyItem;
use App\Models\User;
use App\Models\UserFlashcard;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StudyItemController extends Controller
{
    public function index()
    {
        $items = StudyItem::latest()->paginate(10);
        return view('admin.study_items.index', compact('items'));
    }

    public function create()
    {
        return view('admin.study_items.create');
    }

    // UPDATE: Fungsi Store dengan Logika Distribusi
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:255',
            'type' => 'required|in:word,phrase,idiom,grammar_rule,speaking_prompt',
            'translation' => 'required|string|max:255',
            'example_sentence' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // 1. Simpan materi ke Bank Materi
        $studyItem = StudyItem::create($request->all());

        // 2. Distribusikan ke semua pengguna secara massal (Bulk Insert)
        $users = User::all();
        $flashcards = [];
        $today = Carbon::today();
        $now = Carbon::now();

        foreach ($users as $user) {
            $flashcards[] = [
                'user_id' => $user->id,
                'study_item_id' => $studyItem->id,
                'repetition_count' => 0,
                'ease_factor' => 2.5,
                'interval' => 0,
                'next_review_date' => $today, // Langsung ditagih hari ini
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!empty($flashcards)) {
            UserFlashcard::insert($flashcards); // Insert massal agar super cepat
        }

        return redirect()->route('admin.study-items.index')
            ->with('success', 'Materi berhasil ditambahkan dan didistribusikan ke antrean belajar semua pengguna!');
    }

    // FUNGSI BARU: Menampilkan Form Edit
    public function edit(StudyItem $studyItem)
    {
        return view('admin.study_items.edit', compact('studyItem'));
    }

    // FUNGSI BARU: Menyimpan Perubahan Edit
    public function update(Request $request, StudyItem $studyItem)
    {
        $request->validate([
            'content' => 'required|string|max:255',
            'type' => 'required|in:word,phrase,idiom,grammar_rule,speaking_prompt',
            'translation' => 'required|string|max:255',
            'example_sentence' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $studyItem->update($request->all());

        return redirect()->route('admin.study-items.index')
            ->with('success', 'Materi berhasil diperbarui!');
    }

    public function destroy(StudyItem $studyItem)
    {
        $studyItem->delete();
        // Catatan: Karena kita menggunakan cascadeOnDelete() di migration, 
        // menghapus StudyItem otomatis menghapus data user_flashcards yang terkait.
        return redirect()->route('admin.study-items.index')->with('success', 'Materi berhasil dihapus!');
    }
}