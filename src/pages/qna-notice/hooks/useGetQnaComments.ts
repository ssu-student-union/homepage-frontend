import { clientAuth } from '@/apis/client';
import { ApiResponse } from '../types';
import { QnaCommentListData } from '../[id]/types';

export async function useGetQnaComments(postId: number) {
  const response = await clientAuth<ApiResponse<QnaCommentListData>>({
    url: `/board/posts/${postId}/comments?type=최신순`,
    method: 'get',
  });

  return response.data;
}
