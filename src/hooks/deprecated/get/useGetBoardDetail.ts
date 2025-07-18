import { getBoardDetail } from '@/apis/getBoardDetail';
import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { BOARD_CODE } from '@/pages/mypage/service-notice/const/data';
import { GetBoardDetailResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * @deprecated new/query/useGetPost로 대체
 */
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

export function useDeleteServicePost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}
