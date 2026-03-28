<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_user_flashcards_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_flashcards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('study_item_id')->constrained()->cascadeOnDelete();
            
            // Kolom untuk Algoritma SRS (SuperMemo-2 style)
            $table->integer('repetition_count')->default(0); 
            $table->float('ease_factor')->default(2.5); // Faktor kemudahan awal
            $table->integer('interval')->default(0); // Jeda hari
            $table->date('next_review_date'); // Kapan harus diuji lagi
            
            $table->timestamps();
            
            // Mencegah duplikasi data belajar untuk user yang sama
            $table->unique(['user_id', 'study_item_id']); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_flashcards');
    }
};