import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export interface DeleteQnaReply {
  replyCommentId: number;
}

export function useDeleteQnaReply(postId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteQnaReply>({
    mutationFn: async ({ replyCommentId }: DeleteQnaReply) => {
      await clientAuth<ApiResponse<null>>({
        method: 'delete',
        url: `/board/posts/comments/reply-comments/${replyCommentId}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['qnaComments', postId],
      });
      queryClient.invalidateQueries({ queryKey: ['qnaPostDetail', postId] });
    },
  });
}
