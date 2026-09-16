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
    public function index(\Illuminate\Http\Request $request)
    {
        $query = StudyItem::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                  ->orWhere('translation', 'like', "%{$search}%")
                  ->orWhere('example_sentence', 'like', "%{$search}%");
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('level')) {
            $query->where('level', $request->level);
        }

        $items = $query->latest()->paginate(10)->withQueryString();

        return \Inertia\Inertia::render('Admin/StudyItems/Index', [
            'items' => $items,
            'filters' => $request->only(['search', 'type', 'level'])
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/StudyItems/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:255|unique:study_items,content',
            'type' => 'required|in:word,phrase,idiom,grammar_rule,speaking_prompt',
            'level' => 'nullable|in:A1,A2,B1,B2,C1,C2',
            'translation' => 'required|string|max:255',
            'example_sentence' => 'nullable|string',
            'example_translation' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // 1. Simpan materi ke Bank Materi
        $studyItem = StudyItem::create($request->all());

        // 2. Ambil ID pengguna saja untuk menghemat alokasi memori
        $userIds = User::pluck('id');
        $flashcards = [];
        $today = Carbon::today();
        $now = Carbon::now();

        foreach ($userIds as $userId) {
            $flashcards[] = [
                'user_id' => $userId,
                'study_item_id' => $studyItem->id,
                'repetition_count' => 0,
                'ease_factor' => 2.5,
                'interval' => 0,
                'next_review_date' => $today,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        // Gunakan insertOrIgnore dan chunking untuk mencegah duplikasi
        if (!empty($flashcards)) {
            foreach (array_chunk($flashcards, 2000) as $chunk) {
                UserFlashcard::insertOrIgnore($chunk);
            }
        }

        return redirect()->route('admin.study-items.index')
            ->with('success', 'Materi berhasil ditambahkan dan didistribusikan ke antrean belajar semua pengguna!');
    }

    public function edit(StudyItem $studyItem)
    {
        return \Inertia\Inertia::render('Admin/StudyItems/Edit', [
            'studyItem' => $studyItem
        ]);
    }

    public function update(Request $request, StudyItem $studyItem)
    {
        $request->validate([
            'content' => 'required|string|max:255|unique:study_items,content,' . $studyItem->id,
            'type' => 'required|in:word,phrase,idiom,grammar_rule,speaking_prompt',
            'level' => 'nullable|in:A1,A2,B1,B2,C1,C2',
            'translation' => 'required|string|max:255',
            'example_sentence' => 'nullable|string',
            'example_translation' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $studyItem->update($request->all());

        return redirect()->route('admin.study-items.index')
            ->with('success', 'Materi berhasil diperbarui!');
    }

    public function destroy(StudyItem $studyItem)
    {
        $studyItem->delete();
        return redirect()->route('admin.study-items.index')->with('success', 'Materi berhasil dihapus!');
    }

    public function import(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.content' => 'required|string|max:255',
            'items.*.type' => 'required|in:word,phrase,idiom,grammar_rule,speaking_prompt',
            'items.*.level' => 'nullable|in:A1,A2,B1,B2,C1,C2',
            'items.*.translation' => 'required|string|max:255',
            'items.*.example_sentence' => 'nullable|string',
            'items.*.example_translation' => 'nullable|string',
            'items.*.notes' => 'nullable|string',
        ]);

        $items = $request->items;
        
        $contents = collect($items)->pluck('content')->toArray();
        $existingContents = StudyItem::whereIn('content', $contents)->pluck('content')->toArray();
        
        $newItemsData = [];
        $now = Carbon::now();

        foreach ($items as $itemData) {
            if (!in_array($itemData['content'], $existingContents)) {
                $newItemsData[] = [
                    'content' => $itemData['content'],
                    'type' => $itemData['type'],
                    'level' => $itemData['level'] ?? null,
                    'translation' => $itemData['translation'],
                    'example_sentence' => $itemData['example_sentence'] ?? null,
                    'example_translation' => $itemData['example_translation'] ?? null,
                    'notes' => $itemData['notes'] ?? null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
                $existingContents[] = $itemData['content'];
            }
        }

        $added = 0;
        $skipped = count($items) - count($newItemsData);

        if (!empty($newItemsData)) {
            // Menggunakan insertOrIgnore pada batch StudyItem
            StudyItem::insertOrIgnore($newItemsData);
            $added = count($newItemsData);

            $newContents = collect($newItemsData)->pluck('content')->toArray();
            $newStudyItems = StudyItem::whereIn('content', $newContents)->get(['id']);

            $userIds = User::pluck('id');
            $flashcards = [];
            $today = Carbon::today();

            foreach ($newStudyItems as $si) {
                foreach ($userIds as $userId) {
                    $flashcards[] = [
                        'user_id' => $userId,
                        'study_item_id' => $si->id,
                        'repetition_count' => 0,
                        'ease_factor' => 2.5,
                        'interval' => 0,
                        'next_review_date' => $today,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }

            // Memasukkan data flashcard dalam chunk dan mengabaikan duplikasi
            foreach (array_chunk($flashcards, 2000) as $chunk) {
                UserFlashcard::insertOrIgnore($chunk);
            }
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'added' => $added,
                'skipped' => $skipped
            ]);
        }

        return redirect()->route('admin.study-items.index')
            ->with('success', "Berhasil menambahkan {$added} materi baru. {$skipped} materi dilewati karena duplikat.");
    }
}