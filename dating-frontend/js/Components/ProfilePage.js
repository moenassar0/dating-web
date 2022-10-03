export const ProfilePage = (profilePage) => {
    return(
        `
        <div id="profile-card-container" class="profile-card-container">
            <div class="profile-image">
                <img class="profile-img-resize" src="./assets/images/empty_profile.png">
                <div class="profile-biography">
                    This is a test biography of Mohamad Nassar, gender: Male, age: 23
                </div>
            </div>
            <div class="profile-info">
                <div class="info-field">
                    <div class="info-field-label">
                        Full Name:
                    </div>
                    <div class="info-field-content">
                        Mohamad Nassar
                    </div>
                </div>
                <div class="info-field">
                    <div class="info-field-label">
                        Email:
                    </div>
                    <div class="info-field-content">
                        nassar@gmail.com
                    </div>
                </div>
            </div>
        </div>
        `
    )
}

