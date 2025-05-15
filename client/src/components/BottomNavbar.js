import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaFileAlt, FaEnvelope, FaRobot } from 'react-icons/fa';
import { RiTerminalBoxFill } from 'react-icons/ri';

const BottomNavbar = ({ onDiveDeeper, onChatToggle }) => {
  const [showModal, setShowModal] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle dive deeper confirmation
  const handleDiveDeeper = () => {
    setShowModal(false);
    onDiveDeeper();
  };

  return (
    <>
      {/* Fixed bottom navbar - with improved centering */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-40 pointer-events-none">
        <motion.div 
          className="bg-black bg-opacity-80 backdrop-blur-md rounded-full border border-white px-5 py-3 shadow-lg pointer-events-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-8 sm:space-x-10">
            {/* Info icon - Navigate to Experience */}
            <button
              onClick={() => scrollToSection('experience')}
              className="text-white hover:text-blue-400 transition-colors duration-300 p-2"
              aria-label="Information"
              title="About Me"
            >
              <FaInfoCircle className="text-xl sm:text-2xl" />
            </button>
            
            {/* Robot icon (replacing Sparkle icon) - Chat with Bob */}
            <button
              onClick={onChatToggle}
              className="text-white hover:text-yellow-400 transition-colors duration-300 p-2"
              aria-label="AI Bot"
              title="Chat with Bob"
            >
              <FaRobot className="text-xl sm:text-2xl" />
            </button>

            {/* Contact icon - Navigate to Contact */}
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-red-400 transition-colors duration-300 p-2"
              aria-label="Contact Me"
              title="Contact Me"
            >
              <FaEnvelope className="text-xl sm:text-2xl" />
            </button>
            
            {/* Terminal icon - More professional for mystery feature */}
            <button
              onClick={toggleModal}
              className="text-white hover:text-purple-400 transition-colors duration-300 p-2"
              aria-label="Terminal access"
              title="Terminal Access"
            >
              <RiTerminalBoxFill className="text-xl sm:text-2xl" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={() => setShowModal(false)}
          ></div>
          <motion.div 
            className="bg-black border-2 border-white rounded-lg p-6 max-w-md mx-4 z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Do you want to dive deeper?</h3>
            <p className="text-gray-300 mb-6">
              Prepare to enter the terminal interface with advanced features.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDiveDeeper}
                className="px-5 py-2 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
              >
                No, take me back
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BottomNavbar;