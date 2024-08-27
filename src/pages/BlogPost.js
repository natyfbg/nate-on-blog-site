import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';
import '../styles/BlogPost.css';
import Header from '../components/Header';

function BlogPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then(data => setPost(data));
  }, [id]);

  if (!post) return (
    <div>
      <Header />
      <div>Loading...</div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="blog-post-container">
        <div className="blog-post-full">
          <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-highlight">{post.highlight}</p>
          <p className="blog-post-meta">By {post.author} on {post.date}</p>
          <div className="blog-post-content">{post.content}</div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;