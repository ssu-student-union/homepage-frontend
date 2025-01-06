import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { useStuMutation } from '@/pages/human-rights/hooks/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UsePatchPostOptions<TPostRequest> {
  boardCode: string;
  mutationOptions?: Omit<
    UseMutationOptions<number, AxiosError | ApiError, PatchPostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

interface PatchPostVariables<T> {
  id: number;
  post: T;
}

export function usePatchPost<TPostRequest>({ boardCode, mutationOptions }: UsePatchPostOptions<TPostRequest>) {
  return useStuMutation(async ({ id, post }) => {
    return (
      await clientAuth<ApiResponse<number>>({
        method: 'patch',
        url: `/board/${boardCode}/posts/${id}`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
