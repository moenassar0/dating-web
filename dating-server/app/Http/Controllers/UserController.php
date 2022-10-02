<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BlockedUser;
use App\Http\Controllers\DB;

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

    public function getUsers(Request $request){
        $blocked_users = BlockedUser::select('blocked_users.blocked_user_id')->where('id', $request->id)->get();
        $users = User::select('users.id')
        ->whereNotIn('id', $blocked_users)->get();
        //
        //->select('users.*')
        //->whereNotIn('id', DB::table('blocked')->select('id_user')->where('id_user', '=', $id)->get()->toArray())
        //->get();

        if(!$users->isEmpty())
            return response()->json(['message' => $users]);
        else
            return response()->json(['message' => 'not found']);
    }
}
