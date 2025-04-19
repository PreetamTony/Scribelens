export interface AnalysisResult {
  extractedText: string;
  structuredContent: {
    title?: string;
    sections: Section[];
  };
  metadata: {
    confidence: number;
    processingTime: number;
    imageQuality: string;
  };
}

export interface Section {
  heading?: string;
  content: string;
  type: 'text' | 'equation' | 'list' | 'table';
  items?: string[]; // For lists
  rows?: string[][]; // For tables
}

export interface ChatMessage {
  role: 'user' | 'system';
  content: string;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
}

export interface SavedNote {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  result: AnalysisResult;
}