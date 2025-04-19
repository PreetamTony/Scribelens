import React, { useState, useRef } from 'react';
import { validateImage, convertToBase64, extractTextFromImage } from '../services/ocrService';
import { enhanceContent, processDirectTextInput } from '../services/aiService';

interface ImageUploaderProps {
  onResultsReceived: (enhancedText: string, originalText: string) => void;
  onError?: (error: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onResultsReceived, 
  onError = (errorMsg: string) => console.error(errorMsg) 
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  // Add the missing state variable
  const [useDirectInput, setUseDirectInput] = useState<boolean>(false);
  const [directText, setDirectText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    setUploadProgress(10);
    setError(null); // Clear any previous errors
    
    try {
      // Validate the image
      validateImage(file);
      
      // Convert to base64
      setUploadProgress(30);
      const base64 = await convertToBase64(file);
      
      // Extract text
      setUploadProgress(60);
      const extractionResult = await extractTextFromImage(base64);
      const extractedText = extractionResult.text || '';
      
      if (!extractedText.trim()) {
        throw new Error('No text could be extracted from this image. Please try another image or enter text directly.');
      }
      
      // Enhance content
      setUploadProgress(80);
      const enhancedText = await enhanceContent(extractedText);
      
      setUploadProgress(100);
      onResultsReceived(enhancedText || '', extractedText);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error) || 'An error occurred during processing';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleDirectTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directText.trim()) {
      setError('Please enter some text to enhance');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const enhancedText = await processDirectTextInput(directText);
      onResultsReceived(enhancedText || '', directText);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error) || 'An error occurred while enhancing the text';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleInputMethod = () => {
    setUseDirectInput(!useDirectInput);
    setError(null);
  };
  
  return (
    <div className="image-uploader">
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <div className="input-toggle" style={{ display: 'flex', marginBottom: '20px' }}>
        <button 
          type="button" 
          onClick={toggleInputMethod}
          className={`toggle-btn ${!useDirectInput ? 'active' : ''}`}
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: !useDirectInput ? '#4a6cf7' : '#e9ecef',
            color: !useDirectInput ? 'white' : 'black',
            border: 'none',
            borderRadius: useDirectInput ? '0 6px 6px 0' : '6px 0 0 6px'
          }}
        >
          Upload Image
        </button>
        <button 
          type="button" 
          onClick={toggleInputMethod}
          className={`toggle-btn ${useDirectInput ? 'active' : ''}`}
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: useDirectInput ? '#4a6cf7' : '#e9ecef',
            color: useDirectInput ? 'white' : 'black',
            border: 'none',
            borderRadius: !useDirectInput ? '0 6px 6px 0' : '6px 0 0 6px'
          }}
        >
          Enter Text
        </button>
      </div>
      
      {!useDirectInput ? (
        <div className="image-upload-container">
          <label className="upload-label" style={{ display: 'block', width: '100%', cursor: 'pointer' }}>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleImageUpload}
              disabled={isLoading}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div className="upload-button" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '120px',
              border: '2px dashed #4a6cf7',
              borderRadius: '8px',
              backgroundColor: 'rgba(74, 108, 247, 0.05)',
              color: '#4a6cf7',
              fontSize: '18px',
              fontWeight: 500
            }}>
              {isLoading ? 'Processing...' : 'Upload Image'}
            </div>
          </label>
          
          {isLoading && (
            <div className="progress-container" style={{ width: '100%', marginTop: '20px' }}>
              <div className="progress-bar" style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                marginBottom: '8px' 
              }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    height: '100%', 
                    backgroundColor: '#4a6cf7', 
                    width: `${uploadProgress}%`, 
                    transition: 'width 0.3s ease' 
                  }}
                ></div>
              </div>
              <div className="progress-text" style={{ fontSize: '14px', color: '#6c757d', textAlign: 'center' }}>
                {uploadProgress < 30 && 'Preparing image...'}
                {uploadProgress >= 30 && uploadProgress < 60 && 'Extracting text...'}
                {uploadProgress >= 60 && uploadProgress < 80 && 'Analyzing content...'}
                {uploadProgress >= 80 && 'Enhancing content...'}
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleDirectTextSubmit} className="direct-input-form">
          <textarea
            value={directText}
            onChange={(e) => setDirectText(e.target.value)}
            placeholder="Enter your notes or text from a whiteboard here..."
            rows={8}
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #ced4da', 
              borderRadius: '6px', 
              fontSize: '16px', 
              resize: 'vertical', 
              marginBottom: '15px' 
            }}
          />
          <button 
            type="submit" 
            disabled={isLoading || !directText.trim()} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#4a6cf7', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '16px', 
              fontWeight: 500, 
              cursor: isLoading || !directText.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !directText.trim() ? 0.7 : 1
            }}
          >
            {isLoading ? 'Enhancing...' : 'Enhance Text'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ImageUploader;