import * as Functions from "./Functions.js";
import {ProfilePage} from "./Components/ProfilePage.js";

let token = localStorage.getItem("token");

const profile_container = document.getElementById("profile-card-container");

//Validate user's token, if valid refresh with a new token and a new expiration date
async function validateToken(){
    const response = await Functions.postAPI(Functions.baseURL + "/auth/authUser", {}, token);
    console.log(response);
    localStorage.setItem("token", (response.data.access_token));
    token = localStorage.getItem("token");
}

await validateToken();

async function getProfile(){
    const response = await Functions.postAPI(Functions.baseURL + "/user/profile", {}, token);
    console.log(response);
    let profileHTML = '';
    profileHTML += ProfilePage(response.data.message);
    profile_container.innerHTML = profileHTML;
};

getProfile();

