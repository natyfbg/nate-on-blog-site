import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../services/api';
import '../styles/BlogList.css';

function BlogList({ posts, setPosts }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-post">
          <Link to={`/post/${post.id}`}>
            <h2 className="blog-title">{post.title}</h2>
          </Link>
          <img src={post.imageUrl} alt="Blog post thumbnail" className="blog-image" />
          <p className="blog-highlight">{post.highlight}</p>
          <p className="blog-excerpt">{post.excerpt}</p>
          <p className="blog-author">By {post.author}</p>
          <p className="blog-date">{post.date}</p>
          {user && user.id === post.authorId && (
            <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;