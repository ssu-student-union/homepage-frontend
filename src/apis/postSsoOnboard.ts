import { ssoClient } from './ssoClient';

interface SsoOnboardRequest {
  student_id: string;
  student_name: string;
}

export const postSsoOnboard = async (data: SsoOnboardRequest) => {
  const response = await ssoClient.post('/auth/onboard', data);
  return response.data;
};
