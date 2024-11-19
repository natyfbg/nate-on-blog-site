import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../services/api';
import '../styles/BlogPost.css';
import Header from '../components/Header';

function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        console.log('Fetched post:', response.data); // For debugging
        setPost(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="blog-post-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="blog-post-container">
          <div className="error-message">
            {error}
            <button onClick={() => navigate('/')} className="back-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Header />
        <div className="blog-post-container">
          <div className="error-message">
            Post not found
            <button onClick={() => navigate('/')} className="back-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="blog-post-container">
        <div className="blog-post-full">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="blog-post-image" 
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Error loading image');
              }}
            />
          )}
          <h1 className="blog-post-title">{post.title}</h1>
          {post.highlight && (
            <p className="blog-post-highlight">{post.highlight}</p>
          )}
          <div className="blog-post-meta">
            <span className="author">By {post.author}</span>
            <span className="date">
              {new Date(post.createdAt || post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="blog-post-content">{post.content}</div>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;