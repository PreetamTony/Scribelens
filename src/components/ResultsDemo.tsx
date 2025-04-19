
interface ResultsDemoProps {
  enhancedText: string;
  originalText: string;
}

import React, { useState } from 'react';
import { Copy, Download, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { askQuestion } from '../services/aiService';

const ResultsDemo: React.FC<ResultsDemoProps> = ({ enhancedText, originalText }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'system'; content: string }[]>([
    { role: 'system', content: 'How can I help you understand this content better?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // This handler must be async to allow use of await inside
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    setChatMessages((prev: { role: 'user' | 'system'; content: string }[]) => [...prev, { role: 'user', content: inputMessage }]);
    setInputMessage('');
    
    // Call real AI service for response
    setChatMessages((prev: { role: 'user' | 'system'; content: string }[]) => [...prev, { role: 'system', content: 'Thinking...' }]);
    try {
      // Use the enhancedText and originalText props for context
      const aiResponse = await askQuestion(inputMessage, originalText, enhancedText);
      setChatMessages((prev: { role: 'user' | 'system'; content: string }[]) => [
        ...prev.slice(0, -1), // Remove 'Thinking...'
        { role: 'system', content: aiResponse }
      ]);
    } catch (error) {
      const message = (error instanceof Error) ? error.message : String(error) || 'Sorry, I could not process your question at this time.';
      setChatMessages((prev: { role: 'user' | 'system'; content: string }[]) => [
        ...prev.slice(0, -1),
        { role: 'system', content: message }
      ]);
    }
  };


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See ScribeLens in Action</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Here's an example of how ScribeLens transforms classroom notes into clear, interactive content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Original Image Side */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-lg font-medium">Original Whiteboard</h3>
            </div>
            <img 
              src="https://i.ytimg.com/vi/MQKdkxnELQA/maxresdefault.jpg" 
              alt="Classroom whiteboard with physics equations" 
              className="w-full h-auto"
            />
            <div className="p-4 bg-gray-100">
              <p className="text-sm text-gray-600">This physics lecture covered Newton's laws of motion and basic kinematics equations.</p>
            </div>
          </div>
          
          {/* Processed Results Side */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">ScribeLens Results</h3>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-blue-500 rounded transition-colors">
                    <Copy className="h-5 w-5" />
                  </button>
                  <button className="p-1 hover:bg-blue-500 rounded transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-3 font-medium text-sm ${activeTab === 'summary' ? 
                  'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('summary')}
              >
                Structured Summary
              </button>
              <button 
                className={`flex-1 py-3 font-medium text-sm ${activeTab === 'chat' ? 
                  'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('chat')}
              >
                Interactive Chat
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'summary' ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Newton's Laws of Motion</h4>
                    <div className="space-y-2">
                      <p className="text-gray-800"><span className="font-medium">First Law:</span> An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.</p>
                      <p className="text-gray-800"><span className="font-medium">Second Law:</span> The acceleration of an object depends on the mass of the object and the amount of force applied.</p>
                      <p className="text-gray-800 mb-2"><span className="font-medium">Mathematical form:</span> F = ma</p>
                      <p className="text-gray-800"><span className="font-medium">Third Law:</span> For every action, there is an equal and opposite reaction.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Kinematics Equations</h4>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <p className="mb-2">v = u + at</p>
                      <p className="mb-2">s = ut + ½at²</p>
                      <p className="mb-2">v² = u² + 2as</p>
                      <p>s = ½(u + v)t</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Where:</strong> v = final velocity, u = initial velocity, a = acceleration, t = time, s = displacement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Was this summary helpful?
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ThumbsUp className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ThumbsDown className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-96">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {chatMessages.map((message: { role: 'user' | 'system'; content: string }, index: number) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`rounded-lg px-4 py-2 max-w-xs break-words ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask a question about this content..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDemo;