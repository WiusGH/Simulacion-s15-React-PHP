<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function modifyUser(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'username' => 'required|string|max:45',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6',
        ]);

        $userDb = User::find($user->id);

        $userDb->username = $request->username;
        $userDb->email = $request->email;

        if ($request->has('password')) {
            $userDb->password = Hash::make($request->password);
        }

        $userDb->save();

        return response()->json($user, 200);
    }

    public function deleteUser()
    {
        $user = Auth::user();
        $userDb = User::find($user->id);

        $userDb->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
