import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogList.css';

function BlogList({ posts }) {
  if (!Array.isArray(posts)) {
    console.error('Posts is not an array:', posts);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post._id} className="blog-post"> {/* Note: using _id instead of id */}
          <Link to={`/post/${post._id}`}>
            <h2 className="blog-title">{post.title}</h2>
          </Link>
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="blog-image"
            />
          )}
          {post.highlight && (
            <p className="blog-highlight">{post.highlight}</p>
          )}
          <p className="blog-excerpt">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </p>
          <p className="blog-author">
            By {post.author?.name || post.author || 'Unknown Author'}
          </p>
          <p className="blog-date">
            {new Date(post.createdAt || post.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;