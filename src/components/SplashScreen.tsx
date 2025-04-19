import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 z-50">
      <img
        src="https://i.postimg.cc/rF5m6307/image.png"
        alt="ScribeLens Logo"
        className="w-48 h-48 mb-8 animate-bounce"
        style={{ maxWidth: 240, maxHeight: 240 }}
      />
      <h1 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow-lg">ScribeLens</h1>
      <p className="text-lg text-blue-600 font-medium mb-6">Transforming notes into clear understanding</p>
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-200 h-12 w-12 mb-4 animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
