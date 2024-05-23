<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use App\Models\Puntaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PuntajeController extends Controller
{
    public function allPuntajes($id){

        $juego = Juego::findOrFail($id);

        $puntajes = $juego->puntajes()
                          ->orderBy('puntaje', 'desc')
                          ->get();

        return response()->json($puntajes);
    }

    public function topDiezPuntajes($id){

        $juego = Juego::findOrFail($id);

        $topScores = $juego->puntajes()
                           ->orderBy('puntaje', 'desc')
                           ->take(10)
                           ->get();

        return response()->json($topScores);
    }

    public function mayorPuntajeUsuario($juegoId){

        $juego = Juego::findOrFail($juegoId);

        $user = Auth::user();

        $highestScore = Puntaje::where('juego_id_juego', $juegoId)
                               ->where('usuario_id', $user->id)
                               ->orderBy('puntaje', 'desc')
                               ->first();

        return response()->json($highestScore);
    }

    public function crearOActualizarPuntaje(Request $request)
    {
        $request->validate([
            'juego_id' => 'required|exists:juego,id_juego',
            'puntaje' => 'required|integer',
            'comentario' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();
        $juegoId = $request->juego_id;
        $newScore = $request->puntaje;

        $existingScore = Puntaje::where('usuario_id', $user->id)
                                ->where('juego_id_juego', $juegoId)
                                ->first();

        if ($existingScore) {
            if ($newScore > $existingScore->puntaje) {
                $existingScore->puntaje = $newScore;
                $existingScore->comentario = $request->comentario;
                $existingScore->save();
            }
            return response()->json($existingScore, 200);
        }

        $puntaje = new Puntaje();
        $puntaje->usuario_id = $user->id;
        $puntaje->juego_id_juego = $juegoId;
        $puntaje->puntaje = $newScore;
        $puntaje->comentario = $request->comentario;
        $puntaje->save();

        return response()->json($puntaje, 201);
    }

}
