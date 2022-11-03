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
//Route::prefix('admin')->middleware(['auth', 'verified', 'HasAdmin'])->group(function () {
Route::prefix('admin')->group(function () {
    $indexAdminController = [AdminController::class, 'indexPaperbase'];

    // Redirección
    Route::get('/', function () {
        return redirect('admin/home');
    });

    // Admin HomeAlternative princiapl
    Route::get('/home', $indexAdminController)->name("admin_homes");

    // Admin Usuarios
    Route::get('/users', $indexAdminController)->name("admin_users");
    Route::delete('/user_delete/{id}', [AdminController::class, "deleteUser"]);
    Route::post('/user_add', [AdminController::class, "addUser"]);
    Route::put('/user_update/{id}', [AdminController::class, "updateUser"]);
});
