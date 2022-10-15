<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeImage extends Model
{
    use HasFactory;

    protected $fillable = [
        "url",
        "home_id",
    ];

    public function home()
    {
        return $this->belongsTo(Home::class);
    }
}
