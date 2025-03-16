import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StickMan = ({ scrollY, isScrolling, scrollDirection, mousePosition }) => {
  // State variables to track position and animation states
  const [onVerticalLine, setOnVerticalLine] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState('home'); // 'home', 'experience', 'projects', 'contact'
  const [atBottom, setAtBottom] = useState(false);
  const [betweenSections, setBetweenSections] = useState(false);
  
  const monsterRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Track sections for position detection
  useEffect(() => {
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');
    
    experienceSectionRef.current = experienceSection;
    projectsSectionRef.current = projectsSection;
    contactSectionRef.current = contactSection;
  }, []);

  // Determine current section based on scroll position
  useEffect(() => {
    const determineSection = () => {
      const windowHeight = window.innerHeight;
      const experienceTop = experienceSectionRef.current?.offsetTop || 0;
      const projectsTop = projectsSectionRef.current?.offsetTop || 0;
      const contactTop = contactSectionRef.current?.offsetTop || 0;
      
      // Calculate positions with some buffer for transitions
      const expPosition = experienceTop - windowHeight / 3;
      const projPosition = projectsTop - windowHeight / 3;
      const contactPosition = contactTop - windowHeight / 2;
      
      // Determine if between sections (gap between experience and projects)
      const expBottom = projectsTop - 100;
      setBetweenSections(scrollY > expBottom && scrollY < projPosition);
      
      // Determine current section
      if (scrollY < expPosition) {
        return 'home';
      } else if (scrollY < projPosition) {
        return 'experience';
      } else if (scrollY < contactPosition) {
        return 'projects';
      } else {
        setAtBottom(true);
        return 'contact';
      }
    };

    const newSection = determineSection();
    
    if (newSection !== currentSection) {
      // About to change section - initiate jump animation
      setIsJumping(true);
      setTimeout(() => {
        setCurrentSection(newSection);
        setIsJumping(false);
        
        // If we're going to the contact section, we're not on the line
        if (newSection === 'contact') {
          setOnVerticalLine(false);
        } else if (newSection !== 'home') {
          setOnVerticalLine(true);
        }
      }, 500); // Duration of jump animation
    }
    
    // Reset to home state when back at top
    if (scrollY <= 50) {
      setOnVerticalLine(false);
      setAtBottom(false);
    } else if (!onVerticalLine && scrollY > 50 && currentSection !== 'contact' && !isJumping) {
      // Jump onto line when scrolling starts (if not already jumping)
      setIsJumping(true);
      setTimeout(() => {
        setOnVerticalLine(true);
        setIsJumping(false);
      }, 500);
    }
  }, [scrollY, currentSection, onVerticalLine, isJumping]);

  // Handle eye movement to track cursor when not scrolling
  useEffect(() => {
    if (!isScrolling && monsterRef.current && !isJumping) {
      const monsterRect = monsterRef.current.getBoundingClientRect();
      const monsterCenterX = monsterRect.left + monsterRect.width / 2;
      const monsterCenterY = monsterRect.top + monsterRect.height / 2;
      
      const deltaX = mousePosition.x - monsterCenterX;
      const deltaY = mousePosition.y - monsterCenterY;
      
      // Calculate distance from center and normalize
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 5; // Maximum eye movement in pixels
      
      // Normalize and limit eye movement
      let moveX = 0;
      let moveY = 0;
      
      if (distance > 0) {
        moveX = (deltaX / distance) * Math.min(distance * 0.1, maxDistance);
        moveY = (deltaY / distance) * Math.min(distance * 0.1, maxDistance);
      }
      
      setEyePosition({ x: moveX, y: moveY });
    } else {
      // Center eye when scrolling
      setEyePosition({ x: 0, y: 0 });
    }
  }, [mousePosition, isScrolling, isJumping]);

  // Calculate vertical position for the character
  const calculateVerticalPosition = () => {
    // If at the bottom (contact section), position near Dive Deeper button
    if (atBottom) {
      return 'auto';
    }
    
    // When on vertical line, position is based on scroll within the section
    if (onVerticalLine) {
      if (currentSection === 'experience') {
        const experienceTop = experienceSectionRef.current?.offsetTop || 0;
        const experienceHeight = experienceSectionRef.current?.offsetHeight || 0;
        const relativePosition = scrollY - experienceTop;
        const percentScroll = Math.min(Math.max(relativePosition / experienceHeight, 0), 0.8);
        
        return `${30 + percentScroll * 40}%`;
      } else if (currentSection === 'projects') {
        const projectsTop = projectsSectionRef.current?.offsetTop || 0;
        const projectsHeight = projectsSectionRef.current?.offsetHeight || 0;
        const relativePosition = scrollY - projectsTop;
        const percentScroll = Math.min(Math.max(relativePosition / projectsHeight, 0), 0.8);
        
        return `${30 + percentScroll * 40}%`;
      }
    }
    
    return '80%'; // Default position
  };

  // Calculate horizontal position for the character
  const calculateHorizontalPosition = () => {
    if (atBottom) {
      return '70%'; // Position next to Dive Deeper button
    }
    
    if (betweenSections) {
      return '50%'; // Stay centered but at the bottom of experience section
    }
    
    return '50%'; // Default centered
  };

  // Position style for the monster ball - with improved centering
  const positionStyle = {
    position: 'fixed',
    top: calculateVerticalPosition(),
    left: calculateHorizontalPosition(),
    bottom: atBottom ? '20vh' : 'auto',
    transform: 'translate(-50%, -50%)',
    zIndex: 30
  };

  return (
    <>
      {/* MonsterBall Character */}
      <motion.div 
        ref={monsterRef}
        style={positionStyle}
        animate={{
          y: isJumping ? [0, -30, 0] : 0,
          scale: isJumping ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          duration: isJumping ? 0.5 : 0.2,
          type: "spring",
          stiffness: 300
        }}
      >
        {/* "You are here" indicator - repositioned to be centered above the ball */}
        {!onVerticalLine && !atBottom && !isJumping && currentSection === 'home' && (
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            style={{ top: "-40px" }} // Fixed position above the ball
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-xs mb-1 whitespace-nowrap">You are here</div>
            <div className="arrow-down w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-solid border-l-transparent border-r-transparent border-t-white"></div>
          </motion.div>
        )}
        
        {/* MonsterBall SVG */}
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          {/* Ball body */}
          <circle cx="30" cy="30" r="28" fill="white" stroke="black" strokeWidth="1" />
          
          {/* Eye */}
          <g>
            <circle cx="30" cy="30" r="12" fill="black" />
            <motion.circle 
              cx={30 + eyePosition.x} 
              cy={30 + eyePosition.y} 
              r="6" 
              fill="white" 
              animate={{ cx: 30 + eyePosition.x, cy: 30 + eyePosition.y }}
              transition={{ duration: 0.1 }}
            />
          </g>
          
          {/* Arms - animate based on scroll state */}
          <motion.path
            d="M 10,30 Q 0,15 -10,20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="transparent"
            animate={{
              d: isScrolling 
                ? scrollDirection === 'down' 
                  ? ["M 10,30 Q 0,15 -10,20", "M 10,30 Q 0,25 -10,30", "M 10,30 Q 0,15 -10,20"]
                  : ["M 10,30 Q 0,15 -10,20", "M 10,30 Q 0,5 -15,10", "M 10,30 Q 0,15 -10,20"]
                : betweenSections 
                  ? ["M 10,30 Q 0,15 -10,20", "M 10,30 Q 0,40 -15,35", "M 10,30 Q 0,15 -10,20", "M 10,30 Q -5,20 -15,10", "M 10,30 Q 0,15 -10,20"]
                  : "M 10,30 Q 0,15 -10,20"
            }}
            transition={{ 
              duration: betweenSections ? 0.3 : 0.5, 
              repeat: (isScrolling || betweenSections) ? Infinity : 0,
              ease: "easeInOut"
            }}
            style={{ translateX: "-5px" }}
          />
          
          <motion.path
            d="M 50,30 Q 60,15 70,20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="transparent"
            animate={{
              d: isScrolling 
                ? scrollDirection === 'down' 
                  ? ["M 50,30 Q 60,15 70,20", "M 50,30 Q 60,25 70,30", "M 50,30 Q 60,15 70,20"] 
                  : ["M 50,30 Q 60,15 70,20", "M 50,30 Q 60,5 75,10", "M 50,30 Q 60,15 70,20"]
                : betweenSections 
                  ? ["M 50,30 Q 60,15 70,20", "M 50,30 Q 60,40 75,35", "M 50,30 Q 60,15 70,20", "M 50,30 Q 65,20 75,10", "M 50,30 Q 60,15 70,20"]
                  : "M 50,30 Q 60,15 70,20"
            }}
            transition={{ 
              duration: betweenSections ? 0.3 : 0.5, 
              repeat: (isScrolling || betweenSections) ? Infinity : 0,
              ease: "easeInOut"
            }}
            style={{ translateX: "5px" }}
          />
        </svg>
      </motion.div>
    </>
  );
};

export default StickMan;
