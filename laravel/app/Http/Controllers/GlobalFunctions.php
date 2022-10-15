<?php

namespace App\Http\Controllers;

use App\Models\Log;

class GlobalFunctions
{
    const IdLicenceAdmin = 1;

    const purchaseType = [
        0 => 'Comprar',
        1 => 'Alquilar',
        2 => 'Compartir',
    ];

    public static function getPurchaseTypeList()
    {
        return self::purchaseType;
    }

    public static function getTypePurchase(int $type = 0)
    {
        if ($type > count(self::purchaseType))
            return self::purchaseType[$type];
        return -1;
    }

    public static function createLog($change, $user)
    {
        Log::create([
            'change' => $change,
            'user_id' => $user
        ]);
    }

    public static function checkUserHasLicence($licenses, $licenseName = "Admin")
    {
        foreach ($licenses as $license) {
            if ($license->license === $licenseName)
                return true;
        }
        return false;
    }

    public static function getContactReasonsList()
    {
        return [
            'Ponerme en contacto',
            'Solicitar nuevas fotos',
            'Solicitar información extra',
        ];
    }
}
