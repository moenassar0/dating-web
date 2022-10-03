import * as Functions from "./Functions.js"; 

export const FavoriteUser = async (id, token) => {
    const url = "/user/favorite";
    const response = await Functions.postAPI(Functions.baseURL + url, {favorited_user_id: id}, token)
    console.log(response);
}