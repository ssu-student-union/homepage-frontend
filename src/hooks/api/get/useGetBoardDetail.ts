import { getBoardDetail } from '@/apis/getBoardDetail';
import { GetBoardDetailResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface useBoardDetailProps {
  boardCode: string;
  postId: number;
}

export function useGetBoardDetail({
  boardCode,
  postId,
}: useBoardDetailProps): UseQueryResult<GetBoardDetailResponse, AxiosError> {
  const queryKey = ['getPost', boardCode, postId];

  const queryResult = useQuery<GetBoardDetailResponse, AxiosError>({
    queryKey,
    queryFn: async () => getBoardDetail({ boardCode, postId }),
  });

  return queryResult;
}
