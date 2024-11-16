import { StuQueryOptions, useStuQuery } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { AxiosRequestConfig } from 'axios';

export interface SearchPostsOptions<TRaw, TData = TRaw> extends StuQueryOptions<TRaw, TData> {
  boardCode: string;
  q: string;
  page?: number;
  take: number;
  category?: string;
  groupCode?: string;
  memberCode?: string;
}

export function useSearchPosts<TRaw, TData = TRaw>({
  boardCode,
  q = '',
  page,
  take = 15,
  category,
  groupCode,
  memberCode,
  ...options
}: SearchPostsOptions<TRaw, TData>) {
  const queryKey = ['searchPosts', boardCode, category, q, take, page];
  const config: AxiosRequestConfig = {
    url: `/board/${boardCode}/posts/search`,
    method: 'get',
    params: {
      page,
      take,
      category,
      q,
      groupCode,
      memberCode,
    },
  };
  return useStuQuery(queryKey, config, options);
}
