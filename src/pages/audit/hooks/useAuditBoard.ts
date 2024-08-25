import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { Post } from '@/types/apis/get';
import { calculateTotalPages } from '../utils/paginationUtils';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  const { data, isLoading, isError } = useGetBoardPosts({
    boardCode,
    take: itemsPerPage,
    page: currentPage,
    category: selectedCategory,
  });

  const posts: Post[] = data?.data?.postListResDto || [];
  const totalItems: number = data?.data?.pageInfo?.totalElements || 0;
  const totalPages: number = calculateTotalPages(totalItems, itemsPerPage);

  console.log(totalItems);

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
