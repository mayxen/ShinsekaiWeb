<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

$webControllerIndex = [WebController::class, 'index'];
$webControllerSearch = [WebController::class, 'search'];
$webControllerSearchPost = [WebController::class, 'searchPost'];

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', $webControllerIndex)->name("index");
Route::get('/about', [WebController::class, 'about'])->name("about");
Route::get('/contact', [WebController::class, 'contact'])->name("contact");


Route::post('/notify-owner', [WebController::class, 'mailOwner'])->name('notify-owner')
    ->middleware(['throttle:userMails']);

require __DIR__ . '/auth.php';
