import { UserType } from './types/kakaoLoginType';
import { api } from './axios';

export const kakaoAuthCodeApi = (authCode: string) => {
  return api.get<string | UserType>(`/auth/callback?code=${authCode}`);
};
