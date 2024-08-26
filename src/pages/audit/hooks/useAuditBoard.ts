import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useCategory } from './useCategory';
import { categoryMap } from '../const/data';
import { GetAuditBoardResp, Post } from '@/types/apis/get';

export function useAuditBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { categoryParam } = useCategory();

  console.log('페이지당 요소 개수: ', itemsPerPage);
  console.log('currentpage:', currentPage);

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
  const totalPages: number = data?.data?.pageInfo?.totalPages || 1;
  console.log('게시물: ', posts);
  console.log('게시물 개수: ', totalItems);
  console.log('전체 페이지: ', totalPages);

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
