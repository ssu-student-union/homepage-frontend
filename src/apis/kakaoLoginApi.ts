import { UserType } from '@/pages/register/containers/types/kakaoLoginType';
import { client } from '@/apis/client';

export const kakaoAuthCodeApi = (authCode: string) => {
  return client.get<UserType>(`/auth/callback?code=${authCode}`);
};
