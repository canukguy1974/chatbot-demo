import React, { useState } from 'react';

interface KnowledgeBaseInputProps {
  knowledgeBase: {
    content: string;
    type: 'text' | 'url' | 'json';
  };
  onUpdate: (knowledgeBase: KnowledgeBaseInputProps['knowledgeBase']) => void;
}

const KnowledgeBaseInput: React.FC<KnowledgeBaseInputProps> = ({ knowledgeBase, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'json'>(knowledgeBase.type);

  const handleTabChange = (tab: 'text' | 'url' | 'json') => {
    setActiveTab(tab);
    onUpdate({
      content: knowledgeBase.content,
      type: tab
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({
      content: e.target.value,
      type: activeTab
    });
  };

  return (
    <div className="form-section">
      <h3>Knowledge Base</h3>
      <p>Provide information for your chatbot to use when responding to users</p>
      
      <div className="input-method-tabs">
        <button 
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => handleTabChange('text')}
        >
          Text Input
        </button>
        <button 
          className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
          onClick={() => handleTabChange('url')}
        >
          URL
        </button>
        <button 
          className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => handleTabChange('json')}
        >
          JSON
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'text' && (
          <div className="form-group">
            <label htmlFor="text-input" className="form-label">Text Knowledge Base</label>
            <textarea
              id="text-input"
              className="form-control"
              value={knowledgeBase.type === 'text' ? knowledgeBase.content : ''}
              onChange={handleContentChange}
              placeholder="Enter information about your products, services, FAQs, etc."
              rows={8}
            />
          </div>
        )}
        
        {activeTab === 'url' && (
          <div className="form-group">
            <label htmlFor="url-input" className="form-label">Website URL</label>
            <input
              type="url"
              id="url-input"
              className="form-control"
              value={knowledgeBase.type === 'url' ? knowledgeBase.content : ''}
              onChange={handleContentChange}
              placeholder="https://example.com/knowledge-base"
            />
            <small className="form-text">Enter a URL to your knowledge base or documentation</small>
          </div>
        )}
        
        {activeTab === 'json' && (
          <div className="form-group">
            <label htmlFor="json-input" className="form-label">JSON Format</label>
            <textarea
              id="json-input"
              className="form-control code-input"
              value={knowledgeBase.type === 'json' ? knowledgeBase.content : ''}
              onChange={handleContentChange}
              placeholder='{\n  "faqs": [\n    {\n      "question": "What are your hours?",\n      "answer": "We are open 9am-5pm Monday to Friday."\n    }\n  ]\n}'
              rows={12}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseInput;
