import { BookOpen, Camera, Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">ScribeLens</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">Home</a>
          <a href="#how-it-works" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">How It Works</a>
          <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">About</a>
          <a href="/mindmap" className="text-gray-800 hover:text-purple-600 font-medium transition-colors">Mind Map</a>
        </nav>
        <button
          className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => {
            const hero = document.getElementById('hero');
            if (hero) hero.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Camera className="h-5 w-5 mr-2" />
          Try Now
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#how-it-works" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">How It Works</a>
            <a href="#about" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="/mindmap" className="text-gray-800 hover:text-purple-600 font-medium transition-colors">Mind Map</a>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors w-full justify-center"
              onClick={() => {
                const hero = document.getElementById('hero');
                if (hero) hero.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Camera className="h-5 w-5 mr-2" />
              Try Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;