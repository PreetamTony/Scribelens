import React, { useState } from 'react';
import { generateSummary, askQuestion } from '../services/aiService';
import ParticlesBackground from './ParticlesBackground';
import { Sparkles } from 'lucide-react';

interface AISummaryQAProps {
  initialInputText?: string;
}

const AISummaryQA: React.FC<AISummaryQAProps> = ({ initialInputText }) => {
  const [inputText, setInputText] = useState(initialInputText || '');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handler for generating summary
  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary('');
    setAnswer('');
    try {
      const result = await generateSummary(inputText);
      setSummary(result);
    } catch (err) {
      const message = (err instanceof Error) ? err.message : String(err) || 'Failed to generate summary.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handler for asking a question
  const handleAsk = async () => {
    setLoading(true);
    setError(null);
    setAnswer('');
    try {
      const result = await askQuestion(question, inputText, summary);
      setAnswer(result);
    } catch (err) {
      const message = (err instanceof Error) ? err.message : String(err) || 'Failed to get answer.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-10 mb-12">
      <ParticlesBackground />
      <div className="relative z-10 p-8 md:p-10 bg-white rounded-2xl shadow-2xl border border-blue-100 backdrop-blur-lg">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-500 text-2xl font-extrabold mb-1">
            <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse" />
            ScribeLens Chat
          </span>
          <span className="text-base text-gray-500 dark:text-gray-500 text-center">Summarize and interact with your notes in a modern, friendly way!</span>
        </div>
        <textarea
          rows={6}
          className="w-full p-4 mb-4 rounded-xl border border-blue-200 bg-white text-gray-800 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-vertical placeholder:text-gray-400"
          placeholder="Paste classroom notes or whiteboard text here..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleSummarize}
          disabled={loading || !inputText.trim()}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-lg shadow transition mb-2 border-none
            ${loading || !inputText.trim() ? 'bg-blue-200 text-blue-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'}`}
        >
          <Sparkles className="w-5 h-5" />
          {loading ? 'Summarizing...' : 'Generate Summary'}
        </button>
      {summary && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Summary</h3>
          <pre className="whitespace-pre-wrap text-gray-800 text-base">{summary}</pre>
        </div>
      )}
      {summary && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-inner">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Ask a Question</h3>
          <input
            type="text"
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Type your question about the summary..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition mb-2 ${loading || !question.trim() ? 'bg-green-200 text-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {loading ? 'Answering...' : 'Ask'}
          </button>
          {answer && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-inner max-h-64 overflow-y-auto custom-scrollbar" aria-live="polite">
              <span className="font-semibold text-green-700 block mb-2">Answer:</span>
              <pre className="whitespace-pre-wrap text-green-900 text-base">{answer}</pre>
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-inner" aria-live="assertive">
              <span className="font-semibold text-red-700 block mb-2">Error:</span>
              <pre className="whitespace-pre-wrap text-red-900 text-base">{error}</pre>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISummaryQA;