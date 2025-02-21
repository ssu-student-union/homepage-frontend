import { useQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { ApiResponse } from '../types';
import { QnaDetailData } from '../[id]/types';

export async function getQnaDetail(postId: number) {
  const response = await clientAuth<ApiResponse<QnaDetailData>>({
    url: `/board/질의응답게시판/posts/${postId}`,
    method: 'get',
  });

  return response.data;
}

export function useGetQnaDetail(postId?: number) {
  return useQuery<QnaDetailData, Error>({
    queryKey: ['qnaPostDetail', postId],
    queryFn: async () => {
      if (!postId) {
        throw new Error('postId is required');
      }
      const response = await getQnaDetail(postId);
      return response.data;
    },
    enabled: !!postId,
  });
}
