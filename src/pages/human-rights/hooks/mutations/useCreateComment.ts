import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { useStuMutation } from '@/pages/human-rights/hooks/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UseCreateCommentOptions<TData> {
  postId: number;
  mutationOptions?: Omit<UseMutationOptions<TData, AxiosError | ApiError, CreateCommentVariables>, 'mutationFn'>;
}

interface CreateCommentVariables {
  content: string;
}

export function useCreateComment<TComment>({ postId, mutationOptions }: UseCreateCommentOptions<TComment[]>) {
  return useStuMutation(async ({ content }) => {
    return (
      await clientAuth<ApiResponse<TComment[]>>({
        method: 'post',
        url: `/board/posts/${postId}/comments`,
        data: { content },
      })
    ).data;
  }, mutationOptions);
}
