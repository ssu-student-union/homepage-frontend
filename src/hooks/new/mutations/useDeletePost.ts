import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery.ts';
import { useStuMutation } from '@/hooks/new/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UseDeletePostOptions {
  boardCode: string;
  mutationOptions?: Omit<UseMutationOptions<null, AxiosError | ApiError, DeletePostVariables>, 'mutationFn'>;
}

interface DeletePostVariables {
  postId: string;
  fileUrls: string[];
}

export function useDeletePost({ boardCode, mutationOptions }: UseDeletePostOptions) {
  return useStuMutation(async ({ postId, fileUrls }) => {
    return (
      await clientAuth<ApiResponse<null>>({
        method: 'delete',
        url: `/board/${boardCode}/posts/${postId}`,
        data: { fileUrls },
      })
    ).data;
  }, mutationOptions);
}
