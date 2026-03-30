<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $guarded = [];

    public function folder()
    {
        return $this->belongsTo(VideoFolder::class, 'video_folder_id');
    }

    public function transcripts()
    {
        return $this->hasMany(VideoTranscript::class)->orderBy('start_time', 'asc');
    }
}