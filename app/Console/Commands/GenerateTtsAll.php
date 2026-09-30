<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\StudyItem;
use App\Jobs\GenerateTtsAudio;

class GenerateTtsAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tts:generate-all {--sync : Generate secara sinkron tanpa queue}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate TTS audio for all Study Items in the background';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $items = StudyItem::all();
        $count = $items->count();

        if ($count === 0) {
            $this->info("Tidak ada StudyItem di database.");
            return;
        }

        $this->info("Memproses {$count} StudyItem...");

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        foreach ($items as $item) {
            if ($this->option('sync')) {
                // Jalankan langsung (akan memakan waktu lama)
                try {
                    $job = new GenerateTtsAudio($item);
                    $job->handle();
                } catch (\Exception $e) {
                    $this->error("\nGagal memproses ID {$item->id}: " . $e->getMessage());
                }
            } else {
                // Masukkan ke antrean background
                GenerateTtsAudio::dispatch($item);
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        if ($this->option('sync')) {
            $this->info('Selesai membuat file TTS secara langsung!');
        } else {
            $this->info('Semua tugas telah dimasukkan ke Queue.');
            $this->warn('Pastikan Anda menjalankan "php artisan queue:work" di background agar file TTS mulai digenerate.');
        }
    }
}
