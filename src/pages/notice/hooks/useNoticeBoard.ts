import { useEffect } from 'react';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { NoticeResponse } from '../types';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';

export function useNoticeBoard(boardCode: string, category: string, subCategory: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  const searchQuery = useRecoilValue(SearchState);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory]);

  const { data, isLoading, isError } = useGetBoardPostSearch<NoticeResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    groupCode: category === '중앙' ? '중앙기구' : '단과대학생회',
    memberCode: subCategory === '전체' ? '' : subCategory,
    q: searchQuery,
  });

  const totalPages: number = data?.data?.pageInfo?.totalPages ?? 0;

  return {
    data,
    totalPages,
    currentPage,
    handlePageChange,
    isLoading,
    isError,
  };
}
