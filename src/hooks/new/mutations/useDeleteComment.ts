import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery.ts';
import { useStuMutation } from '@/hooks/new/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UseDeleteCommentOptions {
  mutationOptions?: Omit<UseMutationOptions<null, AxiosError | ApiError, DeleteCommentVariables>, 'mutationFn'>;
}

interface DeleteCommentVariables {
  commentId: number;
}

export function useDeleteComment({ mutationOptions }: UseDeleteCommentOptions = {}) {
  return useStuMutation(async ({ commentId }) => {
    return (
      await clientAuth<ApiResponse<null>>({
        method: 'delete',
        url: `/board/posts/comments/${commentId}`,
      })
    ).data;
  }, mutationOptions);
}
