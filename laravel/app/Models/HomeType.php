<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeType extends Model
{
    use HasFactory;

    protected $fillable = [
        "type",
    ];

    public function homes()
    {
        return $this->hasMany(Home::class);
    }
}
