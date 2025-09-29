import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { ServiceNoticePost, ServiceNoticePostResponse, ServiceNoticePostSchema } from './schema';
import { BOARD_CODE } from './const/data';
import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
//서비스공지사항 API Hook중 공통 게시판 API를 쓸 수 있는 hook

//서비스공지사항 게시물 상세 조회
export function useGetServiceNoticePost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<ServiceNoticePostResponse, ServiceNoticePost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = ServiceNoticePostSchema;
  return useGetPost({
    boardCode: BOARD_CODE,
    postId,
    zodSchema,
    queryOptions,
  });
}

//서비스 공지사항 게시물 DELETE
export function useDeleteServiceNoticePost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}
