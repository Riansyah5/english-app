<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\StudyItem;
use App\Models\UserFlashcard;
use Carbon\Carbon;

class UserFlashcardSeeder extends Seeder
{
    public function run()
    {
        // Pastikan ada setidaknya satu user untuk mencoba (Jika belum ada, kita buatkan)
        $user = User::firstOrCreate(
            ['email' => 'admin@english.app'],
            [
                'name' => 'Admin Learner',
                'password' => bcrypt('password123') // Password untuk login: password123
            ]
        );

        // Ambil semua materi dari bank soal
        $studyItems = StudyItem::all();

        // Masukkan ke flashcard user, jadwalkan untuk hari ini
        foreach ($studyItems as $item) {
            UserFlashcard::firstOrCreate([
                'user_id' => $user->id,
                'study_item_id' => $item->id,
            ], [
                'repetition_count' => 0,
                'ease_factor' => 2.5,
                'interval' => 0,
                'next_review_date' => Carbon::today(), // Langsung tagih hari ini
            ]);
        }
    }
}