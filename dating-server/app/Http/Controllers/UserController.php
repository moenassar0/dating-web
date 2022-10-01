<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request){

        $user = new User;

        $user->f_name = $request->f_name;
        $user->l_name = $request->f_name;
        $user->picture_url = $request->f_name;
        $user->gender = $request->f_name;
        $user->interested_gender = $request->f_name;
        $user->email = $request->f_name;
        $user->password = $request->f_name;
        $user->save();
        return response()->json(['message' => 'success']);
    }

    public function findUser(Request $request){
        $user = User::where('email', $request->email)->where('password', $request->password)->get();

        if(!$user->isEmpty())
            return response()->json(['message' => 'found']);
        else
            return response()->json(['message' => 'not found']);
    }
}
