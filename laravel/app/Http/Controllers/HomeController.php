<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index($id)
    {
        $contactReasonList = GlobalFunctions::getContactReasonsList();

        return Inertia::render('Home', [
            'id' => $id,
            'type' => 'Piso',
            'contactReasonList' => $contactReasonList,
        ]);
    }

}
