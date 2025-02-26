import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export interface DeleteCommentRequest {
  commentId: number;
}

export function useDeleteQnaComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, AxiosError, DeleteCommentRequest>({
    mutationFn: async ({ commentId }: DeleteCommentRequest) => {
      const response = await clientAuth<ApiResponse<null>>({
        method: 'delete',
        url: `/board/posts/comments/${commentId}`,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
      queryClient.invalidateQueries({ queryKey: ['qnaPostDetail', postId] });
    },
  });
}
