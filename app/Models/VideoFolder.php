<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoFolder extends Model
{
    protected $guarded = [];

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}