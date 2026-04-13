// Aapki Gemini API Key
const API_KEY = "AIzaSyB2tzqYrac1E5uqp2v-lnIXqGMZhxKlcRk"; 

let currentMood = 'friend'; // Default mood

// Mood change karne ka function
function setMood(mood) {
    currentMood = mood;
    const buttons = document.querySelectorAll('.mood-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mood}`).classList.add('active');
    console.log(`Mood switched to: ${currentMood}`);
}

// Mood ke hisaab se AI ko instructions dena (System Prompt)
function getPromptForMood(mood) {
    switch(mood) {
        case 'roast': 
            return "You are a funny, sarcastic AI. Roast the user playfully based on their input. Never be highly offensive or toxic. Keep it short like a best friend. Reply in Hinglish.";
        case 'friend': 
            return "You are a chill, supportive best friend. Speak casually in Hinglish. Be normal, friendly, and reply accurately to what they say.";
        case 'smart': 
            return "You are a logical, smart, and helpful AI. Explain things simply and factually in Hinglish. No jokes or roasting. Give accurate answers to their questions.";
        case 'emotional': 
            return "You are a soft, caring, and motivational AI. Comfort the user. Be highly supportive and sweet. Reply calmly in Hinglish.";
        default: 
            return "You are a helpful AI.";
    }
}

// Message send karne ka function
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // User ka message screen par dikhao
    addMessageToChat(userText, 'user');
    inputField.value = "";

    // AI ka typing status dikhao
    const messageId = "msg-" + Date.now();
    addMessageToChat("Typing...", 'ai', messageId);

    // Gemini API ko call karna
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: getPromptForMood(currentMood) }]
                },
                contents: [{
                    parts: [{ text: userText }]
                }]
            })
        });

        const data = await response.json();
        
        // AI ka reply nikalna
        if (data.candidates && data.candidates.length > 0) {
            const aiText = data.candidates[0].content.parts[0].text;
            updateMessageInChat(messageId, aiText);
        } else {
            updateMessageInChat(messageId, "Bhai, kuch error aa gaya API mein. Phir se try kar.");
        }

    } catch (error) {
        console.error("Error:", error);
        updateMessageInChat(messageId, "Internet connection check kar bhai, ya API limit cross ho gayi hai.");
    }
}

// Chat box mein message add karna
function addMessageToChat(text, sender, id = null) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerText = text;
    
    if (id) {
        messageDiv.id = id;
    }
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing wale text ko actual reply se replace karna
function updateMessageInChat(id, text) {
    const messageElement = document.getElementById(id);
    if (messageElement) {
        // Markdown bold (**) hatane ke liye simple replace 
        messageElement.innerText = text.replace(/\*\*/g, '');
    }
}

// Enter dabane par message send hona
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
