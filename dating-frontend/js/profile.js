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
let error_message = "";
const success_div = document.getElementById("success-div");
const error_div = document.getElementById("error-div");

async function editPopup(){
    const popup_edit_button = document.getElementById("edit-profile");
    popup_edit_button.addEventListener("click", () => {
        edit_form.classList.remove("hidden");
        cover.classList.remove("hidden");
    })

    edit_button.addEventListener("click", async () => {

        error_message = "";
        if(!validateName(f_name.value, 2)){
                error_message += "First name is too short! (Minimum 2 characaters) <br>"
        }
        if(!validateName(l_name.value, 2)){
            error_message += "Last name is too short! (Minimum 2 characaters) <br>"
        }
        if(!validateName(bio.value, 12)){
            error_message += "Biography is too short! (Minimum 12 characaters) <br>"
        }
        if(error_message != ''){
            success_div.classList.add("hidden");
            error_div.classList.remove("hidden");
            error_div.innerHTML = error_message;
        }
        else{
            error_div.classList.add("hidden");
            error_message = '';
            success_div.innerHTML = "Updated profile!"
            success_div.classList.remove("hidden");
            const data = {
                f_name: f_name.value,
                l_name: l_name.value, 
                gender: gender.options[gender.selectedIndex].value,
                interested_gender: interested_gender.options[interested_gender.selectedIndex].value,
                bio: bio.value
            }
            await Functions.postAPI(Functions.baseURL + "/user/edit", data, token);
            window.location.href = "profile.html";
        }
    })

    close_popup_button.addEventListener("click", () => {
        edit_form.classList.add("hidden");
        cover.classList.add("hidden");
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
await updatePicture();
editPopup();
Functions.navigationButtons();

function validateName(name, minLength) {
    if(name.length < minLength)
        return false;
    return true;
}

//Update picture:
async function updatePicture(){
    const picture = document.getElementById("edit-picture");
    picture.addEventListener("change", async e => {
        const file = picture.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", async () => {
            let imageinbase = reader.result;
            //split to remove "data:image/png;base64,"
            const pure64base = imageinbase.split(",");
            let base64_string = pure64base[1];
            const response = await Functions.postAPI(Functions.baseURL + "/user/updateImage", {base64_string: base64_string}, token);
            console.log(response);
            window.location.href = "profile.html";
        })
        reader.readAsDataURL(file);
    })
}
