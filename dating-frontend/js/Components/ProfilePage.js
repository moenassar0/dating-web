export const ProfilePage = (profilePage) => {
    return(
        `
        <div id="profile-card-container" class="profile-card-container">
            <div class="profile-image">
                <img class="profile-img-resize" src="./assets/images/empty_profile.png">
                <div class="profile-biography">
                    ${profilePage.bio}
                </div>
            </div>
            <div class="profile-info">
                <div class="info-field">
                    <div class="info-field-label">
                        Full Name:
                    </div>
                    <div class="info-field-content">
                        ${profilePage.f_name + " " + profilePage.l_name}
                    </div>
                </div>
                <div class="info-field">
                    <div class="info-field-label">
                        Email:
                    </div>
                    <div class="info-field-content">
                        ${profilePage.email}
                    </div>
                </div>
                <div class="info-field">
                    <div class="info-field-label">
                        Gender:
                    </div>
                    <div class="info-field-content">
                        ${profilePage.gender}
                    </div>
                </div>
                <div class="info-field">
                    <div class="info-field-label">
                        Looking for:
                    </div>
                    <div class="info-field-content">
                        ${profilePage.interested_gender}
                    </div>
                </div>
            </div>
            <div class="">
                <button id="edit-profile">Edit Profile</button>
            </div>
        </div>
        `
    )
}

