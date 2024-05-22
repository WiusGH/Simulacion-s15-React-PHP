<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

/* Login-Logout-Register */
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);
Route::post('/register', [UsuarioController::class, 'createUser']);

/* Usuarios */
Route::get('/users', [UsuarioController::class, 'getAllUsers']);
Route::get('/users/{id}', [UsuarioController::class, 'getUserById']);

/* Juegos */
Route::get('/juegos', [JuegoController::class, 'index']);
Route::get('/juegos/{id}', [JuegoController::class, 'getJuegoById']);

/* Categorías */
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/categorias/{id}', [CategoriaController::class, 'getCategoriaById']);
