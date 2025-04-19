import { motion } from 'framer-motion';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { Toast } from './components/ui/Toast';
import AISummaryQA from './components/AISummaryQA';
import ResultsPage from './pages/ResultsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultsDemo from './components/ResultsDemo';
import MindMapPage from './pages/MindMapPage';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col relative">
        {showSplash && <SplashScreen />}
        <div className={showSplash ? 'pointer-events-none opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          <Header />
          <motion.main {...fadeInUp} className="flex-grow">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <HowItWorks />
                  <ResultsDemo enhancedText="Example enhanced text" originalText="Example original text" />
                  <Features />
                  <AISummaryQA />
                  <Testimonials />
                  <CallToAction />
                </>
              } />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/mindmap" element={<MindMapPage />} />
            </Routes>
          </motion.main>
          <Footer />
          <Toast />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;