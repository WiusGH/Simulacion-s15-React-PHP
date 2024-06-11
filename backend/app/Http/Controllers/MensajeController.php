<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MensajeController extends Controller
{
    public function indexGlobal()
    {
        $mensajes = Mensaje::where('is_global', true)->with('sender')->orderBy('created_at', 'asc')->get();
        return response()->json($mensajes);
    }

    public function indexPrivate(User $user)
    {
        $currentUser = Auth::user();
        $mensajes = Mensaje::where(function ($query) use ($user, $currentUser) {
            $query->where('sender_id', $currentUser->id)
                  ->where('receiver_id', $user->id);
        })->orWhere(function ($query) use ($user, $currentUser) {
            $query->where('sender_id', $user->id)
                  ->where('receiver_id', $currentUser->id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($mensajes);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'mensaje' => 'required|string',
        'receiver_id' => 'nullable|exists:users,id',
        'is_global' => 'required|boolean',
    ]);

    // Si el mensaje es global, no necesitamos un receiver_id
    if ($validatedData['is_global']) {
        $mensaje = new Mensaje();
        $mensaje->mensaje = $validatedData['mensaje'];
        $mensaje->sender_id = Auth::id();
        $mensaje->is_global = true;
        $mensaje->save();

        return response()->json(['message' => 'Mensaje global enviado correctamente.', 'data' => $mensaje], 201);
    }

    // Si el mensaje es privado, validamos que se haya proporcionado un receiver_id
    if (empty($validatedData['receiver_id'])) {
        return response()->json(['error' => 'El ID del receptor es requerido para los mensajes privados.'], 422);
    }

    // Verificar si el usuario receptor existe
    $receiver = User::find($validatedData['receiver_id']);
    if (!$receiver) {
        return response()->json(['error' => 'El usuario receptor no existe.'], 404);
    }

    // Guardar el mensaje privado
    $mensaje = new Mensaje();
    $mensaje->mensaje = $validatedData['mensaje'];
    $mensaje->sender_id = Auth::id();
    $mensaje->receiver_id = $validatedData['receiver_id'];
    $mensaje->is_global = false;
    $mensaje->save();

    return response()->json(['message' => 'Mensaje privado enviado correctamente.', 'data' => $mensaje], 201);
}
}
