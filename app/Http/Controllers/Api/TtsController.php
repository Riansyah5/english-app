<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TtsService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TtsController extends Controller
{
    public function stream(Request $request)
    {
        $request->validate([
            'text'  => 'required|string|max:500',
            'voice' => 'nullable|string',
            'rate'  => 'nullable|string',
        ]);

        $text  = trim($request->query('text'));
        $voice = $request->query('voice', 'en-US-JennyNeural');
        $rate  = $request->query('rate', '+0%');

        if (!preg_match('/^[a-zA-Z0-9-]+$/', $voice)) {
            return response()->json(['error' => 'Invalid voice identifier'], 422);
        }

        try {
            $fileName = TtsService::generate($text, $voice, $rate);
            $fullPath = storage_path("app/public/{$fileName}");
            
            return response()->file($fullPath, [
                'Content-Type'        => 'audio/mpeg',
                'Cache-Control'       => 'public, max-age=31536000',
                'Accept-Ranges'       => 'bytes',
                'Content-Disposition' => 'inline; filename="speech.mp3"',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to generate TTS audio'], 500);
        }
    }
}