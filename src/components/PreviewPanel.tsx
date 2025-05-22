import React from 'react';
import { ChatbotConfig } from '../types';
import ChatInterface from './preview/ChatInterface';
import EmbedCodeDisplay from './preview/EmbedCodeDisplay';

interface PreviewPanelProps {
  config: ChatbotConfig;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  return (
    <div className="preview-panel">
      <div className="card">
        <h2>Preview Your Chatbot</h2>
        <p>See how your chatbot will appear to your users</p>
        
        <div className="device-frame">
          <ChatInterface config={config} />
        </div>
        
        <EmbedCodeDisplay config={config} />
      </div>
    </div>
  );
};

export default PreviewPanel;
