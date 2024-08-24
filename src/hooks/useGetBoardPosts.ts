import { getBoardPosts } from '@/apis/getBoardPosts';
import { useQuery } from '@tanstack/react-query';

interface UseGetBoardPostsProps {
  boardCode: string;
  page?: number;
  take?: number;
  category?: string | null;
}

export function useGetBoardPosts({ boardCode, page = 0, take = 9, category = null }: UseGetBoardPostsProps) {
  const queryKey = ['get-board-boardCode-posts', boardCode];

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getBoardPosts({
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
