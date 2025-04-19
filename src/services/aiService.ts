/**
 * Service for AI-related operations using the Groq API
 */

// Generate a summary of extracted text
export const generateSummary = async (text: string): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-r1-distill-llama-70b',
        messages: [
          {
            role: 'system',
            content: `🎓✨ You are a joyful, expert educational assistant who transforms boring classroom notes and messy whiteboards into engaging, fun, and easy-to-understand content!\n\nHere's what you do:\n- 🧠 Analyze the provided text carefully and structure it clearly — like you're teaching your enthusiastic friend.\n- 💡 Add fun facts, quick memory tricks, or real-life analogies to make the topic more memorable.\n- 🎯 Keep it concise and interactive — include short explanations, mini-quizzes, or fill-in-the-blanks where possible.\n- 📌 Skip long summaries; go for crisp, actionable insights.\n- 🌐 If helpful, share useful external resources (links to videos, interactive tools, etc.)\n- 🎨 Feel free to use emojis, bullet points, or visuals to make the learning experience vibrant and enjoyable.\n\nIMPORTANT: If you see any <think>...</think> or similar sections in the input, REMOVE them entirely from your output. Only summarize and enhance the actual notes or explanations provided by the user.\n\nALWAYS display your summary in beautiful, well-structured markdown with clear headers, bullet points, emojis, and interactive elements (mini-quizzes, fill-in-the-blanks, etc.) where possible.\n\nLet's turn every topic into an 'Aha!' moment! 🚀💬\n\nDo not display what you think or meta-comments; only provide the enhanced summary.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    // Remove any <think>...</think> content using regex
    const aiContent = data.choices[0].message.content;
    return stripThinkContent(aiContent);
  } catch (error) {
    console.error('AI summarization error:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
};

import axios from 'axios';

// Utility to remove <think>...</think> content from AI output
function stripThinkContent(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

export const enhanceContent = async (text: string) => {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  if (!text || text.trim() === '') {
    throw new Error('No text provided for enhancement');
  }
  try {
    if (!GROQ_API_KEY) {
      throw new Error('Groq API key is missing. Please check your environment variables.');
    }
    const response = await axios.post(
      GROQ_API_URL,
      {
        messages: [
          {
            role: 'system',
            content: `🎓✨ You are a joyful, expert educational assistant who transforms boring classroom notes and messy whiteboards into engaging, fun, and easy-to-understand content!\n\nHere's what you do:\n- 🧠 Analyze the provided text carefully and structure it clearly — like you're teaching your enthusiastic friend.\n- 💡 Add fun facts, quick memory tricks, or real-life analogies to make the topic more memorable.\n- 🎯 Keep it concise and interactive — include short explanations, mini-quizzes, or fill-in-the-blanks where possible.\n- 📌 Skip long summaries; go for crisp, actionable insights.\n- 🌐 If helpful, share useful external resources (links to videos, interactive tools, etc.)\n- 🎨 Feel free to use emojis, bullet points, or visuals to make the learning experience vibrant and enjoyable.\n\nIMPORTANT: If you see any <think>...</think> or similar sections in the input, REMOVE them entirely from your output. Only summarize and enhance the actual notes or explanations provided by the user.\n\nALWAYS display your summary in beautiful, well-structured markdown with clear headers, bullet points, emojis, and interactive elements (mini-quizzes, fill-in-the-blanks, etc.) where possible.\n\nLet's turn every topic into an 'Aha!' moment! 🚀💬\n\nDo not display what you think or meta-comments; only provide the enhanced summary.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        model: 'deepseek-r1-distill-llama-70b',
        temperature: 0.5,
        max_tokens: 2048,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    if (!response.data || !response.data.choices || !response.data.choices.length) {
      throw new Error('Invalid response from Groq API');
    }
    const enhancedContent = response.data.choices[0]?.message?.content;
    if (!enhancedContent) {
      throw new Error('No enhanced content received');
    }
    // Remove any <think>...</think> content using regex
    return stripThinkContent(enhancedContent);
  } catch (error) {
    console.error('LLM Error:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request to Groq API timed out. Please try again.');
      }
      if (error.response) {
        console.error('Response data:', error.response.data);
        if (error.response.status === 401) {
          throw new Error('Authentication error. Please check your API key.');
        } else if (error.response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.response.status === 400) {
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

export const processDirectTextInput = async (text: string) => {
  if (!text.trim()) {
    throw new Error('Please enter some text to enhance.');
  }
  return await enhanceContent(text);
};

// Ask a question about the extracted text/summary
export const askQuestion = async (
  question: string, 
  originalText: string, 
  summary: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-r1-distill-llama-70b',
        messages: [
          {
            role: 'system',
            content: `You are an educational assistant helping a student understand classroom content.
                      You have access to the original text extracted from a classroom whiteboard or notes,
                      and a structured summary of that content. Use this information to answer the student's
                      question accurately and helpfully. If you're unsure or the question is outside the scope
                      of the provided content, acknowledge this and suggest what might be relevant.`
          },
          {
            role: 'user',
            content: `Original text: ${originalText}\n\nSummary: ${summary}\n\nStudent question: ${question}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    // Remove any <think>...</think> content using regex
    const aiContent = data.choices[0].message.content;
    return stripThinkContent(aiContent);
  } catch (error) {
    console.error('AI question answering error:', error);
    throw new Error('Failed to answer question. Please try again.');
  }
};