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

    /**
     * Menampilkan halaman form edit video
     */
    public function edit($id)
    {
        // Ambil data video beserta transkripnya
        $video = \App\Models\Video::with('transcripts')->findOrFail($id);
        
        // Ambil daftar folder untuk dropdown
        $folders = \App\Models\VideoFolder::all();

        // Format ulang transkrip dari database ke bentuk text area (bulk string)
        // Format: "mulai | selesai | teks" per baris
        $formattedTranscripts = $video->transcripts->map(function($transcript) {
            return $transcript->start_time . '|' . $transcript->end_time . '|' . $transcript->text;
        })->implode("\n");

        return view('admin.videos.edit', compact('video', 'folders', 'formattedTranscripts'));
    }

    /**
     * Memproses update data video dan transkrip ke database
     */
    public function update(\Illuminate\Http\Request $request, $id)
    {
        // 1. Validasi input form
        $request->validate([
            'video_folder_id' => 'required|exists:video_folders,id',
            'difficulty'      => 'required|in:beginner,intermediate,advanced',
            'title'           => 'required|string|max:255',
            'youtube_id'      => 'required|string|max:50',
            'transcripts'     => 'required|string',
        ]);

        $video = \App\Models\Video::findOrFail($id);

        // 2. Update data master video
        $video->update([
            'video_folder_id' => $request->video_folder_id,
            'difficulty'      => $request->difficulty,
            'title'           => $request->title,
            'youtube_id'      => $request->youtube_id,
        ]);

        // 3. Proses Transkrip (Hapus yang lama, simpan yang baru dari form edit)
        $video->transcripts()->delete();

        $transcriptLines = explode("\n", str_replace("\r", "", $request->transcripts));
        $transcriptsData = [];

        foreach ($transcriptLines as $line) {
            $parts = explode('|', $line);
            
            // Pastikan baris memiliki format yang benar (minimal 3 bagian: start|end|text)
            if (count($parts) >= 3) {
                $transcriptsData[] = [
                    'video_id'   => $video->id,
                    'start_time' => trim($parts[0]),
                    'end_time'   => trim($parts[1]),
                    'text'       => trim($parts[2]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert sekumpulan transkrip baru
        if (!empty($transcriptsData)) {
            $video->transcripts()->insert($transcriptsData);
        }

        // 4. Redirect kembali ke halaman index dengan pesan sukses
        return redirect()->route('admin.videos.index')
                         ->with('success', 'Video dan transkrip berhasil diperbarui! 🎉');
    }

    public function destroy(Video $video)
    {
        $video->delete();
        return redirect()->route('admin.videos.index')->with('success', 'Video berhasil dihapus!');
    }
}