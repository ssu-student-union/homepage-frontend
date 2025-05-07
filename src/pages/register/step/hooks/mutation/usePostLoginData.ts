import { useStuMutation } from '@/hooks/new/useStuMutation';
import { clientAuth } from '@/apis/client';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { PostScouncilLoginDataResponse, PostScouncilLoginDataRequest } from '@/types/apis/get';

interface UsePostLoginDataOptions {
  mutationOptions?: UseMutationOptions<
    PostScouncilLoginDataResponse,
    AxiosError | ApiError,
    PostScouncilLoginDataRequest
  >;
}

export default function usePostLoginData({ mutationOptions }: Omit<UsePostLoginDataOptions, 'mutationFn'>) {
  return useStuMutation(async (data: PostScouncilLoginDataRequest) => {
    return (
      await clientAuth<ApiResponse<PostScouncilLoginDataResponse>>({
        method: 'post',
        url: '/auth/council-login',
        data,
      })
    ).data;
  }, mutationOptions);
}
