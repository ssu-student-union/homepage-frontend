import { getBoardDetail } from '@/apis/getBoardDetail';
import { GetBoardDetailResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface useBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number | null; // 선택적으로 처리 (page.tsx 오류 처리 위함)
}

export function useGetBoardDetail({
  boardCode,
  postId,
  userId = 0,
}: useBoardDetailProps): UseQueryResult<GetBoardDetailResponse> {
  const queryKey = ['get-board-boardCode-posts-postId', boardCode, postId, userId];

  const queryResult = useQuery<GetBoardDetailResponse>({
    queryKey,
    queryFn: () => getBoardDetail({ boardCode, postId, userId }),
  });

  return queryResult;
}
