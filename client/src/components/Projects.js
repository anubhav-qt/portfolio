import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "NoteFlow",
    tech: "React, Express, Javascript, Gemini, Flux",
    description: "Generates custom, well-structured notes with diagrams, flow-charts, and graphs based on user's textual or handwritten input.",
    side: "left"
  },
  {
    title: "Deforestation Monitoring",
    tech: "Google Earth Engine, Python, Machine Learning, Deep Learning",
    description: "Earth Observation system to monitor and predict deforestation trends using Sentinel-2 and Landsat-8 imagery for vegetation analysis and change detection.",
    side: "right"
  },
  {
    title: "ResNet",
    tech: "Python, Django, Javascript, Google Maps API",
    description: "Comprehensive disaster management and response website for India with AI-driven predictions and notifications for locating shelters and geofencing areas based on danger levels.",
    side: "left"
  },
  {
    title: "Expense Tracker",
    tech: "React, Express, Gemini, Tableau, PostgreSQL",
    description: "User-friendly expense tracking and budgeting website with AI chatbot assistance, visualization dashboards, and comprehensive expenditure analysis.",
    side: "right"
  }
];

const ProjectItem = ({ title, tech, description, side }) => {
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
      <div className={`bg-black p-6 border border-white rounded-lg overflow-hidden ${side === 'right' ? 'text-left' : 'md:text-right'}`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{tech}</p>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Projects</h2>
        
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
    </section>
  );
};

export default Projects;
