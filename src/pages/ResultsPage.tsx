import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AISummaryQA from '../components/AISummaryQA';
import GlossaryTooltip from '../components/GlossaryTooltip';
import HighlightableText from '../components/HighlightableText';

interface LocationState {
  enhancedText: string;
  originalText: string;
  summaryOnly?: boolean;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  React.useEffect(() => {
    // If no results, redirect to home/upload page
    if (!state || !state.enhancedText || !state.originalText) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  // If location.state.summaryOnly is true, do not show ResultsDemo
  const showDemo = !state.summaryOnly;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-12 px-2 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white/95 rounded-3xl shadow-2xl p-8 md:p-16 border border-blue-100 backdrop-blur-2xl animate-fadeInUp">
        <div className="text-center mb-14">
          <div className="flex flex-col items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 text-blue-700 text-4xl font-extrabold drop-shadow-lg">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-10 h-10 text-yellow-400 animate-bounce'><path strokeLinecap='round' strokeLinejoin='round' d='M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.415m12.728 0l-1.415-1.415M6.343 6.343L4.929 4.929' /></svg>
              ScribeLens Results
            </span>
          </div>
          <p className="text-lg md:text-xl text-blue-600/90 font-medium">✨ Review your enhanced summary, original text, and interact with the AI Q&A below. ✨</p>
        </div>
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 md:p-12 mb-8 transition-transform hover:scale-[1.02] animate-fadeInUp">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-7 h-7 text-green-500'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /></svg>
                  <span className="tooltip" title="The original extracted text from your notes or whiteboard">Original Text</span>
                </h3>
                <div className="prose max-w-none prose-sm sm:prose-base bg-green-50 rounded-lg p-4 mb-6 flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar border border-green-200 shadow-inner">
                  <GlossaryTooltip>
                    <HighlightableText text={state.originalText} />
                  </GlossaryTooltip>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-7 h-7 text-blue-500'><path strokeLinecap='round' strokeLinejoin='round' d='M16.5 7.5l-9 9m0-9l9 9' /></svg>
                  <span className="tooltip" title="AI-generated engaging summary of your notes">AI Summary</span>
                </h3>
                <div className="prose max-w-none prose-sm sm:prose-base bg-blue-50 rounded-lg p-4 flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar border border-blue-200 shadow-inner">
                  <GlossaryTooltip>
                    <HighlightableText text={state.enhancedText} />
                  </GlossaryTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showDemo && (
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-10 transition-transform hover:scale-[1.01]">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-purple-500'><path strokeLinecap='round' strokeLinejoin='round' d='M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2' /><path strokeLinecap='round' strokeLinejoin='round' d='M15 3h-6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z' /></svg>
                ScribeLens Q&amp;A
              </h3>
              <AISummaryQA initialInputText={state.originalText} />
            </div>
          </div>
        )}
        <div className="max-w-2xl mx-auto mt-12 animate-fadeInUp">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-xl border border-blue-100 p-10 flex flex-col items-center">
            <h4 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6 text-amber-400 animate-bounce'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' /></svg>
              What would you like to do next?
            </h4>
            <p className="text-gray-700 mb-6 text-center text-lg">Do you have feedback, want to process another image, or need more help?</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 w-full mt-2">
              <button
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                title="Start over with a new image"
                aria-label="Process another image"
                onClick={() => navigate('/#')}
              >
                Process Another Image
              </button>
              <button
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                title="Let us know how we did!"
                aria-label="Give feedback"
                onClick={() => window.open('mailto:preetamtony10@gmail.com?subject=Feedback%20for%20ScribeLens', '_blank')}
              >
                Give Feedback
              </button>
              <button
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                title="Get more help or support"
                aria-label="Get more help"
                onClick={() => navigate('/#about') }
              >
                Get More Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
