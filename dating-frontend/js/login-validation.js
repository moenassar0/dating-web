const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const login_btn = document.getElementById("login-btn");

login_btn.addEventListener("click", async () => {
    try{
        const response = await axios.post(
            "http://127.0.0.1:8000/api/user/find",
            {"email": login_email.value,
             "password": login_password.value}
             
        );
        console.log(response);

    }catch(error){
        console.log("Error from POST API", error);
    }
})