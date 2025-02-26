import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export interface PatchCommentRequest {
  commentId: number;
  content: string;
}

export function usePatchQnaComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, AxiosError, PatchCommentRequest>({
    mutationFn: async ({ commentId, content }: PatchCommentRequest) => {
      const response = await clientAuth<ApiResponse<null>>({
        method: 'patch',
        url: `/board/posts/comments/${commentId}`,
        data: { content },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['qnaComments', postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['qnaPostDetail', postId],
      });
    },
  });
}
