import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export interface DeleteQnaPostRequest {
  postId: number;
  fileUrls?: string[];
}

export function useDeleteQnaDetail() {
  const BOARD_CODE = '질의응답게시판';
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteQnaPostRequest>({
    mutationFn: async ({ postId, fileUrls }: DeleteQnaPostRequest) => {
      await clientAuth<ApiResponse<null>>({
        method: 'delete',
        url: `/board/${BOARD_CODE}/posts/${postId}`,
        data: { fileUrls },
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['qnaPostsList'] });
      queryClient.invalidateQueries({ queryKey: ['qnaPostDetail', variables.postId] });
    },
  });
}
