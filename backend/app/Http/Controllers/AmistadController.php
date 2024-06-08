<?php

namespace App\Http\Controllers;

use App\Models\Amistad;
use App\Models\User;
use Illuminate\Http\Request;

class AmistadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amigo_id' => 'required|exists:users,id',
        ]);

        $amistad = Amistad::create([
            'user_id' => $request->user_id,
            'amigo_id' => $request->amigo_id,
        ]);

        return response()->json($amistad, 201);
    }

    public function eliminarAmistad($id)
    {
        $amistad = Amistad::find($id);

        if (!$amistad) {
            return response()->json(['message' => 'Usted no es amigo de este usuario'], 404);
        }

        $amistad->delete();

        return response()->json(['message' => 'Amistad eliminada correctamente'], 200);
    }

    public function getAmigos($id)
    {
        $user = User::findOrFail($id);
        $friends = $user->amigos()->get();

        if ($friends->isEmpty()) {
            return response()->json(['message' => 'No tienes amigos :('], 200);
        }

        return response()->json($friends, 200);
    }
}
