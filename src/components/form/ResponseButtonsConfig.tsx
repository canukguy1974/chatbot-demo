import React, { useState } from 'react';
import { ResponseButton } from '../../types';

interface ResponseButtonsConfigProps {
  buttons: ResponseButton[];
  onUpdate: (buttons: ResponseButton[]) => void;
}

const ResponseButtonsConfig: React.FC<ResponseButtonsConfigProps> = ({ buttons, onUpdate }) => {
  const [newButton, setNewButton] = useState<ResponseButton>({
    id: '',
    text: '',
    triggerKeywords: [],
    action: '',
    style: 'primary'
  });
  
  const [keywordInput, setKeywordInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddButton = () => {
    if (newButton.text.trim() && newButton.triggerKeywords.length > 0) {
      const updatedButtons = [
        ...buttons,
        {
          ...newButton,
          id: `button-${Date.now()}`
        }
      ];
      onUpdate(updatedButtons);
      setNewButton({
        id: '',
        text: '',
        triggerKeywords: [],
        action: '',
        style: 'primary'
      });
      setIsAdding(false);
    }
  };

  const handleRemoveButton = (id: string) => {
    const updatedButtons = buttons.filter(button => button.id !== id);
    onUpdate(updatedButtons);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setNewButton({
        ...newButton,
        triggerKeywords: [...newButton.triggerKeywords, keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setNewButton({
      ...newButton,
      triggerKeywords: newButton.triggerKeywords.filter(k => k !== keyword)
    });
  };

  return (
    <div className="form-section">
      <h3>Response Buttons</h3>
      <p>Configure buttons that appear based on user messages</p>
      
      {buttons.length > 0 ? (
        <div className="response-buttons-list">
          {buttons.map(button => (
            <div key={button.id} className="response-button-item">
              <div className="response-button-header">
                <h4>{button.text}</h4>
                <button 
                  type="button" 
                  className="remove-button"
                  onClick={() => handleRemoveButton(button.id)}
                >
                  ×
                </button>
              </div>
              <div className="response-button-details">
                <div className="trigger-keywords">
                  <strong>Triggers:</strong> {button.triggerKeywords.join(', ')}
                </div>
                <div className="button-action">
                  <strong>Action:</strong> {button.action || 'No action'}
                </div>
                <div className="button-style">
                  <strong>Style:</strong> {button.style}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-buttons-message">
          No response buttons configured yet. Add buttons to enhance user interactions.
        </div>
      )}
      
      {isAdding ? (
        <div className="add-button-form">
          <h4>Add New Button</h4>
          
          <div className="form-group">
            <label htmlFor="button-text" className="form-label">Button Text</label>
            <input
              type="text"
              id="button-text"
              className="form-control"
              value={newButton.text}
              onChange={(e) => setNewButton({...newButton, text: e.target.value})}
              placeholder="e.g., Book a Demo"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Trigger Keywords</label>
            <div className="keywords-input-container">
              <input
                type="text"
                className="form-control"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="e.g., demo, appointment, schedule"
              />
              <button 
                type="button" 
                className="add-keyword-button"
                onClick={handleAddKeyword}
              >
                Add
              </button>
            </div>
            
            {newButton.triggerKeywords.length > 0 && (
              <div className="keywords-list">
                {newButton.triggerKeywords.map(keyword => (
                  <span key={keyword} className="keyword-tag">
                    {keyword}
                    <button 
                      type="button" 
                      className="remove-keyword"
                      onClick={() => handleRemoveKeyword(keyword)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <small className="form-text">
              Add keywords that will trigger this button to appear in chat
            </small>
          </div>
          
          <div className="form-group">
            <label htmlFor="button-action" className="form-label">Button Action</label>
            <input
              type="text"
              id="button-action"
              className="form-control"
              value={newButton.action}
              onChange={(e) => setNewButton({...newButton, action: e.target.value})}
              placeholder="e.g., https://example.com/book or custom action"
            />
            <small className="form-text">
              URL or custom action to perform when button is clicked
            </small>
          </div>
          
          <div className="form-group">
            <label htmlFor="button-style" className="form-label">Button Style</label>
            <select
              id="button-style"
              className="form-control"
              value={newButton.style}
              onChange={(e) => setNewButton({
                ...newButton, 
                style: e.target.value as 'primary' | 'secondary' | 'text'
              })}
            >
              <option value="primary">Primary (Gold)</option>
              <option value="secondary">Secondary (White)</option>
              <option value="text">Text Only</option>
            </select>
          </div>
          
          <div className="button-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleAddButton}
              disabled={!newButton.text.trim() || newButton.triggerKeywords.length === 0}
            >
              Add Button
            </button>
          </div>
        </div>
      ) : (
        <button 
          type="button" 
          className="btn btn-secondary add-button"
          onClick={() => setIsAdding(true)}
        >
          + Add Response Button
        </button>
      )}
    </div>
  );
};

export default ResponseButtonsConfig;
