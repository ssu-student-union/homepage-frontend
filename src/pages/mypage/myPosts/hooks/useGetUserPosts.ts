import { useStuQuery } from '@/hooks/new/useStuQuery';
import { GetUserPostsResponse } from '@/types/apis/get';
import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from '@/hooks/new/useStuQuery';

type UseGetUserPostsOptions = {
  enabled?: boolean;
  queryOptions?: UseQueryOptions<GetUserPostsResponse, AxiosError | ApiError>;
};

export const useGetUserPosts = (page: number, take: number, { enabled, queryOptions }: UseGetUserPostsOptions = {}) => {
  return useStuQuery<GetUserPostsResponse>(
    ['get-user-posts', page, take],
    {
      url: `/board/mypost`,
      method: 'GET',
      params: { page, take },
    },
    {
      ...queryOptions,
      enabled,
    }
  );
};
