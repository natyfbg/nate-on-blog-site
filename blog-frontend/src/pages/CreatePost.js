import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import Header from '../components/Header';
import '../styles/CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [highlight, setHighlight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
    // Log user data for debugging
    console.log('Current user:', user);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const postData = {
        title,
        content,
        imageUrl,
        highlight,
        authorId: user.id,
        author: user.name || user.email
      };

      // Log the post data being sent
      console.log('Attempting to create post with data:', {
        title: postData.title,
        contentLength: postData.content.length,
        hasImage: !!postData.imageUrl,
        imageSize: postData.imageUrl?.length,
        highlight: postData.highlight,
        author: postData.author
      });

      const response = await createPost(postData);
      console.log('Post creation response:', response);
      navigate('/');
    } catch (error) {
      console.error('Detailed error creating post:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Log file details
      console.log('Selected file details:', {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        console.log('Image loaded successfully, size:', `${(result.length / 1024).toFixed(2)} KB`);
        setImageUrl(result);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setError('Failed to load image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div>
      <Header />
      <div className="create-post-container">
        <div className="create-post-form">
          <div className="form-header">
            <h2>Create New Post</h2>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/')}
            >
              ✕
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter your post title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Preview" />
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="highlight">Highlight:</label>
              <input
                type="text"
                id="highlight"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="Enter a brief highlight of your post"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Write your post content here..."
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;