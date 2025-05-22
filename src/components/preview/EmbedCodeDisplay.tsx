import React from 'react';
import { ChatbotConfig } from '../../types';

interface EmbedCodeDisplayProps {
  config: ChatbotConfig;
}

const EmbedCodeDisplay: React.FC<EmbedCodeDisplayProps> = ({ config }) => {
  // Generate embed code based on configuration
  const generateEmbedCode = (): string => {
    const businessName = encodeURIComponent(config.business.name || 'My Business');
    const personality = encodeURIComponent(config.personality);
    
    // This is a simplified example - in a real implementation, you would generate
    // a proper iframe code with a real deployment URL and configuration parameters
    return `<script>
  (function(w, d) {
    var chatbotConfig = {
      businessName: "${businessName}",
      personality: "${personality}",
      position: "bottom-right"
    };
    
    var s = d.createElement("script");
    s.src = "https://example.com/chatbot-widget.js";
    s.async = true;
    s.onload = function() {
      w.initChatbot(chatbotConfig);
    };
    d.body.appendChild(s);
  })(window, document);
</script>`;
  };

  const handleCopyCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Embed code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };

  return (
    <div className="embed-code-display">
      <h3>Embed Code</h3>
      <p>Copy this code and paste it into your website to add the chatbot widget</p>
      
      <div className="code-block">
        <pre>{generateEmbedCode()}</pre>
      </div>
      
      <button 
        className="btn btn-secondary copy-button"
        onClick={handleCopyCode}
      >
        Copy Code
      </button>
    </div>
  );
};

export default EmbedCodeDisplay;
