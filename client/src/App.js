import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNavbar from './components/BottomNavbar';
import Home from './components/Home';
import SectionToggle from './components/SectionToggle';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import './App.css';

function App() {
  const [terminalMode, setTerminalMode] = useState(false);
  const [staticEffect, setStaticEffect] = useState(false);
  
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

  return (
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
        <div className="content">
          <BottomNavbar onDiveDeeper={handleDiveDeeper} />
          <Home />
          <SectionToggle />
          <Contact />
        </div>
      )}
    </div>
  );
}

export default App;
