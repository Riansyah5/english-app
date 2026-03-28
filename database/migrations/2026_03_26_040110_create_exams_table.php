<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_exams_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Misal: "Grammar & Speaking Test Level 1"
            $table->text('description')->nullable();
            $table->integer('duration_minutes')->default(30);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exams');
    }
};