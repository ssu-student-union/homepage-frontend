import axios from 'axios';

const ssoClient = axios.create({
  baseURL: 'https://dev-api.auth.sssupport.shop',
});

ssoClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { ssoClient };
