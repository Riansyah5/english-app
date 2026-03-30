<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VideoFolder;
use Illuminate\Http\Request;

class VideoFolderController extends Controller
{
    public function index()
    {
        // Ambil data folder beserta jumlah video di dalamnya
        $folders = VideoFolder::withCount('videos')->latest()->paginate(10);
        return view('admin.video_folders.index', compact('folders'));
    }

    public function create()
    {
        return view('admin.video_folders.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
        ]);

        VideoFolder::create([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'bi-folder-fill', // Default icon jika kosong
        ]);

        return redirect()->route('admin.video-folders.index')->with('success', 'Folder video berhasil dibuat!');
    }

    public function destroy(VideoFolder $videoFolder)
    {
        // Karena kita pakai cascadeOnDelete di migration, menghapus folder 
        // otomatis akan menghapus semua video dan transkrip di dalamnya.
        $videoFolder->delete();
        return redirect()->route('admin.video-folders.index')->with('success', 'Folder beserta seluruh videonya berhasil dihapus!');
    }
}