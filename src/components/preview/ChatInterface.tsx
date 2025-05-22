import React, { useState, useEffect } from 'react';
import { ChatbotConfig, Message, ResponseButton } from '../../types';
import KnowledgeBaseProcessor from './KnowledgeBaseProcessor';

interface ChatInterfaceProps {
  config: ChatbotConfig;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ config }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [processedKnowledge, setProcessedKnowledge] = useState<any>(null);

  // Initialize with a welcome message based on personality and business info
  useEffect(() => {
    if (config.business.name) {
      const welcomeMessage = generateWelcomeMessage(config);
      setMessages([
        {
          id: 'welcome',
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [config.business.name, config.personality]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue, config, processedKnowledge);
      
      // Check for button triggers in user input
      const matchedButtons = findMatchingButtons(inputValue, config.responseButtons);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        buttons: matchedButtons.length > 0 ? matchedButtons : undefined
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Find buttons that match the user input based on trigger keywords
  const findMatchingButtons = (userInput: string, buttons: ResponseButton[]): ResponseButton[] => {
    const input = userInput.toLowerCase();
    return buttons.filter(button => 
      button.triggerKeywords.some(keyword => 
        input.includes(keyword.toLowerCase())
      )
    );
  };

  // Handle button click
  const handleButtonClick = (button: ResponseButton) => {
    // In a real implementation, this would perform the button's action
    // For now, we'll just add a message indicating the button was clicked
    
    const buttonMessage: Message = {
      id: `button-${Date.now()}`,
      text: `You clicked: ${button.text}`,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, buttonMessage]);
    
    // Simulate bot response to button click
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = `I'll help you with "${button.text}" right away!`;
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle processed knowledge base
  const handleKnowledgeProcessed = (knowledge: any) => {
    setProcessedKnowledge(knowledge);
  };

  // Generate welcome message based on personality and business info
  const generateWelcomeMessage = (config: ChatbotConfig): string => {
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
  };

  // Generate bot response based on user input, personality, and knowledge base
  const generateBotResponse = (userInput: string, config: ChatbotConfig, knowledge: any): string => {
    const { business, personality } = config;
    
    // Simple keyword matching for demo purposes
    const input = userInput.toLowerCase();
    
    // Check if input contains questions about the business
    if (input.includes('what') && (input.includes('do') || input.includes('offer') || input.includes('service'))) {
      if (business.description) {
        return formatResponse(`${business.name} ${business.description}`, personality);
      } else {
        return formatResponse(`We're in the ${business.industry || 'service'} industry.`, personality);
      }
    }
    
    // Check for greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return formatResponse('How can I help you today?', personality);
    }
    
    // Check for thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return formatResponse('You\'re welcome! Is there anything else I can help with?', personality);
    }
    
    // Check for knowledge base content if available
    if (knowledge) {
      // This is a simplified simulation - in a real app, you'd use more sophisticated matching
      switch (knowledge.type) {
        case 'text':
          // Simple keyword search in text chunks
          const relevantChunks = knowledge.chunks?.filter((chunk: string) => 
            chunk.toLowerCase().includes(input)
          );
          
          if (relevantChunks && relevantChunks.length > 0) {
            return formatResponse(`Based on our information: ${relevantChunks[0].substring(0, 100)}...`, personality);
          }
          break;
          
        case 'url':
          if (knowledge.content && knowledge.content.toLowerCase().includes(input)) {
            return formatResponse(`I found some information from our website that might help: "${knowledge.content}"`, personality);
          }
          break;
          
        case 'json':
          // Try to find matching data in JSON
          if (knowledge.data) {
            // Check for FAQs
            const faqs = knowledge.data.faqs || [];
            const matchingFaq = faqs.find((faq: any) => 
              faq.question.toLowerCase().includes(input)
            );
            
            if (matchingFaq) {
              return formatResponse(matchingFaq.answer, personality);
            }
            
            // Check for products
            const products = knowledge.data.products || [];
            const matchingProduct = products.find((product: any) => 
              product.name.toLowerCase().includes(input)
            );
            
            if (matchingProduct) {
              return formatResponse(`${matchingProduct.name}: ${matchingProduct.description}`, personality);
            }
          }
          break;
      }
    }
    
    // Default response
    return formatResponse('I don\'t have specific information about that yet. Is there something else I can help with?', personality);
  };

  // Format response based on personality
  const formatResponse = (baseResponse: string, personality: string): string => {
    switch (personality) {
      case 'friendly':
        return `${baseResponse} 😊 Let me know if you need anything else!`;
      case 'professional':
        return `${baseResponse} Please don't hesitate to ask if you require further assistance.`;
      case 'humorous':
        return `${baseResponse} 😄 I'd make a joke about it, but I'm still learning comedy!`;
      case 'casual':
        return `${baseResponse} Anything else you wanna know?`;
      case 'formal':
        return `${baseResponse} I remain at your service should you require additional information.`;
      default:
        return baseResponse;
    }
  };

  return (
    <div className="chat-interface">
      <KnowledgeBaseProcessor 
        config={config} 
        onProcessed={handleKnowledgeProcessed} 
      />
      
      <div className="chat-header">
        <div className="chat-title">
          {config.business.name || 'AI Chatbot'}
        </div>
      </div>
      
      <div className="message-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            {message.buttons && message.buttons.length > 0 && (
              <div className="message-buttons">
                {message.buttons.map(button => (
                  <button
                    key={button.id}
                    className={`response-button response-button-${button.style || 'primary'}`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message typing">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
