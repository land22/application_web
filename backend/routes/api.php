<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\CultureController;
use App\Http\Controllers\ActiviteAgricoleController;
use App\Http\Controllers\NotificationController;

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
//Toutes les routes concernant la foncitonnalité geston des stocks
Route::get('/test-stocks', [StockController::class, 'index']);
Route::prefix('stocks')->group(function () {
    Route::get('/', [StockController::class, 'index']);
    Route::post('/', [StockController::class, 'store']);
    Route::put('/{id}', [StockController::class, 'update']);
    Route::delete('/{id}', [StockController::class, 'destroy']);
});

//Toutes les routes concernant la foncitonnalité geston des cultures
Route::prefix('cultures')->group(function () {
    Route::get('/', [CultureController::class, 'index']);
    Route::post('/', [CultureController::class, 'store']);
    Route::put('/{id}', [CultureController::class, 'update']);
    Route::delete('/{id}', [CultureController::class, 'destroy']);
});
// Toutes les routes concernant la fonctionnalité de la gestions agricole
Route::get('/activites-agricoles', [ActiviteAgricoleController::class, 'index']);
Route::post('/activites-agricoles', [ActiviteAgricoleController::class, 'store']);
Route::put('/activites-agricoles/{id}', [ActiviteAgricoleController::class, 'update']);
Route::delete('/activites-agricoles/{id}', [ActiviteAgricoleController::class, 'destroy']);


// Tous concernant la fonctionnalité de notification
Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::put('/notifications/{id}', [NotificationController::class, 'update']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

