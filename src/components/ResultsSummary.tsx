import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, CheckCircle } from 'lucide-react';

interface ResultsSummaryProps {
  extractedText: string;
  summary: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ extractedText, summary }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'original'>('summary');
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderContent = () => {
    const text = activeTab === 'summary' ? summary : extractedText;
    
    return (
      <div className="relative p-4 bg-white rounded-lg mt-2">
        <div className="absolute top-2 right-2">
          <CopyToClipboard text={text} onCopy={handleCopy}>
            <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </CopyToClipboard>
        </div>
        <div className="prose max-w-none prose-sm sm:prose-base">
          {activeTab === 'summary' ? (
            <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
              {extractedText}
            </pre>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-3 p-6 md:p-8 bg-white/80 dark:bg-white-600 rounded-xl shadow-lg border border-blue-100 backdrop-blur-md transition-transform duration-200">
      <div className="relative max-w-2xl mx-auto mt-8 mb-8">
        <div className="relative z-10 p-8 md:p-10 bg-white rounded-2xl shadow-2xl border border-blue-100 backdrop-blur-lg">
          <div className="flex flex-col items-center mb-6">
            <span className="inline-flex items-center gap-2 text-blue-700 text-2xl font-extrabold mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-yellow-400 animate-pulse"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.415m12.728 0l-1.415-1.415M6.343 6.343L4.929 4.929" /></svg>
              Results
            </span>
            <span className="text-base text-gray-500 text-center">View the AI summary or your original extracted text</span>
          </div>
          <div className="mb-6">
            <nav className="flex justify-center space-x-4 rounded-lg bg-blue-50 border border-blue-100 p-1" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-2 font-bold text-sm rounded-lg transition-colors duration-200 focus:outline-none
                  ${activeTab === 'summary' ? 'bg-blue-600 text-white shadow border border-blue-600' : 'text-blue-700 hover:bg-blue-100'}`}
              >
                AI Summary
              </button>
              <button
                onClick={() => setActiveTab('original')}
                className={`px-6 py-2 font-bold text-sm rounded-lg transition-colors duration-200 focus:outline-none
                  ${activeTab === 'original' ? 'bg-blue-600 text-white shadow border border-blue-600' : 'text-blue-700 hover:bg-blue-100'}`}
              >
                Original Text
              </button>
            </nav>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;