export const Messenger = (messenger) => {
    return(
        `
            <div id = "${messenger.id}" class="chat-user">
                <img class="circle-img" src="./assets/images/empty_profile.png">
                <span>${messenger.f_name + " " + messenger.l_name}</span>
            </div>
        `
    )
}