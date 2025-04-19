/**
 * Type definitions for the application
 */

// Image processing related types
export interface ProcessedImage {
  id: string;
  imageUrl: string;
  extractedText: string;
  summary: string;
  timestamp: Date;
}

// AI/Chat related types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export type ProcessingStatus = 'idle' | 'uploading' | 'extracting' | 'summarizing' | 'complete' | 'error';