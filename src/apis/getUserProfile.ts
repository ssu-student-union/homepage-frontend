import { getUserProfileResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from './client';

export const getUserProfile = async () => {
  const response: AxiosResponse<getUserProfileResponse> = await clientAuth({
    baseURL: 'http://13.125.101.7:8080',
    url: '/users/mypage',
    method: 'get',
  });
  return response.data;
};
