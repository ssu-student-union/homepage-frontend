import { getBoardPosts } from '@/apis/getBoardPosts';
import { getBoardPostsProps } from '@/types/apis/get';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardPosts = <T>({ page, take, groupCode, memberCode, category, boardCode }: getBoardPostsProps) => {
  return useQuery<T>({
    queryKey: ['get-board-boardCode-posts', page, take, groupCode, memberCode, category, boardCode],
    queryFn: () =>
      getBoardPosts({
        page,
        take,
        groupCode,
        memberCode,
        category,
        boardCode,
      }),
  });
};
