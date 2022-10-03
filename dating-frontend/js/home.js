import * as Functions from "./Functions.js";
import {ProfileCard} from "./Components/ProfileCard.js";
import {FavoriteUser} from "./FavoriteUser.js";

let token = localStorage.getItem("token");
const profile_card_container = document.getElementById("profile-card-container");

//Navigation buttons
const home_btn = document.getElementById("home-btn");
const profile_btn = document.getElementById("profile-btn");
const favorites_btn = document.getElementById("favorites-btn");
const messages_btn = document.getElementById("messages-btn");


//Find people the user is interested in
async function getUsersData(){
    
    const response = await Functions.postAPI(Functions.baseURL + "/users/find", {}, token);
    
    let profileCardHTML = '';
    response.data.message.map(user => {
        profileCardHTML += ProfileCard(user);
    })
    profile_card_container.innerHTML = profileCardHTML;
    if(document.getElementsByClassName("profile-card-actions")){
        const actions = Array.prototype.slice.call(document.getElementsByClassName("profile-card-actions"));
        console.log(actions);
        actions.forEach(action => {
            const id = action.id;
            console.log(action);
            action.children[0].addEventListener("click", () => {
                FavoriteUser(id, token);
                action.children[0].src = "../dating-frontend/assets/images/liked.png";
            })
        });
    }
}

getUsersData();

//Navigation event listeners
home_btn.addEventListener("click", () => {

})

profile_btn.addEventListener("click", () => {

})

favorites_btn.addEventListener("click", () => {

})

messages_btn.addEventListener("click", () => {

})
