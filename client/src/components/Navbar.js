import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation links
  const navLinks = [
    { title: 'Home', id: '' }, // Empty id scrolls to top
    { title: 'Experience', id: 'experience' },
    { title: 'Projects', id: 'projects' },
    { title: 'Tech_Stack', id: 'tech-stack' },
    { title: 'Contact', id: 'contact' }
  ];

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle link click - smooth scroll to section
  const handleLinkClick = (id) => {
    setIsOpen(false);
    
    if (id === '') {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-black bg-opacity-70 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Name */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-xl"
        >
          Anubhav Joshi
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider"
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden bg-black bg-opacity-90 backdrop-blur-sm ${isOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className="text-white hover:text-gray-300 transition-colors w-full text-left py-2 text-sm uppercase tracking-wider"
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
