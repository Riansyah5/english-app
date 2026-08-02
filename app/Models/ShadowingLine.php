<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShadowingLine extends Model
{
    protected $guarded = [];

    // Setiap baris dialog dimiliki oleh satu topik
    public function topic()
    {
        return $this->belongsTo(ShadowingTopic::class, 'shadowing_topic_id');
    }
}