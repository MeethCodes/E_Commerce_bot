console.log("in the extension...");

document.getElementById('submitButton1').addEventListener('click', function() {
    console.log('Submit button clicked');  // Debugging line

    const userMessage = document.getElementById('userInput1').value.trim();
    console.log('User message:', userMessage);  // Debugging line

    if (userMessage !== "") {
        // Display user message in chat bubble
        addMessageToChat(userMessage, 'user-message');

        // Simulate a bot response
        const botResponse = `This was your message - ${userMessage}`;
        addMessageToChat(botResponse, 'bot-response');

        // Clear the input field
        document.getElementById('userInput1').value = '';

        // Send user message to the backend (if applicable)
        sendMessageToBackend(userMessage);
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

function sendMessageToBackend(userMessage) {
    fetch('http://127.0.0.1:5000/process-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => {
        console.log('Response received');  // Debugging line
        return response.json();
    })
    .then(data => {
        console.log('Processed message:', data.processed_message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
