import { useEffect } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { navigate, categoryParam } = useCategory();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  const { data, isLoading, isError, refetch } = useGetBoardPosts({
    boardCode,
    take: itemsPerPage,
    page: currentPage,
    category: selectedCategory,
  });

  const posts = data?.postListResDto || [];
  const totalPages = data?.pageInfo?.totalPages || 1;

  useEffect(() => {
    refetch();
  }, [itemsPerPage, currentPage, selectedCategory]);

  return {
    posts,
    totalPages,
    currentPage,
    handlePageChange,
    navigate,
    categoryParam,
    subcategories,
    isLoading,
    isError,
  };
}
