<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShadowingTopic extends Model
{
    protected $guarded = [];

    // Satu topik memiliki banyak baris dialog.
    // Otomatis diurutkan berdasarkan order_number agar percakapannya tidak acak.
    public function lines()
    {
        return $this->hasMany(ShadowingLine::class)->orderBy('order_number', 'asc');
    }
}