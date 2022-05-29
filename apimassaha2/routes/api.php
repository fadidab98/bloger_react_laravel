<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\DashboardAdminController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\FrontEnd\HomeConntroller;
use App\Http\Controllers\Moderator\CategoryModeratorController;
use App\Http\Controllers\Moderator\DashboardController;
use App\Http\Controllers\Moderator\PostModeratorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//----------------------------------------------------admin-------------------------------------------------------
//Dashboard
Route::get('dashboard',[DashboardAdminController::class,'CountData']);
Route::get('chart/{id}',[DashboardAdminController::class,'getMonthlyPostData']);
//users
Route::post('login',[UserController::class,'login']);
Route::post('profile-user/{id}',[UserController::class,'profile']);
Route::post('change-password-user/{id}',[UserController::class,'changepassword']);
Route::post('add-user',[UserController::class,'create']);
Route::get('delete-user/{id}',[UserController::class,'delete']);
Route::get('users/{id}',[UserController::class,'index']);
Route::get('show-user/{id}',[UserController::class,'show']);
Route::post('edit-user/{id}',[UserController::class,'edit']);
//category

Route::post('add-category',[CategoryController::class,'create']);
Route::get('delete-category/{id}',[CategoryController::class,'delete']);
Route::get('Categories/{id}',[CategoryController::class,'index']);

Route::get('category-show/{id}',[CategoryController::class,'show']);
Route::post('category-edit/{id}',[CategoryController::class,'edit']);
//posts

Route::get('Posts/{id}',[PostController::class,'index']);
Route::get('delete-post/{id}',[PostController::class,'delete']);
Route::post('add-post',[PostController::class,'create']);
Route::post('edit-post/{id}',[PostController::class,'edit']);

//----------------------------------------------------front-end-------------------------------------------------------

Route::get('home-data',[HomeConntroller::class,'newData']);
Route::get('Category/{category}',[HomeConntroller::class,'postCategory']);
Route::get('viewPost/{id}',[HomeConntroller::class,'viewPost']);
Route::get('Navbar',[HomeConntroller::class,'navs']);
Route::get('category-front',[HomeConntroller::class,'category']);
Route::get('setting',[SettingController::class,'index']);
Route::post('update-setting',[SettingController::class,'update']);
Route::get('search',[HomeConntroller::class,'search']);
//-----------------------------------------------------moderator----------------------------------------------------

Route::get('moderator/dashboard/{id}',[DashboardController::class,'Dashboard']);

Route::get('moderator/chart/{id}',[DashboardController::class,'getMonthlyPostData']);

Route::get('moderator/Posts/{id}',[PostModeratorController::class,'index']);
Route::get('moderator/delete-post/{id}',[PostModeratorController::class,'delete']);
Route::post('moderator/add-post',[PostModeratorController::class,'create']);
Route::post('moderator/edit-post/{id}',[PostModeratorController::class,'edit']);
Route::get('moderator/Categories',[CategoryModeratorController::class,'index']);

Route::get('moderator/viewPost/{id}',[HomeConntroller::class,'viewPost']);










Route::middleware('auth:sanctum','isAdmin')->group( function () {
    Route::get('/checkingAuthenticated', function (){
     return response()->json(['message'=>'You Are In','status'=>200],200);
   });
    Route::post('api/logout',[UserController::class,'logout']);

});

Route::middleware('auth:sanctum','isModerator')->group( function () {
    Route::get('/moderatorCheckingAuthenticated', function (){
        return response()->json(['message'=>'You Are In','status'=>200],200);
    });


});
Route::middleware('auth:sanctum')->group( function () {
    Route::post('logout',[UserController::class,'logout']);
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
