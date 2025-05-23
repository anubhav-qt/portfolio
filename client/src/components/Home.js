import React from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative px-4 sm:px-6 pt-16 sm:pt-20 home-adjust">
      <motion.div 
        className="text-white text-center w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Name with reduced margin bottom */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">Anubhav Joshi</h1>
        
        {/* Personal details with icons - improved mobile layout */}
        <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 mb-4">
          <div className="flex items-center">
            <FaBriefcase className="mr-2 text-gray-300" />
            <span className="text-gray-300">AI Engineer</span>
          </div>
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
        
        {/* Social Media Icons below personal details */}
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://github.com/anubhav-qt" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/anubhav-qt" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.14-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
          </a>
          <a href="https://leetcode.com/u/anubhav_qt" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 a5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
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
