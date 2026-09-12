<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'content', 'type', 'level', 'translation', 'example_sentence', 'example_translation', 'notes'
    ];

    // Relasi: Satu materi bisa ada di banyak flashcard milik berbagai user
    public function userFlashcards()
    {
        return $this->hasMany(UserFlashcard::class);
    }
}