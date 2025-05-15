import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogView = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Determine the API URL based on the current environment
        const isProd = window.location.hostname !== 'localhost';
        const API_URL = isProd 
          ? `https://${window.location.hostname}/api/blogs/${slug}`
          : `http://localhost:5000/api/blogs/${slug}`;
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-8">Blog Not Found</h1>
          <p className="mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link to="/blogs" className="px-6 py-3 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blogs" className="inline-flex items-center text-blue-400 hover:underline mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to all blogs
        </Link>
        
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-400">{formatDate(blog.date)}</p>
          </header>
          
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogView;