<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LicenseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $licenses = [
            "Admin",
            "Gallery",
            "Event",
            "New",
        ];
        foreach ($licenses as $license) {
            DB::table('licenses')->insert([
                'license' => $license,
            ]);
        }

    }
}
