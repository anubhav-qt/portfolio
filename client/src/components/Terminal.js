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
    'skills', 'education', 'clear', 'exit', 'project'
  ];
  
  const projectNames = [
    'noteflow', 'deforestation', 'resnet', 'expense-tracker', 'linkedin-api-integration'
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
          { text: 'I\'m a skilled Python programmer and data scientist with a strong foundation in full-stack', type: 'text' },
          { text: 'web development. Currently pursuing a B.Tech in AI & Machine Learning at Manipal University', type: 'text' },
          { text: 'Jaipur with a 9.17 CGPA, while working as an SDE Intern at Blinkadz.', type: 'text' },
          { text: '', type: 'text' },
          { text: 'I balance academic excellence with practical industry experience, focusing on both', type: 'text' },
          { text: 'web development and AI/ML technologies. My passion lies in creating impactful', type: 'text' },
          { text: 'solutions that leverage cutting-edge technologies.', type: 'text' },
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
          { text: '2. deforestation     - Earth observation system for monitoring deforestation trends', type: 'text' },
          { text: '3. resnet            - Disaster management and response website with AI predictions', type: 'text' },
          { text: '4. expense-tracker   - Budgeting website with chatbot and visualization dashboards', type: 'text' },
          { text: '5. linkedin-api-integration - Marketing API integration for automated campaign creation', type: 'text' },
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
          { text: '   - Developed a system analyzing Sentinel-2 and Landsat-8 imagery', type: 'text' },
          { text: '   - Applied machine learning for vegetation analysis and change detection', type: 'text' },
          { text: '', type: 'text' },
          { text: '2. "AI-Driven Disaster Management Systems"', type: 'text' },
          { text: '   - Created prediction models for natural disaster response', type: 'text' },
          { text: '   - Integrated geofencing and Google Maps APIs for danger zone classification', type: 'text' },
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
          { text: 'University: Manipal University Jaipur', type: 'text' },
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
          { text: 'Languages:      Python, JavaScript, TypeScript, Go, C', type: 'text' },
          { text: 'Frontend:       React, Tailwind CSS, Zustand, Zod', type: 'text' },
          { text: 'Full-Stack:     Node.js, Express, Django, Next.JS', type: 'text' },
          { text: 'Data Science:   Pandas, NumPy, MatPlotLib, Seaborn, Scikit-Learn', type: 'text' },
          { text: 'ML/DL:          TensorFlow, PyTorch, Deep Learning, Generative AI', type: 'text' },
          { text: 'Databases:      PostgreSQL, MongoDB, BigQuery', type: 'text' },
          { text: 'Cloud/DevOps:   AWS, Docker, Kubernetes, Git, GitHub, Linux', type: 'text' },
          { text: 'Testing/QA:     Playwright, Selenium, Automation', type: 'text' },
          { text: 'Tools:          Tableau, Spreadsheets, Firebase, Google Earth Engine (GEE)', type: 'text' },
          { text: 'Other Technical: Data Analysis, API Integration, Version Control', type: 'text' },
          { text: '                 Data Structures, Algorithms, Mathematics, Statistics', type: 'text' },
          { text: 'Soft Skills:    Problem Solving, Decision Making Under Pressure', type: 'text' },
          { text: '                Adaptability, Learning Agility, Effective Communication', type: 'text' },
          { text: '                Attention to Detail', type: 'text' },
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
          { text: 'Bachelor of Technology', type: 'text' },
          { text: 'Manipal University Jaipur, Rajasthan, India', type: 'text' },
          { text: 'Specialization: Artificial Intelligence and Machine Learning', type: 'text' },
          { text: 'Duration: 2022 - 2026', type: 'text' },
          { text: 'CGPA: 9.17', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Additional Certifications:', type: 'text' },
          { text: '- Cisco CCNAv7 Courses (2024)', type: 'text' },
          { text: '- Design and Analysis of Algorithms, NPTEL Elite Certificate (2024)', type: 'text' },
          { text: '- Leetcode: 200+ problems solved', type: 'text' },
          { text: '- Hacktoberfest 2024 Contributor', type: 'text' },
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
            { text: 'AI-powered note generation system that creates structured documents from input.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Features:', type: 'text' },
            { text: '- Processes textual and handwritten input via Google Cloud Vision', type: 'text' },
            { text: '- Generates comprehensive notes with GPT models', type: 'text' },
            { text: '- Creates diagrams, flow-charts, and graphs using DALL-E and GraphViz', type: 'text' },
            { text: '- Produces formatted PDF output via ReportLab', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Technologies: React, Express, Javascript, Gemini, Flux', type: 'text' },
            { text: '', type: 'text' },
          ],
          'deforestation': [
            { text: '=== DEFORESTATION MONITORING PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Earth observation system to monitor and predict deforestation trends in India.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Features:', type: 'text' },
            { text: '- Analysis of satellite imagery from Sentinel-2 and Landsat-8', type: 'text' },
            { text: '- Vegetation analysis and change detection', type: 'text' },
            { text: '- Machine learning models for deforestation prediction', type: 'text' },
            { text: '- Geographic information system integration', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Technologies: Google Earth Engine, Python, Machine Learning, Deep Learning', type: 'text' },
            { text: '', type: 'text' },
          ],
          'resnet': [
            { text: '=== RESNET PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Comprehensive disaster management and response website for India.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Features:', type: 'text' },
            { text: '- AI-driven predictions and notifications for disasters', type: 'text' },
            { text: '- Google Maps Platform integration for shelter location', type: 'text' },
            { text: '- Geofencing to classify areas based on danger levels', type: 'text' },
            { text: '- Real-time disaster response coordination', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Technologies: Python, Django, Javascript, Google Maps API', type: 'text' },
            { text: '', type: 'text' },
          ],
          'expense-tracker': [
            { text: '=== EXPENSE TRACKER PROJECT ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'User-friendly expense tracking and budgeting website.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Features:', type: 'text' },
            { text: '- Input expenses via selection box or personal chatbot', type: 'text' },
            { text: '- Database storage for expense history', type: 'text' },
            { text: '- Weekly, monthly, and yearly expenditure dashboards', type: 'text' },
            { text: '- AI chatbot for budgeting advice and expenditure insights', type: 'text' },
            { text: '', type: 'text' },
            { text: 'React, Express, Gemini, Tableau, PostgreSQL', type: 'text' },
            { text: '', type: 'text' },
          ],
          'linkedin-api-integration': [
            { text: '=== LINKEDIN MARKETING API INTEGRATION PROJECT (WORK EXPERIENCE) ===', type: 'heading' },
            { text: '', type: 'text' },
            { text: 'Professional integration of LinkedIn Marketing API for Blinkadz.', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Features:', type: 'text' },
            { text: '- Automated campaign creation and management', type: 'text' },
            { text: '- Targeted ad placement algorithms', type: 'text' },
            { text: '- Real-time ad performance monitoring', type: 'text' },
            { text: '- Intuitive UI components for API interactions', type: 'text' },
            { text: '', type: 'text' },
            { text: 'Technologies: Next.js, Firebase, LinkedIn Marketing API', type: 'text' },
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
