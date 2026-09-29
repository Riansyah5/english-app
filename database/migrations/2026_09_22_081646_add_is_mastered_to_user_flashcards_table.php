<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_flashcards', function (Blueprint $table) {
            // Kolom penanda kata yang sudah hafal
            // Kartu hafal tidak muncul di Daily Review tapi tetap muncul di Latihan Bebas
            $table->boolean('is_mastered')->default(false)->after('next_review_date');
            $table->index(['user_id', 'is_mastered']); // Index untuk query yang efisien
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_flashcards', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'is_mastered']);
            $table->dropColumn('is_mastered');
        });
    }
};
