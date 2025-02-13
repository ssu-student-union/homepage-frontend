import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { DataPost, DataPostResponse, DataPostSchema } from '@/pages/data/schema';

// 자료집 API hook중 공통 게시판 API을 쓸 수 있는 hook

const BOARD_CODE = '자료집게시판' as const;

// 자료집 게시물 상세 조회
export function useGetDataPost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<DataPostResponse, DataPost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = DataPostSchema;
  return useGetPost({
    boardCode: 'data',
    postId,
    zodSchema,
    queryOptions,
  });
}

// 자료집 DELETE
export function useDeleteHumanRightsPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}
