<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        "title",
        "resume",
        "description",
        "price",
        "period_type",
        'home_type_id',
        "home_purchase_type_id",
        "square_meter",
        "construction_year",
        "garage",
        "pets",
        "elevator",
        "terrace",
        "garden",
        "smoker",
        "furnished",
        "heating",
        "rooms",
        "bedrooms",
        "bathrooms",
        "town",
        "address",
        "postal_code",
        "block",
        "floor",
        "door",
    ];

    protected $casts = [
        "garage" => 'boolean',
        "pets" => 'boolean',
        "elevator" => 'boolean',
        "terrace" => 'boolean',
        "garden" => 'boolean',
        "smoker" => 'boolean',
        "furnished" => 'boolean',
        "heating" => 'boolean',
    ];

    public function homeType()
    {
        return $this->belongsTo(HomeType::class);
    }

    public function homePurchaseType()
    {
        return $this->belongsTo(HomePurchaseType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function homeImages()
    {
        return $this->hasMany(HomeImage::class);
    }
}
