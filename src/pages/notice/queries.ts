import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { SearchPostsOptions, useSearchPosts } from '@/hooks/new/query/useSearchPosts';
import { NoticePost, NoticePostResponse, NoticePostSchema } from '@/pages/notice/schema';
import { NoticeContentResponse } from '@/pages/notice/types';

const BOARD_CODE = '공지사항게시판' as const;

// 공지사항 API hook중 공통 게시판 API을 쓸 수 있는 hook

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

// 공지사항 게시물 상세 조회
export function useGetNoticePost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<NoticePostResponse, NoticePost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = NoticePostSchema;
  return useGetPost({
    boardCode: BOARD_CODE,
    postId,
    zodSchema,
    queryOptions,
  });
}

// 공지사항 게시물 DELETE
export function useDeleteNoticePost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}
