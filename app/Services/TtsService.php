<?php

namespace App\Services;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class TtsService
{
    /**
     * Menghasilkan audio TTS jika belum ada di cache.
     * Mengembalikan path relatif di storage/app/public/
     */
    public static function generate(string $text, string $voice, string $rate = '+0%'): string
    {
        $text = trim($text);
        
        // Hash yang sama dengan TtsController
        $hash     = md5("{$voice}_{$rate}_{$text}");
        $fileName = "tts/{$hash}.mp3";
        $fullPath = storage_path("app/public/{$fileName}");

        if (Storage::disk('public')->exists($fileName)) {
            return $fileName;
        }

        Storage::disk('public')->makeDirectory('tts');

        $process = new Process([
            'python',
            '-m', 'edge_tts',
            '--voice', $voice,
            '--rate', $rate,
            '--text', $text,
            '--write-media', $fullPath
        ]);

        $process->setTimeout(60); // 60 detik batas waktu
        $process->run();

        if (!$process->isSuccessful()) {
            Log::error('TTS Generation Failed in Background', [
                'voice' => $voice,
                'text'  => $text,
                'error' => $process->getErrorOutput()
            ]);
            throw new ProcessFailedException($process);
        }

        return $fileName;
    }
}
