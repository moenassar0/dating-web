<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;
class AuthController extends Controller
{
    public function _construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'f_name' => 'required',
            'email' => 'required|string|unique:users',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $user = new User;

        $user->f_name = $request->f_name;
        $user->l_name = $request->f_name;
        $user->picture_url = $request->f_name;
        $user->gender = $request->f_name;
        $user->interested_gender = $request->f_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => 'success']);
    }


}
