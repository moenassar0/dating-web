import * as Functions from "./Functions.js";

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

/*login_btn.addEventListener("click", async () => {
    console.log(Functions.postAPI(Functions.baseURL, {"email": login_email.value,
    "password": login_password.value}));

})*/

go_signup.addEventListener("click", () => {
    signup_form_container.classList.remove("hidden");
    login_form_container.classList.add("hidden");
})

login_btn.addEventListener("click", async () => {
    const response = await Functions.postAPI(Functions.baseURL + "/auth/login/", {"email": login_email.value,
    "password": login_password.value})
    logUserIn(response.data);

})

async function logUserIn(data){
    if(data.access_token){
        localStorage.setItem("token", data.access_token);
        window.location.href="home.html";
    }
}