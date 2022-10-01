import * as Functions from "./js-functions.js";

const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const login_btn = document.getElementById("login-btn");

/*login_btn.addEventListener("click", async () => {
    console.log(Functions.postAPI(Functions.baseURL, {"email": login_email.value,
    "password": login_password.value}));

})*/

login_btn.addEventListener("click", async () => {
    const response = await Functions.postAPI(Functions.baseURL, {"email": login_email.value,
    "password": login_password.value})
    console.log(response);

})

async function logUserIn(data){
    console.log(data);
}