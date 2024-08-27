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
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await createPost({ 
        title, 
        content, 
        imageUrl, 
        highlight, 
        authorId: user.id, 
        author: user.email // Assuming email is used as the author name
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />
      <div className="create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label htmlFor="highlight">Highlight:</label>
            <input
              type="text"
              id="highlight"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;