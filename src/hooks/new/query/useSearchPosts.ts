import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError, ZodSchema, ZodTypeDef } from 'zod';
import { PageInfo } from '@/types/apis/get';
import { PostAcl } from '@/schemas/common';

/**
 * 게시글 목록 데이터입니다.
 * `pageInfo`는 현재 페이지 정보, `allowedAuthorities`와 `deniedAuthorities`는 각각 부여된 권한, 거부된 권한을 표현합니다.
 * @typeParam P - 반환된 게시물의 타입입니다.
 */
export interface PostsResponse<P> {
  postListResDto: P[];
  pageInfo: PageInfo;
  allowedAuthorities: PostAcl[];
  deniedAuthorities: PostAcl[];
}

export interface SearchPostsOptions<TRaw, TData = TRaw, TZodTypeDef extends ZodTypeDef = ZodTypeDef> {
  boardCode: string;
  q?: string;
  page?: number;
  take?: number;
  category?: string;
  groupCode?: string;
  memberCode?: string;
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<PostsResponse<TRaw>, AxiosError | ApiError | ZodError, PostsResponse<TData>>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useSearchPosts<TRaw, TData = TRaw>({
  boardCode,
  q,
  page,
  take,
  category,
  groupCode,
  memberCode,
  zodSchema,
  queryOptions,
}: SearchPostsOptions<TRaw, TData>) {
  const accessToken = localStorage.getItem('accessToken');
  const queryKey = ['searchPosts', boardCode, accessToken, category, q, take, page];
  const config: AxiosRequestConfig = {
    url: `/board/${boardCode}/posts/search`,
    method: 'get',
    params: {
      page,
      take: take ?? 15,
      category,
      q: q ?? '',
      groupCode,
      memberCode,
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
