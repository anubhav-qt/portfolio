import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  // Determine the API URL based on the current environment
  const isProd = window.location.hostname !== 'localhost';
  const API_URL = isProd 
    ? `https://${window.location.hostname}/api/contact`  // Use the current domain in production
    : 'http://localhost:5000/api/contact';  // Use direct server URL in development

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    try {
      console.log(`Sending request to: ${API_URL}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      console.log('Response status:', response.status);
      
      let data;
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        // Only parse as JSON if it's actually JSON
        if (responseText && responseText.trim().startsWith('{')) {
          data = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
      }

      if (response.ok) {
        setStatus('Message sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        setStatus(`Error: ${data?.error || response.statusText || 'Failed to send message'}`);
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
        
        {/* Social media icons have been moved to the Home component */}
        
      </div>
    </section>
  );
};

export default Contact;
