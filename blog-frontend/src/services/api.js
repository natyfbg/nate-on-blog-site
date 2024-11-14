import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Adjust this if your backend URL is different

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication

export const register = (name, email, password) => {
  return api.post('/auth/register', { name, email, password });
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Posts

export const getAllPosts = () => {
  return api.get('/posts');
};

export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

export const createPost = (postData) => {
  return api.post('/posts', postData);
};

export const updatePost = (id, postData) => {
  return api.put(`/posts/${id}`, postData);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

// You can add more API calls here as needed

export default api;