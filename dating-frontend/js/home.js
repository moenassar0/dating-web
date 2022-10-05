import * as Functions from "./Functions.js";
import {ProfileCard} from "./Components/ProfileCard.js";
import {FavoriteUser} from "./FavoriteUser.js";
import { BlockUser } from "./BlockUser.js";
import { SendHiMessage } from "./SendHiMessage.js";

const profile_card_container = document.getElementById("profile-card-container");

let token = localStorage.getItem("token");
await Functions.validateUser();
token = localStorage.getItem("token");

let lat1 = -1;
let long1 = -1;
navigator.geolocation.getCurrentPosition(function(position){
    lat1 = (position.coords.latitude);
    long1 = (position.coords.longitude);
})

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

        //Calculate distance from user
        console.log(lat1, long1);
        let location2 = user.location.split("/");
        console.log(location2);
        let lat2 = location2[0];
        let long2 = location2[1];
        let d = Functions.distance(lat1, lat2, long1, long2);
        console.log(d);
        profileCardHTML += ProfileCard(user, d);
    })
    profile_card_container.innerHTML = profileCardHTML;
    
    usersActions();

}

getUsersData();

Functions.navigationButtons();

export const usersActions = (favoritesPage) => {
    if(document.getElementsByClassName("profile-card-actions")){
        const actions = Array.prototype.slice.call(document.getElementsByClassName("profile-card-actions"));
        console.log(actions);
        actions.forEach(action => {
            const id = action.id;
            if(favoritesPage){
                action.children[0].src = "../dating-frontend/assets/images/liked.png";
            }
            //Favorite button action
            action.children[0].addEventListener("click", () => {
                if(favoritesPage){
                    //UnFavoriteUser(id, token);
                    action.children[0].src = "../dating-frontend/assets/images/like.png";
                }
                else{
                    FavoriteUser(id, token);
                    action.children[0].src = "../dating-frontend/assets/images/liked.png";
                }
            })

            //Block button action
            action.children[1].addEventListener("click", () => {
                block_popup.classList.remove("hidden");
                cover.classList.remove("hidden");
                block_button.addEventListener("click", () => {
                    BlockUser(id, token);
                    block_popup.classList.add("hidden");
                    cover.classList.add("hidden");
                })
            })

            //Chat button action
            action.children[2].addEventListener("click", () => {
                SendHiMessage(id, token);
            })
        });
    }
}

