import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tech skills data - grouped by category
const techSkills = {
  "Languages": [
    "Python", "C++", "C", "TypeScript", "JavaScript", "SQL"
  ],
  "AI/ML": [
    "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning", 
    "Generative AI", "LLMs", "Transformer Architecture", "LLM Orchestration",
    "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "LangChain", 
    "Google Agent Development Kit", "Gemini API", "Vector Databases",
    "Pandas", "NumPy", "Seaborn", "Matplotlib", "Plotly"
  ],
  "Software Engineering": [
    "Full Stack Development", "Microservices", "API Design", "API Integration",
    "React", "React Native", "Expo", "Next.js", "Node.js", "Express", "Flask",
    "Docker", "Git", "GitHub", "Linux", "GCP", "Render", "Firebase", "Supabase",
    "Playwright", "Selenium"
  ],
  "Databases": [
    "BigQuery", "PostgreSQL", "MongoDB", "MySQL"
  ]
};

// Hardcoded positions for the "Show All" view - skills with similarity are positioned closer together
const skillPositions = {
  // Languages
  "Python": { x: 15, y: 15 },
  "C++": { x: 28, y: 15 },
  "C": { x: 30, y: 25 },
  "TypeScript": { x: 18, y: 35 },
  "JavaScript": { x: 10, y: 38 },
  "SQL": { x: 24, y: 40 },
  
  // AI/ML - clustered on left side
  "Deep Learning": { x: 20, y: 55 },
  "NLP": { x: 10, y: 65 },
  "Computer Vision": { x: 25, y: 65 },
  "Reinforcement Learning": { x: 15, y: 75 },
  "Generative AI": { x: 10, y: 80 },
  "LLMs": { x: 22, y: 72 },
  "Transformer Architecture": { x: 32, y: 68 },
  "LLM Orchestration": { x: 30, y: 55 },
  "TensorFlow": { x: 8, y: 50 },
  "Keras": { x: 18, y: 47 },
  "Scikit-learn": { x: 22, y: 82 },
  "OpenCV": { x: 30, y: 78 },
  "LangChain": { x: 12, y: 85 },
  "Google Agent Development Kit": { x: 30, y: 88 },
  "Gemini API": { x: 24, y: 85 },
  "Vector Databases": { x: 18, y: 60 },
  "Pandas": { x: 38, y: 60 },
  "NumPy": { x: 38, y: 50 },
  "Seaborn": { x: 35, y: 40 },
  "Matplotlib": { x: 32, y: 32 },
  "Plotly": { x: 38, y: 25 },
  
  // Software Engineering - clustered on right side
  "Full Stack Development": { x: 68, y: 15 },
  "Microservices": { x: 70, y: 28 },
  "API Design": { x: 60, y: 20 },
  "API Integration": { x: 58, y: 30 },
  "React": { x: 72, y: 38 },
  "React Native": { x: 70, y: 45 },
  "Expo": { x: 62, y: 42 },
  "Next.js": { x: 78, y: 40 },
  "Node.js": { x: 82, y: 25 },
  "Express": { x: 88, y: 30 },
  "Flask": { x: 55, y: 40 },
  "Docker": { x: 65, y: 55 },
  "Git": { x: 75, y: 60 },
  "GitHub": { x: 82, y: 58 },
  "Linux": { x: 60, y: 65 },
  "GCP": { x: 72, y: 70 },
  "Render": { x: 65, y: 75 },
  "Firebase": { x: 58, y: 80 },
  "Supabase": { x: 68, y: 82 },
  "Playwright": { x: 80, y: 80 },
  "Selenium": { x: 85, y: 70 },
  
  // Databases - bottom right corner
  "BigQuery": { x: 88, y: 82 },
  "PostgreSQL": { x: 78, y: 88 },
  "MongoDB": { x: 90, y: 88 },
  "MySQL": { x: 82, y: 85 }
};

// Generate random positions for when a specific category is selected
const generateRandomPositions = (skills) => {
  const positions = {};
  const usedPositions = [];
  
  // Check if a position overlaps with any existing position
  const checkOverlap = (x, y, width) => {
    for (const pos of usedPositions) {
      // Calculate distance between centers
      const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
      // Check if there would be overlap considering the widths
      if (distance < (width / 2 + pos.width / 2 + 5)) return true; // Added 5% extra padding between skills
    }
    return false;
  };

  // Estimate the width of text based on character length
  const estimateTextWidth = (text) => {
    // More accurate estimation based on text length
    // Shorter text needs minimum width, longer text scales more aggressively
    const baseWidth = 10; // Minimum width for any skill
    const charWidth = 1.8; // Width per character (as percentage)
    
    return Math.max(baseWidth, Math.min(30, text.length * charWidth));
  };
  
  skills.forEach(skill => {
    let x, y;
    let attempts = 0;
    
    // Estimate width based on text length
    const textWidth = estimateTextWidth(skill);
    
    do {
      // Much more conservative boundaries to prevent overflow
      // For mobile especially, we need to stay further from edges
      
      // Horizontal boundaries: Keep safe distance from edges based on text width
      const safeMargin = textWidth / 2 + 5; // Add 5% extra safety margin
      const minX = safeMargin;
      const maxX = 100 - safeMargin;
      
      // Keep x between minX and maxX
      x = minX + Math.random() * (maxX - minX);
      
      // Vertical positions can use more of the available space
      y = 15 + Math.random() * 70; // 15% to 85% of height
      
      attempts++;
      
      // If we can't find a non-overlapping position after many attempts, reduce constraints
      if (attempts > 150) {
        // After many failed attempts, just place it somewhere reasonable
        // but still respect the edge boundaries
        x = minX + Math.random() * (maxX - minX);
        break;
      }
    } while (checkOverlap(x, y, textWidth));
    
    positions[skill] = { x, y };
    usedPositions.push({ x, y, width: textWidth });
  });
  
  return positions;
};

