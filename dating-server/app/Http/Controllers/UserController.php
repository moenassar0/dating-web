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
        $user->l_name = $request->l_name;
        $user->picture_url = $request->l_name;
        $user->gender = $request->gender;
        $user->interested_gender = $request->interested_gender;
        $user->email = $request->email;
        $user->password = $request->password;
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
        if(!auth()->user()){
            return response()->json(['message' => "Not authorized!"]);
        }

        $id = auth()->user()->id;
        //Get users who are blocked by the user logged in and the users who blocked the user logged in using UNION
        $blocked_users = BlockedUser::select('blocked_users.user_id')->where('blocked_user_id', $id)->union(
        BlockedUser::select('blocked_users.blocked_user_id')->where('user_id', $id))->get();
        //->orWhere('blocked_user_id', $id)->get();
        $users = User::select('users.*')
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
