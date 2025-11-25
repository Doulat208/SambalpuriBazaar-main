import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If you're using sessions/cookies
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or however you store your auth token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;