<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('study_items', function (Blueprint $table) {
            $table->id();
            $table->string('content'); // Contoh: "Make up your mind" atau aturan grammar
            $table->enum('type', ['word', 'phrase', 'idiom', 'grammar_rule', 'speaking_prompt']);
            $table->string('translation');
            $table->text('example_sentence')->nullable();
            $table->text('notes')->nullable(); // Penjelasan tambahan
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('study_items');
    }
};