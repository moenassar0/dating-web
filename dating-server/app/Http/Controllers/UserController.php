<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BlockedUser;
use App\Models\Favorite;
use App\Http\Controllers\DB;

class UserController extends Controller
{
    public function store(Request $request){

        $user = new User;

        $user->f_name = $request->f_name;
        $user->l_name = $request->l_name;
        $user->gender = $request->gender;
        $user->bio = $request->bio;
        $user->interested_gender = $request->interested_gender;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->location = $request->location;
        //Generate image and it's URL
        $base64_string = $request->base64_string;
        $decoder = base64_decode($base64_string);
        $url = 'C:\xampp\htdocs\dating-web\dating-frontend\assets\uploaded_images/' . $request->email . ".jpg";
        file_put_contents($url, $decoder);
        $user->picture_url = "/dating-web/dating-frontend/assets/uploaded_images/" . $request->email . ".jpg";

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
        $interested_gender = auth()->user()->interested_gender;
        $gender = auth()->user()->gender;

        //Get users who are blocked by the user logged in and the users who blocked the user logged in using UNION
        $blocked_users = BlockedUser::select('blocked_users.user_id')->where('blocked_user_id', $id)->union(
        BlockedUser::select('blocked_users.blocked_user_id')->where('user_id', $id))->get();
        //->orWhere('blocked_user_id', $id)->get();
        $users = User::select('users.*')
        ->where('users.gender', $interested_gender)
        ->where('users.interested_gender', $gender)
        //filter own user from result
        ->where('id','!=', $id)
        ->where('incognito', 0)
        ->whereNotIn('id', $blocked_users)->get();

        if(!$users->isEmpty())
            return response()->json(['message' => $users]);
        else
            return response()->json(['message' => 'not found']);
    }

    public function insertImage(Request $request){

    }

    public function getFavorites(){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);

        $id = auth()->user()->id;

        //Get users who are blocked by the user logged in and the users who blocked the user logged in using UNION
        $blocked_users = BlockedUser::select('blocked_users.user_id')->where('blocked_user_id', $id)->union(
        BlockedUser::select('blocked_users.blocked_user_id')->where('user_id', $id))->get();

        $users = Favorite::select('users.id', 'users.f_name', 'users.l_name','users.bio', 'users.picture_url')
        ->join('users', 'users.id', '=', 'favorites.favorited_user_id')
        ->where('favorites.user_id', $id)
        //Filter users that are blocking or are blocked
        ->whereNotIn('users.id', $blocked_users)
        ->get();
        return response()->json(['message' => $users]);
    }

    public function insertFavorite(Request $request){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);
        $favorite = new Favorite;

        $favorite->user_id = auth()->user()->id;
        $favorite->favorited_user_id = $request->favorited_user_id;

        $favorite->save();
        return response()->json(['message' => 'Favorite inserted!']);

    }

    public function unFavorite(Request $request){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);

        $favorite = Favorite::where('user_id', auth()->user()->id)
        ->where('favorited_user_id', $request->favorited_user_id)
        ->delete();

        return response()->json(['message' => $favorite]);

    }

    public function blockUser(Request $request){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);
        $blocked = new BlockedUser;

        $blocked->user_id = auth()->user()->id;
        $blocked->blocked_user_id = $request->blocked_user_id;

        $blocked->save();
        return response()->json(['message' => 'Blocked user!']);

    }

    public function getProfile(){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);
        return response()->json(['message' => auth()->user()]);

    }

    public function editUser(Request $request){
        $user = User::find(auth()->user()->id);

        $user->f_name = $request->f_name;
        $user->l_name = $request->l_name;
        $user->gender = $request->gender;
        $user->bio = $request->bio;
        $user->interested_gender = $request->interested_gender;
        $user->save();
        return response()->json(['message' => $user]);

    }

    public function changeImage(Request $request){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);

        $user = User::find(auth()->user()->id);

        $base64_string = $request->base64_string;
        $decoder = base64_decode($base64_string);
        $url = 'C:\xampp\htdocs\dating-web\dating-frontend\assets\uploaded_images/' . $user->email . ".jpg";
        file_put_contents($url, $decoder);
        $user->picture_url = "/dating-web/dating-frontend/assets/uploaded_images/" . $user->email . ".jpg";

        $user->save();
        return response()->json(['message' => 'success']);
    }

    public function toggleIncognito(){
        if(!auth()->user())
            return response()->json(['message' => "Not authorized!"]);

        $user = User::find(auth()->user()->id);
        $incognito = $user->incognito;


        if(!$incognito){
            $user->incognito = true;
        }
        else{
            $user->incognito = false;
        }
        $user->save();
        return response()->json(['message' => 'success, ' . $incognito]);
    }    
}
