import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Experience from './Experience';
import Projects from './Projects';
import TechStack from './TechStack';
// Import will be uncommented when blogs feature is ready
// import Blogs from './Blogs';

const SectionToggle = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState('experience');

  // Toggle options - blogs section commented out until fully done
  const toggleOptions = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech-stack', label: 'Tech Stack' },
    // { id: 'blogs', label: 'Blogs' }, // Will be uncommented when ready
  ];

  return (
    <section id="experience" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Toggle buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-black border border-white rounded-full p-1">
            {toggleOptions.map((option) => (
              <button
                key={option.id}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                  activeSection === option.id
                    ? 'bg-white text-black font-bold'
                    : 'text-white hover:text-gray-300'
                }`}
                onClick={() => setActiveSection(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content sections with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Render the active section */}
            {activeSection === 'experience' && <Experience hideTitle={true} />}
            {activeSection === 'projects' && <Projects hideTitle={true} />}
            {activeSection === 'tech-stack' && <TechStack hideTitle={true} />}
            {/* Blogs section will be enabled when the feature is ready */}
            {/* {activeSection === 'blogs' && <Blogs hideTitle={true} />} */}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SectionToggle;