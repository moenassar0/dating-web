import * as Functions from "./Functions.js";

let token = localStorage.getItem("token");


//Find people the user is interested in
async function getUsersData(){
    
    const response = await Functions.postAPI(Functions.baseURL + "/users/find", {}, token);
    console.log(response);
}

getUsersData();