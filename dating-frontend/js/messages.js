import * as Functions from "./Functions.js"; 
import {Messenger} from "./Components/Messenger.js";

let token = localStorage.getItem("token");
const chat_users = document.getElementById("chat-users");
const messages_container = document.getElementById("chat-messages");
let last_id = 0;
let last_user = -1;

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

//Onclick listener on each messenger so we can show each messenger's chat logs
async function addChatFunctionality(){
    const messengers = Array.prototype.slice.call(document.getElementsByClassName("chat-user"));
    console.log(messengers);


    messengers.forEach(messenger => {
        const id = messenger.id;
        //First name and last name of user is stored in:
        const user_info = (messenger.children[1].innerHTML);
        messenger.addEventListener("click", async () => {
            last_id = id;
            last_user = user_info;
            await ShowMessages(id, user_info);
        })
    });
}

//Get chat history between two users
async function ShowMessages(id, user_info){
    messages_container.innerHTML = '';
    const response = await Functions.postAPI(Functions.baseURL + "/auth/user/messages", {messenger_id: id}, token);

    let messagesHTML = '';
    response.data.message.map(message => {
        //messagesHTML += Message(message, user_info);
        //If the sender is not the current user
        if(message.sender_id == id){
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("chat-message");
            msgDiv.innerHTML = user_info + ":   " + message.message_content;
            messages_container.appendChild(msgDiv);
            console.log(msgDiv);
        }
        else{
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("chat-message");
            msgDiv.innerHTML = "You" + ":   " + message.message_content;
            messages_container.appendChild(msgDiv);
            console.log(msgDiv);
        }
    })

    //messages_container.innerHTML = messagesHTML;
    
}

Functions.navigationButtons();
await getMessengers();
await addChatFunctionality();
