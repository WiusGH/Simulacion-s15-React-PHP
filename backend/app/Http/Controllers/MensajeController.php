<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MensajeController extends Controller
{
    public function index(User $user1, User $user2)
    {
        $mensajes = Mensaje::where(function ($query) use ($user1, $user2) {
            $query->where('sender_id', $user1->id)
                  ->where('receiver_id', $user2->id);
        })->orWhere(function ($query) use ($user1, $user2) {
            $query->where('sender_id', $user2->id)
                  ->where('receiver_id', $user1->id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($mensajes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'mensaje' => 'required|string',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $mensaje = new Mensaje();
        $mensaje->mensaje = $validatedData['mensaje'];
        $mensaje->sender_id = Auth::id();
        $mensaje->receiver_id = $validatedData['receiver_id'];
        $mensaje->save();

        return response()->json(['message' => 'Mensaje enviado correctamente.', 'data' => $mensaje], 201);
    }
}
