import { ApiError, useStuQuery } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError, ZodSchema, ZodTypeDef } from 'zod';
import { PostAcl } from '@/pages/human-rights/schema.ts';

/**
 * 게시글 댓글 목록 데이터입니다.
 * @typeParam P - 댓글의 타입입니다.
 */
export interface GetCommentsResponse<P> {
  postComments: P[];
  allowedAuthorities: PostAcl[];
  total: number;
}

export interface GetCommentsOptions<TRaw, TData = TRaw, TZodTypeDef extends ZodTypeDef = ZodTypeDef> {
  postId: string;
  type: '인기순' | '최신순';
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
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
  const queryKey = ['getPost', postId, type];
  const config: AxiosRequestConfig = {
    url: `/board/posts/${postId}/comments`,
    method: 'get',
  };
  return useStuQuery<GetCommentsResponse<TRaw>, GetCommentsResponse<TData>, AxiosError | ApiError | ZodError>(
    queryKey,
    config,
    {
      select: ({ postComments, ...data }) => {
        if (!zodSchema) return { postComments, ...data } as GetCommentsResponse<unknown> as GetCommentsResponse<TData>;
        const schemaArray = z.array(zodSchema);
        const list = schemaArray.parse(postComments);
        return {
          postComments: list,
          ...data,
        };
      },
      ...queryOptions,
    }
  );
}
