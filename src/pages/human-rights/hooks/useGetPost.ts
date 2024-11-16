import { ApiError, useStuQuery } from '@/pages/human-rights/hooks/useStuQuery.ts';
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
  postId: string;
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions?: Omit<
    UndefinedInitialDataOptions<GetPostResponse<TRaw>, AxiosError | ApiError | ZodError, GetPostResponse<TData>>,
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
  return useStuQuery<GetPostResponse<TRaw>, GetPostResponse<TData>, AxiosError | ApiError | ZodError>(
    queryKey,
    config,
    {
      select: ({ postDetailResDto }) => {
        if (!zodSchema) return { postDetailResDto } as GetPostResponse<unknown> as GetPostResponse<TData>;
        return {
          postDetailResDto: zodSchema.parse(postDetailResDto),
        };
      },
      ...queryOptions,
    }
  );
}
