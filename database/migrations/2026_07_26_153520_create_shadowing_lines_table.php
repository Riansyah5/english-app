<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shadowing_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shadowing_topic_id')->constrained()->cascadeOnDelete();
            $table->string('character_name'); // Misal: "John", "Barista", "Officer"
            $table->text('text_en'); // Teks bahasa Inggris untuk dibaca TTS
            $table->text('text_id')->nullable(); // Terjemahan bahasa Indonesia
            $table->integer('order_number')->default(1); // Urutan percakapan
            $table->enum('voice_gender', ['male', 'female'])->default('female');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shadowing_lines');
    }
};