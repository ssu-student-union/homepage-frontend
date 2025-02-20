import { clientAuth } from '@/apis/client';
import { ApiResponse, QnaListData, QnaMajorCode, QnaMemberCode } from '../types';

export interface QnaPostParams {
  page?: number;
  take?: number;
  qnaMajorCode?: QnaMajorCode;
  qnaMemberCode?: QnaMemberCode;
  q?: string;
}

export async function useGetQnaList({ page = 0, take = 14, qnaMajorCode, qnaMemberCode, q }: QnaPostParams) {
  const response = await clientAuth<ApiResponse<QnaListData>>({
    url: `/board/질의응답게시판/posts/search`,
    method: 'get',
    params: { page, take, qnaMajorCode, qnaMemberCode, q },
  });

  return response.data;
}
