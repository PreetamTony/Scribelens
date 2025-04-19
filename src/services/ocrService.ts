/**
 * Service for handling OCR (Optical Character Recognition) operations
 */

import axios from 'axios';

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix
        const base64 = reader.result.split(',')[1];
        if (!base64) {
          reject(new Error('Failed to extract base64 data'));
          return;
        }
        resolve(base64);
      } else {
        reject(new Error('FileReader result is not a string'));
      }
    };
    reader.onerror = error => {
      console.error('Error converting file to base64:', error);
      reject(error);
    };
  });
};

export const validateImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
  }
  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }
  return true;
};

export const extractTextFromImage = async (base64Image: string) => {
  if (!base64Image) {
    throw new Error('No image data provided');
  }
  const encodedParams = new URLSearchParams();
  encodedParams.set('base64', base64Image);
  try {
    const response = await axios.post(
      'https://ocr-extract-text.p.rapidapi.com/ocr',
      encodedParams,
      {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 30000 // 30 second timeout
      }
    );
    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || 'Failed to extract text from image');
    }
    if (!response.data.text || response.data.text.trim() === '') {
      throw new Error('No text could be extracted from the image');
    }
    return response.data;
  } catch (error) {
    console.error('OCR Error:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }
      if (error.response) {
        throw new Error(`OCR service error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('No response from OCR service. Please check your internet connection.');
      }
    }
    const message = (error instanceof Error) ? error.message : String(error);
    throw new Error(message || 'Failed to extract text from image. Please try again or enter text manually.');
  }
};


export const processImage = async (file: File): Promise<string> => {
  try {
    // Create form data to send image file
    const formData = new FormData();
    formData.append('image', file);
    
    // RapidAPI OCR service endpoint
    const response = await fetch('https://ocr-extract-text.p.rapidapi.com/ocr', {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com'
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`OCR service error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the text content from the response
    if (data && data.text) {
      return data.text;
    } else {
      // If there's no text, the image might not contain readable text
      throw new Error('No text could be extracted from the image.');
    }
  } catch (error) {
    console.error('OCR processing error:', error);
    throw new Error('Failed to process image. Please try again with a clearer image.');
  }
}