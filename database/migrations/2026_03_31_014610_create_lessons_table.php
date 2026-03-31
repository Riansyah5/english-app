<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique(); // URL friendly
            $table->longText('content'); // Menyimpan tag HTML dari Editor
            $table->integer('order_number')->default(0); // Urutan bab
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('lessons');
    }
};