import * as Functions from "./Functions.js"; 
import {ProfileCard} from "./Components/ProfileCard.js";
import { BlockUser } from "./BlockUser.js";
import { FavoriteUser } from "./FavoriteUser.js";
import { SendHiMessage } from "./SendHiMessage.js";
import { usersActions } from "./home.js";

const profile_card_container = document.getElementById("profile-card-container");
let token = localStorage.getItem("token");

//Validate user's token, if valid refresh with a new token and a new expiration date
async function validateToken(){
    const response = await Functions.postAPI(Functions.baseURL + "/auth/authUser", {}, token);
    localStorage.setItem("token", (response.data.access_token));
    token = localStorage.getItem("token");
}

await validateToken();


//Find people the user has favorited
async function getUsersData(){
    
    const response = await Functions.postAPI(Functions.baseURL + "/user/favorites", {}, token);
    
    let profileCardHTML = '';
    response.data.message.map(user => {
        profileCardHTML += ProfileCard(user);
    })
    profile_card_container.innerHTML = profileCardHTML;
}

await getUsersData();
usersActions(true);

Functions.navigationButtons();

