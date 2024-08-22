import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
