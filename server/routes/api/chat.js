const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Debug logs for API key
const apiKey = process.env.GEMINI_API_KEY;
console.log('GEMINI_API_KEY loaded:', apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : 'undefined');

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Knowledge base about Anubhav Joshi
const portfolioContext = `
Name: Anubhav Joshi
Role: Currently a B.Tech student at Manipal University Jaipur, specializing in AI and ML
Location: Rajasthan, India
Contact: magicalfizz@gmail.com
Education: B.Tech'26, Manipal University Jaipur (AI/ML Specialization, CGPA 9.17), Class 12'21 (90.4%) from Blue Heaven Vidhyalaya, Class 10'19 (95.4%) from Tagore International School

Professional Summary:
AI Engineer specializing in Machine Learning, Natural Language Processing, and Reinforcement Learning. Experience building robust AI pipelines and integrating complex models into applications, combining strong software engineering skills (full-stack, microservices, APIs) with a solid foundation in core CS and DSA.

Experience:
1. AI Engineer at Blinkadz (Jan 2025 - April 2025)
- Delivered core features with Next.js
- Built a FastAPI/Firebase microservice for the AI processing pipeline, increasing throughput by 45%
- Automated LinkedIn campaign workflows via Marketing API reducing setup time by 85%
- Developed Playwright tests improving coverage to 90%
- Designed and implemented a 12-agent orchestration system using Google ADK for automatic video-ad creation, cutting processing time by 95%

2. Vice Chair at IEEE GRSS (September 2024 - Jan 2025)
- Led initiatives for the Geoscience & Remote Sensing Society IEEE chapter
- Organized technical workshops
- Coordinated research presentations
- Facilitated collaboration between academia and industry

Projects:
1. NoteFlow (github.com/anubhav-qt/noteflow_new)
- AI-powered system leveraging NLP and CV for generating well-structured notes with diagrams and flow-charts from textual or handwritten input
- Optimized the AI pipeline for diagram generation processed in parallel, reducing processing time by 80%
- Tech stack: React, Express, Firebase, Gemini and GPT-4o

2. Moody (github.com/anubhav-qt/moody)
- AI-powered music recommender analyzing Spotify listening history for personalized playlist generation
- Utilizes NLP and ML techniques including neural embeddings, KNN search, and a vector database to combine content-based and mood filtering across 114K+ songs
- Tech stack: Typescript, Python (TensorFlow and Flask), Firebase, React and Express

3. Expense Tracker (github.com/anubhav-qt/personal-tracker)
- Intuitive expense tracking system with multi-timeframe analytics and integrated Gemini AI-powered financial insights
- Improved budgeting accuracy and user retention by 30% by providing intelligent recommendations
- Tech stack: Typescript, Supabase, PostgreSQL, Recharts, Gemini, React and Express

Technical Skills:
- Programming Languages: Python, C++, C, TypeScript, JavaScript, SQL
- AI & Machine Learning: Deep Learning, Natural Language Processing (NLP), Computer Vision (CV), Reinforcement Learning (RL), Generative AI, LLMs, Transformer Architecture (Familiarity), LLM Orchestration, TensorFlow, Keras, Scikit-learn, OpenCV, LangChain, Google Agent Development Kit, Gemini API, Vector Databases, Pandas, NumPy, Seaborn, Matplotlib, Plotly
- Software Engineering & MLOps: Full Stack Development, Microservices, API Design, API Integration, MLOps, React, React Native, Expo, Next.js, Node.js, Express, Flask, Docker, Git, GitHub, Linux, Google Cloud Platform (GCP), Render, Firebase, Supabase, Playwright, Selenium
- Databases: BigQuery, PostgreSQL, MongoDB, MySQL

Research Work and Experience:
- Deforestation monitoring in India using Google Earth Engine and satellite imagery (Landsat, Sentinel-2 datasets). Applied CNNs and Transformers for classifying and predicting deforestation hotspots over a 10-year period.
- Researched AI avatar and video generation for Blinkadz, investigating underlying technologies of platforms like HeyGen/Synthesia (GANs, CNNs, DNNs, Transformers). Evaluated 22+ LLMs to identify the best fit for an automatic, brand-personalized ad generation pipeline.
- Authored comprehensive case studies for college research, including a study on Large Language Models (LLMs) and a thought experiment on developing Reinforcement Learning Agents capable of generating novel actions beyond their predefined action set.

Miscellaneous:
- Has solved over 300 LeetCode problems of varying difficulty.
- Has various certifications, including Cisco's Networking and Cybersecurity, Google's Data Analytics, Coursera's Deep Learning Specialization, NPTEL's Design and Analysis of Algorithms, Introduction to Machine Learning, and even over 5 Student Excellence Awards from Manipal University Jaipur in the last 5 semesters.

Future Goals / Research Interests:
- Deepen foundational knowledge in Deep Learning and Transformer architectures.
- Research state-of-the-art LLMs to identify areas for improvement, with the goal of developing novel architectures and publishing research.
- Building a cross-platform AI-powered mobile application "Catalyst" (React Native) for document understanding and interaction (similar to Google NotebookLM), and a comprehensive study companion.
- Exploring the application of Reinforcement Learning for advanced systems-level problems, such as kernel resource management.
- To become a master in fields of NLP, CV, and RL, build world class AI systems, and publish research in top-tier conferences.
- To build a strong portfolio of projects and research work, and to contribute to the open-source community.
`;

