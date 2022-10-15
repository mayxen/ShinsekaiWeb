<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HomePurchaseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "Comprar",
            "Alquiler",
            "Compartir"
        ];

        foreach ($types as $type) {
            DB::table('home_purchase_types')->insert([
                'type' => $type,
            ]);
        }
    }
}
