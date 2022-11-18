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


//!!!!!!!!!!!!!!!!!!!Es importante que se use el middleware HasAdmin con los :!!!!!!!!!!!!!!!!!!


// Grupo que añade por defecto el prefijo de /admin/ y exige que el usuario esté registrado
//Route::prefix('admin')->middleware(['auth', 'verified', 'HasAdmin'])->group(function () {
Route::prefix('admin')->group(function () {
    $indexAdminController = [AdminController::class, 'indexPaperbase'];

    // Redirección
    Route::get('/', function () {
        return redirect('admin/home');
    });

    // Admin HomeAlternative princiapl
    Route::get('/home', $indexAdminController)->name("admin_homes");

    //USUARIOS
    Route::get('/users', $indexAdminController)->name("admin_users")->middleware([ 'HasAdmin:User']);
    Route::delete('/user_delete/{id}', [AdminController::class, "deleteUser"])->middleware([ 'HasAdmin:User']);
    Route::post('/user_add', [AdminController::class, "addUser"])->middleware([ 'HasAdmin:User']);
    Route::put('/user_update/{id}', [AdminController::class, "updateUser"])->middleware([ 'HasAdmin:User']);

    //NOTICIAS
    Route::get('/new', $indexAdminController)->name("admin_new")->middleware(['HasAdmin:New']);
    Route::delete('/new_delete/{id}', [AdminController::class, "deleteNew"])->middleware(['HasAdmin:New']);
    Route::delete('/new_true_delete/{id}', [AdminController::class, "trueDeleteNew"])->middleware(['HasAdmin:New']);
    Route::post('/new_add', [AdminController::class, "addNew"])->middleware(['HasAdmin:New']);
    Route::put('/new_update/{id}', [AdminController::class, "updateNew"])->middleware(['HasAdmin:New']);
    Route::post('/new_update/{id}', [AdminController::class, "updateNew"])->middleware(['HasAdmin:New']);
    Route::post('/new_trashed', [AdminController::class, "toggleTrashedNew"])->middleware(['HasAdmin:New']);
});
