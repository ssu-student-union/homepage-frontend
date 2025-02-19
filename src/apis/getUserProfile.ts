import { getUserProfileResponse } from '@/types/apis/get';
import axios, { AxiosResponse } from 'axios';

export const getUserProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const response: AxiosResponse<getUserProfileResponse> = await axios({
    baseURL: 'http://13.125.101.7:8080',
    url: '/users/mypage',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
