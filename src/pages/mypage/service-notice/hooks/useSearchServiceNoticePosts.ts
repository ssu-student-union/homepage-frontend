import { SearchPostsOptions, useSearchPosts } from '@/hooks/new/query/useSearchPosts';
import { ServiceNoticePostSummaryResponse, ServiceNoticePostSummarySchema, ServiceNoticePostSummary } from '../schema';

export function useSearchServiceNoticePosts({
  q,
  page,
  take,
  category,
  queryOptions,
  boardCode,
}: Omit<SearchPostsOptions<ServiceNoticePostSummaryResponse, ServiceNoticePostSummary>, 'zodSchema'>) {
  const zodSchema = ServiceNoticePostSummarySchema;
  return useSearchPosts({
    boardCode,
    q,
    page,
    take,
    category,
    zodSchema,
    queryOptions,
  });
}
