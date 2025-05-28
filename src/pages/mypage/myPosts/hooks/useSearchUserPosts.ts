import { useStuQuery } from '@/hooks/new/useStuQuery';
import { GetUserPostsResponse } from '@/types/apis/get';
import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from '@/hooks/new/useStuQuery';

type UseSearchUserPostsOptions = {
  enabled?: boolean;
  queryOptions?: UseQueryOptions<GetUserPostsResponse, AxiosError | ApiError>;
};

export const useSearchUserPosts = (
  page: number,
  take: number,
  q: string,
  { enabled, queryOptions }: UseSearchUserPostsOptions = {}
) => {
  return useStuQuery<GetUserPostsResponse>(
    ['get-user-posts-search', page, take, q],
    {
      url: `/board/mypost/search`,
      method: 'GET',
      params: { page, take, q },
    },
    {
      ...queryOptions,
      enabled,
    }
  );
};
