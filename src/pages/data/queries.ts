import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { BOARD_CODE } from '@/pages/data/const/data';
import { DataPost, DataPostResponse, DataPostSchema } from '@/pages/data/schema';
import { useUploadFiles, UseUploadFilesOptions } from '@/hooks/new/mutations/useUploadFiles';

// 자료집 API hook중 공통 게시판 API을 쓸 수 있는 hook

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
export function useDeleteDataPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}

// 자료집 파일 업로드
export function useUploadDataFiles({ mutationOptions }: Omit<UseUploadFilesOptions, 'boardCode'> = {}) {
  return useUploadFiles({ boardCode: 'data', mutationOptions });
}
