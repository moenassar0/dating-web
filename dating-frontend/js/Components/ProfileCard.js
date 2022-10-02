export const ProfileCard = (profileCard) => {
    return(
        `
            <div class="profile-card">
                <img class="navbar-logo-img" src="./assets/images/empty_profile.png">
                <div class="profile-card-title">
                    ${profileCard.f_name + " " + profileCard.l_name}
                </div>
                <div class="profile-card-bio">
                    I have no idea what to type here
                </div>
                <div class="profile-card-actions">
                    <button>Favorite</button>
                </div>
            </div>
        `
    )
}