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
                    <button class="favorite-btn">Favorite</button>
                    <button class="block-btn">Block</button>
                </div>
            </div>
        `
    )
}