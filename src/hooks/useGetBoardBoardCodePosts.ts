import { getBoardBoardCodePosts } from '@/apis/getBoardBoardCodePosts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(page);

  const queryKey = ['get-board-boardCode-posts', boardCode, currentPage];

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      getBoardBoardCodePosts({
        accessToken,
        boardCode,
        page: currentPage,
        take,
      }),
    staleTime: 300000,
  });

  const posts = data?.data?.postListResDto || [];
  const totalPages = data?.data?.pageInfo?.totalPages || 1;

  return {
    posts: posts,
    totalPages: totalPages,
    currentPage,
    setCurrentPage,
    refetch,
  };
}
