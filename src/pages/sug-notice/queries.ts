import { SearchPostsOptions, useSearchPosts } from '@/hooks/new/query/useSearchPosts';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { GetCommentsOptions, useGetComments } from '@/hooks/new/query/useGetComments';
import { useCreatePost, UseCreatePostOptions } from '@/hooks/new/mutations/useCreatePost';
import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { usePatchPost, UsePatchPostOptions } from '@/hooks/new/mutations/usePatchPost';
import { useUploadFiles, UseUploadFilesOptions } from '@/hooks/new/mutations/useUploadFiles';

import {
  SugNoticePostSummaryResponse,
  SugNoticePostsSummary,
  SugNoticePostSummarySchema,
  SuggestPost,
  SuggestPostResponse,
  SuggestPostSchema,
  SuggestPostEditRequest,
  SuggestCommentResponse,
  SuggestComment,
  SuggestCommentSchema,
} from './schema';

const BOARD_CODE = '건의게시판' as const;

/**
 *
 * GET
 * 게시판 별 게시물 리스트 조회 API
 * 백엔드 URL 설명입니다.
 *
 * @route GET /board/{boardCode}/posts/search
 * @description 검색 키워드를 활용하여 특정 게시판의 게시물 리스트를 조회합니다.
 * @returns {Promise<Object[]>}
 */

export function useSearchSugNoticePosts({
  q,
  page,
  take,
  category,
  queryOptions,
}: Omit<SearchPostsOptions<SugNoticePostSummaryResponse, SugNoticePostsSummary>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = SugNoticePostSummarySchema;
  return useSearchPosts({
    boardCode: BOARD_CODE,
    q,
    page,
    take,
    category,
    zodSchema,
    queryOptions,
  });
}

export function useGetSuggestPost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<SuggestPostResponse, SuggestPost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = SuggestPostSchema;
  return useGetPost({
    boardCode: BOARD_CODE,
    postId,
    zodSchema,
    queryOptions,
  });
}

export function useCreateSuggestPost({
  mutationOptions,
}: Omit<UseCreatePostOptions<SuggestPostEditRequest>, 'boardCode'> = {}) {
  return useCreatePost({ boardCode: BOARD_CODE, mutationOptions });
}

export function usePatchSuggestPost({
  mutationOptions,
}: Omit<UsePatchPostOptions<SuggestPostEditRequest>, 'boardCode'> = {}) {
  return usePatchPost({ boardCode: BOARD_CODE, mutationOptions });
}

export function useDeleteSuggestPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}

export function useUploadSuggestFiles({ mutationOptions }: Omit<UseUploadFilesOptions, 'boardCode'> = {}) {
  return useUploadFiles({ boardCode: BOARD_CODE, mutationOptions });
}

export function useGetSuggestComments({
  postId,
  type,
  queryOptions,
}: Omit<GetCommentsOptions<SuggestCommentResponse, SuggestComment>, 'zodSchema'>) {
  const zodSchema = SuggestCommentSchema;
  return useGetComments({
    postId,
    type,
    zodSchema,
    queryOptions,
  });
}
