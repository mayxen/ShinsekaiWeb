<?php

use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

$webControllerIndex = [WebController::class, 'index'];
$webControllerFeeds = [WebController::class, 'feeds'];
$webControllerFeed = [WebController::class, 'feed'];
$webControllerSearchPost = [WebController::class, 'searchPost'];
$webControllerAbout = [WebController::class, 'about'];
$webControllerContact = [WebController::class, 'contact'];

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
Route::get('/search/{feed}', $webControllerFeeds)->name("feeds");
Route::get('/search/{feed}/{id}', $webControllerFeed)->name("feed");
Route::get('/about', $webControllerAbout)->name("about");
Route::get('/contact', $webControllerContact)->name("contact");


Route::post('/notify-owner', [WebController::class, 'mailOwner'])->name('notify-owner')
    ->middleware(['throttle:userMails']);

require __DIR__ . '/auth.php';
