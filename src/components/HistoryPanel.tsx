import React from 'react';
import { Clock, Image } from 'lucide-react';

interface HistoryItem {
  id: string;
  imageUrl: string;
  text: string;
  summary: string;
  timestamp: Date;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onItemSelect: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onItemSelect }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return new Intl.DateTimeFormat('en-US', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    }
  };
  
  if (history.length === 0) {
    return (
      <div className="text-center py-10">
        <Clock className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No history yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Your processed images will appear here
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemSelect(item)}
          className="w-full text-left bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="w-6 h-6 absolute inset-0 m-auto text-gray-400" />
              )}
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="font-medium truncate">
                {item.summary.split('.')[0]}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(item.timestamp)}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default HistoryPanel;