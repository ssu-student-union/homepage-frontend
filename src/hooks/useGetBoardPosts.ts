import { getBoardPosts } from '@/apis/getBoardPosts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface Post {
  postId: number;
  title: string;
  content: string;
  date: string;
  category: string;
  thumbNail: string;
  status: string;
}

interface PageInfo {
  totalPages: number;
}

interface GetBoardPostsResponse {
  postListResDto: Post[];
  pageInfo: PageInfo;
}

interface UseGetBoardPostsProps {
  boardCode: string;
  page?: number;
  take?: number;
  category?: string | null;
}

export function useGetBoardPosts({
  boardCode,
  page = 0,
  take = 9,
  category = null,
}: UseGetBoardPostsProps): UseQueryResult<GetBoardPostsResponse> {
  const queryKey = ['get-board-boardCode-posts', boardCode, page, take, category];

  return useQuery<GetBoardPostsResponse>({
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
