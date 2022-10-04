/*export const js_functions = () => {
    const js_functions = {};

    js_functions.baseURL = "http://127.0.0.1:8000/api/auth";
    
    
    js_functions.getAPI = async (api_url) => {
        try{
            return await axios(api_url);
        }catch(error){
            console.log("Error from GET api: ", error);
        }
    }
    
    js_functions.postAPI = async (api_url, api_data, api_token = null) => {
        try{
            return await axios.post(
                api_url,
                api_data,
                { headers:{
                        'Authorization' : "token " + api_token
                    }
                }
            );
        }catch(error){
            console.log("Error from GET api: ", error);
        }
    }
}*/

export const baseURL = "http://127.0.0.1:8000/api";
export const postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                    'Authorization' : "Bearer " + api_token
                }
            }
        );
    }catch(error){
        console.log("Error from POST api: ", error);
    }
}

export const consoleLog = () => {
    console.log("gg");
}

/*
//Validate user's token, if valid refresh with a new token and a new expiration date
export const validateToken = async (token) => {
    const response = await postAPI(baseURL + "/auth/authUser", {}, token);
    //console.log(response);
    //localStorage.setItem("token", (response.data.access_token));
    return token;
}*/

//Navigation buttons
const home_btn = document.getElementById("home-btn");
const profile_btn = document.getElementById("profile-btn");
const favorites_btn = document.getElementById("favorites-btn");
const messages_btn = document.getElementById("messages-btn");

//Navigation event listeners home_btn, profile_btn, favorites_btn, messages_btn
export const navigationButtons = () => {
    home_btn.addEventListener("click", () => {
        window.location.href="home.html";
    })
    
    profile_btn.addEventListener("click", () => {
        window.location.href="profile.html";
    })
    
    favorites_btn.addEventListener("click", () => {
        window.location.href="favorites.html";
    })
    
    messages_btn.addEventListener("click", () => {
        window.location.href="messages.html";
    })
}

//Find KM distance from latitude and longitude
export const distance = (lat1, lat2, lon1, lon2) => {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
}



