import { GetStudentInfoResponse } from '@/types/getStudentInfo';
import { ssoClient } from './ssoClient';

export const getStudentInfo = async (): Promise<GetStudentInfoResponse> => {
  const response = await ssoClient.get<GetStudentInfoResponse>('/auth/me');
  return response.data;
};
