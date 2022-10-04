<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;
use App\Models\BlockedUser;
use App\Models\Favorite;
use App\Http\Controllers\DB;

class MessageController extends Controller
{
    public function sendMessage(Request $request){
        $message = new Message;
        $id = auth()->user()->id;
        $message->sender_id = $id;
        $message->receiver_id = $request->receiver_id;
        $message->message_content = $request->message_content;

        $message->save();
        return response()->json(['message' => $message]);
    }

}
