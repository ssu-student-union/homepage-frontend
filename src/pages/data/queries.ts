import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { SearchDataPostsOptions, useSearchDataPosts } from '@/hooks/new/query/useSearchDataPosts';
import {
  DataPost,
  DataPostResponse,
  DataPostSchema,
  DataPostSummary,
  DataPostSummaryResponse,
  DataPostSummarySchema,
} from '@/pages/data/schema';

const BOARD_CODE = 'data' as const;

export function useSearchDataPost({
  q,
  page,
  take,
  majorCategory,
  middleCategory,
  subCategory,
  queryOptions,
}: Omit<SearchDataPostsOptions<DataPostSummaryResponse, DataPostSummary>, 'zodSchema'>) {
  const zodSchema = DataPostSummarySchema;
  return useSearchDataPosts({
    q,
    page,
    take,
    majorCategory,
    middleCategory,
    subCategory,
    zodSchema,
    queryOptions,
  });
}

export function useGetDataPost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<DataPostResponse, DataPost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = DataPostSchema;
  return useGetPost({
    boardCode: BOARD_CODE,
    postId,
    zodSchema,
    queryOptions,
  });
}

// export function useCreateHumanRightsPost({
//   mutationOptions,
// }: Omit<UseCreatePostOptions<HumanRightsPostEditRequest>, 'boardCode'> = {}) {
//   return useCreatePost({ boardCode: BOARD_CODE, mutationOptions });
// }

// export function usePatchHumanRightsPost({
//   mutationOptions,
// }: Omit<UsePatchPostOptions<HumanRightsPostEditRequest>, 'boardCode'> = {}) {
//   return usePatchPost({ boardCode: BOARD_CODE, mutationOptions });
// }

// export function useDeleteHumanRightsPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
//   return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
// }
