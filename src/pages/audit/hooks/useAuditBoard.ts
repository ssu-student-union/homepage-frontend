import { useEffect } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';

export function useAuditBoard(boardCode: string) {
  // 화면 크기에 따라 아이템 수를 가져오는 hook
  const { itemsPerPage } = useResponseBoard();

  // 현재 페이지 갱신 hook
  const { currentPage, handlePageChange } = useCurrentPage();

  // 카테고리 갱신 hook
  const { navigate, categoryParam } = useCategory();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];

  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  // 게시물 API 호출
  const { posts, totalPages, refetch } = useGetBoardPosts({
    boardCode,
    take: itemsPerPage,
    page: currentPage,
    category: selectedCategory,
  });

  // 화면, 페이지, 카테고리가 바뀌면 refetch
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
    selectedCategory,
  };
}
