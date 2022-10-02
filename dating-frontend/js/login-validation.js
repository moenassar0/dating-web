import * as Functions from "./Functions.js";

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
    logUserIn(response.data);

})

async function logUserIn(data){
    if(data.access_token){
        localStorage.setItem("token", data.access_token);
        window.location.href="home.html";
    }
}