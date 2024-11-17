import { SearchPostsOptions, useSearchPosts } from '@/pages/human-rights/hooks/query/useSearchPosts.ts';
import {
  HumanRightsComment,
  HumanRightsCommentResponse,
  HumanRightsCommentSchema,
  HumanRightsPost,
  HumanRightsPostResponse,
  HumanRightsPostSchema,
  HumanRightsPostSummary,
  HumanRightsPostSummaryResponse,
  HumanRightsPostSummarySchema,
} from '@/pages/human-rights/schema.ts';
import { GetPostOptions, useGetPost } from '@/pages/human-rights/hooks/query/useGetPost.ts';
import { GetCommentsOptions, useGetComments } from '@/pages/human-rights/hooks/query/useGetComments.ts';

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
