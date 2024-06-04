<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\User;
use App\Models\Juego;
use Illuminate\Support\Facades\Validator;

class FavoritoController extends Controller
{
    public function agregarFavorito(Request $request)
    {
        $messages = [
            'usuario_id.required' => 'El id de usuario es obligatorio.',
            'juego_id.required' => 'El correo electrónico es obligatorio.',
            'usuario_id.exists' => 'El id de usuario '.$request->usuario_id.' no existe.',
            'juego_id.exists' => 'El juego id '.$request->juego_id.' no existe.',
        ];

        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:users,id',
            'juego_id' => 'required|exists:juego,id_juego',
        ], $messages);

        if ($validator->fails()){
            $data = [
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        };

        $usuario = User::find($request->usuario_id);

        $juego = Juego::find($request->juego_id);

        $favorito = $juego->favoritos('juego_id_juego', $request->juego_id)->first();

        if(!$favorito){
            $favorito = Favorito::create();
            $juego->favoritos()->attach($favorito->id_favorito, [
                'juego_categoria_id_categoria' => $request->juego_categoria_id_categoria
            ]);
            $juego->save();
        }

        $isFavorited = $usuario->favoritos('favorito_id_favorito', $favorito->id_favorito)->first();
        if($isFavorited){
            return response()->json(['message' => 'Ya tienes este juego en tus favoritos'], 400);
        }
        $usuario->favoritos()->attach($favorito->id_favorito);
        $usuario->save();

        return response()->json(['message' => 'Favorito agregado con éxito'], 200);
    }

    public function borrarFavorito(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:users,id',
            'favorito_id' => 'required|exists:favorito,id_favorito',
        ]);

        if ($validator->fails()){
            $data = [
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        };

        $usuario = User::find($request->usuario_id);

        $favorito = $usuario->favoritos('favorito_id_favorito', $request->favorito_id)->first();

        if ($favorito) {
            $usuario->favoritos()->detach($request->favorito_id);
            return response()->json(['message' => 'Favorito eliminado con éxito'], 200);
        }

        return response()->json(['message' => 'Favorito no encontrado'], 404);
    }
}
