import React from 'react';
import { motion } from 'framer-motion';

// Tech stack data categorized
const techData = {
  "Programming Languages": [
    "Python",
    "TypeScript",
    "Go"
  ],
  "Libraries & Frameworks": [
    "Pandas",
    "NumPy",
    "MatPlotLib",
    "Seaborn",
    "Scikit-Learn",
    "TensorFlow", 
    "PyTorch",
    "Django",
    "Express",
    "React",
    "Node",
    "Zustand",
    "Zod",
    "Next.JS",
    "Tailwind CSS"
  ],
  "Databases": [
    "PostgreSQL",
    "MongoDB",
    "BigQuery"
  ],
  "Tools & Technologies": [
    "Selenium",
    "Playwright",
    "Tableau",
    "Git",
    "GitHub",
    "AWS",
    "Docker",
    "Kubernetes",
    "Firebase",
    "Google Earth Engine"
  ]
};

const TechStack = () => {
  return (
    <section id="tech-stack" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Tech Stack</h2>
        
        <div className="space-y-16">
          {Object.entries(techData).map(([category, technologies]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-center text-white mb-8">{category}</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="flex items-center justify-center p-4 border border-gray-700 rounded-lg bg-black hover:bg-gray-900 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-white text-center font-medium">{tech}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
