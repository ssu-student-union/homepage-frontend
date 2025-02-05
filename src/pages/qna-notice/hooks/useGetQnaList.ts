import { clientAuth } from '@/apis/client';
import { ApiResponse, QnaListData } from '../types';

export type QnaTarget = 'DEPARTMENT' | 'COLLEGE' | 'ALL';

export interface QnaPostParams {
  page?: number;
  take?: number;
  qnaTarget?: QnaTarget;
  q?: string;
}

export async function useGetQnaList({ page = 0, take = 14, qnaTarget = 'ALL', q }: QnaPostParams) {
  const response = await clientAuth<ApiResponse<QnaListData>>({
    url: `/board/질의응답게시판/posts/search`,
    method: 'get',
    params: { page, take, qnaTarget, q },
  });

  return response;
}
