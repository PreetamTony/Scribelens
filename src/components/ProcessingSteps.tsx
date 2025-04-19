import React from 'react';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

interface ProcessingStepsProps {
  status: 'idle' | 'uploading' | 'extracting' | 'summarizing' | 'complete' | 'error';
  error: string | null;
  onReset: () => void;
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ status, error, onReset }) => {
  const steps = [
    { id: 'uploading', label: 'Uploading Image' },
    { id: 'extracting', label: 'Extracting Text' },
    { id: 'summarizing', label: 'Generating Summary' },
    { id: 'complete', label: 'Processing Complete' }
  ];

  const getStepStatus = (stepId: string) => {
    if (status === 'error') {
      return stepId === steps.find(s => s.id === status)?.id ? 'error' : 'pending';
    }
    
    const currentStepIndex = steps.findIndex(s => s.id === status);
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex < currentStepIndex) return 'complete';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Processing Your Image</h3>
        {(status === 'complete' || status === 'error') && (
          <button 
            onClick={onReset}
            className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Start Over
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(step.id);
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Connector line */}
              {index > 0 && (
                <div className="absolute h-full w-0.5 bg-gray-200 dark:bg-gray-700 left-4 -translate-y-1/2 z-0"></div>
              )}
              
              {/* Status icon */}
              <div className="relative mr-4">
                {stepStatus === 'complete' && (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                )}
                {stepStatus === 'current' && (
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                )}
                {stepStatus === 'error' && (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                {stepStatus === 'pending' && (
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700" />
                )}
              </div>
              
              {/* Step label */}
              <div>
                <p className={`font-medium ${
                  stepStatus === 'current' ? 'text-blue-500 dark:text-blue-400' :
                  stepStatus === 'complete' ? 'text-green-500 dark:text-green-400' :
                  stepStatus === 'error' ? 'text-red-500 dark:text-red-400' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.label}
                </p>
                
                {stepStatus === 'current' && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.id === 'uploading' && 'Preparing your image...'}
                    {step.id === 'extracting' && 'Reading text from your image...'}
                    {step.id === 'summarizing' && 'Creating an intelligent summary...'}
                    {step.id === 'complete' && 'All done!'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
            <p className="font-medium">Error occurred</p>
            <p className="text-sm mt-1">{error || 'Failed to process your image. Please try again.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingSteps;