import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

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

// Add a function to validate image before processing
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

    // Check if the OCR result contains text
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`OCR service error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from OCR service. Please check your internet connection.');
      }
    }
    const message = (error instanceof Error) ? error.message : String(error);
    throw new Error(message || 'Failed to extract text from image. Please try again or enter text manually.');
  }
};

export const enhanceContent = async (text: string) => {
  if (!text || text.trim() === '') {
    throw new Error('No text provided for enhancement');
  }

  try {
    // Check if API key is available
    if (!GROQ_API_KEY) {
      throw new Error('Groq API key is missing. Please check your environment variables.');
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational assistant. Analyze the provided text from classroom notes or whiteboards, structure it clearly, and add helpful context, examples, and explanations where needed.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        // Use a model that is definitely available in Groq
        model: 'llama2-70b-4096',
        temperature: 0.5,
        max_tokens: 2048,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 second timeout
      }
    );

    if (!response.data || !response.data.choices || !response.data.choices.length) {
      throw new Error('Invalid response from Groq API');
    }

    const enhancedContent = response.data.choices[0]?.message?.content;
    if (!enhancedContent) {
      throw new Error('No enhanced content received');
    }

    return enhancedContent;
  } catch (error) {
    console.error('LLM Error:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request to Groq API timed out. Please try again.');
      }
      if (error.response) {
        // Add more detailed error logging
        console.error('Response data:', error.response.data);
        
        // Handle specific API error codes
        if (error.response.status === 401) {
          throw new Error('Authentication error. Please check your API key.');
        } else if (error.response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.response.status === 400) {
          // Handle 400 Bad Request specifically
          const errorMessage = error.response.data?.error?.message || 'Invalid request parameters';
          throw new Error(`Bad request to Groq API: ${errorMessage}`);
        }
        throw new Error(`Groq API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('No response from Groq API. Please check your internet connection.');
      }
    }
    const message = (error instanceof Error) ? error.message : String(error);
    throw new Error(message || 'Failed to enhance content. Please try again later.');
  }
};

// Add a function to handle direct text input as an alternative to image upload
export const processDirectTextInput = async (text: string) => {
  if (!text.trim()) {
    throw new Error('Please enter some text to enhance.');
  }
  
  return await enhanceContent(text);
};