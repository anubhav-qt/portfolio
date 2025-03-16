import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ onDiveDeeper }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  // API URL is just a relative path in production
  const API_URL = '/api/contact';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      let data;
      // Try to parse response as JSON, but don't crash if it's not valid JSON
      try {
        data = await response.json();
      } catch (error) {
        console.error('Error parsing response as JSON:', error);
        throw new Error('Server returned an invalid response');
      }

      if (response.ok) {
        setStatus('Message sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        setStatus(`Error: ${data?.error || 'Failed to send message'}`);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus(`Error: ${err.message || 'Could not connect to the server'}`);
    }

    setSending(false);
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-black flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-10">Get In Touch</h2>
        
        <div className="max-w-md mx-auto mb-10 sm:mb-16">
          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate on innovative solutions.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="text-white mb-1">Your Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="flex flex-col text-left">
              <label htmlFor="message" className="text-white mb-1">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
                className="p-3 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white resize-none"
                placeholder="Hello Anubhav, I'd like to discuss..."
              />
            </div>
            
            <button
              type="submit"
              disabled={sending}
              className="mt-4 py-3 bg-black text-white border-2 border-white rounded-md font-bold hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
            
            {status && (
              <p className={`mt-4 text-center ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {status}
              </p>
            )}
          </form>
        </div>
        
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-20">
          <a href="https://github.com/anubhav-qt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/anubhav-qt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.14-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
          </a>
          <a href="https://leetcode.com/u/anubhav_qt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
        </div>
        
        <motion.button
          onClick={onDiveDeeper}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-black text-white border-2 border-white rounded-md text-base sm:text-lg font-bold hover:bg-white hover:text-black transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dive Deeper
        </motion.button>
      </div>
    </section>
  );
};

export default Contact;
