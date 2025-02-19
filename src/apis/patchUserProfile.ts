import { clientAuth } from './client';
import { patchUserProfileResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';

export const patchUserProfile = async (data: {
  nickname: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const accessToken = localStorage.getItem('accessToken');
  const response: AxiosResponse<patchUserProfileResponse> = await clientAuth({
    baseURL: 'http://13.125.101.7:8080',
    url: '/users/mypage',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  });
  return response.data;
};
