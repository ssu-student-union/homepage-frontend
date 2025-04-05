import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { categoryMap } from '../const/data';
import { SearchState } from '@/atoms/atom';
import { useEffect, useRef } from 'react';
import { AuditResponse } from '../types';
import { useAtom } from 'jotai';

export function useAuditBoard(boardCode: string, category: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  const [searchQuery] = useAtom(SearchState);

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[category] === '전체' ? null : categoryMap[category];

  const prevCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      handlePageChange(1);
    }
    prevCategoryRef.current = category;
  }, [category, handlePageChange]);

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
