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
}
