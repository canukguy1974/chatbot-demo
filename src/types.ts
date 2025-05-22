export interface ChatbotConfig {
  business: {
    name: string;
    industry: string;
    description: string;
  };
  personality: 'friendly' | 'professional' | 'humorous' | 'casual' | 'formal';
  knowledgeBase: {
    content: string;
    type: 'text' | 'url' | 'json';
  };
  responseButtons: ResponseButton[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: ResponseButton[];
}

export interface PersonalityOption {
  id: 'friendly' | 'professional' | 'humorous' | 'casual' | 'formal';
  label: string;
  description: string;
  icon: string;
}

export interface ResponseButton {
  id: string;
  text: string;
  triggerKeywords: string[];
  action: string;
  style?: 'primary' | 'secondary' | 'text';
}
