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
        return \Inertia\Inertia::render('Admin/VideoFolders/Index', [
            'folders' => $folders
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/VideoFolders/Create');
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

    public function edit(VideoFolder $videoFolder)
    {
        return \Inertia\Inertia::render('Admin/VideoFolders/Edit', [
            'folder' => $videoFolder
        ]);
    }

    public function update(Request $request, VideoFolder $videoFolder)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
        ]);

        $videoFolder->update([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon ?? 'bi-folder-fill',
        ]);

        return redirect()->route('admin.video-folders.index')->with('success', 'Folder video berhasil diperbarui!');
    }

    public function destroy(VideoFolder $videoFolder)
    {
        // Karena kita pakai cascadeOnDelete di migration, menghapus folder 
        // otomatis akan menghapus semua video dan transkrip di dalamnya.
        $videoFolder->delete();
        return redirect()->route('admin.video-folders.index')->with('success', 'Folder beserta seluruh videonya berhasil dihapus!');
    }
}