// @route   GET api/chat/test
// @desc    Test chat route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Chat route works' });
});

// @route   POST api/chat
// @desc    Process chat with Gemini API
// @access  Public
router.post('/', async (req, res) => {
  try {
    // Get the user's message and chat history from the request body
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Using API key for Gemini request:', apiKey ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` : 'undefined');
    
    // Set up the streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Initialize Gemini model (using gemini-2.0-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Configure generation parameters
    const generationConfig = {
      temperature: 0.2,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 200, // Limit to keep responses concise
    };
    
    // Create a chat session
    const chat = model.startChat({
      generationConfig,
      history: [], // Initialize empty - we'll handle history differently
      safetySettings: [
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });
    
    // Create system context message
    const systemPrompt = `
    You are Bob, an AI assistant for Anubhav Joshi's portfolio website. 
    Use ONLY the following information to answer questions about Anubhav:
    
    ${portfolioContext}
    
    Important instructions:
    1. Respond ONLY based on the information provided above.
    2. If you don't know the answer based on the provided information, say "I don't have that information about Anubhav."
    3. Keep your answer concise (under 100 words).
    4. DO NOT make up any information that's not in the provided context.
    5. Respond in a professional, helpful manner.
    6. Your name is Bob, refer to yourself as Bob if needed.
    7. Remember the conversation history and provide coherent follow-up responses.
    8. Don't write anything extra like "Sure, here is the answer" or "I can help you with that" or "Based on the information provided, I can say that...".
    `;

    // Format the chat history from previous messages, or create new if none exists
    let formattedHistory = [];
    
    // Add the system message as the first message
    formattedHistory.push({
      role: "user",
      parts: [{ text: systemPrompt }],
    });
    formattedHistory.push({
      role: "model",
      parts: [{ text: "I understand. I'm Bob, Anubhav's portfolio assistant. I'll answer questions about Anubhav based solely on the information provided, keeping responses under 100 words." }],
    });
    
    // Add the conversation history if it exists
    if (history && Array.isArray(history) && history.length > 0) {
      // Filter out any messages that are empty or don't have content
      const validHistory = history.filter(msg => 
        msg && msg.role && (msg.content || "").trim().length > 0
      );
      
      // Add each valid history message to the formatted history
      validHistory.forEach(msg => {
        formattedHistory.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      });
      
      console.log(`Added ${validHistory.length} messages from chat history`);
    }
    
    // Add the new user message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });
    
    try {
      // Generate content with the full conversation history
      const result = await model.generateContentStream({
        contents: formattedHistory,
        generationConfig,
      });

      // Stream the response chunks to the client
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }
      }

      // End the response
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (generationError) {
      console.error('Error generating content:', generationError);
      if (!res.headersSent) {
        return res.status(500).json({ error: 'Failed to generate content' });
      }
      res.write(`data: ${JSON.stringify({ error: 'Error generating your response' })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('Chat error:', error);
    // If headers not sent yet, send an error response
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Failed to process chat request' });
    }
    // If already streaming, send error in the stream
    res.write(`data: ${JSON.stringify({ error: 'Error processing your request' })}\n\n`);
    res.end();
  }
});

module.exports = router;