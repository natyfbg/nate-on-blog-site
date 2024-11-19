import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../styles/Auth.css';
import Header from '../components/Header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login response:', response); // For debugging
      
      // Store token
      localStorage.setItem('token', response.data.token);
      
      // Create a user object with necessary information
      const userData = {
        id: response.data.userId,
        email: email,
        name: response.data.name || email.split('@')[0], // Use email username if name not provided
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;