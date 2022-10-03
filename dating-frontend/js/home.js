import * as Functions from "./Functions.js";
import {ProfileCard} from "./Components/ProfileCard.js";
import {FavoriteUser} from "./FavoriteUser.js";
import { BlockUser } from "./BlockUser.js";

let token = localStorage.getItem("token");
//Validate user's token, if valid refresh with a new token and a new expiration date
async function validateToken(){
    const response = await Functions.postAPI(Functions.baseURL + "/auth/authUser", {}, token);
    localStorage.setItem("token", (response.data.access_token));
    token = localStorage.getItem("token");
}

await validateToken();

const profile_card_container = document.getElementById("profile-card-container");



//Block popup
const close_block_popup = document.getElementById("close-btn");
const block_popup = document.getElementById("block-popup");
const cover = document.getElementById("cover");
const block_button = document.getElementById("block-button");
close_block_popup.addEventListener("click", () => {
    block_popup.classList.add("hidden");
    cover.classList.add("hidden");
})

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

            action.children[1].addEventListener("click", () => {
                block_popup.classList.remove("hidden");
                cover.classList.remove("hidden");
                block_button.addEventListener("click", () => {
                    BlockUser(id, token);
                    block_popup.classList.add("hidden");
                    cover.classList.add("hidden");
                })
            })
        });
    }
}

getUsersData();

Functions.navigationButtons();



