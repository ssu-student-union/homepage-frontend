import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { ZodError, ZodSchema, ZodTypeDef } from 'zod';

/**
 * 게시판의 단건 조회 데이터입니다.
 * @typeParam P - 게시물의 타입입니다.
 */
export interface GetPostResponse<P> {
  postDetailResDto: P;
}

export interface GetPostOptions<TRaw, TData = TRaw, TZodTypeDef extends ZodTypeDef = ZodTypeDef> {
  boardCode: string;
  postId: number;
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<GetPostResponse<TRaw>, AxiosError | ApiError | ZodError, TData>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useGetPost<TRaw, TData = TRaw>({
  boardCode,
  postId,
  zodSchema,
  queryOptions,
}: GetPostOptions<TRaw, TData>) {
  const queryKey = ['getPost', boardCode, postId];
  const config: AxiosRequestConfig = {
    url: `/board/${boardCode}/posts/${postId}`,
    method: 'get',
  };
  return useStuQuery<GetPostResponse<TRaw>, TData, AxiosError | ApiError | ZodError>(queryKey, config, {
    select: ({ postDetailResDto }) => {
      if (!zodSchema) return postDetailResDto as unknown as TData;
      return zodSchema.parse(postDetailResDto);
    },
    ...queryOptions,
  });
}
