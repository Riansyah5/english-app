<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\VideoFolder;
use App\Models\VideoTranscript;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::with('folder')->latest()->paginate(10);
        return view('admin.videos.index', compact('videos'));
    }

    public function create()
    {
        $folders = VideoFolder::all();
        return view('admin.videos.create', compact('folders'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'video_folder_id' => 'required|exists:video_folders,id',
            'youtube_id' => 'required|string',
            'title' => 'required|string|max:255',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'transcripts' => 'required|string', // Format: start|end|text
        ]);

        // 1. Simpan Video
        $video = Video::create($request->only(['video_folder_id', 'youtube_id', 'title', 'difficulty']));

        // 2. Proses Transkrip (Pecah per baris)
        $lines = explode("\n", str_replace("\r", "", $request->transcripts));
        foreach ($lines as $line) {
            $data = explode('|', $line);
            if (count($data) >= 3) { // Ubah jadi >= 3
                VideoTranscript::create([
                    'video_id' => $video->id,
                    'start_time' => trim($data[0]),
                    'end_time' => trim($data[1]),
                    'text' => trim($data[2]),
                    'translation' => isset($data[3]) ? trim($data[3]) : null, // Tangkap terjemahan jika ada
                ]);
            }
        }

        return redirect()->route('admin.videos.index')->with('success', 'Video dan Transkrip berhasil diunggah!');
    }

    public function destroy(Video $video)
    {
        $video->delete();
        return redirect()->route('admin.videos.index')->with('success', 'Video berhasil dihapus!');
    }
}