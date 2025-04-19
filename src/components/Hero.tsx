import React, { useState } from 'react';
import { Camera, BookOpen, Zap } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section id="hero" className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transform Classroom Notes into
              <span className="text-blue-600"> Clear Understanding</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              ScribeLens uses AI to convert whiteboard photos and handwritten notes into structured, 
              easy-to-understand summaries. Ask questions, get explanations, and never fall behind in class again.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Camera className="h-5 w-5 mr-2" />
                Upload Image
              </button>
              <button className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Try ScribeLens Now</h3>
                <p className="text-gray-600">Upload a whiteboard photo or handwritten note</p>
              </div>
              <ImageUploader
                onResultsReceived={(enhanced, original) => {
                  setError(null);
                  navigate('/results', { state: { enhancedText: enhanced, originalText: original } });
                }}
                onError={err => setError(err)}
              />
              {error && (
                <div className="mt-4 text-red-600 text-center">{error}</div>
              )}
              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <Zap className="h-4 w-4 mr-1 text-amber-500" />
                Powered by AI for instant analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;