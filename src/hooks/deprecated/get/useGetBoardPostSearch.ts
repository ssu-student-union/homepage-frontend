import { getBoardPostSearch } from '@/apis/getBoardPostSearch';
import { getBoardPostsProps } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * @deprecated new/query/useSearchPost로 대체
 */
export const useGetBoardPostSearch = <T>({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
  q,
}: getBoardPostsProps): UseQueryResult<T, AxiosError> => {
  return useQuery<T, AxiosError>({
    staleTime: 0,
    queryKey: ['get-board-boardCode-posts-search', page, take, groupCode, memberCode, category, q],
    queryFn: async () => {
      const response = getBoardPostSearch({
        page,
        take,
        groupCode,
        memberCode,
        category,
        boardCode,
        q,
      });
      return response as T;
    },
  });
};
