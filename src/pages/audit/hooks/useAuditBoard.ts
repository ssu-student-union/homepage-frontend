import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { Post } from '@/types/apis/get';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const searchQuery = useRecoilValue(SearchState);

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  useEffect(() => {
    handlePageChange(1);
  }, [categoryParam]);

  const { data, isLoading, isError } = searchQuery
    ? useGetBoardPostSearch<any>({
        boardCode,
        take: itemsPerPage,
        page: currentPage - 1,
        category: selectedCategory ?? undefined,
        q: searchQuery,
      })
    : useGetBoardPosts<any>({
        boardCode,
        take: itemsPerPage,
        page: currentPage - 1,
        category: selectedCategory ?? undefined,
      });

  const posts: Post[] = data?.data?.postListResDto || [];
  const totalPages: number = data?.data?.pageInfo?.totalPages || 1;

  return {
    posts,
    totalPages,
    currentPage,
    handlePageChange,
    categoryParam,
    subcategories,
    isLoading,
    isError,
  };
}
