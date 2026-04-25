import { clientAuth } from './client';

interface ManagerProfileResponse {
  memberName: string | null;
  majorName: string | null;
  groupCodeList: string[];
}

export const getManagerProfile = async (): Promise<ManagerProfileResponse> => {
  const response = await clientAuth<{ data: ManagerProfileResponse }>({
    url: '/managers/profile',
    method: 'get',
  });
  return response.data.data;
};
