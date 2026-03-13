import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { z, ZodError, type ZodType } from 'zod';
import { PostAcl } from '@/schemas/common';

/**
 * 게시글 댓글 목록 데이터입니다.
 * @typeParam P - 댓글의 타입입니다.
 */
export interface GetCommentsResponse<P> {
  postComments: P[];
  allowedAuthorities: PostAcl[];
  total: number;
}

export interface GetCommentsOptions<TRaw, TData = TRaw> {
  postId: number;
  type: '인기순' | '최신순';
  zodSchema?: ZodType<TData, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<
      GetCommentsResponse<TRaw>,
      AxiosError | ApiError | ZodError,
      GetCommentsResponse<TData>
    >,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useGetComments<TRaw, TData = TRaw>({
  postId,
  type,
  zodSchema,
  queryOptions,
}: GetCommentsOptions<TRaw, TData>) {
  const queryKey = ['getComments', postId, type];
  const config: AxiosRequestConfig = {
    url: `/board/posts/${postId}/comments`,
    method: 'get',
    params: {
      type,
    },
  };
  return useStuQuery<GetCommentsResponse<TRaw>, GetCommentsResponse<TData>, AxiosError | ApiError | ZodError>(
    queryKey,
    config,
    {
      select: ({ postComments, ...data }) => {
        if (!zodSchema) return { postComments, ...data } as GetCommentsResponse<unknown> as GetCommentsResponse<TData>;
        const list = z.array(zodSchema).parse(postComments) as TData[];
        return {
          postComments: list,
          ...data,
        };
      },
      ...queryOptions,
    }
  );
}
