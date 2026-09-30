<?php

namespace App\Jobs;

use App\Models\StudyItem;
use App\Services\TtsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateTtsAudio implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $studyItem;
    
    // Bisa mengatur batas maksimal percobaan ulang
    public $tries = 3;
    
    // Batas waktu eksekusi
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(StudyItem $studyItem)
    {
        $this->studyItem = $studyItem;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Generate English audio (Content)
            if (!empty($this->studyItem->content)) {
                // Sesuai dengan setting di frontend
                TtsService::generate($this->studyItem->content, 'en-US-EmmaNeural', '+0%');
            }

            // Generate Indonesian audio (Translation)
            if (!empty($this->studyItem->translation)) {
                TtsService::generate($this->studyItem->translation, 'id-ID-GadisNeural', '+0%');
            }

            // (Opsional) Generate sentence audios jika ada fitur baca kalimat di masa depan
            if (!empty($this->studyItem->example_sentence)) {
                TtsService::generate($this->studyItem->example_sentence, 'en-US-EmmaNeural', '+0%');
            }

        } catch (\Exception $e) {
            Log::error('Background TTS Generation Error for StudyItem ' . $this->studyItem->id, [
                'message' => $e->getMessage()
            ]);
            // Lempar error agar job bisa di-retry oleh queue
            throw $e;
        }
    }
}
