import { getBoardPostSearch } from '@/apis/getBoardPostSearch';
import { getBoardPostsProps } from '@/types/apis/get';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardPostSearch = <T>({
  page,
  take,
  groupCode,
  memberCode,
  category,
  boardCode,
  q,
}: getBoardPostsProps) => {
  return useQuery<T>({
    queryKey: ['get-board-boardCode-posts-search', page, take, groupCode, memberCode, category, boardCode, q],
    queryFn: () =>
      getBoardPostSearch({
        page,
        take,
        groupCode,
        memberCode,
        category,
        boardCode,
        q,
      }),
  });
};
