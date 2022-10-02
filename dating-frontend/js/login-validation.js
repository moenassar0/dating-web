import * as Functions from "./Functions.js";

const success_div = document.getElementById("success-div");
const error_div = document.getElementById("error-div");

const login_form_container = document.getElementById("login-form-container");
const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const login_btn = document.getElementById("login-btn");

const go_signup = document.getElementById("go-signup");
const signup_form_container = document.getElementById("signup-form-container");
const f_name = document.getElementById("f-name");
const l_name = document.getElementById("l-name");
const gender = document.getElementById("gender");
const interested_gender = document.getElementById("interested-gender");
const signup_email = document.getElementById("signup-email");
const signup_password = document.getElementById("signup-password");
const signup_btn = document.getElementById("signup-btn");



go_signup.addEventListener("click", () => {
    signup_form_container.classList.remove("hidden");
    login_form_container.classList.add("hidden");
})

login_btn.addEventListener("click", async () => {
    const response = await Functions.postAPI(Functions.baseURL + "/auth/login/", {"email": login_email.value,
    "password": login_password.value})
    logUserIn(response.data);

})

signup_btn.addEventListener("click", () => {
    console.log(f_name.value, l_name.value, gender.options[gender.selectedIndex].value,
         interested_gender.options[interested_gender.selectedIndex].value, signup_email.value, signup_password.value);

         error_message = "";
         if(!validateName(f_name.value)){
             error_message += "Name is too short! (Minimum 2 characaters) <br>"
         }

         console.log(error_message);
})

async function logUserIn(data){
    if(data.access_token){
        localStorage.setItem("token", data.access_token);
        window.location.href="home.html";
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

function validateName(name) {
    if(name.value.length < 2)
        return false;
    return true;
}