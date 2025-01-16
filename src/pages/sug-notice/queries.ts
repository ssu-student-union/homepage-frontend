import { SearchPostsOptions, useSearchPosts } from '../human-rights/hooks/query/useSearchPosts';
import { GetPostOptions, useGetPost } from '../human-rights/hooks/query/useGetPost';
import { GetCommentsOptions, useGetComments } from '../human-rights/hooks/query/useGetComments';
import { useCreatePost, UseCreatePostOptions } from '../human-rights/hooks/mutations/useCreatePost';
import { useDeletePost, UseDeletePostOptions } from '../human-rights/hooks/mutations/useDeletePost';
import { usePatchPost, UsePatchPostOptions } from '../human-rights/hooks/mutations/usePatchPost';
import { useUploadFiles, UseUploadFilesOptions } from '../human-rights/hooks/mutations/useUploadFiles';
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

// GET
// /board/{boardCode}/posts/search
// 검색키워드를 활용한 게시판 별 게시물 리스트 조회 api

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

export function useGetSuggestComment({
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
