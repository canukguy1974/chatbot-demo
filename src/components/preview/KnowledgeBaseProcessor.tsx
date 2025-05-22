import React, { useState, useEffect } from 'react';
import { ChatbotConfig } from '../../types';

interface KnowledgeBaseProcessorProps {
  config: ChatbotConfig;
  onProcessed: (processedKnowledge: any) => void;
}

const KnowledgeBaseProcessor: React.FC<KnowledgeBaseProcessorProps> = ({ config, onProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processKnowledgeBase = async () => {
      setIsProcessing(true);
      setError(null);
      
      try {
        const { knowledgeBase } = config;
        
        // Skip processing if content is empty
        if (!knowledgeBase.content.trim()) {
          onProcessed(null);
          setIsProcessing(false);
          return;
        }
        
        switch (knowledgeBase.type) {
          case 'text':
            // Process plain text - in a real app, this might involve NLP or chunking
            const textKnowledge = {
              type: 'text',
              content: knowledgeBase.content,
              chunks: knowledgeBase.content.split('\n\n').filter(chunk => chunk.trim().length > 0)
            };
            onProcessed(textKnowledge);
            break;
            
          case 'url':
            // In a real app, this would fetch and process the URL content
            // For this demo, we'll simulate URL processing
            const urlKnowledge = {
              type: 'url',
              source: knowledgeBase.content,
              status: 'processed',
              content: `Simulated content from ${knowledgeBase.content}`
            };
            onProcessed(urlKnowledge);
            break;
            
          case 'json':
            try {
              // Attempt to parse JSON
              const jsonData = JSON.parse(knowledgeBase.content);
              onProcessed({
                type: 'json',
                data: jsonData,
                structure: Object.keys(jsonData)
              });
            } catch (jsonError) {
              setError('Invalid JSON format. Please check your syntax.');
              onProcessed(null);
            }
            break;
            
          default:
            setError('Unsupported knowledge base type');
            onProcessed(null);
        }
      } catch (err) {
        setError('Error processing knowledge base');
        onProcessed(null);
      } finally {
        setIsProcessing(false);
      }
    };
    
    // Process knowledge base whenever it changes
    processKnowledgeBase();
  }, [config.knowledgeBase, onProcessed]);

  // This component doesn't render anything visible
  // It just processes the knowledge base and calls the callback
  return null;
};

export default KnowledgeBaseProcessor;
