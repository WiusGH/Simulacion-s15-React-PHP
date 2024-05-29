<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

        $messages = [
            'username.required' => 'El nombre de usuario es obligatorio.',
            'username.string' => 'El nombre de usuario debe ser una cadena de texto.',
            'username.max' => 'El nombre de usuario no puede tener más de 45 caracteres.',
            'username.unique' => 'El nombre de usuario '.$request->username.' ya está en uso.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo válida.',
            'email.unique' => 'El correo electrónico '.$request->email.' ya está en uso.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
        ];

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:45|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
          ], $messages);
  
          if ($validator->fails()){
              $data = [
                  'message' => 'Error de validación',
                  'errors' => $validator->errors(),
                  'status' => 400
              ];
              return response()->json($data, 400);
          };

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
