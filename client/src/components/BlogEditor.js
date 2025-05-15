import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !description.trim()) {
      setFeedbackMessage('Please fill in all required fields.');
      return;
    }
    
    setIsSaving(true);
    setFeedbackMessage('');
    
    try {
      // Generate a slug from the title
      const slug = title.toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
          
      // Create the blog object
      const blogPost = {
        title,
        content,
        date,
        description,
        slug,
        createdAt: new Date().toISOString(),
      };
      
      // Determine the API URL based on the current environment
      const isProd = window.location.hostname !== 'localhost';
      const API_URL = isProd 
          ? `https://${window.location.hostname}/api/blogs`
          : 'http://localhost:5000/api/blogs';
      
      // Send the blog data to the server
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
      
      if (response.ok) {
        setFeedbackMessage('Blog post published successfully!');
        
        // Reset form after successful submission
        setTitle('');
        setContent('');
        setDescription('');
        
        // Redirect to the blog post after a short delay
        setTimeout(() => {
          navigate(`/blog/${slug}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setFeedbackMessage(`Error: ${errorData.error || 'Failed to save blog post'}`);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setFeedbackMessage(`Error: ${error.message || 'Could not connect to the server'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Create New Blog Post</h1>
        
        {feedbackMessage && (
          <div className={`p-4 mb-6 rounded-md ${feedbackMessage.includes('Error') ? 'bg-red-900' : 'bg-green-900'}`}>
            {feedbackMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Enter blog title..."
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="date" className="block text-lg mb-2">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg mb-2">Short Description (Abstract)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-3 bg-black border border-white rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white resize-none"
              placeholder="Enter a brief description of your blog post..."
              required
              maxLength={200}
            />
            <p className="text-xs text-gray-400 mt-1">
              {description.length}/200 characters
            </p>
          </div>
          
          <div className="mb-8">
            <label className="block text-lg mb-2">Content</label>
            <div className="blog-editor-container">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="bg-black text-white custom-editor"
                placeholder="Write your blog content here..."
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Tip: Use the toolbar above to format text, add links and insert images.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="mr-4 px-6 py-3 bg-black text-white border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-white text-black rounded-md font-bold hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
            >
              {isSaving ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .custom-editor .ql-container {
          min-height: 400px;
          border-color: white;
          color: white;
          font-family: inherit;
        }
        
        .custom-editor .ql-toolbar {
          background-color: #333;
          border-color: white;
        }
        
        .custom-editor .ql-stroke {
          stroke: white;
        }
        
        .custom-editor .ql-fill {
          fill: white;
        }
        
        .custom-editor .ql-picker {
          color: white;
        }
        
        .custom-editor .ql-picker-options {
          background-color: #333;
          color: white;
        }
        
        .blog-editor-container {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;