import * as Functions from "./Functions.js"; 

export const UnFavoriteUser = async (id, token) => {
    const url = "/user/unfavorite";
    const response = await Functions.postAPI(Functions.baseURL + url, {favorited_user_id: id}, token);
}