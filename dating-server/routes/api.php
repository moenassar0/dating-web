<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;

//All routes outside middleware have their own token protection
Route::post("/user/add", [UserController::class, "store"]);
Route::post("/user/find", [UserController::class, "findUser"]);
Route::post("/user/favorite", [UserController::class, "insertFavorite"]);
Route::post("/user/block", [UserController::class, "blockUser"]);
Route::post("/user/favorites", [UserController::class, "getFavorites"]);
Route::post("/users/find", [UserController::class, "getUsers"]);
Route::post("/users/image", [UserController::class, "insertImage"]);
Route::post("/user/profile", [UserController::class, "getProfile"]);
Route::post("/user/edit", [UserController::class, "editUser"]);
Route::post("/user/updateImage", [UserController::class, "changeImage"]);
Route::post("/user/incognito", [UserController::class, "toggleIncognito"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'auth'], function($router) {
    Route::post('/profile', [AuthController::class, 'profile']);
    Route::post('/authUser', [AuthController::class, 'authUser']);
    Route::post("/user/send", [MessageController::class, "sendMessage"]);
    Route::post("/user/messengers", [MessageController::class, "getMessengers"]);
    Route::post("/user/messages", [MessageController::class, "getMessages"]);
    Route::post("/user/sendhi", [MessageController::class, "sendHi"]);
    
});

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
