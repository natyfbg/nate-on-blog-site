import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import { getPosts } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="home-container">
      <Header />
      <main>
        <h1 className="home-header">Welcome to Our Blog</h1>
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;