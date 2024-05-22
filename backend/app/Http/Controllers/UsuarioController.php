<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    function getAllUsers(){
        $users = User::all();

        return response()->json($users);
    }

    function getUserById($id){
        $user = User::find($id);

        return response()->json($user);
    }

    public function createUser(Request $request) {

        $request->validate([
            'username' => 'required|string|max:45',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $user = new User();

        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json($user, 201);
    }
}
