import React from 'react';
import { ChatbotConfig } from '../../types';

interface IframeWidgetProps {
  config: ChatbotConfig;
}

const IframeWidget: React.FC<IframeWidgetProps> = ({ config }) => {
  // Generate the widget HTML that would be used in the iframe
  const generateWidgetHtml = (): string => {
    const { business, personality } = config;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${business.name || 'AI Chatbot'} Widget</title>
  <style>
    :root {
      --color-primary: #FFFFFF;
      --color-secondary: #F8F9FA;
      --color-accent: #FFD700;
      --color-text: #212529;
      --color-border: #DEE2E6;
      --color-shadow: rgba(0, 0, 0, 0.1);
      --border-radius: 8px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    body {
      overflow: hidden;
    }
    
    .widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .chat-bubble {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: var(--color-accent);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 8px var(--color-shadow);
      transition: transform 0.3s ease;
    }
    
    .chat-bubble:hover {
      transform: scale(1.1);
    }
    
    .chat-bubble-icon {
      width: 30px;
      height: 30px;
      fill: var(--color-text);
    }
    
    .chat-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 500px;
      background-color: var(--color-primary);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px) scale(0.9);
      pointer-events: none;
    }
    
    .chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    
    .chat-header {
      background-color: var(--color-accent);
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .chat-title {
      font-weight: 600;
      color: var(--color-text);
    }
    
    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text);
      font-size: 20px;
    }
    
    .message-list {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #f5f5f5;
    }
    
    .message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 18px;
      position: relative;
      line-height: 1.4;
    }
    
    .user-message {
      align-self: flex-end;
      background-color: #e1ffc7;
      border-bottom-right-radius: 0;
    }
    
    .bot-message {
      align-self: flex-start;
      background-color: white;
      border-bottom-left-radius: 0;
    }
    
    .chat-input-form {
      display: flex;
      padding: 10px;
      background-color: white;
      border-top: 1px solid var(--color-border);
    }
    
    .chat-input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      margin-right: 8px;
      outline: none;
    }
    
    .chat-input:focus {
      border-color: var(--color-accent);
    }
    
    .send-button {
      background-color: var(--color-accent);
      color: var(--color-text);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 10px 15px;
      background-color: white;
      border-radius: 18px;
      border-bottom-left-radius: 0;
      align-self: flex-start;
      width: fit-content;
    }
    
    .typing-indicator span {
      width: 8px;
      height: 8px;
      background-color: #b6b6b6;
      border-radius: 50%;
      display: inline-block;
      animation: bounce 1.5s infinite ease-in-out;
    }
    
    .typing-indicator span:nth-child(1) {
      animation-delay: 0s;
    }
    
    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes bounce {
      0%, 60%, 100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-5px);
      }
    }
    
    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 40px);
        height: 60vh;
        bottom: 80px;
      }
    }
  </style>
</head>
<body>
  <div class="widget-container">
    <div class="chat-window" id="chatWindow">
      <div class="chat-header">
        <div class="chat-title">${business.name || 'AI Chatbot'}</div>
        <button class="close-button" id="closeChat">×</button>
      </div>
      <div class="message-list" id="messageList">
        <div class="message bot-message">
          ${generateWelcomeMessage(config)}
        </div>
      </div>
      <form class="chat-input-form" id="chatForm">
        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
        <button type="submit" class="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
    <div class="chat-bubble" id="chatBubble">
      <svg class="chat-bubble-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
  </div>

  <script>
    // Widget configuration
    const config = {
      businessName: "${business.name || 'AI Chatbot'}",
      personality: "${personality}",
      knowledgeBase: ${JSON.stringify(config.knowledgeBase)}
    };
    
    // DOM elements
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const messageList = document.getElementById('messageList');
    
    // Toggle chat window
    chatBubble.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
    });
    
    // Close chat window
    closeChat.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
    
    // Handle message submission
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      
      if (!message) return;
      
      // Add user message
      addMessage(message, 'user');
      chatInput.value = '';
      
      // Show typing indicator
      showTypingIndicator();
      
      // Generate bot response after delay
      setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'bot');
      }, 1000 + Math.random() * 1000);
    });
    
    // Add message to chat
    function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
      messageDiv.textContent = text;
      
      messageList.appendChild(messageDiv);
      messageList.scrollTop = messageList.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('typing-indicator');
      typingDiv.id = 'typingIndicator';
      
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
      }
      
      messageList.appendChild(typingDiv);
      messageList.scrollTop = messageList.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
      const typingIndicator = document.getElementById('typingIndicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }
    
    // Generate response based on input and personality
    function generateResponse(input) {
      const personality = config.personality;
      
      // Simple keyword matching
      const lowerInput = input.toLowerCase();
      
      // Check for greetings
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return formatResponse('How can I help you today?', personality);
      }
      
      // Check for business questions
      if (lowerInput.includes('what') && (lowerInput.includes('do') || lowerInput.includes('offer'))) {
        return formatResponse('We provide excellent services tailored to your needs.', personality);
      }
      
      // Check for thanks
      if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
        return formatResponse('You\\'re welcome! Is there anything else I can help with?', personality);
      }
      
      // Default response
      return formatResponse('I\\'m here to assist you. Could you provide more details about what you\\'re looking for?', personality);
    }
    
    // Format response based on personality
    function formatResponse(baseResponse, personality) {
      switch (personality) {
        case 'friendly':
          return \`\${baseResponse} 😊 Let me know if you need anything else!\`;
        case 'professional':
          return \`\${baseResponse} Please don't hesitate to ask if you require further assistance.\`;
        case 'humorous':
          return \`\${baseResponse} 😄 I'd make a joke about it, but I'm still learning comedy!\`;
        case 'casual':
          return \`\${baseResponse} Anything else you wanna know?\`;
        case 'formal':
          return \`\${baseResponse} I remain at your service should you require additional information.\`;
        default:
          return baseResponse;
      }
    }
  </script>
</body>
</html>
    `;
  };

  // Generate welcome message based on personality and business info
  function generateWelcomeMessage(config: ChatbotConfig): string {
    const { business, personality } = config;
    
    switch (personality) {
      case 'friendly':
        return `Hi there! 👋 I'm the virtual assistant for ${business.name}. How can I help you today?`;
      case 'professional':
        return `Welcome to ${business.name}. I'm your virtual assistant and I'm here to provide you with information and assistance.`;
      case 'humorous':
        return `Hey there! 😄 I'm the chatbot for ${business.name} - not as smart as a human, but way funnier! What can I help you with?`;
      case 'casual':
        return `Hey! I'm the ${business.name} bot. What's up? Need any help today?`;
      case 'formal':
        return `Good day. I am the virtual assistant for ${business.name}. I would be pleased to assist you with any inquiries you may have.`;
      default:
        return `Welcome to ${business.name}. How can I assist you today?`;
    }
  }

  return (
    <div className="iframe-widget-preview">
      <h3>Embeddable Widget Preview</h3>
      <p>This is how your chatbot widget will appear when embedded on your website</p>
      
      <div className="iframe-container">
        <iframe
          title="Chatbot Widget Preview"
          srcDoc={generateWidgetHtml()}
          width="100%"
          height="600"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default IframeWidget;
