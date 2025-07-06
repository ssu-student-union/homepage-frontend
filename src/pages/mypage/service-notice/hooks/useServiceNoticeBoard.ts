import { useEffect, useRef } from 'react';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useGetBoardPosts } from '@/hooks/deprecated/get/useGetBoardPosts';
import { NoticeResponse } from '@/pages/notice/types';

export function useServiceNoticeBoard(boardCode: string) {
  const { itemsPerPage } = useResponseBoard();
  const { currentPage, handlePageChange } = useCurrentPage();

  // ✅ 첫 렌더링 여부를 추적하는 useRef 추가
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      handlePageChange(1); // 첫 렌더링 시에만 실행
      isFirstRender.current = false; // 이후에는 실행되지 않도록 변경
    }
  }, [handlePageChange]); // ✅ ESLint 경고 제거 (handlePageChange 포함)

  const { data, isLoading, isError } = useGetBoardPosts<NoticeResponse>({
    boardCode,
    take: itemsPerPage,
    page: currentPage - 1, // 현재 페이지 반영
    groupCode: '',
    memberCode: '',
  });

  const totalPages: number = data?.data.pageInfo.totalPages ?? 0;
  const idata = data;

  return { idata, totalPages, currentPage, handlePageChange, isLoading, isError };
}
