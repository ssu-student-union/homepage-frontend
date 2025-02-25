import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export interface CreateReplyCommentRequest {
  commentId: number;
  content: string;
}

export function useCreateQnaReply(postId: number) {
  const queryClient = useQueryClient();
  return useMutation<null, AxiosError, CreateReplyCommentRequest>({
    mutationFn: async ({ commentId, content }: CreateReplyCommentRequest) => {
      const response = await clientAuth<ApiResponse<null>>({
        method: 'post',
        url: `/board/posts/comments/${commentId}/reply-comments`,
        data: { content },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getComments', postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['getPost', postId],
      });
    },
  });
}
