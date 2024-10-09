import { useEffect } from 'react';
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
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { NoticeResponse } from '../types';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';

export function useNoticeBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();
  const { urlCategory, urlSubCategory } = useNoticeCategory();

  const searchQuery = useRecoilValue(SearchState);

  const subcategories =
    urlCategory === 'college'
      ? Object.values(collegeSubCategoryMap).filter(Boolean)
      : Object.values(subCategoryMap).filter(Boolean);

  const selectedCategory = categoryToCode[urlCategory];
  const selectedSubCategory =
    urlCategory === 'college' ? collegeSubCategoryToCode[urlSubCategory] : subCategoryToCode[urlSubCategory];

  useEffect(() => {
    handlePageChange(1);
  }, [urlCategory, urlSubCategory, handlePageChange]);

  const { data, isLoading, isError } = useGetBoardPostSearch<NoticeResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    groupCode: selectedCategory,
    memberCode: selectedSubCategory,
    q: searchQuery,
  });

  const totalPages: number = data?.data?.pageInfo?.totalPages ?? 0;

  return {
    data,
    totalPages,
    currentPage,
    handlePageChange,
    subcategories,
    isLoading,
    isError,
  };
}
