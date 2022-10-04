export const ProfileCard = (profileCard, distance) => {
    return(
        `
            <div class="profile-card">
                <img class="navbar-logo-img" src="${profileCard.picture_url}">
                <div style="margin-bottom: 5px;" class="profile-card-title">
                    ${profileCard.f_name + " " + profileCard.l_name}
                </div>
                <div style="margin-bottom: 5px;" class="profile-card-bio">
                    ${profileCard.bio} 
                </div>
                <div>
                    <span style="margin-bottom: 5px;">Distance: ${(Math.round(distance*100))/100 + ": KM"}</span>
                </div>
                <div id="${profileCard.id}" class="profile-card-actions">
                    <img class="pointer" width="25px" height="25px"src="../dating-frontend/assets/images/like.png">
                    <img class="pointer" width="25px" height="25px"src="../dating-frontend/assets/images/ban-button.svg">
                    <img class="pointer" width="25px" height="25px"src="../dating-frontend/assets/images/chat.png">
                </div>
            </div>
        `
    )
}

