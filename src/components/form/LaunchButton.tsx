import React from 'react';

const LaunchButton: React.FC = () => {
  const handleLaunch = () => {
    // This would be where we'd connect to a real API in the future
    alert('Your chatbot is ready to launch! In a production environment, this would generate your embeddable widget code.');
  };

  return (
    <div className="launch-button-container">
      <button 
        className="btn btn-primary launch-button"
        onClick={handleLaunch}
      >
        Launch My Bot
      </button>
      <p className="launch-note">Click to generate your embeddable widget code</p>
    </div>
  );
};

export default LaunchButton;
