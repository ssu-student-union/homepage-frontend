import { getBoardBoardCodePosts } from '@/apis/getBoardBoardCodePosts';
import { useQuery } from '@tanstack/react-query';

interface UseGetBoardBoardCodePostsProps {
  boardCode: string;
  accessToken: string;
  page?: number;
  take?: number;
}

export function useGetBoardBoardCodePosts({
  boardCode,
  accessToken,
  page = 1,
  take = 9,
}: UseGetBoardBoardCodePostsProps) {
  const queryKey = ['get-board-boardCode-posts', boardCode];

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getBoardBoardCodePosts({
        accessToken,
        boardCode,
        page: page,
        take,
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
