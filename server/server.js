const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

// Debug logs for environment variables
console.log('Environment variables loaded. NODE_ENV:', process.env.NODE_ENV);
console.log('GEMINI_API_KEY available:', !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
  const key = process.env.GEMINI_API_KEY;
  console.log('API key format check:', `${key.substring(0, 5)}...${key.substring(key.length - 5)}, length: ${key.length}`);
}

const app = express();

// Much more permissive CORS configuration for production
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins in development and requests with no origin
    callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from origin: ${req.headers.origin || 'unknown'}`);
  next();
});

// API routes
try {
  app.use('/api/contact', require('./routes/api/contact'));
  app.use('/api/chat', require('./routes/api/chat'));
  app.use('/api/blogs', require('./routes/api/blogs'));
  console.log('API routes loaded successfully');
} catch (error) {
  console.error('Failed to load API routes:', error);
}

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any route that doesn't match the above should serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
