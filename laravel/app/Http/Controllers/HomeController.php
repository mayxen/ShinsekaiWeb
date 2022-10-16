<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index($id)
    {
        return Inertia::render('home', [
            'id' => $id,
            'type' => 'Piso',
        ]);
    }

}
