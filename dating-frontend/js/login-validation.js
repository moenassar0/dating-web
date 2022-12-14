import * as Functions from "./Functions.js";

const success_div = document.getElementById("success-div");
const error_div = document.getElementById("error-div");

const login_form_container = document.getElementById("login-form-container");
const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const login_btn = document.getElementById("login-btn");

const go_signup = document.getElementById("go-signup");
const go_login = document.getElementById("go-login");

const signup_form_container = document.getElementById("signup-form-container");
const f_name = document.getElementById("f-name");
const l_name = document.getElementById("l-name");
const gender = document.getElementById("gender");
const bio = document.getElementById("bio");
const interested_gender = document.getElementById("interested-gender");
const signup_email = document.getElementById("signup-email");
const signup_password = document.getElementById("signup-password");
const signup_btn = document.getElementById("signup-btn");

let error_message = "";


go_signup.addEventListener("click", () => {
    signup_form_container.classList.remove("hidden");
    login_form_container.classList.add("hidden");
})

go_login.addEventListener("click", () => {
    signup_form_container.classList.add("hidden");
    login_form_container.classList.remove("hidden");
})

login_btn.addEventListener("click", async () => {
    const response = await Functions.postAPI(Functions.baseURL + "/auth/login/", {"email": login_email.value,
    "password": login_password.value})
    logUserIn(response.data);

})

const picture = document.getElementById("image");
picture.addEventListener("change", async e => {
    const file = picture.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
        let imageinbase = reader.result;
        //split to remove "data:image/png;base64,"
        const pure64base = imageinbase.split(",");
        let base64_string = pure64base[1];
        
        //Check if signup btn is pressed after loading image
        signup_btn.addEventListener("click", () => {
            validateSignUp(base64_string);
        })
    })
    reader.readAsDataURL(file);
})

signup_btn.addEventListener("click", () => {
    error_message += "Please attach an image! <br>";
    success_div.classList.add("hidden");
    error_div.classList.remove("hidden");
    error_div.innerHTML = error_message;
    error_message = '';
})

function validateSignUp(base64_string){
    console.log(f_name.value, l_name.value, gender.options[gender.selectedIndex].value,
        interested_gender.options[interested_gender.selectedIndex].value, signup_email.value, signup_password.value);

        error_message = "";
        if(!validateName(f_name.value, 2)){
             error_message += "First name is too short! (Minimum 2 characaters) <br>"
        }
        if(!validateName(l_name.value, 2)){
            error_message += "Last name is too short! (Minimum 2 characaters) <br>"
        }
        if(!validateName(signup_password.value, 8)){
            error_message += "Password is too short! (Minimum 8 characaters) <br>"
        }
        if(!validateEmail(signup_email.value)){
            error_message += "Email is incorrect! (You need characters before and after the @) <br>"
        }
        if(error_message != ''){
            success_div.classList.add("hidden");
            error_div.classList.remove("hidden");
            error_div.innerHTML = error_message;
        }
        else{
            error_div.classList.add("hidden");
            error_message = '';
            navigator.geolocation.getCurrentPosition(function(position){
                const lat = (position.coords.latitude);
                const long = (position.coords.longitude);
                const location = lat + "/" + long; 
                const data = {
                    f_name: f_name.value,
                    l_name: l_name.value, 
                    gender: gender.options[gender.selectedIndex].value,
                    interested_gender: interested_gender.options[interested_gender.selectedIndex].value,
                    bio: bio.value,
                    email: signup_email.value,
                    password: signup_password.value,
                    base64_string: base64_string,
                    location: location
                }
                console.log(data);
                signUserUp(data);
            })
        }
}

async function logUserIn(data){
    if(data.access_token){
        localStorage.setItem("token", data.access_token);
        window.location.href="home.html";
    }
}

async function signUserUp(data){
    const response = await Functions.postAPI(Functions.baseURL + "/user/add", data);

    //Check if user is registered or there's an error from response
    if(response == undefined){
        error_message += "Couldn't signup!";
        success_div.classList.add("hidden");
        error_div.classList.remove("hidden");
        error_div.innerHTML = error_message;
        error_message = '';
    }
    else{
        error_message = '';
        success_div.innerHTML = "Successfully registered!"
        success_div.classList.remove("hidden");
        setTimeout(function(){window.location.href="index.html"}, 100);
    }
}

//Validation functions
function validateEmail(email) {
    const myArray = email.split("@");
    if(myArray[0].length < 1){
        return false;
    }
    if(myArray[1].length < 2){
        return false;
    }
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateName(name, minLength) {
    if(name.length < minLength)
        return false;
    return true;
}