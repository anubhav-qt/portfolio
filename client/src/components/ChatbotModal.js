import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend, IoClose } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

// Wrap the entire component with memo to prevent re-renders when parent components change
const ChatbotModal = memo(({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Determine the API URL based on the current environment
  const isProd = window.location.hostname !== 'localhost';
  const API_URL = isProd 
    ? `https://${window.location.hostname}/api/chat`
    : 'http://localhost:5000/api/chat';

  // Load any existing chat history from session storage on initial render
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatHistory');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing stored chat history:', error);
      }
    }
  }, []);

  // Update session storage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus the input when the modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  // Wrap the onClose handler with useCallback to stabilize the function reference
  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  // Wrap sendMessage in useCallback to prevent unnecessary re-creation
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;
    
    // Add user message to the chat
    const userMessage = { text: newMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Create placeholder for AI response
    const aiMessageId = Date.now().toString();
    setMessages((prevMessages) => [
      ...prevMessages, 
      { id: aiMessageId, text: '', sender: 'ai', loading: true }
    ]);
    
    // Clear input and set loading state
    setNewMessage('');
    setIsLoading(true);

    try {
      // Format chat history for the API
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Send request to the API with the full chat history
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: chatHistory 
        }),
      });

      // Handle the streaming response
      if (response.ok) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let responseText = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          // Decode the chunk
          const chunk = decoder.decode(value);
          
          // Split the chunk into individual SSE events
          const events = chunk.split('\n\n').filter(event => event.trim());
          
          // Process each event
          for (const event of events) {
            if (event.startsWith('data: ')) {
              try {
                // Parse the JSON data
                const data = JSON.parse(event.slice(5));
                
                // If the response is done
                if (data.done) break;
                
                // If there's an error
                if (data.error) {
                  console.error('Error from server:', data.error);
                  setMessages((prevMessages) => {
                    return prevMessages.map(msg => 
                      msg.id === aiMessageId 
                        ? { ...msg, text: 'Sorry, an error occurred. Please try again.', loading: false } 
                        : msg
                    );
                  });
                  break;
                }
                
                // Append the text to the current response
                if (data.text) {
                  responseText += data.text;
                  // Update the AI message in the message list
                  setMessages((prevMessages) => {
                    return prevMessages.map(msg => 
                      msg.id === aiMessageId 
                        ? { ...msg, text: responseText, loading: false } 
                        : msg
                    );
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE event:', e);
              }
            }
          }
        }
      } else {
        console.error('Error response from server:', response.status);
        setMessages((prevMessages) => {
          return prevMessages.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: 'Sorry, an error occurred. Please try again.', loading: false } 
              : msg
          );
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) => {
        return prevMessages.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: 'Sorry, an error occurred. Please try again.', loading: false } 
            : msg
        );
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, newMessage, API_URL]);

  // Use useCallback to stabilize event handler references
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    sendMessage();
  }, [sendMessage]);

  // Handle pressing Enter to submit
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  // Stabilize the onChange handler for the input field
  const handleInputChange = useCallback((e) => {
    setNewMessage(e.target.value);
  }, []);

  // Create a memoized message list component
  const MessageList = useCallback(() => {
    if (messages.length === 0) {
      return (
        <div className="text-center text-gray-400 my-8">
          <FaRobot className="text-4xl mx-auto mb-3 text-yellow-400" />
          <p>Hi! I'm Bob, an AI assistant for Anubhav's portfolio.</p>
          <p>Ask me anything about Anubhav's skills, projects, or experience!</p>
        </div>
      );
    }
    
    return messages.map((message, index) => (
      <div
        key={message.id || index}
        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            message.sender === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-white border border-gray-700'
          }`}
        >
          <div className="flex items-center mb-1">
            {message.sender === 'user' ? (
              <MdPerson className="mr-1" />
            ) : (
              <FaRobot className="mr-1 text-yellow-400" />
            )}
            <span className="text-xs text-gray-300">
              {message.sender === 'user' ? 'You' : 'Bob'}
            </span>
          </div>
          <p>{message.text}</p>
          {message.loading && (
            <div className="flex space-x-1 mt-2 justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            </div>
          )}
        </div>
      </div>
    ));
  }, [messages]);

  // Using Portal would be ideal, but since we don't have React DOM imported,
  // we'll use AnimatePresence with a fixed position modal
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={handleClose}></div>
          
          {/* Modal content */}
          <motion.div
            className="relative bg-black border-2 border-white rounded-lg max-w-lg w-full mx-4 max-h-[80vh] flex flex-col"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaRobot className="text-yellow-400 mr-2" />
                Chat with Bob
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={handleClose}
                aria-label="Close chat"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            
            {/* Messages area */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-900 bg-opacity-50">
              <MessageList />
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area with normal gray border restored, but focus highlight removed */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
              <div className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something about Anubhav..."
                  className="flex-grow p-2 bg-black border border-gray-600 rounded-l-md text-white focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center justify-center"
                  disabled={isLoading || !newMessage.trim()}
                >
                  <IoSend />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-center">
                Responses are limited to 100 words
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// Add a display name for better debugging
ChatbotModal.displayName = 'ChatbotModal';

export default ChatbotModal;