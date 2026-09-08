<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LessonCategory;
use Illuminate\Http\Request;

class LessonCategoryController extends Controller
{
    public function index()
    {
        // Menampilkan daftar kategori beserta jumlah materi di dalamnya
        $categories = LessonCategory::withCount('lessons')->latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/LessonCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/LessonCategories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
        ]);

        LessonCategory::create([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'bi-book-half', // Default icon buku
        ]);

        return redirect()->route('admin.lesson-categories.index')->with('success', 'Kategori materi berhasil ditambahkan!');
    }

    public function edit(LessonCategory $lessonCategory)
    {
        return \Inertia\Inertia::render('Admin/LessonCategories/Edit', [
            'lessonCategory' => $lessonCategory
        ]);
    }

    public function update(Request $request, LessonCategory $lessonCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
        ]);

        $lessonCategory->update([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'bi-book-half',
        ]);

        return redirect()->route('admin.lesson-categories.index')->with('success', 'Kategori materi berhasil diperbarui!');
    }

    public function destroy(LessonCategory $lessonCategory)
    {
        $lessonCategory->delete();
        return redirect()->route('admin.lesson-categories.index')->with('success', 'Kategori beserta semua isinya berhasil dihapus!');
    }
}