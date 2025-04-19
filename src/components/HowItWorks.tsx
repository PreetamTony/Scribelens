import React from 'react';
import { Camera, FileText, Layers, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="h-10 w-10 text-blue-600" />,
    title: 'Capture',
    description: 'Take a photo of classroom whiteboards or handwritten notes'
  },
  {
    icon: <FileText className="h-10 w-10 text-purple-600" />,
    title: 'Extract',
    description: 'Our AI extracts and processes text from your image'
  },
  {
    icon: <Layers className="h-10 w-10 text-emerald-600" />,
    title: 'Enhance',
    description: 'We add context, examples, and structure to the information'
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-amber-600" />,
    title: 'Interact',
    description: 'Ask questions to deepen your understanding of the material'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How ScribeLens Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our AI-powered tool transforms classroom content into clear, structured information in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mb-5 inline-block p-3 bg-gray-100 rounded-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Step number indicator */}
              <div className="mt-6 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Process visualization */}
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 transform -translate-y-1/2 z-0" />
          <div className="flex flex-col lg:flex-row">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8 lg:mb-0 lg:mx-4 relative z-10 flex-1 border-t-4 border-blue-600">
              <h4 className="text-lg font-semibold mb-2">Before ScribeLens</h4>
              <p className="text-gray-600 mb-4">Messy handwriting, disorganized notes, and unclear concepts.</p>
              <img 
                src="https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Messy handwritten notes" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center self-center mx-auto my-4 lg:my-0 z-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg relative z-10 flex-1 border-t-4 border-emerald-600">
              <h4 className="text-lg font-semibold mb-2">After ScribeLens</h4>
              <p className="text-gray-600 mb-4">Clean, structured information with helpful context and explanations.</p>
              <img 
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Organized digital notes" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;