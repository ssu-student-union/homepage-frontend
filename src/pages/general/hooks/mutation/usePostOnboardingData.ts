import { useStuMutation } from '@/hooks/new/useStuMutation';
import { clientAuth } from '@/apis/client';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { PostOnboardingInformationRequest } from '@/types/apis/get';

interface UsePostOnboardingDataOptions {
  mutationOptions?: UseMutationOptions<null, AxiosError | ApiError, PostOnboardingInformationRequest>;
}

export default function usePostOnboardingData({ mutationOptions }: Omit<UsePostOnboardingDataOptions, 'mutationFn'>) {
  return useStuMutation(async (data: PostOnboardingInformationRequest) => {
    return (
      await clientAuth<ApiResponse<null>>({
        method: 'post',
        url: '/onboarding/academy-information',
        data,
      })
    ).data;
  }, mutationOptions);
}
