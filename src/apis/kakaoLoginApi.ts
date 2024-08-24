import { UserType } from '@/pages/kakao/containers/types/kakaoLoginType';
import { client } from '@/apis/client';

export const kakaoAuthCodeApi = (authCode: string) => {
  return client.get<string | UserType>(`/auth/callback?code=${authCode}`);
};