import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} AI Chatbot Widget Builder</p>
      </div>
    </footer>
  );
};

export default Footer;
