import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ProcessingSteps from '../components/ProcessingSteps';
import ResultsSummary from '../components/ResultsSummary';
import ChatInterface from '../components/ChatInterface';
import HistoryPanel from '../components/HistoryPanel';
import { processImage } from '../services/ocrService';
import { generateSummary, askQuestion } from '../services/aiService';

type ProcessingStatus = 'idle' | 'uploading' | 'extracting' | 'summarizing' | 'complete' | 'error';
type HistoryItem = {
  id: string;
  imageUrl: string;
  text: string;
  summary: string;
  timestamp: Date;
};

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleImageUpload = async (imageFile: File) => {
    try {
      setStatus('uploading');
      setError(null);
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(imageFile);
      setCurrentImage(imageUrl);
      
      // Extract text using OCR
      setStatus('extracting');
      const text = await processImage(imageFile);
      setExtractedText(text);
      
      // Generate summary using AI
      setStatus('summarizing');
      const aiSummary = await generateSummary(text);
      setSummary(aiSummary);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        imageUrl,
        text,
        summary: aiSummary,
        timestamp: new Date()
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
      setStatus('complete');
      
      // Initialize chat with a system message
      setChatMessages([{ 
        role: 'assistant', 
        content: 'I\'ve summarized the content. Ask me anything about it!'
      }]);
      
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    }
  };

  const handleAskQuestion = async (question: string) => {
    try {
      // Add user question to chat
      setChatMessages(prev => [...prev, { role: 'user', content: question }]);
      
      // Get AI response based on the question and context
      const response = await askQuestion(question, extractedText, summary);
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I had trouble answering that question. Please try again.'
      }]);
    }
  };

  const handleHistoryItemSelect = (item: HistoryItem) => {
    setCurrentImage(item.imageUrl);
    setExtractedText(item.text);
    setSummary(item.summary);
    setStatus('complete');
    setChatMessages([{ 
      role: 'assistant', 
      content: 'I\'ve loaded this previous summary. Ask me anything about it!'
    }]);
    setIsHistoryOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main content area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {status === 'idle' ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-6">
                <ProcessingSteps 
                  status={status} 
                  error={error}
                  onReset={() => setStatus('idle')}
                />
                
                {currentImage && (
                  <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src={currentImage} 
                      alt="Uploaded whiteboard" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
                
                {status === 'complete' && (
                  <ResultsSummary 
                    extractedText={extractedText} 
                    summary={summary}
                  />
                )}
              </div>
            )}
          </div>
          
          {status === 'complete' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <ChatInterface 
                messages={chatMessages} 
                onSendMessage={handleAskQuestion} 
              />
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          {/* Sidebar/History panel */}
          <div className="sticky top-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">History</h2>
                <button 
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="lg:hidden text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {isHistoryOpen ? 'Hide' : 'Show'}
                </button>
              </div>
              
              <div className={`${isHistoryOpen ? 'block' : 'hidden lg:block'}`}>
                <HistoryPanel 
                  history={history} 
                  onItemSelect={handleHistoryItemSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;