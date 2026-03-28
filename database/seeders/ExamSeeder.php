<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\ExamQuestion;

class ExamSeeder extends Seeder
{
    public function run()
    {
        // 1. Membuat Paket Ujian Utama
        $exam = Exam::create([
            'title' => 'Evaluasi Grammar & Frasa (Level 1)',
            'description' => 'Tes ini dirancang untuk mengukur pemahaman tata bahasa, penggunaan tenses yang tepat, dan keluwesan menggunakan frasa dalam konteks akademik maupun sehari-hari.',
            'duration_minutes' => 15, // Waktu pengerjaan
        ]);

        // 2. Memasukkan Bank Soal ke dalam Ujian tersebut
        
        // Soal 1: Past Perfect Tense
        ExamQuestion::create([
            'exam_id' => $exam->id,
            'question_text' => 'By the time the teacher arrived, the students _____ the assignment.',
            'options' => [
                'a' => 'finish',
                'b' => 'finished',
                'c' => 'have finished',
                'd' => 'had finished'
            ],
            'correct_answer' => 'd',
            'explanation' => 'Gunakan Past Perfect Tense (had + V3) untuk kejadian yang sudah selesai sebelum kejadian lain di masa lampau (teacher arrived).'
        ]);

        // Soal 2: Penggunaan Gerund setelah frasa tertentu
        ExamQuestion::create([
            'exam_id' => $exam->id,
            'question_text' => 'I am really looking forward _____ you again next week.',
            'options' => [
                'a' => 'to see',
                'b' => 'to seeing',
                'c' => 'see',
                'd' => 'seeing'
            ],
            'correct_answer' => 'b',
            'explanation' => 'Pengecualian grammar: Frasa "look forward to" selalu diikuti oleh kata benda atau Gerund (Verb-ing).'
        ]);

        // Soal 3: Subject-Verb Agreement (Mengecoh dengan anak kalimat)
        ExamQuestion::create([
            'exam_id' => $exam->id,
            'question_text' => 'The library, which has thousands of books, _____ open until 9 PM.',
            'options' => [
                'a' => 'is',
                'b' => 'are',
                'c' => 'be',
                'd' => 'were'
            ],
            'correct_answer' => 'a',
            'explanation' => 'Subjek utamanya adalah "The library" (tunggal), sehingga To-Be yang tepat adalah "is". Anak kalimat di antara koma tidak memengaruhi subjek.'
        ]);

        // Soal 4: Lexical/Phrase (Cloze Deletion)
        ExamQuestion::create([
            'exam_id' => $exam->id,
            'question_text' => 'We need to _____ a decision before the meeting starts tomorrow.',
            'options' => [
                'a' => 'do',
                'b' => 'take',
                'c' => 'make',
                'd' => 'get'
            ],
            'correct_answer' => 'c',
            'explanation' => 'Dalam bahasa Inggris, kolokasi (pasangan kata) yang wajar untuk "decision" adalah "make a decision", bukan "do" atau "take".'
        ]);
    }
}