import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students using ScribeLens to capture, understand, and master classroom content.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Try for Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center">
              Learn More
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
          
          <p className="mt-8 text-sm text-blue-200">
            No credit card required. Start capturing your classroom notes today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;