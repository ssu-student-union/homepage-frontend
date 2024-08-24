import { getBoardDetail } from '@/apis/getBoardDetail';
import { GetBoardDetailResponse } from '@/types/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface useBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number;
}

export function useGetBoardDetail({
  boardCode,
  postId,
  userId = 0,
}: useBoardDetailProps): UseQueryResult<GetBoardDetailResponse> {
  const queryKey = ['get-board-boardCode-posts-postId', boardCode, postId];

  const queryResult = useQuery<GetBoardDetailResponse>({
    queryKey,
    queryFn: () => getBoardDetail({ boardCode, postId, userId }),
  });

  return queryResult;
}
