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

    function crearJuego(Request $request){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:45',
            'categoria_id_categoria' => 'required|exists:categoria,id_categoria'
        ]);

        $juego = new Juego();
        $juego->nombre = $request->nombre;
        $juego->descripcion = $request->descripcion;
        $juego->categoria_id_categoria = $request->categoria_id_categoria;
        $juego->save();

        return response()->json($juego, 201);
    }

    function modificarJuego(Request $request, $id){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:45',
            'categoria_id_categoria' => 'required|exists:categoria,id_categoria'
        ]);

        $juego = Juego::find($id);
        if (!$juego) {
            return response()->json(['message' => 'El juego no existe'], 404);
        }

        $juego->nombre = $request->nombre;
        $juego->descripcion = $request->descripcion;
        $juego->categoria_id_categoria = $request->categoria_id_categoria;
        $juego->save();

        return response()->json($juego, 200);
    }

    function eliminarJuego($id){
        $juego = Juego::find($id);
        if (!$juego) {
            return response()->json(['message' => 'El juego no existe'], 404);
        }

        $juego->delete();

        return response()->json(['message' => 'El juego se eliminó'], 200);
    }
    
}
