import React from 'react';
import ImageUploader from './ImageUploader';

const YourParentComponent: React.FC = () => {
  const handleResults = (enhancedText: string, originalText: string) => {
    // Handle the results
    console.log('Enhanced text:', enhancedText);
    console.log('Original text:', originalText);
  };

  const handleError = (errorMessage: string) => {
    // Handle errors
    console.error('Error:', errorMessage);
    // Maybe show a notification or alert
  };

  return (
    <div>
      <h1>ScribeLens</h1>
      <ImageUploader 
        onResultsReceived={handleResults}
        onError={handleError}
      />
    </div>
  );
};

export default YourParentComponent;