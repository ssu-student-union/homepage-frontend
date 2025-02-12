import { SearchDataPostsOptions, useSearchDataPosts } from '@/hooks/new/query/useSearchDataPosts';
import { DataPostSummary, DataPostSummaryResponse, DataPostSummarySchema } from '@/pages/data/schema';

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
