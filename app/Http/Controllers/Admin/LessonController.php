<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with('category')
            ->orderBy('lesson_category_id')
            ->orderBy('order_number')
            ->paginate(15);
            
        return \Inertia\Inertia::render('Admin/Lessons/Index', [
            'lessons' => $lessons
        ]);
    }

    public function create()
    {
        $categories = LessonCategory::all();
        return \Inertia\Inertia::render('Admin/Lessons/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lesson_category_id' => 'required|exists:lesson_categories,id',
            'title' => 'required|string|max:255',
            'youtube_url' => 'nullable|string',
            'content' => 'required|string', // Isi HTML dari Summernote
            'order_number' => 'required|integer|min:1',
        ]);

        // Membuat slug otomatis dari Judul
        // Tambahkan random string kecil di belakang agar unik jika ada judul yang persis sama
        $slug = Str::slug($request->title) . '-' . Str::random(5);
        $youtubeId = $this->extractYoutubeId($request->youtube_url); // Ekstrak ID

        Lesson::create([
            'lesson_category_id' => $request->lesson_category_id,
            'title' => $request->title,
            'slug' => $slug,
            'youtube_video_id' => $youtubeId, // Simpan ke database
            'content' => $request->content,
            'order_number' => $request->order_number,
            'is_published' => $request->has('is_published'), // Bernilai true jika switch dicentang
        ]);

        return redirect()->route('admin.lessons.index')->with('success', 'Materi berhasil diterbitkan!');
    }

    public function edit(Lesson $lesson)
    {
        $categories = LessonCategory::all();
        return \Inertia\Inertia::render('Admin/Lessons/Edit', [
            'lesson' => $lesson,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $request->validate([
            'lesson_category_id' => 'required|exists:lesson_categories,id',
            'title' => 'required|string|max:255',
            'youtube_url' => 'nullable|string', // Validasi input url baru
            'content' => 'required|string',
            'order_number' => 'required|integer|min:1',
        ]);

        // Opsional: Anda bisa memperbarui slug jika judulnya berubah, 
        // tapi biasanya lebih aman membiarkan slug lama agar URL tidak rusak (broken link).
        $youtubeId = $this->extractYoutubeId($request->youtube_url); // Ekstrak ID

        $lesson->update([
            'lesson_category_id' => $request->lesson_category_id,
            'title' => $request->title,
            'youtube_video_id' => $youtubeId, // Simpan ke database
            'content' => $request->content,
            'order_number' => $request->order_number,
            'is_published' => $request->has('is_published'), // Memeriksa apakah switch dicentang
        ]);

        return redirect()->route('admin.lessons.index')->with('success', 'Materi berhasil diperbarui!');
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return redirect()->route('admin.lessons.index')->with('success', 'Materi berhasil dihapus!');
    }

    // Fungsi pintar untuk mengekstrak ID dari segala jenis link YouTube
    private function extractYoutubeId($url)
    {
        if (empty($url)) return null;
        
        // Jika admin ternyata sudah memasukkan ID-nya langsung (misal: dQw4w9WgXcQ)
        if (strlen($url) == 11 && !str_contains($url, '/')) return $url;

        preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/\s]{11})%i', $url, $match);
        return isset($match[1]) ? $match[1] : null;
    }
}