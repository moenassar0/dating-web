export const Messenger = (messenger) => {
    return(
        `
            <div id = "${messenger.id}" class="chat-user">
                <img class="circle-img" src="${messenger.picture_url}">
                <span>${messenger.f_name + " " + messenger.l_name}</span>
            </div>
        `
    )
}