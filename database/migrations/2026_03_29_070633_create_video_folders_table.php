<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('video_folders', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Misal: "School Conversations"
            $table->text('description')->nullable();
            $table->string('icon')->default('bi-folder'); // Class icon Bootstrap
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('video_folders');
    }
};