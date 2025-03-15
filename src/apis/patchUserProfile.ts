import { clientAuth } from './client';
import { PatchUserProfileResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';

export const patchUserProfile = async (data: {
  nickname: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response: AxiosResponse<PatchUserProfileResponse> = await clientAuth({
    url: '/users/mypage',
    method: 'PATCH',
    data,
  });
  return response.data;
};
