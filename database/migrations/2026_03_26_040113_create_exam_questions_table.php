<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_exam_questions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->cascadeOnDelete();
            $table->text('question_text'); // Mendukung soal rumpang (Cloze)
            $table->json('options'); // Menyimpan pilihan ganda dalam format JSON
            $table->string('correct_answer');
            $table->text('explanation')->nullable(); // Penjelasan jawaban benar
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exam_questions');
    }
};