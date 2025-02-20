import { clientAuth } from '@/apis/client';
import { ApiResponse, UserInfoForQna } from '../types';

export async function useGetUserInfoForQna() {
  const response = await clientAuth<ApiResponse<UserInfoForQna>>({
    url: '/users/mypage',
    method: 'get',
  });

  return response.data;
}
