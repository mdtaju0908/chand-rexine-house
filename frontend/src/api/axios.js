import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to production URL when deployed
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
