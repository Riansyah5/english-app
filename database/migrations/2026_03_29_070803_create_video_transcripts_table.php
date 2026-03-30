<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('video_transcripts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->constrained()->cascadeOnDelete();
            $table->float('start_time'); // Waktu mulai dalam detik (misal: 12.5)
            $table->float('end_time');   // Waktu selesai dalam detik (misal: 15.2)
            $table->text('text');        // Teks bahasa Inggris yang diucapkan
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('video_transcripts');
    }
};