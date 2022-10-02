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

