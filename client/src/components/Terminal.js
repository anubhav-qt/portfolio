import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ exitTerminal }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { text: '████████╗██╗  ██╗███████╗    ██╗   ██╗ ██████╗ ██╗██████╗ ', type: 'ascii-rgb' },
    { text: '╚══██╔══╝██║  ██║██╔════╝    ██║   ██║██╔═══██╗██║██╔══██╗', type: 'ascii-rgb' },
    { text: '   ██║   ███████║█████╗      ██║   ██║██║   ██║██║██║  ██║', type: 'ascii-rgb' },
    { text: '   ██║   ██╔══██║██╔══╝      ╚██╗ ██╔╝██║   ██║██║██║  ██║', type: 'ascii-rgb' },
    { text: '   ██║   ██║  ██║███████╗     ╚████╔╝ ╚██████╔╝██║██████╔╝', type: 'ascii-rgb' },
    { text: '   ╚═╝   ╚═╝  ╚═╝╚══════╝      ╚═══╝   ╚═════╝ ╚═╝╚═════╝ ', type: 'ascii-rgb' },
    { text: '', type: 'text' },
    { text: 'Welcome to the dark side.', type: 'text' },
    { text: 'Type "help" to see available commands.', type: 'text' },
    { text: '', type: 'text' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  
  // Add suggestions array for tab completion
  const allCommands = [
    'help', 'about', 'projects', 'research', 'contact', 
    'skills', 'education', 'experience', 'certifications', 'clear', 'exit', 'project',
    'achievements', 'goals', 'research-interests'
  ];
  
  const projectNames = [
    'noteflow', 'moody', 'expense-tracker', 'deforestation', 'resnet', 'catalyst', 'linkedin-api-integration'
  ];

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return [
          { text: 'Available commands:', type: 'text' },
          { text: '', type: 'text' },
          { text: 'help                  - Show available commands', type: 'text' },
          { text: 'about                 - Learn more about me', type: 'text' },
          { text: 'projects              - List all code projects', type: 'text' },
          { text: 'research              - View my research projects', type: 'text' },
          { text: 'contact               - View contact information', type: 'text' },
          { text: 'skills                - List my technical skills', type: 'text' },
          { text: 'education             - View my education details', type: 'text' },
          { text: 'experience            - View my professional experience', type: 'text' },
          { text: 'certifications        - View my certifications', type: 'text' },
          { text: 'achievements          - View my achievements', type: 'text' },
          { text: 'goals                 - View my future goals', type: 'text' },
          { text: 'research-interests    - View my research interests', type: 'text' },
          { text: 'clear                 - Clear the terminal', type: 'text' },
          { text: 'exit                  - Return to portfolio view', type: 'text' },
          { text: 'project [name]        - Show details about specific project', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    about: {
      description: 'Learn more about me',
      execute: () => {
        return [
          { text: '=== ABOUT ME ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: 'Name: Anubhav Joshi', type: 'text' },
          { text: 'Role: AI Engineer specializing in Machine Learning, NLP, and Reinforcement Learning', type: 'text' },
          { text: 'Location: Rajasthan, India', type: 'text' },
          { text: 'Education: B.Tech in AI & ML at Manipal University Jaipur (CGPA: 9.17)', type: 'text' },
          { text: '', type: 'text' },
          { text: 'I combine expertise in AI/ML with strong software engineering skills to build', type: 'text' },
          { text: 'robust systems and applications. My experience spans full-stack development,', type: 'text' },
          { text: 'microservices architecture, and API design, with particular focus on machine', type: 'text' },
          { text: 'learning pipelines and AI integration. I\'m passionate about creating innovative', type: 'text' },
          { text: 'solutions at the intersection of AI and practical applications.', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Recent achievements include automating LinkedIn marketing workflows, optimizing', type: 'text' },
          { text: 'AI processing pipelines, and implementing multi-agent systems that dramatically', type: 'text' },
          { text: 'reduce processing times for complex tasks.', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    projects: {
      description: 'List all code projects',
      execute: () => {
        return [
          { text: '=== CODE PROJECTS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '1. noteflow          - AI-powered note generation system with diagrams and charts', type: 'text' },
          { text: '2. moody             - Music recommender analyzing Spotify history for personalized playlists', type: 'text' },
          { text: '3. expense-tracker   - Intuitive expense tracking with AI-powered financial insights', type: 'text' },
          { text: '4. deforestation     - Earth observation system for monitoring deforestation trends', type: 'text' },
          { text: '5. resnet            - Disaster management and response website with AI predictions', type: 'text' },
          { text: '6. catalyst          - Ultimate study companion app (in development)', type: 'text' },
          { text: '7. linkedin-api-integration - Marketing API integration for automated campaign creation', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Type "project [name]" for more details about a specific project', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    research: {
      description: 'View my research projects',
      execute: () => {
        return [
          { text: '=== RESEARCH PROJECTS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '1. "Deforestation Monitoring using Earth Observation Systems"', type: 'text' },
          { text: '   - Developed a system analyzing Sentinel-2 and Landsat-8 imagery over 10 years', type: 'text' },
          { text: '   - Applied CNNs and Transformers for vegetation analysis and deforestation prediction', type: 'text' },
          { text: '   - Successfully identified and tracked deforestation hotspots across multiple regions', type: 'text' },
          { text: '   - Integrated with Google Earth Engine for large-scale geospatial analysis', type: 'text' },
          { text: '', type: 'text' },
          { text: '2. "AI-Driven Disaster Management Systems"', type: 'text' },
          { text: '   - Created prediction models for natural disaster response', type: 'text' },
          { text: '   - Integrated geofencing and Google Maps APIs for danger zone classification', type: 'text' },
          { text: '   - Developed real-time alert systems for emergency response coordination', type: 'text' },
          { text: '', type: 'text' },
          { text: '3. "AI Avatar and Video Generation Technologies"', type: 'text' },
          { text: '   - Researched underlying technologies of platforms like HeyGen/Synthesia', type: 'text' },
          { text: '   - Analyzed GANs, CNNs, DNNs, and Transformer architectures for video synthesis', type: 'text' },
          { text: '   - Evaluated 22+ LLMs for automatic, brand-personalized ad generation pipeline', type: 'text' },
          { text: '', type: 'text' },
          { text: '4. "Large Language Models Case Study"', type: 'text' },
          { text: '   - Comprehensive academic analysis of modern LLM architectures and capabilities', type: 'text' },
          { text: '   - Exploration of training methodologies, limitations, and ethical considerations', type: 'text' },
          { text: '', type: 'text' },
          { text: '5. "Novel Action Generation in Reinforcement Learning Agents"', type: 'text' },
          { text: '   - Thought experiment on developing RL agents capable of generating actions', type: 'text' },
          { text: '     beyond their predefined action space', type: 'text' },
          { text: '   - Theoretical exploration of emergent behaviors in complex RL environments', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    contact: {
      description: 'View contact information',
      execute: () => {
        return [
          { text: '=== CONTACT INFORMATION ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: 'Email: magicalfizz@gmail.com', type: 'text' },
          { text: 'GitHub: https://github.com/anubhav-qt', type: 'text' },
          { text: 'LinkedIn: https://www.linkedin.com/in/anubhav-qt', type: 'text' },
          { text: 'University: Manipal University Jaipur, Rajasthan, India', type: 'text' },
          { text: 'Department: Computer Science Engineering (AI & ML Specialization)', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    skills: {
      description: 'List my technical skills',
      execute: () => {
        return [
          { text: '=== TECHNICAL SKILLS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: 'Programming Languages:', type: 'subheading' },
          { text: 'Python, C++, C, TypeScript, JavaScript, SQL, Go', type: 'text' },
          { text: '', type: 'text' },
          { text: 'AI & Machine Learning:', type: 'subheading' },
          { text: 'Deep Learning, Natural Language Processing (NLP), Computer Vision (CV)', type: 'text' },
          { text: 'Reinforcement Learning (RL), Generative AI, Large Language Models (LLMs)', type: 'text' },
          { text: 'Transformer Architecture, LLM Orchestration, Vector Databases', type: 'text' },
          { text: 'TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV, LangChain', type: 'text' },
          { text: 'Google Agent Development Kit, Gemini API, Pandas, NumPy, Seaborn, Matplotlib, Plotly', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Software Engineering & MLOps:', type: 'subheading' },
          { text: 'Full Stack Development, Microservices, API Design, API Integration', type: 'text' },
          { text: 'MLOps, React, React Native, Expo, Next.js, Node.js, Express, Flask', type: 'text' },
          { text: 'Docker, Git, GitHub, Linux, Google Cloud Platform (GCP), Render', type: 'text' },
          { text: 'Firebase, Supabase, Playwright, Selenium', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Databases:', type: 'subheading' },
          { text: 'BigQuery, PostgreSQL, MongoDB, MySQL', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Other Technical:', type: 'subheading' },
          { text: 'Data Analysis, Version Control, Data Structures, Algorithms', type: 'text' },
          { text: 'Mathematics, Statistics, Earth Observation, Geospatial Analysis', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Soft Skills:', type: 'subheading' },
          { text: 'Problem Solving, Decision Making Under Pressure, Adaptability', type: 'text' },
          { text: 'Learning Agility, Effective Communication, Attention to Detail', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    education: {
      description: 'View my education details',
      execute: () => {
        return [
          { text: '=== EDUCATION ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: 'Bachelor of Technology (B.Tech)', type: 'subheading' },
          { text: 'Manipal University Jaipur, Rajasthan, India', type: 'text' },
          { text: 'Specialization: Artificial Intelligence and Machine Learning', type: 'text' },
          { text: 'Duration: 2022 - 2026', type: 'text' },
          { text: 'CGPA: 9.17', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Class 12 (Senior Secondary)', type: 'subheading' },
          { text: 'Blue Heaven Vidhyalaya', type: 'text' },
          { text: 'Percentage: 90.4%', type: 'text' },
          { text: 'Year: 2021', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Class 10', type: 'subheading' },
          { text: 'Tagore International School', type: 'text' },
          { text: 'Percentage: 95.4%', type: 'text' },
          { text: 'Year: 2019', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    certifications: {
      description: 'View my certifications',
      execute: () => {
        return [
          { text: '=== CERTIFICATIONS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '- Cisco CCNAv7 Networking and Cybersecurity Courses (2024)', type: 'text' },
          { text: '- Google Data Analytics Professional Certificate', type: 'text' },
          { text: '- Coursera Deep Learning Specialization', type: 'text' },
          { text: '- NPTEL Design and Analysis of Algorithms Elite Certificate (2024)', type: 'text' },
          { text: '- NPTEL Introduction to Machine Learning', type: 'text' },
          { text: '- LeetCode: 300+ problems solved across all difficulty levels', type: 'text' },
          { text: '- Hacktoberfest 2024 Contributor', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    experience: {
      description: 'View my professional experience',
      execute: () => {
        return [
          { text: '=== PROFESSIONAL EXPERIENCE ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: 'AI Engineer Intern | Blinkadz', type: 'subheading' },
          { text: 'Jan 2025 - April 2025', type: 'text' },
          { text: '', type: 'text' },
          { text: '• Delivered core features with Next.js for the company\'s main marketing platform', type: 'text' },
          { text: '• Built a FastAPI/Firebase microservice for the AI processing pipeline,', type: 'text' },
          { text: '  increasing throughput by 45%', type: 'text' },
          { text: '• Automated LinkedIn campaign workflows via Marketing API integration,', type: 'text' },
          { text: '  reducing setup time by 85%', type: 'text' },
          { text: '• Developed Playwright tests improving test coverage to 90%', type: 'text' },
          { text: '• Designed and implemented a 12-agent orchestration system using Google ADK', type: 'text' },
          { text: '  for automatic video-ad creation, cutting processing time by 95%', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Vice Chair | IEEE GRSS (Geoscience & Remote Sensing Society)', type: 'subheading' },
          { text: 'September 2024 - January 2025', type: 'text' },
          { text: '', type: 'text' },
          { text: '• Led initiatives for the IEEE chapter focusing on geospatial technologies', type: 'text' },
          { text: '• Organized technical workshops on remote sensing and earth observation', type: 'text' },
          { text: '• Coordinated research presentations and academic discussions', type: 'text' },
          { text: '• Facilitated collaboration between academia and industry partners', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    achievements: {
      description: 'View my achievements',
      execute: () => {
        return [
          { text: '=== ACHIEVEMENTS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '• 5+ Student Excellence Awards from Manipal University Jaipur (last 5 semesters)', type: 'text' },
          { text: '• 300+ LeetCode problems solved across all difficulty levels', type: 'text' },
          { text: '• Developed an AI pipeline that reduced video-ad creation time by 95%', type: 'text' },
          { text: '• Optimized diagram generation algorithms for 80% faster processing', type: 'text' },
          { text: '• Automated LinkedIn campaign workflows, reducing setup time by 85%', type: 'text' },
          { text: '• Improved expense tracking application, increasing user retention by 30%', type: 'text' },
          { text: '• Successfully tracked deforestation trends using satellite imagery analysis', type: 'text' },
          { text: '• Increased AI processing pipeline throughput by 45% with microservice architecture', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    goals: {
      description: 'View my future goals',
      execute: () => {
        return [
          { text: '=== FUTURE GOALS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '• Deepen foundational knowledge in Deep Learning and Transformer architectures', type: 'text' },
          { text: '• Research state-of-the-art LLMs to identify areas for improvement', type: 'text' },
          { text: '• Develop novel AI architectures and publish research in top-tier conferences', type: 'text' },
          { text: '• Complete "Catalyst" - a cross-platform AI document understanding application', type: 'text' },
          { text: '• Explore applications of Reinforcement Learning for systems-level problems', type: 'text' },
          { text: '• Contribute more actively to open-source AI/ML projects and communities', type: 'text' },
          { text: '• Master the fields of NLP, CV, and RL to build world-class AI systems', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    'research-interests': {
      description: 'View my research interests',
      execute: () => {
        return [
          { text: '=== RESEARCH INTERESTS ===', type: 'heading' },
          { text: '', type: 'text' },
          { text: '• Large Language Models (LLMs) - Architecture improvements and capabilities', type: 'text' },
          { text: '• Earth Observation Systems - Satellite imagery analysis for environmental monitoring', type: 'text' },
          { text: '• Reinforcement Learning - Novel action generation beyond predefined action spaces', type: 'text' },
          { text: '• AI for Document Understanding - Intelligent document processing and interaction', type: 'text' },
          { text: '• Kernel Resource Management - Using RL for systems-level optimization', type: 'text' },
          { text: '• Multi-agent AI Systems - Orchestrating multiple AI agents for complex tasks', type: 'text' },
          { text: '• Transformer Architectures - Advancing underlying models for AI applications', type: 'text' },
          { text: '', type: 'text' },
        ];
      }
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        return [];
      }
    },
    exit: {
      description: 'Return to portfolio view',
      execute: () => {
        exitTerminal();
        return [{ text: 'Exiting terminal mode...', type: 'text' }];
      }
    },
    project: {
      description: 'Show details about specific project',
      execute: (args) => {
        const projectName = args[0];
        
        const projects = {
          'noteflow': [
            { text: '=== NOTEFLOW PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Repository: github.com/anubhav-qt/noteflow_new', type: 'text' },
            { text: 'Tech Stack: React, Express, Firebase, Gemini and GPT-4o', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'AI-powered system that creates structured documents from input text or handwritten notes.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• Natural Language Processing (NLP) pipeline for content organization', type: 'text' },
            { text: '• Computer Vision integration to process handwritten input via Google Cloud Vision', type: 'text' },
            { text: '• Advanced content generation with Gemini and GPT-4o models', type: 'text' },
            { text: '• Automatic diagram, flowchart, and graph creation using DALL-E and GraphViz', type: 'text' },
            { text: '• Parallel processing optimization reducing generation time by 80%', type: 'text' },
            { text: '• Professional PDF output formatting via ReportLab', type: 'text' },
            { text: '• Web interface with React frontend and Express backend', type: 'text' },
            { text: '• Firebase integration for user authentication and document storage', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Transforms unstructured notes into comprehensive, visually enhanced documents', type: 'text' },
            { text: 'with diagrams and charts, dramatically reducing manual documentation effort.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'moody': [
            { text: '=== MOODY PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Repository: github.com/anubhav-qt/moody', type: 'text' },
            { text: 'Tech Stack: Typescript, Python (TensorFlow and Flask), Firebase, React and Express', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'AI-powered music recommender analyzing Spotify listening history for personalized playlist generation.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• Spotify API integration for user listening history analysis', type: 'text' },
            { text: '• Neural embeddings for song similarity calculation', type: 'text' },
            { text: '• KNN algorithm with cosine similarity for music recommendation', type: 'text' },
            { text: '• Vector database with 114K+ indexed songs', type: 'text' },
            { text: '• Combined content-based and mood filtering approach', type: 'text' },
            { text: '• TensorFlow models for audio feature extraction and analysis', type: 'text' },
            { text: '• Flask microservice for ML processing', type: 'text' },
            { text: '• React frontend with Typescript for type safety', type: 'text' },
            { text: '• Firebase backend for user authentication and data storage', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Creates highly personalized music recommendations based on both listening history', type: 'text' },
            { text: 'and mood analysis, discovering new tracks aligned with user taste.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'expense-tracker': [
            { text: '=== EXPENSE TRACKER PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Repository: github.com/anubhav-qt/personal-tracker', type: 'text' },
            { text: 'Tech Stack: Typescript, Supabase, PostgreSQL, Recharts, Gemini, React and Express', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'Intuitive expense tracking system with multi-timeframe analytics and AI-powered financial insights.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• User-friendly expense input via selection boxes or chatbot interface', type: 'text' },
            { text: '• PostgreSQL database with Supabase for secure data storage', type: 'text' },
            { text: '• Comprehensive analytics dashboards for weekly, monthly, and yearly views', type: 'text' },
            { text: '• Interactive visualizations using Recharts library', type: 'text' },
            { text: '• Gemini AI integration for intelligent budgeting recommendations', type: 'text' },
            { text: '• Personalized financial insights based on spending patterns', type: 'text' },
            { text: '• TypeScript implementation for improved code reliability', type: 'text' },
            { text: '• React frontend with Express backend', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Improved budgeting accuracy and user retention by 30% through intelligent AI-powered', type: 'text' },
            { text: 'recommendations and intuitive visualizations of spending patterns.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'deforestation': [
            { text: '=== DEFORESTATION MONITORING PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Tech Stack: Google Earth Engine, Python, Machine Learning, Deep Learning', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'Earth observation system to monitor and predict deforestation trends in India using satellite imagery.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• Analysis of Sentinel-2 and Landsat-8 satellite imagery spanning 10 years', type: 'text' },
            { text: '• Convolutional Neural Networks (CNNs) for image classification', type: 'text' },
            { text: '• Transformer models for temporal pattern detection', type: 'text' },
            { text: '• Vegetation indices calculation and change detection algorithms', type: 'text' },
            { text: '• Google Earth Engine integration for large-scale geospatial processing', type: 'text' },
            { text: '• Predictive modeling of future deforestation hotspots', type: 'text' },
            { text: '• Visualization of deforestation trends with geospatial mapping', type: 'text' },
            { text: '• Python-based processing pipeline for satellite data', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Successfully tracked and predicted deforestation patterns across multiple regions,', type: 'text' },
            { text: 'providing valuable data for environmental conservation efforts.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'resnet': [
            { text: '=== RESNET PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Tech Stack: Python, Django, Javascript, Google Maps API', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'Comprehensive disaster management and response website for India with AI-driven predictions.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• Machine learning models for natural disaster prediction', type: 'text' },
            { text: '• Real-time alert system for emergency notifications', type: 'text' },
            { text: '• Google Maps Platform integration for shelter and resource location', type: 'text' },
            { text: '• Geofencing technology to classify areas based on danger levels', type: 'text' },
            { text: '• Coordination platform for disaster response teams', type: 'text' },
            { text: '• Django backend for robust application structure', type: 'text' },
            { text: '• JavaScript frontend for interactive user experience', type: 'text' },
            { text: '• Responsive design for both desktop and mobile access', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Provides critical infrastructure for disaster preparedness and response,', type: 'text' },
            { text: 'potentially saving lives through early warnings and resource coordination.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'catalyst': [
            { text: '=== CATALYST PROJECT (IN DEVELOPMENT) ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Tech Stack: React Native, Expo, Firebase, Python, TensorFlow, LangChain', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'Cross-platform AI-powered mobile application for document understanding and interaction.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features (Planned):', type: 'text' },
            { text: '• Document understanding with NLP and ML techniques', type: 'text' },
            { text: '• Interactive query system similar to Google NotebookLM', type: 'text' },
            { text: '• Comprehensive study companion with knowledge extraction', type: 'text' },
            { text: '• Cross-platform compatibility via React Native', type: 'text' },
            { text: '• OCR capabilities for physical document processing', type: 'text' },
            { text: '• Knowledge graph creation from document content', type: 'text' },
            { text: '• LangChain integration for advanced document interaction', type: 'text' },
            { text: '• Firebase backend for secure data storage', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Status:', type: 'text' },
            { text: 'Currently in development as a research and application project.', type: 'text' },
            { text: '', type: 'text' },
          ],
          'linkedin-api-integration': [
            { text: '=== LINKEDIN MARKETING API INTEGRATION PROJECT (WORK EXPERIENCE) ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Tech Stack: Next.js, Firebase, LinkedIn Marketing API', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Description:', type: 'text' },
            { text: 'Professional integration of LinkedIn Marketing API for Blinkadz, enabling automated campaign management.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Key Features:', type: 'text' },
            { text: '• Complete LinkedIn Marketing API integration', type: 'text' },
            { text: '• Automated campaign creation and management workflows', type: 'text' },
            { text: '• Sophisticated targeting algorithms for ad placement', type: 'text' },
            { text: '• Real-time performance monitoring and analytics', type: 'text' },
            { text: '• Custom UI components for intuitive API interaction', type: 'text' },
            { text: '• Next.js implementation for optimized performance', type: 'text' },
            { text: '• Firebase backend for data storage and authentication', type: 'text' },
            { text: '• OAuth implementation for secure API access', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Impact:', type: 'text' },
            { text: 'Reduced LinkedIn campaign setup time by 85%, dramatically improving workflow', type: 'text' },
            { text: 'efficiency and enabling more sophisticated marketing strategies.', type: 'text' },
            { text: '', type: 'text' },
          ]
        };
        
        if (!projectName) {
          return [
            { text: 'Please specify a project name.', type: 'error' },
            { text: 'Type "projects" to see available projects.', type: 'text' },
            { text: '', type: 'text' },
          ];
        }
        
        if (projects[projectName]) {
          return projects[projectName];
        } else {
          return [
            { text: `Project "${projectName}" not found.`, type: 'error' },
            { text: 'Type "projects" to see available projects.', type: 'text' },
            { text: '', type: 'text' },
          ];
        }
      }
    }
  };

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when terminal is mounted
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Tab completion functionality
  const handleKeyDown = (e) => {
    // Tab key pressed for autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const currentInput = input.trim();
      let suggestions = [];
      
      // First word (command) completion
      if (!currentInput.includes(' ')) {
        suggestions = allCommands.filter(cmd => cmd.startsWith(currentInput));
      } 
      // Project name completion after "project" command
      else if (currentInput.startsWith('project ')) {
        const projectPart = currentInput.split(' ')[1] || '';
        suggestions = projectNames
          .filter(name => name.startsWith(projectPart))
          .map(name => `project ${name}`);
      }

      // If there's a single suggestion, use it
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
      } 
      // If there are multiple suggestions, show them
      else if (suggestions.length > 1) {
        setOutput([
          ...output, 
          { text: `$ ${currentInput}`, type: 'command' },
          { text: 'Possible completions:', type: 'text' },
          { text: suggestions.join('  '), type: 'text' },
          { text: '', type: 'text' }
        ]);
      }
    }
    
    // Handle up/down arrows for command history
    if (e.key === 'ArrowUp' && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (e.key === 'ArrowDown' && historyIndex > -1) {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : '');
    }
  };

  // Handle command execution
  const handleCommand = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add command to history
    setCommandHistory([...commandHistory, input.trim()]);
    setHistoryIndex(-1);
    
    const args = input.trim().split(' ');
    const command = args.shift().toLowerCase();
    
    let response = [
      { text: `$ ${input}`, type: 'command' },
    ];
    
    if (commands[command]) {
      const cmdOutput = commands[command].execute(args);
      response = [...response, ...cmdOutput];
    } else {
      response.push(
        { text: `Command not found: ${command}`, type: 'error' },
        { text: 'Type "help" to see available commands.', type: 'text' },
        { text: '', type: 'text' }
      );
    }
    
    if (command !== 'clear') {
      setOutput([...output, ...response]);
    } else {
      setOutput([
        { text: 'Terminal cleared.', type: 'text' },
        { text: '', type: 'text' },
      ]);
    }
    
    setInput('');
  };

  // Update the Terminal component's render method for better mobile responsiveness
  return (
    <motion.div
      className="terminal-container min-h-screen bg-black p-3 sm:p-4 md:p-8 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        ref={terminalRef}
        className="terminal bg-black text-green-500 h-screen overflow-y-auto p-2 sm:p-4 rounded-md"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {output.map((line, i) => (
          <div 
            key={i} 
            className={`mb-1 text-sm sm:text-base ${
              line.type === 'error' ? 'text-red-500' : 
              line.type === 'heading' ? 'text-yellow-400 font-bold' :
              line.type === 'subheading' ? 'text-blue-300 font-semibold' :
              line.type === 'command' ? 'text-blue-400' :
              line.type === 'ascii-rgb' ? 'rgb-text whitespace-pre text-xs sm:text-base' :
              line.type === 'ascii' ? 'text-green-500 whitespace-pre text-xs sm:text-base' :
              'text-green-500'
            }`}
          >
            {/* Make links clickable */}
            {line.text.includes('http') ? (
              <span dangerouslySetInnerHTML={{ 
                __html: line.text.replace(
                  /(https?:\/\/[^\s]+)/g, 
                  '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-400">$1</a>'
                ) 
              }} />
            ) : line.text}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex mt-2">
          <span className="terminal-prompt text-green-500 mr-2"></span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-500 outline-none border-none text-sm sm:text-base"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
