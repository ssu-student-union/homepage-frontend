import { useState } from 'react';
import { GetNoticeBoardPostsResponse } from '@/types/getBoardPosts';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';

interface UseNoticePostProps {
  boardCode: string;
  groupCode: string;
  memberCode?: string;
  take: number;
}

export const useNoticePost = ({ boardCode, groupCode, memberCode, take }: UseNoticePostProps) => {
  const [page] = useState(0);

  const { data, isLoading } = useGetBoardPosts<GetNoticeBoardPostsResponse>({
    boardCode,
    take,
    page,
    groupCode,
    memberCode,
  });

  const noticeCount = data?.data.pageInfo.totalElements || 0;

  return { data, isLoading, noticeCount };
};
