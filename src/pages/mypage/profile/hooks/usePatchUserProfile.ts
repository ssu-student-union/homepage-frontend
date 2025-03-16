import { clientAuth } from '@/apis/client';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiResponse } from '@/hooks/new/useStuQuery';
import { PatchUserProfileRequest, PatchUserProfileResponse } from '@/types/apis/get';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UsePatchUserProfileOptions = {
  mutationOptions?: UseMutationOptions<PatchUserProfileResponse, AxiosError, PatchUserProfileRequest>;
};

export function usePatchUserProfile({ mutationOptions }: UsePatchUserProfileOptions = {}) {
  return useStuMutation(async (data: PatchUserProfileRequest) => {
    return (
      await clientAuth<ApiResponse<PatchUserProfileResponse>>({
        method: 'patch',
        url: '/users/mypage',
        data,
      })
    ).data;
  }, mutationOptions);
}
