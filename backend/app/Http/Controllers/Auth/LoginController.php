<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessTokenFactory;
use Laravel\Sanctum\Sanctum;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();
        Log::info($user);

        if ($user && Hash::check($credentials['password'], $user->password)) {
            Auth::login($user);
            Log::info('Login successful for user: ' . $user->email);

            // Genero el token solo para pruebas - quitar en prod
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'message' => 'Login successful'
            ], 200);
        }

        $errorMessage = trans('auth.failed');
        Log::error('Login failed. Error message: ' . $errorMessage);
        return response()->json(['message' => $errorMessage], 401);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            // Elimina el token de acceso actual
            $request->user()->currentAccessToken()->delete();

            // Cierra la sesión del usuario
            Auth::logout();

            // Registra la acción de cierre de sesión
            Log::info('User ' . $user->username . ' logged out');
        } else {
            Log::info('Attempted logout with no authenticated user');
        }

        return response()->json(['message' => 'Logout successful'], 200);
    }
}

/*

public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();
        Log::info($user);

        if ($user) {
            if (Hash::check($credentials['password'], $user->password)) {
                Auth::login($user);
                Log::info('Login successful for user: ' . $user->email);
                return response()->json(['user' => $user, 'message' => 'Login successful'], 200);
            }
        }

        $errorMessage = trans('auth.failed');
        Log::error('Login failed. Error message: ' . $errorMessage);
        return response()->json(['message' => $errorMessage], 401);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        Auth::logout();

        if ($user) {
            Log::info('User ' . $user->username . ' logged out');
        } else {
            Log::info('User logged out');
        }

        return response()->json(['message' => 'Logout successful'], 200);
    }


*/
