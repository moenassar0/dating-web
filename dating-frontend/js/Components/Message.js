

export const Message = (message) => {
    return(
        `
            <div class="chat-message">
                Someone: ${message.message_content}
            </div>
        `
    )
}