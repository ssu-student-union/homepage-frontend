import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetPartnershipBoardPostsResponse } from '@/types/getPartnershipBoardPosts';
import { PartnershipSubcategories } from '../const';

export function usePartnership(boardCode: string, category: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  const searchQuery = useRecoilValue(SearchState);

  const subcategories = Object.values(PartnershipSubcategories).filter(Boolean) as string[];
  const selectedCategory = category === '전체' ? null : category;

  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useGetBoardPostSearch<GetPartnershipBoardPostsResponse>({
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

  const totalPages: number = data?.data?.pageInfo?.totalPages ?? 0;

  return {
    data,
    totalPages,
    currentPage,
    handlePageChange,
    subcategories,
    isLoading,
    isError,
  };
}
