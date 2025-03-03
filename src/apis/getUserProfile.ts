import { GetUserProfileResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from './client.ts';

export const getUserProfile = async () => {
  const response: AxiosResponse<GetUserProfileResponse> = await clientAuth({
    url: '/users/mypage',
    method: 'get',
  });
  return response.data;
};
