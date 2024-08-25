import { getBoardPosts } from '@/apis/getBoardPosts';
import { useQuery } from '@tanstack/react-query';

interface UseGetBoardPostsProps {
  boardCode: string;
  page?: number;
  take?: number;
  category?: string | null;
}

export function useGetBoardPosts<T>({ boardCode, page = 0, take = 9, category = null }: UseGetBoardPostsProps) {
  const queryKey = ['get-board-boardCode-posts', boardCode, page, take, category];

  return useQuery<T>({
    queryKey,
    queryFn: () =>
      getBoardPosts({
        boardCode,
        page,
        take,
        category,
      }),
  });
}
