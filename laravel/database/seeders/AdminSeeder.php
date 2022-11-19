<?php

namespace Database\Seeders;

use App\Http\Controllers\GlobalFunctions;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'admin',
            'email' => "admin@admin.com",
            'password' => Hash::make(1234),
        ]);

        $licences = [];
        $licences[] = GlobalFunctions::IdLicenceAdmin;
        $licences[] = GlobalFunctions::IdLicenceGallery;
        $licences[] = GlobalFunctions::IdLicenceEvent;
        $licences[] = GlobalFunctions::IdLicenceNew;

        $user->licenses()->attach($licences);
    }
}
