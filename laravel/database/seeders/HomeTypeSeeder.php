<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HomeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $home_types = [
            "Piso",
            "Dúplex",
            "Chalet",
            "Adosado",
            "Casa rústica",
            "Estudio",
            "Oficina",
            "Habitación",
            "Ático",
            "Trastero",
            "Local",
            "Nave",
            "Terreno",
            "Garaje",
        ];

        foreach ($home_types as $home_type) {
            DB::table('home_types')->insert([
                'type' => $home_type,
            ]);
        }
    }
}
