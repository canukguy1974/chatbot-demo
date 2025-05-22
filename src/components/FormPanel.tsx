import React from 'react';
import BusinessInfoForm from './form/BusinessInfoForm';
import PersonalitySelector from './form/PersonalitySelector';
import KnowledgeBaseInput from './form/KnowledgeBaseInput';
import ResponseButtonsConfig from './form/ResponseButtonsConfig';
import LaunchButton from './form/LaunchButton';
import { ChatbotConfig } from '../types';

interface FormPanelProps {
  config: ChatbotConfig;
  onConfigUpdate: (config: Partial<ChatbotConfig>) => void;
}

const FormPanel: React.FC<FormPanelProps> = ({ config, onConfigUpdate }) => {
  const handleBusinessInfoUpdate = (business: ChatbotConfig['business']) => {
    onConfigUpdate({ business });
  };

  const handlePersonalityUpdate = (personality: ChatbotConfig['personality']) => {
    onConfigUpdate({ personality });
  };

  const handleKnowledgeBaseUpdate = (knowledgeBase: ChatbotConfig['knowledgeBase']) => {
    onConfigUpdate({ knowledgeBase });
  };
  
  const handleResponseButtonsUpdate = (responseButtons: ChatbotConfig['responseButtons']) => {
    onConfigUpdate({ responseButtons });
  };

  return (
    <div className="form-panel">
      <div className="card">
        <h2>Configure Your Chatbot</h2>
        <p>Customize your AI assistant to match your business needs</p>
        
        <BusinessInfoForm 
          business={config.business} 
          onUpdate={handleBusinessInfoUpdate} 
        />
        
        <PersonalitySelector 
          selectedPersonality={config.personality} 
          onSelect={handlePersonalityUpdate} 
        />
        
        <KnowledgeBaseInput 
          knowledgeBase={config.knowledgeBase} 
          onUpdate={handleKnowledgeBaseUpdate} 
        />
        
        <ResponseButtonsConfig
          buttons={config.responseButtons}
          onUpdate={handleResponseButtonsUpdate}
        />
        
        <LaunchButton />
      </div>
    </div>
  );
};

export default FormPanel;
