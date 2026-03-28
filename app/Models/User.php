<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\StudyItem;
use App\Models\UserFlashcard;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

#[Fillable(['name', 'email', 'password', 'daily_goal', 'is_admin',])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relasi: Satu User memiliki banyak Flashcard
    public function flashcards()
    {
        return $this->hasMany(UserFlashcard::class);
    }

    // =========================================================
    // MODEL EVENT: Otomatisasi saat User Baru Dibuat
    // =========================================================
    protected static function booted()
    {
        static::created(function ($user) {
            // 1. Ambil SEMUA ID materi yang ada di database saat ini
            $studyItems = StudyItem::pluck('id');

            $flashcards = [];
            $today = Carbon::today();
            $now = Carbon::now();

            // 2. Siapkan data antrean belajar untuk user baru ini
            foreach ($studyItems as $itemId) {
                $flashcards[] = [
                    'user_id' => $user->id,
                    'study_item_id' => $itemId,
                    'repetition_count' => 0,
                    'ease_factor' => 2.5,
                    'interval' => 0,
                    'next_review_date' => $today, // Langsung ditagihkan hari ini
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            // 3. Masukkan ke database secara massal (Bulk Insert)
            // Menggunakan array_chunk agar server tidak down jika materinya ada puluhan ribu
            $chunks = array_chunk($flashcards, 500);
            foreach ($chunks as $chunk) {
                UserFlashcard::insert($chunk);
            }
        });
    }
}
