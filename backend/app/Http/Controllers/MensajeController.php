<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\User;
use Illuminate\Http\Request;

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
        $mensaje = new Mensaje();
        $mensaje->mensaje = $request->input('mensaje');
        $mensaje->sender_id = auth()->user()->id;
        $mensaje->receiver_id = $request->input('receiver_id');
        $mensaje->save();

        return redirect()->back()->with('success', 'Mensaje enviado correctamente.');
    }
}
