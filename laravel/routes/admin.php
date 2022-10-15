<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HomeTypeController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Grupo que añade por defecto el prefijo de /admin/ y exige que el usuario esté registrado y sea admin
Route::prefix('admin')->middleware(['auth', 'verified', 'HasAdmin'])->group(function () {
    $indexAdminController = [AdminController::class, 'indexPaperbase'];

    // Redirección
    Route::get('/', function () {
        return redirect('admin/home');
    });

    // Admin Home princiapl
    Route::get('/home', $indexAdminController)->name("admin_home");

    // Admin Usuarios
    Route::get('/users', $indexAdminController)->name("admin_users");
    Route::delete('/user_delete/{id}', [AdminController::class, "deleteUser"]);
    Route::post('/user_add', [AdminController::class, "addUser"]);
    Route::put('/user_update/{id}', [AdminController::class, "updateUser"]);

    // Admin Tipos de casas
    Route::get('/home_types', $indexAdminController)->name("admin_home_types");
    Route::delete('/home_type_delete/{id}', [AdminController::class, "deleteHomeType"]);
    Route::post('/home_type_add', [AdminController::class, "addHomeType"]);
    Route::put('/home_type_update/{id}', [AdminController::class, "updateHomeType"]);

    // Admin Casas
    Route::get('/homes', $indexAdminController)->name("admin_homes");
    Route::get('/get_homes', [AdminController::class, "getHomes"]);
    Route::delete('/home_delete/{id}', [AdminController::class, "deleteHome"]);
    Route::post('/homes_delete', [AdminController::class, 'deleteHomes']);
    Route::post('/store_home_before_add_images', [AdminController::class, 'storeHomeBeforeAddImages']);
    Route::put('/home_update/{id}', [AdminController::class, "updateHome"]);
    Route::get('/get_home_images/{id}', [AdminController::class, 'getImages']);
    Route::post('/insert_home_images/{id}', [AdminController::class, 'insertImages']);
    Route::delete('/delete_home_images/{id}', [AdminController::class, 'deleteImages']);

//    Route::get('/destacar', $indexAdminController);
});
