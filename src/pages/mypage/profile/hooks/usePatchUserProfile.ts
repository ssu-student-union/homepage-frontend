import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUserProfile } from '@/apis/patchUserProfile';
import { AxiosError } from 'axios';
import { patchUserProfileRequest, patchUserProfileResponse } from '@/types/apis/get';

export const usePatchUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<patchUserProfileResponse, AxiosError, patchUserProfileRequest>({
    mutationFn: async (patchData) => {
      return await patchUserProfile(patchData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    },
    // onError: (error) => {
    //   console.error('정보 수정 실패:', error.response?.data);
    // },
  });
};
