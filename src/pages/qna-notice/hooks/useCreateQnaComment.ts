import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';
import { QnaComment } from '../[id]/types';

export interface CreateCommentRequest {
  content: string;
}

export function useCreateQnaComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation<QnaComment, AxiosError, CreateCommentRequest>({
    mutationFn: async (newComment: CreateCommentRequest) => {
      const response = await clientAuth<ApiResponse<QnaComment>>({
        method: 'post',
        url: `/board/posts/${postId}/comments`,
        data: { content: newComment.content },
      });
      return response.data.data;
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
