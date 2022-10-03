import * as Functions from "./Functions.js"; 

export const BlockUser = async (id, token) => {
    const url = "/user/block";
    const response = await Functions.postAPI(Functions.baseURL + url, {blocked_user_id: id}, token)
    console.log(response);
    window.location.href = "home.html";
}