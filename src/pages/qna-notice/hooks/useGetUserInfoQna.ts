import { useQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { ApiResponse, UserInfoForQna } from '../types';

export async function getUserInfoForQna() {
  const response = await clientAuth<ApiResponse<UserInfoForQna>>({
    url: '/users/mypage',
    method: 'get',
  });

  return response.data;
}

export function useGetUserInfoQna(isLogin: boolean) {
  return useQuery<UserInfoForQna, Error>({
    queryKey: ['qnaUser'],
    queryFn: async () => {
      const response = await getUserInfoForQna();
      return response.data;
    },
    enabled: isLogin,
  });
}
