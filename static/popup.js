console.log("in the extension...");

document.getElementById('submitButton1').addEventListener('click', async function() {
    console.log('Submit button clicked');  // Debugging line

    const userMessage = document.getElementById('userInput1').value.trim();
    console.log('User message:', userMessage);  // Debugging line

    if (userMessage !== "") {
        // Display user message in chat bubble
        addMessageToChat(userMessage, 'user-message');

        // Send user message to the backend and get the bot's response
        const botResponse = await sendMessageToBackend(userMessage);
        console.log("-----------#$#$");
        console.log(botResponse);
        console.log("-----------#$#$");

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
        const response = await fetch('http://127.0.0.1:5000/process-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        console.log('Response received');  // Debugging line
        const data = await response.json();
        console.log('Processed message:', data.processed_message);
        return data.processed_message;

    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong!';
    }
}
