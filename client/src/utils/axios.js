import axios from 'axios';

const URL = 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('express-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
