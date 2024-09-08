import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

// 토큰이 필요하지 않은 api 요청 시에 사용하는 함수
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 헤더에 토큰 추가
client.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    if (config.requireAuth || localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzI1ODA4OTAzLCJleHAiOjE3MjU4MTk3MDN9.gNO9j7U1xmUL8Wlr9Rhbh91Cg0JA3gzeZLjM81PxEFU`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토큰이 필요한 api 요청 시에 사용하는 함수
export const clientAuth = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return client({
    ...config,
    requireAuth: true,
  } as CustomInternalAxiosRequestConfig);
};
