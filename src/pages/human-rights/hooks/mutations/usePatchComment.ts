import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { useStuMutation } from '@/pages/human-rights/hooks/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UsePatchCommentOptions {
  mutationOptions?: Omit<UseMutationOptions<null, AxiosError | ApiError, PatchCommentVariables>, 'mutationFn'>;
}

interface PatchCommentVariables {
  commentId: number;
  content: string;
}

export function usePatchComment({ mutationOptions }: UsePatchCommentOptions = {}) {
  return useStuMutation(async ({ commentId, content }) => {
    return (
      await clientAuth<ApiResponse<null>>({
        method: 'patch',
        url: `/board/posts/comments/${commentId}`,
        data: { content },
      })
    ).data;
  }, mutationOptions);
}
