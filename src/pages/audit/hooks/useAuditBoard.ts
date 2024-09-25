import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';
import { AuditResponse } from '../types';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const searchQuery = useRecoilValue(SearchState);

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  useEffect(() => {
    handlePageChange(1);
  }, [categoryParam, handlePageChange]);

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
    categoryParam,
    subcategories,
    isLoading,
    isError,
  };
}