const TechStack = ({ hideTitle }) => {
  const [category, setCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [randomPositions, setRandomPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile and set default category
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Set default category to "Languages" on mobile
      if (mobile && !category) {
        setCategory("Languages");
        setRandomPositions(generateRandomPositions(techSkills["Languages"] || []));
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [category]);
  
  // Handle category selection
  const selectCategory = (cat) => {
    if (cat === category) {
      // If clicking the same category again and not on mobile, reset to show all
      if (!isMobile) {
        setCategory(null);
      }
    } else {
      // Generate random positions when selecting a new category
      setCategory(cat);
      setRandomPositions(generateRandomPositions(techSkills[cat] || []));
    }
    setHoveredSkill(null);
    setHoveredCategory(null);
  };
  
  // Get all skills or filtered by category
  const visibleSkills = category ? techSkills[category] : Object.values(techSkills).flat();
  
  // Get position for a skill
  const getSkillPosition = (skill) => {
    if (category) {
      return randomPositions[skill] || { x: 50, y: 50 };
    } else {
      return skillPositions[skill] || { x: 50, y: 50 };
    }
  };

  // Check if a skill should be highlighted based on category hover
  const isSkillHighlighted = (skill) => {
    // If a specific skill is hovered, only highlight that one
    if (hoveredSkill === skill) return true;
    
    // If showing all skills and a category is hovered, highlight all skills in that category
    if (!category && hoveredCategory && techSkills[hoveredCategory].includes(skill)) {
      return true;
    }
    
    return false;
  };

  // Create a mobile list view for skills
  const MobileSkillsListView = () => {
    return (
      <div className="w-full h-[500px] bg-black border border-gray-800 rounded-lg overflow-y-auto">
        {/* If showing all skills on mobile (shouldn't happen but just in case), group them by category */}
        {!category ? (
          // Group by category view
          Object.keys(techSkills).map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="text-white text-lg font-semibold border-b border-gray-700 pb-2 mb-3 px-4">{cat}</h3>
              <div className="flex flex-wrap gap-2 px-4">
                {techSkills[cat].map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-md border border-gray-700 text-white text-xs"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Single category view - show in a grid-like list
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {techSkills[category].map((skill) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1.5 rounded-md border border-gray-700 text-white text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full">
      {!hideTitle && (
        <h2 className="text-4xl font-bold text-center text-white mb-16">Tech Stack</h2>
      )}

      {/* Skills Map */}
      <motion.div
        className="border border-white rounded-lg p-6 overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          {Object.keys(techSkills).map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                category === cat 
                  ? 'bg-white text-black' 
                  : 'bg-black text-white border border-white hover:bg-gray-900'
              }`}
              onClick={() => selectCategory(cat)}
              onMouseEnter={() => !category && !isMobile && setHoveredCategory(cat)}
              onMouseLeave={() => !category && !isMobile && setHoveredCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
          {/* Only show "Show All" button if not on mobile and a category is selected */}
          {category && !isMobile && (
            <motion.button
              className="px-4 py-2 rounded-full text-sm bg-black text-white border border-white hover:bg-gray-900"
              onClick={() => setCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show All
            </motion.button>
          )}
        </div>

        {/* Instruction text - show different instruction based on view mode */}
        <div className="text-center text-xs text-gray-400 mb-4">
          {!category && !isMobile
            ? "Hover the category to highlight skills in the same cluster | Click buttons to filter by category" 
            : "Click buttons to filter by category"}
        </div>
        
        {/* Show different views based on device type */}
        {isMobile ? (
          // Mobile list view
          <MobileSkillsListView />
        ) : (
          // Desktop spatial view
          <div className="relative w-full h-[500px] bg-black overflow-hidden border border-gray-800 rounded-lg">
            {/* Skills */}
            <div className="absolute inset-0">
              {visibleSkills.map((skill) => {
                const position = getSkillPosition(skill);
                const highlighted = isSkillHighlighted(skill);
                
                return (
                  <motion.div
                    key={skill}
                    className={`absolute px-3 py-1.5 rounded-md border transition-all duration-300 ${
                      highlighted 
                        ? 'bg-white text-black border-white z-20' 
                        : 'bg-black text-white border-gray-700'
                    }`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: highlighted ? 1 : (hoveredCategory && !techSkills[hoveredCategory].includes(skill) ? 0.3 : 1), 
                      scale: highlighted ? 1.2 : 1,
                      zIndex: highlighted ? 10 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span className="whitespace-nowrap text-xs">
                      {skill}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// For standalone section rendering
export const TechStackSection = () => {
  return (
    <section id="tech-stack" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <TechStack />
      </div>
    </section>
  );
};

export default TechStack;
