export const ProfileCard = (profileCard) => {
    return(
        `
            <div class="profile-card">
                <img class="navbar-logo-img" src="${profileCard.picture_url}">
                <div class="profile-card-title">
                    ${profileCard.f_name + " " + profileCard.l_name}
                </div>
                <div class="profile-card-bio">
                    I have no idea what to type here
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