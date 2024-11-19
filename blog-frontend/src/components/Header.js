import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/DarkMode.css';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData);
        console.log('User data loaded:', userData); // For debugging
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    try {
      const newDarkModeState = !isDarkMode;
      setIsDarkMode(newDarkModeState);
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', newDarkModeState.toString());
    } catch (error) {
      console.error('Error toggling dark mode:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.clear();
      setUser(null);
      navigate('/');
    }
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
            {user && (
              <>
                <li><Link to="/create">Create Post</Link></li>
                <li className="user-info">
                  Welcome, {user.name || user.email}
                </li>
              </>
            )}
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            {user && (
              <li>
                <button 
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <button
                className={`toggle-mode ${isDarkMode ? 'dark' : 'light'}`}
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
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