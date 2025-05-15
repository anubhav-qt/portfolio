import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogItem = ({ title, date, link, description, side, slug }) => {
  // Function to truncate title if it's too long
  const truncateTitle = (title, maxLength = 55) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className={`mb-16 ${side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
      style={{ 
        width: '100%',
        '@media (min-width: 768px)': { width: '45%' }
      }}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-black p-6 border border-white rounded-lg overflow-hidden`}>
        <h3 className={`text-xl font-bold text-white ${side === 'left' ? 'md:text-right' : 'text-left'}`}>
          {truncateTitle(title)}
        </h3>
        <p className={`text-sm text-gray-400 mb-2 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>
          {formatDate(date)}
        </p>
        <Link 
          to={`/blog/${slug}`}
          className={`text-sm text-blue-400 hover:underline mb-3 block ${side === 'left' ? 'md:text-right' : 'text-left'}`}
        >
          Read Full Article →
        </Link>
        <p className={`text-gray-200 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Blogs = ({ hideTitle }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Determine the API URL based on the current environment
        const isProd = window.location.hostname !== 'localhost';
        const API_URL = isProd 
          ? `https://${window.location.hostname}/api/blogs`
          : 'http://localhost:5000/api/blogs';
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Sort blogs by date (newest first)
        const sortedBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Assign left/right positioning
        const blogsWithSides = sortedBlogs.map((blog, index) => ({
          ...blog,
          side: index % 2 === 0 ? 'left' : 'right'
        }));
        
        setBlogs(blogsWithSides);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message);
        
        // Fallback to placeholder blogs if there's an error in development
        if (isDev) {
          setBlogs([
            {
              title: "Building Advanced LLM Agents with Google's Agent Development Kit",
              date: "2025-05-10",
              slug: "building-advanced-llm-agents",
              description: "Exploring the latest techniques in building autonomous AI agents using Google's Agent Development Kit. This technical deep dive covers orchestration patterns for multi-agent systems with practical code examples.",
              side: "left"
            },
            {
              title: "Vector Databases: The Backbone of Modern AI Applications",
              date: "2025-04-22",
              slug: "vector-databases-modern-ai",
              description: "Understanding the architecture and implementation of vector databases for semantic search and recommendation systems. Includes performance benchmarks of Pinecone vs Weaviate vs ChromaDB across different use cases.",
              side: "right"
            }
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [isDev]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (error && blogs.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-red-400">Failed to load blogs: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!hideTitle && (
        <h2 className="text-4xl font-bold text-center text-white mb-16">Blogs</h2>
      )}
      
      {/* New Blog button - only visible in development mode */}
      {isDev && (
        <div className="flex justify-center mb-12">
          <Link 
            to="/blog/new" 
            className="px-6 py-3 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Write New Blog
          </Link>
        </div>
      )}
      
      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">No blog posts yet. {isDev && 'Create your first blog post!'}</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line only visible on medium screens and up */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white"></div>
          
          <div className="flex flex-col">
            {blogs.map((blog, index) => (
              <BlogItem 
                key={index} 
                title={blog.title} 
                date={blog.date} 
                description={blog.description} 
                slug={blog.slug}
                side={blog.side} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// For standalone section rendering
export const BlogsSection = () => {
  return (
    <section id="blogs" className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <Blogs />
      </div>
    </section>
  );
};

export default Blogs;