import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative px-4 sm:px-6 pt-16 sm:pt-20">
      <motion.div 
        className="text-white text-center w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">Hello, I'm Anubhav</h1>
        <h2 className="text-3xl md:text-4xl mb-8">Data Scientist & Full-Stack Developer</h2>
        <p className="text-xl mb-10">
        A data scientist skilled in developing AI-driven solutions using machine learning, deep learning, and NLP, with expertise in Python and data visualization, complemented by full-stack web development skills.
        </p>
        <div className="border-b border-white w-24 mx-auto"></div>
        <motion.p 
          className="mt-8 sm:mt-10 text-base sm:text-lg opacity-75"
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
