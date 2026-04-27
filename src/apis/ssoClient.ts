import axios from 'axios';

const ssoClient = axios.create({
  baseURL: import.meta.env.VITE_SSO_API_URL,
});

ssoClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { ssoClient };
