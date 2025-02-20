import { clientAuth } from '@/apis/client';
import { ApiResponse } from '../types';
import { QnaDetailData } from '../[id]/types';

export async function useGetQnaDetail(postId: number) {
  const response = await clientAuth<ApiResponse<QnaDetailData>>({
    url: `/board/질의응답게시판/posts/${postId}`,
    method: 'get',
  });

  return response.data;
}
