import { getBoardPostSearch } from '@/apis/getBoardPostSearch';
import { getBoardPostsProps } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
    queryKey: ['get-board-boardCode-posts-search', page, take, groupCode, memberCode, category, boardCode, q],
    queryFn: async () => {
      const response = await getBoardPostSearch({
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
