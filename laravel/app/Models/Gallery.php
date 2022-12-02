<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "galleries";

    protected $fillable = [
        'title',
        'visible',
        'description',
        'resume',
        'eventDate',
    ];

    protected $casts = [
        'visible' => 'boolean',
    ];

    public function images()
    {
        return $this->hasMany(GalleryImage::class, 'galleries_id');
    }
}
