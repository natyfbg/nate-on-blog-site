import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import { getAllPosts } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        console.log('Posts data:', response.data); // For debugging
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Error fetching posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="home-container">
      <Header />
      <div className="loading">Loading posts...</div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="home-container">
      <Header />
      <div className="error">{error}</div>
      <Footer />
    </div>
  );

  return (
    <div className="home-container">
      <Header />
      <main>
        <h1 className="home-header">Welcome to Our Blog</h1>
        {posts.length === 0 ? (
          <div className="no-posts">No posts available</div>
        ) : (
          <BlogList posts={posts} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;