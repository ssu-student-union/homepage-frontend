import { clientAuth } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, QnaListData, QnaMajorCode, QnaMemberCode } from '../types';

export interface QnaPostParams {
  page?: number;
  take?: number;
  qnaMajorCode?: QnaMajorCode | '';
  qnaMemberCode?: QnaMemberCode;
  q?: string;
}

export async function getQnaList({ page = 0, take = 14, qnaMajorCode, qnaMemberCode, q }: QnaPostParams) {
  const response = await clientAuth<ApiResponse<QnaListData>>({
    url: `/board/질의응답게시판/posts/search`,
    method: 'get',
    params: { page, take, qnaMajorCode, qnaMemberCode, q },
  });

  return response.data;
}

export function useGetQnaList(params: QnaPostParams) {
  return useQuery<QnaListData, Error>({
    queryKey: ['qnaPostsList', params],
    queryFn: async () => {
      const response = await getQnaList(params);
      return response.data;
    },
  });
}
