import { useEffect } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useNoticeCategory } from './useNoticeCategory';
import {
  categoryToCode,
  subCategoryMap,
  subCategoryToCode,
  collegeSubCategoryToCode,
  collegeSubCategoryMap,
} from '../const/data';
import { Post } from '@/types/apis/get';

export function useNoticeBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { urlCategory, urlSubCategory } = useNoticeCategory();

  const subcategories =
    urlCategory === 'college'
      ? Object.values(collegeSubCategoryMap).filter(Boolean)
      : Object.values(subCategoryMap).filter(Boolean);

  const selectedCategory = categoryToCode[urlCategory];
  const selectedSubCategory =
    urlCategory === 'college' ? collegeSubCategoryToCode[urlSubCategory] : subCategoryToCode[urlSubCategory];

  useEffect(() => {
    handlePageChange(1);
  }, [urlCategory, urlSubCategory]);

  const { data, isLoading, isError } = useGetBoardPosts<any>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    groupCode: selectedCategory,
    memberCode: selectedSubCategory,
  });

  const posts: Post[] = data?.data?.postListResDto || [];
  const totalPages: number = data?.data?.pageInfo?.totalPages || 1;

  return {
    posts,
    totalPages,
    currentPage,
    handlePageChange,
    subcategories,
    isLoading,
    isError,
  };
}
