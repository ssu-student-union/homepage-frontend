import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { categoryMap } from '../const/data';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';
import { AuditResponse } from '../types';

export function useAuditBoard(boardCode: string, category: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  const searchQuery = useRecoilValue(SearchState);

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[category] === '전체' ? null : categoryMap[category];

  useEffect(() => {
    handlePageChange(1);
  }, [category]);

  const { data, isLoading, isError } = useGetBoardPostSearch<AuditResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    category: selectedCategory ?? undefined,
    q: searchQuery,
  });

  // const posts: Post[] = data.data?.postListResDto || [];
  const totalPages: number = data?.data?.pageInfo?.totalPages ?? 0;

  return {
    data,
    totalPages,
    currentPage,
    handlePageChange,
    category,
    subcategories,
    isLoading,
    isError,
  };
}
