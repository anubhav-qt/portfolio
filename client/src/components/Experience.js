import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: "SDE Intern",
    company: "Blinkadz",
    period: "Jan 2025 - Present",
    description: "I contributed to enhancing their web presence and marketing capabilities. I upgraded the website using Next.js and Firebase, integrated the LinkedIn Marketing API for automated ad campaigns, and implemented automated testing with Playwright to ensure stability. This involved collaborating in an Agile environment, strengthening Git skills, and optimizing development workflows, all while balancing a full-time college schedule.",
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
      <div className={`bg-black p-6 border border-white rounded-md ${side === 'right' ? 'text-left' : 'md:text-right'}`}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <h4 className="text-lg text-gray-300 mb-2">{company}</h4>
        <p className="text-sm text-gray-400 mb-4">{period}</p>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Experience</h2>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white"></div>
          
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
