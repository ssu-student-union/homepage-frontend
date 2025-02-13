import { clientAuth } from '@/apis/client';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 자료집 PATCH
export interface UsePatchPostOptions<TPostRequest> {
  fileCategory: string;
  mutationOptions?: Omit<
    UseMutationOptions<number, AxiosError | ApiError, PatchPostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

interface PatchPostVariables<T> {
  id: number;
  post: T;
}

export function usePatchDataPost<DataPostEditRequest>({
  fileCategory,
  mutationOptions,
}: UsePatchPostOptions<DataPostEditRequest>) {
  return useStuMutation(async ({ id, post }) => {
    return (
      await clientAuth<ApiResponse<number>>({
        method: 'patch',
        url: `/board/data/${fileCategory}/posts/${id}`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}
