import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "AI Engineer Intern",
    company: "Blinkadz",
    period: "Jan 2025 - April 2025",
    description: "Delivered core features with Next.js, built a FastAPI/Firebase microservice increasing pipeline throughput by 45%, automated LinkedIn campaign workflows via Marketing API reducing setup time by 85%, and developed Playwright tests improving coverage to 90%. Created a 12-agent orchestration system with Google ADK, cutting video-ad creation time by 95%.",
    side: "left"
  },
  {
    title: "Vice Chair",
    company: "IEEE GRSS",
    period: "September 2024 - Jan 2025",
    description: "Led initiatives for the Geoscience & Remote Sensing Society IEEE chapter, organizing technical workshops, coordinating research presentations, and facilitating collaboration between academia and industry.",
    side: "right"
  }
];

const ExperienceItem = ({ title, company, period, description, side }) => {
  return (
    <motion.div 
      className={`mb-12 ${side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
      style={{ 
        width: '100%',
        '@media (min-width: 768px)': { width: '45%' }
      }}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-black p-6 border border-white rounded-md`}>
        <h3 className={`text-xl font-bold text-white ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{title}</h3>
        <h4 className={`text-lg text-gray-300 mb-2 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{company}</h4>
        <p className={`text-sm text-gray-400 mb-4 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{period}</p>
        <p className={`text-gray-200 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>{description}</p>
      </div>
    </motion.div>
  );
};

const Experience = ({ hideTitle }) => {
  return (
    <div className="w-full">
      {!hideTitle && (
        <h2 className="text-4xl font-bold text-center text-white mb-16">Experience</h2>
      )}
      
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white"></div>
        
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
};

// For standalone section rendering
export const ExperienceSection = () => {
  return (
    <section id="experience" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <Experience />
      </div>
    </section>
  );
};

export default Experience;
