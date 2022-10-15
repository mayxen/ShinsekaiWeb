<?php

namespace App\Models;

use App\Http\Controllers\GlobalFunctions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'licenses'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function homes()
    {
        return $this->hasMany(Home::class);
    }

    public function licenses()
    {
        return $this->belongsToMany(License::class, 'license_user');
    }

    //Metodo para comprobar si un usuario tiene permisos y por defecto comprueba Admin
    public function has($licence = "Admin")
    {
        return GlobalFunctions::checkUserHasLicence(Auth::user()->licenses, $licence);
    }

}