import * as Functions from "./Functions.js"; 

export const SendHiMessage = async (id, token) => {
    const url = "/auth/user/sendhi";
    const response = await Functions.postAPI(Functions.baseURL + url, {receiver_id: id}, token)
    console.log(response);
    window.location.href = "messages.html";
}