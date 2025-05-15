import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "NoteFlow",
    link: "github.com/anubhav-qt/noteflow_new",
    tech: "React, Express, Firebase, Gemini and GPT-4o",
    description: "AI-powered system generating well-structured notes with diagrams and flow-charts from textual or handwritten input. Optimized diagram generation pipeline processed in parallel, reducing processing time by 80%.",
    side: "left"
  },
  {
    title: "Moody",
    link: "github.com/anubhav-qt/moody",
    tech: "Typescript, Python (TensorFlow and Flask), Firebase, React and Express",
    description: "AI-powered music recommender analyzing Spotify listening history for personalized playlist generation. Searches through 114K+ songs with KNN algorithm and cosine similarity on neural embeddings to suggest taste-aligned tracks, combining content-based and mood filtering with a vector database.",
    side: "right"
  },
  {
    title: "Expense Tracker",
    link: "github.com/anubhav-qt/personal-tracker",
    tech: "Typescript, Supabase, PostgreSQL, Recharts, Gemini, React and Express",
    description: "Intuitive expense tracking system with multi-timeframe analytics across weekly, monthly, and all-time views. Integrated Recharts visualizations with PostgreSQL backend and Gemini AI-powered financial insights, improving budgeting accuracy and user retention by 30%.",
    side: "left"
  }
];

const ProjectItem = ({ title, link, tech, description, side }) => {
  return (
    <motion.div 
      className={`mb-16 ${side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
      style={{ 
        width: '100%',
        '@media (min-width: 768px)': { width: '45%' }
      }}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-black p-6 border border-white rounded-lg overflow-hidden`}>
        <h3 className={`text-xl font-bold text-white ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{title}</h3>
        {link && (
          <a 
            href={`https://${link}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-sm text-blue-400 hover:underline mb-2 block ${side === 'left' ? 'md:text-right' : 'text-left'}`}
          >
            {link}
          </a>
        )}
        <p className={`text-sm text-gray-400 mb-3 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{tech}</p>
        <p className={`text-gray-200 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{description}</p>
      </div>
    </motion.div>
  );
};

const Projects = ({ hideTitle }) => {
  return (
    <div className="w-full">
      {!hideTitle && (
        <h2 className="text-4xl font-bold text-center text-white mb-16">Projects</h2>
      )}
      
      <div className="relative">
        {/* Vertical line only visible on medium screens and up */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white"></div>
        
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

// For standalone section rendering
export const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <Projects />
      </div>
    </section>
  );
};

export default Projects;
