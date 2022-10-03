//Find people the user has favorited
async function getUsersData(){
    
    const response = await Functions.postAPI(Functions.baseURL + "user/favorites", {}, token);
    
    let profileCardHTML = '';
    response.data.message.map(user => {
        profileCardHTML += ProfileCard(user);
    })
    profile_card_container.innerHTML = profileCardHTML;
}

getUsersData();