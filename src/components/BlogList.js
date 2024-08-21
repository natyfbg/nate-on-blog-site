import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogList.css';

function BlogList({ posts }) {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-post">
          <Link to={`/post/${post.id}`}>
            <h2 className="blog-title">{post.title}</h2>
          </Link>
          <p className="blog-excerpt">{post.excerpt}</p>
          <p className="blog-author">By {post.author}</p>
          <p className="blog-date">{post.date}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;