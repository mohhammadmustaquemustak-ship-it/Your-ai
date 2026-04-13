// Variable to store the current personality mode
let currentMood = 'friend'; // Default mood

// Function to immediately change the mood and update the UI
function setMood(mood) {
    currentMood = mood;
    
    // Update active button styling
    const buttons = document.querySelectorAll('.mood-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mood}`).classList.add('active');

    // Optional: Log mood change for debugging
    console.log(`Mood instantly changed to: ${currentMood}`);
}

// Function to handle the Send button click
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // Display User Message
    addMessageToChat(userText, 'user');
    inputField.value = "";

    // Simulate AI thinking delay (500ms) before responding
    setTimeout(() => {
        const aiResponse = generateAIResponse(userText);
        addMessageToChat(aiResponse, 'ai');
    }, 500);
}

// Function to handle Enter key press in the input field
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Function to render messages in the DOM
function addMessageToChat(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.innerText = text;
    
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to the newest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate responses strictly based on currentMood
function generateAIResponse(input) {
    const text = input.toLowerCase();

    // Use a switch-case to ensure responses are firmly tied to the currentMood variable
    switch (currentMood) {
        
        case 'roast':
            // ROAST MODE: Funny, light roasting, playful sarcasm
            const roastResponses = [
                "You again? Bro you open app more than your books 😂",
                "Wow, did it take you all day to come up with that sentence? 💀",
                "I'm an AI, and even I'm bored of your messages.",
                "Type faster, my circuits are falling asleep waiting for you 🥱",
                "Error 404: Logic not found in your message 😂"
            ];
            return roastResponses[Math.floor(Math.random() * roastResponses.length)];

        case 'friend':
            // FRIEND MODE: Normal friendly chat, Casual Hinglish tone
            const friendResponses = [
                "Kya haal hai bhai 😄 aaj kya plan hai?",
                "Arre bhai, sahi baat hai! Aur batao?",
                "Main mast hoon yaar, tu suna kaisa hai? 🍕",
                "Bhai tension nahi lene ka, chill kar 😎",
                "Haan yaar, bilkul! Aur sab theek ghar pe?"
            ];
            return friendResponses[Math.floor(Math.random() * friendResponses.length)];

        case 'smart':
            // SMART MODE: Logical, helpful, informative answers
            if (text.includes('zip file') || text.includes('zip')) {
                return "ZIP file ek compressed folder hota hai jisme multiple files store hoti hain, taaki storage space bache aur files easily share ho sakein.";
            } else if (text.includes('hello') || text.includes('hi')) {
                return "Hello. How can I assist you with information or problem-solving today?";
            }
            const smartResponses = [
                "Based on logical analysis, your input is noted. Do you need further technical clarification?",
                "I am processing your request. Please let me know if you need specific definitions or data.",
                "To answer that accurately, I would need more context. However, I am ready to assist.",
                "That is an interesting observation. Factually speaking, continuous learning is key to growth."
            ];
            return smartResponses[Math.floor(Math.random() * smartResponses.length)];

        case 'emotional':
            // EMOTIONAL MODE: Soft, supportive tone, caring
            const emotionalResponses = [
                "Tension mat le bhai 💙 sab theek ho jayega, main hoon na.",
                "Take a deep breath. You are doing much better than you think. 🌸",
                "Main hamesha yahan hoon tumhari baat sunne ke liye. Feel free to share anything.",
                "Kabhi kabhi thak jana normal hai. Apne aap ko time do, you deserve it. ✨",
                "You are stronger than you realize. Keep going! 🫂"
            ];
            return emotionalResponses[Math.floor(Math.random() * emotionalResponses.length)];

        default:
            return "I am here to chat!";
    }
}
