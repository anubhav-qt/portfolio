import React from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative px-4 sm:px-6 pt-16 sm:pt-20 home-adjust">
      <motion.div 
        className="text-white text-center w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">Anubhav Joshi</h1>
        <h2 className="text-2xl md:text-3xl mb-4">AI Engineer</h2>
        
        {/* Personal details with icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
          <div className="flex items-center">
            <HiLocationMarker className="mr-2 text-gray-300" />
            <span className="text-gray-300">Rajasthan, India</span>
          </div>
          <div className="flex items-center">
            <MdEmail className="mr-2 text-gray-300" />
            <a href="mailto:magicalfizz@gmail.com" className="text-gray-300 hover:text-white">magicalfizz@gmail.com</a>
          </div>
          <div className="flex items-center">
            <FaGraduationCap className="mr-2 text-gray-300" />
            <span className="text-gray-300">B.Tech'26</span>
          </div>
        </div>
        
        <p className="text-xl mb-10">
        AI Engineer specializing in Natural Language Processing, Computer Vision, and Reinforcement Learning, combining strong software engineering skills (full-stack, microservices, APIs) with a solid foundation in core CS and DSA.
        </p>
        
        {/* Removed horizontal rule and adjusted spacing */}
        <motion.p 
          className="mt-4 pb-20 text-base sm:text-lg opacity-75" 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Home;
