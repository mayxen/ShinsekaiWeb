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

//necesita estar registrado
Route::middleware(['auth', 'verified'])->group(function () {
    $webControllerProfile = [WebController::class, 'profile'];
    $webControllerProfileUpdate = [UserController::class, 'update'];

    Route::get('/profile', $webControllerProfile)->name("profile");
    Route::put('/profile/{id}', $webControllerProfileUpdate)->name("update-profile");
});

Route::get('/', $webControllerIndex)->name("index");
Route::get('/search', $webControllerSearch)->name("search");
Route::post('/search', $webControllerSearchPost)->name("search");
Route::post('/search_filter', [WebController::class, 'searchFilterHomes']);
Route::get('/home/{id}', [HomeController::class, 'index'])->name("home");
Route::get('/about', [WebController::class, 'about'])->name("about");
Route::get('/contact', [WebController::class, 'contact'])->name("contact");
Route::get('/defyhome-privacy-policy', [WebController::class, 'privacyPolicy'])->name("privacy-policy");
Route::get('/defyhome-cookies', [WebController::class, 'cookies'])->name("cookies");
Route::get('/frequently-asked-questions', [WebController::class, 'faq'])->name("faq");
Route::get('/defyhome-customer-service', [WebController::class, 'customerService'])->name("customer-service");

Route::post('/notify-owner', [WebController::class, 'mailOwner'])->name('notify-owner')
    ->middleware(['throttle:userMails']);

require __DIR__ . '/auth.php';
