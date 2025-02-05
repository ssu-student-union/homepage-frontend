import { useEffect } from 'react';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';
import { NoticeResponse } from '@/pages/notice/types';

export function useServiceNoticeBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  useEffect(() => {
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  }, []);

  const { data, isLoading, isError } = useGetBoardPosts<NoticeResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1,
    groupCode: '',
    memberCode: '',
  });

  const totalPages: number = data?.data.pageInfo.totalPages ?? 0;
  const idata = data;
  return { idata, totalPages, currentPage, handlePageChange, isLoading, isError };
}
