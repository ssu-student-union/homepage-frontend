import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { GetAuditBoardResp, Post } from '@/types/apis/get';
import { calculateTotalPages } from '../utils/paginationUtils';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  const { data, isLoading, isError } = useGetBoardPosts<GetAuditBoardResp>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    category: selectedCategory,
  });

  console.log(data);

  const posts: Post[] = data?.data?.postListResDto || [];
  const totalItems: number = data?.data?.pageInfo?.totalElements || 0;
  const totalPages: number = calculateTotalPages(totalItems, itemsPerPage);
  console.log(posts);
  console.log(totalItems);
  console.log(totalPages);

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
