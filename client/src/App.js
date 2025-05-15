import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import Home from './components/Home';
import SectionToggle from './components/SectionToggle';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import ChatbotModal from './components/ChatbotModal';
import BlogEditor from './components/BlogEditor';
import BlogView from './components/BlogView';
import { BlogsSection } from './components/Blogs';
import './App.css';

// Memoize the MainContent component to prevent re-renders when chatbot state changes
const MainContent = memo(({ onDiveDeeper, onChatToggle }) => (
  <div className="content">
    <BottomNavbar onDiveDeeper={onDiveDeeper} onChatToggle={onChatToggle} />
    <Home />
    <SectionToggle />
    <Contact />
  </div>
));

function App() {
  const [terminalMode, setTerminalMode] = useState(false);
  const [staticEffect, setStaticEffect] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  
  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === 'development';
  
  // Handle "Dive Deeper" button click
  const handleDiveDeeper = () => {
    setStaticEffect(true);
    setTimeout(() => {
      setStaticEffect(false);
      setTerminalMode(true);
    }, 2000);
  };

  // Exit terminal mode
  const exitTerminal = () => {
    setStaticEffect(true);
    setTimeout(() => {
      setStaticEffect(false);
      setTerminalMode(false);
    }, 2000);
  };

  // Toggle chatbot modal
  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <Router>
      <div className="App bg-black text-white min-h-screen">
        <AnimatePresence>
          {staticEffect && (
            <motion.div 
              className="static-effect fixed inset-0 z-50 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="static-lines"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {terminalMode ? (
          <Terminal exitTerminal={exitTerminal} />
        ) : (
          <Routes>
            {/* Main portfolio page */}
            <Route path="/" element={
              <MainContent 
                onDiveDeeper={handleDiveDeeper} 
                onChatToggle={toggleChatbot} 
              />
            } />
            
            {/* Blog routes */}
            <Route path="/blogs" element={<BlogsSection />} />
            <Route path="/blog/:slug" element={<BlogView />} />
            
            {/* Blog editor - only accessible in development */}
            <Route 
              path="/blog/new" 
              element={isDev ? <BlogEditor /> : <Navigate to="/" />} 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        
        {/* Chatbot modal is kept separate from the main component tree */}
        <ChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
