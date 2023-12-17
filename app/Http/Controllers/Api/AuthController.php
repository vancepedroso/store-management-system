<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
       $credentials = $request->validated();
        if(!Auth::attempt($credentials))
        {
            return response([
                'message' => 'Provide email address or password is incorrect'
            ],422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function signup(SignupRequest $request)
    {
        // Validate the request using the rules defined in SignupRequest
        $data = $request->validated();

        // Create a new user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return the user and token in the response
        return response(compact('user', 'token'));
    }


    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }
    
        return response('', 204);
    }
}
