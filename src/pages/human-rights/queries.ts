import { SearchPostsOptions, useSearchPosts } from '@/hooks/new/query/useSearchPosts.ts';
import {
  HumanRightsComment,
  HumanRightsCommentResponse,
  HumanRightsCommentSchema,
  HumanRightsPost,
  HumanRightsPostEditRequest,
  HumanRightsPostResponse,
  HumanRightsPostSchema,
  HumanRightsPostSummary,
  HumanRightsPostSummaryResponse,
  HumanRightsPostSummarySchema,
} from '@/pages/human-rights/schema.ts';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost.ts';
import { GetCommentsOptions, useGetComments } from '@/hooks/new/query/useGetComments.ts';
import { useCreatePost, UseCreatePostOptions } from '@/hooks/new/mutations/useCreatePost.ts';
import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost.ts';
import { usePatchPost, UsePatchPostOptions } from '@/hooks/new/mutations/usePatchPost.ts';
import { useUploadFiles, UseUploadFilesOptions } from '@/hooks/new/mutations/useUploadFiles.ts';

const BOARD_CODE = '인권신고게시판' as const;

export function useSearchHumanRightsPosts({
  q,
  page,
  take,
  category,
  queryOptions,
}: Omit<SearchPostsOptions<HumanRightsPostSummaryResponse, HumanRightsPostSummary>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = HumanRightsPostSummarySchema;
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

export function useGetHumanRightsPost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<HumanRightsPostResponse, HumanRightsPost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = HumanRightsPostSchema;
  return useGetPost({
    boardCode: BOARD_CODE,
    postId,
    zodSchema,
    queryOptions,
  });
}

export function useGetHumanRightsComments({
  postId,
  type,
  queryOptions,
}: Omit<GetCommentsOptions<HumanRightsCommentResponse, HumanRightsComment>, 'zodSchema'>) {
  const zodSchema = HumanRightsCommentSchema;
  return useGetComments({
    postId,
    type,
    zodSchema,
    queryOptions,
  });
}

export function useCreateHumanRightsPost({
  mutationOptions,
}: Omit<UseCreatePostOptions<HumanRightsPostEditRequest>, 'boardCode'> = {}) {
  return useCreatePost({ boardCode: BOARD_CODE, mutationOptions });
}

export function usePatchHumanRightsPost({
  mutationOptions,
}: Omit<UsePatchPostOptions<HumanRightsPostEditRequest>, 'boardCode'> = {}) {
  return usePatchPost({ boardCode: BOARD_CODE, mutationOptions });
}

export function useDeleteHumanRightsPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}

export function useUploadHumanRightsFiles({ mutationOptions }: Omit<UseUploadFilesOptions, 'boardCode'> = {}) {
  return useUploadFiles({ boardCode: BOARD_CODE, mutationOptions });
}
