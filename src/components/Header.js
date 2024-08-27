import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>Nate on-Blog Site</h1>
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            {user && <li><Link to="/create">Create Post</Link></li>}
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            {user && <li><button onClick={handleLogout}>Logout</button></li>}
            <li>
              <button
                className={`toggle-mode ${isDarkMode ? 'dark' : 'light'}`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? '🌙' : '🌞'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;