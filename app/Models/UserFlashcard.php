<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFlashcard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'study_item_id', 'repetition_count', 
        'ease_factor', 'interval', 'next_review_date'
    ];

    // Cast tanggal agar otomatis menjadi instance Carbon
    protected $casts = [
        'next_review_date' => 'date',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Master Materi (StudyItem)
    public function studyItem()
    {
        return $this->belongsTo(StudyItem::class);
    }
}