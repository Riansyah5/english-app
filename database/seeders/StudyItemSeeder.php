<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudyItem;

class StudyItemSeeder extends Seeder
{
    public function run()
    {
        $items = [
            // Kosakata Tunggal
            [
                'content' => 'Reluctant',
                'type' => 'word',
                'translation' => 'Enggan / Tidak bersedia',
                'example_sentence' => 'He was reluctant to ask for help.',
                'notes' => 'Sering diikuti oleh "to + verb".',
            ],
            // Frasa (Sesuai pendekatan Lexical)
            [
                'content' => 'Make up your mind',
                'type' => 'phrase',
                'translation' => 'Buatlah keputusan',
                'example_sentence' => 'You need to make up your mind before the deadline.',
                'notes' => 'Sangat umum digunakan dalam percakapan sehari-hari dibandingkan "make a decision".',
            ],
            [
                'content' => 'Piece of cake',
                'type' => 'idiom',
                'translation' => 'Sangat mudah',
                'example_sentence' => 'The English test was a piece of cake.',
                'notes' => 'Gunakan hanya pada situasi informal.',
            ],
            // Aturan Grammar Dasar
            [
                'content' => 'Past Simple vs Present Perfect',
                'type' => 'grammar_rule',
                'translation' => 'Kejadian selesai (Past) vs Kejadian berdampak ke masa kini (Perfect)',
                'example_sentence' => 'I ate an apple (Past). I have eaten an apple (Perfect).',
                'notes' => 'Gunakan Past Simple jika ada keterangan waktu spesifik (yesterday, last week).',
            ],
            // Latihan Speaking
            [
                'content' => 'Describe a memorable journey you have made.',
                'type' => 'speaking_prompt',
                'translation' => 'Ceritakan perjalanan berkesan yang pernah kamu lakukan.',
                'example_sentence' => 'I would like to talk about my trip to...',
                'notes' => 'Fokus pada penggunaan Past Tense dan kata sifat (adjectives) yang deskriptif.',
            ]
        ];

        foreach ($items as $item) {
            StudyItem::create($item);
        }
    }
}