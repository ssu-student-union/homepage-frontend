import { getBoardBoardCodePosts } from '@/apis/getBoardBoardCodePosts';
import { useQuery } from '@tanstack/react-query';

interface UseGetBoardBoardCodePostsProps {
  boardCode: string;
  page?: number;
  take?: number;
  category?: string | null;
}

export function useGetBoardBoardCodePosts({
  boardCode,
  page = 1,
  take = 9,
  category = null,
}: UseGetBoardBoardCodePostsProps) {
  const queryKey = ['get-board-boardCode-posts', boardCode];

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getBoardBoardCodePosts({
        boardCode,
        page: page,
        take,
        category,
      }),
    staleTime: 300000,
  });

  const posts = data?.data?.postListResDto || [];
  const totalPages = data?.data?.pageInfo?.totalPages || 1;

  return {
    posts: posts,
    totalPages: totalPages,
    refetch,
  };
}
