<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StockController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->withoutMiddleware([\Tymon\JWTAuth\Http\Middleware\Authenticate::class]);
Route::get('/test', function () {
    return response()->json(['message' => 'Test route is working']);
})->withoutMiddleware([\Tymon\JWTAuth\Http\Middleware\Authenticate::class]);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->get('/check', function () {
    return response()->json(['message' => 'Authenticated']);
});
Route::middleware('auth:api')->get('/dashboard', function () {
    return response()->json(['message' => 'Bienvenue sur le tableau de bord']);
});
//Tous les routes concernant la foncitonnalité geston des stocks
Route::get('/test-stocks', [StockController::class, 'index']);
Route::prefix('stocks')->group(function () {
    Route::get('/', [StockController::class, 'index']);
    Route::post('/', [StockController::class, 'store']);
    Route::put('/{id}', [StockController::class, 'update']);
    Route::delete('/{id}', [StockController::class, 'destroy']);
});

