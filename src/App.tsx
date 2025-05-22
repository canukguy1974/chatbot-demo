import React, { useState } from 'react';
import Header from './components/Header';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import Footer from './components/Footer';
import { ChatbotConfig } from './types';

const App: React.FC = () => {
  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig>({
    business: {
      name: '',
      industry: '',
      description: ''
    },
    personality: 'professional',
    knowledgeBase: {
      content: '',
      type: 'text'
    },
    responseButtons: []
  });

  const handleConfigUpdate = (newConfig: Partial<ChatbotConfig>) => {
    setChatbotConfig({
      ...chatbotConfig,
      ...newConfig
    });
  };

  return (
    <div className="app-container">
      <Header />
      <main className="app-layout">
        <FormPanel 
          config={chatbotConfig} 
          onConfigUpdate={handleConfigUpdate} 
        />
        <PreviewPanel config={chatbotConfig} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
