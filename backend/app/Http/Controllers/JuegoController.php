<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    function index() {

        $juegos = Juego::with(['categoria', 'puntaje'])->get();

        return response()->json($juegos);
    }

    function getJuegoById($id){
        $juego = Juego::with(['categoria', 'puntaje'])->find($id);

        return response()->json($juego);
    }
}
