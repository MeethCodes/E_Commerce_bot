document.getElementById('submitButton1').addEventListener('click', async function() {
    const userMessage = document.getElementById('userInput1').value.trim();
    if (userMessage !== "") {
        // Display user message in chat bubble
        addMessageToChat(userMessage, 'user-message');
        // Send user message to the backend and get the bot's response
        const botResponse = await sendMessageToBackend(userMessage);
        // Display bot's response in chat bubble
        addMessageToChat(botResponse, 'bot-response');
        // Clear the input field
        document.getElementById('userInput1').value = '';
    }
});

function addMessageToChat(message, className) {
    const chatList = document.getElementById('chatList');
    const messageItem = document.createElement('li');
    messageItem.textContent = message;
    messageItem.classList.add('message', className);
    chatList.appendChild(messageItem);
    // Scroll to the bottom of the chat
    chatList.scrollTop = chatList.scrollHeight;
}

async function sendMessageToBackend(userMessage) {
    try {
        const response = await fetch('http://127.0.0.1:5000/ask_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userMessage }),
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error sending user message:', error);
        return 'Sorry, something went wrong!';
    }
}
