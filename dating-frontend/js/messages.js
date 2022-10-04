import * as Functions from "./Functions.js"; 
import {Messenger} from "./Components/Messenger.js";

let token = localStorage.getItem("token");
const chat_users = document.getElementById("chat-users");

//Validate user's token, if valid refresh with a new token and a new expiration date
async function validateToken(){
    const response = await Functions.postAPI(Functions.baseURL + "/auth/authUser", {}, token);
    localStorage.setItem("token", (response.data.access_token));
    token = localStorage.getItem("token");
}

await validateToken();

//Get messengers
async function getMessengers(){
    const response = await Functions.postAPI(Functions.baseURL + "/auth/user/messengers", {}, token);
    console.log(response);

    let messengersHTML = '';
    response.data.message.map(messenger => {
        messengersHTML += Messenger(messenger);
    })
    chat_users.innerHTML = messengersHTML;
}

await getMessengers();
Functions.navigationButtons();