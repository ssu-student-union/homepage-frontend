import { SearchPostsOptions, useSearchPosts } from '@/pages/human-rights/hooks/useSearchPosts.ts';
import {
  HumanRightsPostSummary,
  HumanRightsPostSummaryResponse,
  HumanRightsPostSummarySchema,
} from '@/pages/human-rights/schema.ts';

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
