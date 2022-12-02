<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'visible',
        'description',
        'resume',
        'url',
        'galleries_id',
    ];

    protected $casts = [
        'visible' => 'boolean',
    ];
}
