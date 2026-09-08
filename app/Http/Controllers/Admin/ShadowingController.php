<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShadowingTopic;
use App\Models\ShadowingLine;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShadowingController extends Controller
{
    // ==========================================
    // MANAJEMEN TOPIK (INDUK)
    // ==========================================
    public function index()
    {
        $topics = ShadowingTopic::withCount('lines')->latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Shadowing/Index', [
            'topics' => $topics
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Shadowing/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'level' => 'required|in:Beginner,Intermediate,Advanced',
            'description' => 'nullable|string'
        ]);

        $topic = ShadowingTopic::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(4),
            'level' => $request->level,
            'description' => $request->description,
            'is_published' => $request->has('is_published')
        ]);

        // Setelah buat topik, langsung arahkan ke halaman Script Builder (show)
        return redirect()->route('admin.shadowing.show', $topic->id)
                         ->with('success', 'Topik berhasil dibuat! Silakan mulai susun naskah percakapan.');
    }

    public function destroy(ShadowingTopic $shadowing)
    {
        $shadowing->delete(); // Baris dialog otomatis terhapus karena cascadeOnDelete di migrasi
        return back()->with('success', 'Topik shadowing berhasil dihapus!');
    }

    // ==========================================
    // SCRIPT BUILDER (MANAJEMEN BARIS DIALOG)
    // ==========================================
    public function show(ShadowingTopic $shadowing)
    {
        // Memuat topik beserta seluruh baris dialognya
        $shadowing->load('lines');
        return \Inertia\Inertia::render('Admin/Shadowing/Show', [
            'shadowing' => $shadowing
        ]);
    }

    public function storeLine(Request $request, ShadowingTopic $shadowing)
    {
        $request->validate([
            'character_name' => 'required|string|max:100',
            'voice_gender' => 'required|in:male,female',
            'text_en' => 'required|string',
            'text_id' => 'required|string'
        ]);

        // Hitung urutan terakhir, lalu tambah 1
        $lastOrder = $shadowing->lines()->max('order_number') ?? 0;

        $shadowing->lines()->create([
            'character_name' => $request->character_name,
            'voice_gender' => $request->voice_gender,
            'text_en' => $request->text_en,
            'text_id' => $request->text_id,
            'order_number' => $lastOrder + 1
        ]);

        return back()->with('success', 'Baris dialog ditambahkan!');
    }

    public function destroyLine(ShadowingLine $line)
    {
        $line->delete();
        return back()->with('success', 'Baris dialog dihapus!');
    }
}