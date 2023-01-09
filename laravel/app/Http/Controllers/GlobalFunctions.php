<?php

namespace App\Http\Controllers;

use App\Models\Log;

class GlobalFunctions
{
    const IdLicenceAdmin = 1;
    const IdLicenceGallery = 2;
    const IdLicenceEvent = 3;
    const IdLicenceNew = 4;
    const LicenceGallery = "Gallery";
    const LicenceEvent = "Event";
    const LicenceNew = "New";

    public static function checkUserHasLicence($licenses, $licenseName = "Admin")
    {
        foreach ($licenses as $license) {
            if ($license->license === "Admin")
                return true;
            if ($license->license === $licenseName)
                return true;
        }
        return false;
    }
}
