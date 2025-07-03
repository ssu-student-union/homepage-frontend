import { getBoardPosts } from '@/apis/getBoardPosts';
import { getBoardPostsProps } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * @deprecated new/query/useSearchPost로 대체
 */
export const useGetBoardPosts = <T>({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
}: getBoardPostsProps): UseQueryResult<T, AxiosError> => {
  return useQuery<T, AxiosError>({
    queryKey: ['get-board-boardCode-posts', boardCode, page, take, groupCode, memberCode, category],
    queryFn: async () => {
      const response = getBoardPosts({
        page,
        take,
        groupCode,
        memberCode,
        category,
        boardCode,
      });
      return response as T;
    },
  });
};
