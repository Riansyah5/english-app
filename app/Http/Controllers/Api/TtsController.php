<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TtsController extends Controller
{
    public function stream(Request $request)
    {
        $request->validate([
            'text'  => 'required|string|max:500',
            'voice' => 'nullable|string',
            'rate'  => 'nullable|string', // Contoh: '+0%', '-10%'
        ]);

        $text  = trim($request->query('text'));
        $voice = $request->query('voice', 'en-US-JennyNeural');
        $rate  = $request->query('rate', '+0%');

        // Pastikan nama voice aman dari injeksi karakter
        if (!preg_match('/^[a-zA-Z0-9-]+$/', $voice)) {
            return response()->json(['error' => 'Invalid voice identifier'], 422);
        }

        // Cache berdasarkan hash: text + voice + rate
        $hash     = md5("{$voice}_{$rate}_{$text}");
        $fileName = "tts/{$hash}.mp3";
        $fullPath = storage_path("app/public/{$fileName}");

        // Jika file sudah pernah dibuat sebelumnya, langsung stream dari storage
        if (Storage::disk('public')->exists($fileName)) {
            return response()->file($fullPath, [
                'Content-Type'        => 'audio/mpeg',
                'Cache-Control'       => 'public, max-age=31536000',
                'Accept-Ranges'       => 'bytes',
                'Content-Disposition' => 'inline; filename="speech.mp3"',
            ]);
        }

        // Pastikan direktori tujuan tersedia
        Storage::disk('public')->makeDirectory('tts');

        // Jalankan edge-tts via Symfony Process
        // Syntax: python -m edge_tts --voice <voice> --rate <rate> --text "<text>" --write-media <filepath>
        $process = new Process([
            'python',
            '-m', 'edge_tts',
            '--voice', $voice,
            '--rate', $rate,
            '--text', $text,
            '--write-media', $fullPath
        ]);

        \Illuminate\Support\Facades\Log::info('Running TTS', ['voice' => $voice, 'rate' => $rate, 'text' => $text]);

        $process->setTimeout(15);
        $process->run();

        if (!$process->isSuccessful()) {
            \Illuminate\Support\Facades\Log::error('TTS Failed', ['error' => $process->getErrorOutput()]);
            throw new ProcessFailedException($process);
        }

        return response()->file($fullPath, [
            'Content-Type'        => 'audio/mpeg',
            'Cache-Control'       => 'public, max-age=31536000',
            'Accept-Ranges'       => 'bytes',
            'Content-Disposition' => 'inline; filename="speech.mp3"',
        ]);
    }
}