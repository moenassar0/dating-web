import * as Functions from "./Functions.js";
import {ProfileCard} from "./Components/ProfileCard.js";

let token = localStorage.getItem("token");
const profile_card_container = document.getElementById("profile-card-container");


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
    }
}

getUsersData();

