import { SearchPostsOptions, useSearchPosts } from '@/hooks/new/query/useSearchPosts';
import { NoticeContentResponse } from '@/pages/notice/types';

const BOARD_CODE = '공지사항게시판' as const;

export function useSearchNoticePosts({
  q,
  page,
  take,
  groupCode,
  memberCode,
  queryOptions,
}: Omit<SearchPostsOptions<NoticeContentResponse>, 'boardCode' | 'zodSchema'>) {
  return useSearchPosts({
    boardCode: BOARD_CODE,
    q,
    page,
    take,
    groupCode,
    memberCode,
    queryOptions,
  });
}
