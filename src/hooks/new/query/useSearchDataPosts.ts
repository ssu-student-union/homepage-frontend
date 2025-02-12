import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError, ZodSchema, ZodTypeDef } from 'zod';
import { PostsResponse } from '@/hooks/new/query/useSearchPosts';

/**
 * 자료집 목록 데이터입니다.
 */

export interface SearchDataPostsOptions<TRaw, TData = TRaw, TZodTypeDef extends ZodTypeDef = ZodTypeDef> {
  page?: number;
  take?: number;
  q?: string;
  majorCategory?: string;
  middleCategory?: string;
  subCategory?: string;
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<PostsResponse<TRaw>, AxiosError | ApiError | ZodError, PostsResponse<TData>>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useSearchDataPosts<TRaw, TData = TRaw>({
  q,
  page,
  take,
  zodSchema,
  queryOptions,
}: SearchDataPostsOptions<TRaw, TData>) {
  const accessToken = localStorage.getItem('accessToken');
  const queryKey = ['searchPosts', accessToken, q, take, page];
  const config: AxiosRequestConfig = {
    url: `/board/data/posts/search`,
    method: 'get',
    params: {
      page,
      take: take ?? 11,
      q: q ?? '',
    },
  };
  return useStuQuery<PostsResponse<TRaw>, PostsResponse<TData>, AxiosError | ApiError | ZodError>(queryKey, config, {
    select: ({ postListResDto, ...data }) => {
      if (!zodSchema) return { postListResDto, ...data } as PostsResponse<unknown> as PostsResponse<TData>;
      const schemaArray = z.array(zodSchema);
      const list = schemaArray.parse(postListResDto);
      return {
        postListResDto: list,
        ...data,
      };
    },
    ...queryOptions,
  });
}
