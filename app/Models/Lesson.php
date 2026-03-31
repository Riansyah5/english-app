<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(LessonCategory::class, 'lesson_category_id');
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class);
    }
}