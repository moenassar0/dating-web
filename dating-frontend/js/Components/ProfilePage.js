export const ProfilePage = (profilePage) => {
    return(
        `
        <div class="profile-image">
            <img class="profile-img-resize" src="${profilePage.picture_url}">
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
                    <span>Looking for:</span>
                </div>
                <div class="info-field-content">
                    ${profilePage.interested_gender}
                </div>
            </div>
            <div class="">
                <button class="main-button" id="edit-profile">Edit Profile</button>
                <label for="edit-picture" class="edit-picture-button">Edit Picture<input type="file" class="hidden" id="edit-picture" /></label>
            </div>
        </div>

        `
    )
}

