import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { Post } from '@/types/apis/get';

export function useNoticeBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  const subcategories = Object.values(categoryMap).filter(Boolean) as string[];
  const selectedCategory = categoryMap[categoryParam] === '전체' ? null : categoryMap[categoryParam];

  const { data, isLoading, isError } = useGetBoardPosts<any>({
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
