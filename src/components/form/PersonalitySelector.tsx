import React from 'react';
import { PersonalityOption } from '../../types';

interface PersonalitySelectorProps {
  selectedPersonality: string;
  onSelect: (personality: 'friendly' | 'professional' | 'humorous' | 'casual' | 'formal') => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({ selectedPersonality, onSelect }) => {
  const personalities: PersonalityOption[] = [
    {
      id: 'friendly',
      label: 'Friendly',
      description: 'Warm and approachable, focuses on building rapport with users',
      icon: '😊'
    },
    {
      id: 'professional',
      label: 'Professional',
      description: 'Formal and business-like, focuses on efficiency and clarity',
      icon: '👔'
    },
    {
      id: 'humorous',
      label: 'Humorous',
      description: 'Light-hearted and witty, adds jokes and playful responses',
      icon: '😄'
    },
    {
      id: 'casual',
      label: 'Casual',
      description: 'Relaxed and conversational, uses simple language',
      icon: '👋'
    },
    {
      id: 'formal',
      label: 'Formal',
      description: 'Polite and respectful, uses proper language and etiquette',
      icon: '🎩'
    }
  ];

  return (
    <div className="form-section">
      <h3>Chatbot Personality</h3>
      <p>Choose how your chatbot will communicate with users</p>
      
      <div className="personality-options">
        {personalities.map((personality) => (
          <div 
            key={personality.id}
            className={`personality-option ${selectedPersonality === personality.id ? 'selected' : ''}`}
            onClick={() => onSelect(personality.id)}
          >
            <div className="personality-icon">{personality.icon}</div>
            <div className="personality-details">
              <h4>{personality.label}</h4>
              <p>{personality.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalitySelector;
