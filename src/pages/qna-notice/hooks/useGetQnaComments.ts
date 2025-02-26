import { clientAuth } from '@/apis/client';
import { ApiResponse } from '../types';
import { QnaCommentListData } from '../[id]/types';
import { useQuery } from '@tanstack/react-query';

export async function getQnaComments(postId: number) {
  const response = await clientAuth<ApiResponse<QnaCommentListData>>({
    url: `/board/posts/${postId}/comments?type=최신순`,
    method: 'get',
  });

  return response.data;
}

export function useGetQnaComments(postId: number) {
  return useQuery<QnaCommentListData, Error>({
    queryKey: ['qnaComments', postId],
    queryFn: async () => {
      const response = await getQnaComments(postId);
      return response.data;
    },
  });
}
