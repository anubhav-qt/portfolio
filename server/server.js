const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

const app = express();

// More flexible CORS setup for Render deployment
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins in development and requests with no origin (like curl)
    if (process.env.NODE_ENV !== 'production' || !origin) {
      return callback(null, true);
    }
    
    // In production, check against allowlist OR match render.com domains
    const allowlist = [
      'https://anubhav-portfolio.onrender.com',  // Update with your actual Render domain
      'http://localhost:3000',
      'https://www.anubhav-qt.tech',
      'https://anubhav-qt.tech'
    ];
    
    // Allow any render.com subdomain
    if (origin.includes('render.com') || allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  methods: ['GET', 'POST'],
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
  console.log('Contact routes loaded successfully');
} catch (error) {
  console.error('Failed to load contact routes:', error);
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
