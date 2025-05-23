import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { SearchState } from '@/atoms/atom';
import { useEffect } from 'react';
import { categoryMap } from '../const/data';
import { useCategory } from './useCategory';
import { LostArticleResponse } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

export function useLostBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const [searchQuery] = useAtom(SearchState);

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useGetBoardPostSearch<LostArticleResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    category: selectedCategory ?? undefined,
    q: searchQuery,
  });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-search'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  // const posts: LostArticleContentResponse[] = data?.data?.postListResDto || [];
  const totalPages: number = data?.data?.pageInfo?.totalPages ?? 0;

  return {
    data,
    totalPages,
    currentPage,
    handlePageChange,
    categoryParam,
    subcategories,
    isLoading,
    isError,
  };
}
