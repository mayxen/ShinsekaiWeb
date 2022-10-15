<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        // Validar y actualizar contraseña
        if ($request->oldPassword != "") {
            // Comprobar si la contraseña actual puesta en el campo es exactamente la contraseña actual guardada del usuario
            if (password_verify($request->oldPassword, $user->password)) {
                $validator = Validator::make($request->all(), [
                    'oldPassword' => 'required',
                    'newPassword' => 'required',
                    'confirmNewPassword' => 'required|same:newPassword',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 500);
                }

                $viejaContra = $request->oldPassword;
                $nuevaContra = $request->newPassword;

                // Comprobar si la nueva contraseña es igual a la actual puesta en el campo
                if ($viejaContra == $nuevaContra) {
                    return response()->json(['errors' => "La nueva contraseña es igual que la antigua"], 200);
                }

                $user->password = Hash::make($request->newPassword);
                $user->save();

                return response()->json(['ok' => 'ok'], 200);
            } else {
                return response()->json(['errors' => "Tu contraseña actual es incorrecta"], 200);
            }
        }

        // Validar y actualizar nombre
        if ($request->name != "") {
            if ($request->name != $user->name) {
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|min:3|max:20',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 500);
                }

                $user->name = $request->name;
                $user->save();

                return response()->json(['ok' => 'ok'], 200);
            } else {
                return response()->json(['errors' => "El nombre escrito es igual que el actual"], 200);
            }
        }

        // Validar y actualizar email
        if ($request->email != "") {
            if ($request->email != $user->email) {
                $validator = Validator::make($request->all(), [
                    'email' => 'required|email:rfc,dns',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 500);
                }

                $user->email = $request->email;
                $user->save();

                return response()->json(['ok' => 'ok'], 200);
            } else {
                return response()->json(['errors' => "El email escrito es igual que el actual"], 200);
            }
        }

        // Validar y actualizar teléfono
        if ($request->phoneNumber != "") {
            if ($request->phoneNumber != $user->phone_number) {
                $validator = Validator::make($request->all(), [
                    'phoneNumber' => 'required',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 500);
                }

                $user->phone_number = $request->phoneNumber;
                $user->save();

                return response()->json(['ok' => 'ok'], 200);
            } else {
                return response()->json(['errors' => "El teléfono escrito es igual que el actual"], 200);
            }
        }

        return response()->json(['errors' => 'superError'], 500);
    }
}
