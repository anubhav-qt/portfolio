const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email
    pass: process.env.EMAIL_PASS || 'your-app-password' // Your app password (NOT your Gmail password)
  }
});

// @route   POST api/contact
// @desc    Send contact email
// @access  Public
router.post('/', async (req, res) => {
  const { email, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).json({ error: 'Please include both email and message' });
  }

  // Email validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  try {
    // Email options
    const mailOptions = {
      from: email,
      to: 'magicalfizz@gmail.com',
      subject: `Portfolio Contact from ${email}`,
      text: message,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
