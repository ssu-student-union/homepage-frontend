import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError, ZodSchema, ZodTypeDef } from 'zod';
import { PostsResponse } from '@/hooks/new/query/useSearchPosts';
import { DataPostSummary, DataPostSummaryResponse, DataPostSummarySchema } from '@/pages/data/schema';

/**
 * 자료집 목록 데이터 검색 API 훅입니다.
 */

export interface SearchDataPostsOptions<TZodTypeDef extends ZodTypeDef = ZodTypeDef> {
  page?: number;
  take?: number;
  q?: string;
  majorCategory?: string;
  middleCategory?: string;
  subCategory?: string;
  zodSchema?: ZodSchema<DataPostSummary, TZodTypeDef, DataPostSummaryResponse>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<
      PostsResponse<DataPostSummaryResponse>,
      AxiosError | ApiError | ZodError,
      PostsResponse<DataPostSummary>
    >,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useSearchDataPosts({
  q,
  page,
  take,
  majorCategory,
  middleCategory,
  subCategory,
  queryOptions,
}: SearchDataPostsOptions) {
  const accessToken = localStorage.getItem('accessToken');
  const queryKey = ['searchPosts', 'data', accessToken, q, take, page, majorCategory, middleCategory, subCategory];

  // undefined 값을 필터링하는 방식으로 params 객체 생성
  const params = Object.fromEntries(
    Object.entries({
      page,
      take: take ?? 11,
      q: q ?? '',
      majorCategory,
      middleCategory,
      subCategory,
    }).filter(([_, v]) => v !== '')
  );

  const config: AxiosRequestConfig = {
    url: `/board/data/posts/search`,
    method: 'get',
    params,
  };

  const zodSchema = DataPostSummarySchema;

  return useStuQuery<
    PostsResponse<DataPostSummaryResponse>,
    PostsResponse<DataPostSummary>,
    AxiosError | ApiError | ZodError
  >(queryKey, config, {
    select: ({ postListResDto, ...data }) => {
      if (!zodSchema) return { postListResDto, ...data } as PostsResponse<unknown> as PostsResponse<DataPostSummary>;
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
