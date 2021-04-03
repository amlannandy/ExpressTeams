import axios from 'axios';

import store from '../store/store';

const URL = 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL: URL,
});

export default axiosInstance;
