import * as Functions from "./Functions.js";
import {ProfilePage} from "./Components/ProfilePage.js";

let token = localStorage.getItem("token");

const profile_container = document.getElementById("profile-card-container");

//Edit Form Inputs
const edit_form = document.getElementById("edit-popup");
const f_name = document.getElementById("f-name");
const l_name = document.getElementById("l-name");
const gender = document.getElementById("gender");
const bio = document.getElementById("bio");
const interested_gender = document.getElementById("interested-gender");
const edit_button = document.getElementById("edit-button");
const close_popup_button = document.getElementById("close-btn");
const cover = document.getElementById("cover");

async function editPopup(){
    const popup_edit_button = document.getElementById("edit-profile");
    popup_edit_button.addEventListener("click", () => {
        edit_form.classList.remove("hidden");
        cover.classList.remove("hidden");
    })
}


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

await getProfile();
editPopup();
Functions.navigationButtons();


function validateName(name, minLength) {
    if(name.length < minLength)
        return false;
    return true;
}


