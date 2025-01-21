import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery.ts';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import z, { ZodError } from 'zod';

/**
 * 사용자 정보 조회 데이터입니다.
 */
export type GetUserInfoResponse = z.infer<typeof GetUserInfoResponseSchema>;

export const GetUserInfoResponseSchema = z.object({
  name: z.string(),
  studentId: z.string(),
  major: z.string(),
  isCouncil: z.boolean(),
});

export interface GetUserInfoOptions {
  queryOptions?: Omit<
    UndefinedInitialDataOptions<GetUserInfoResponse, AxiosError | ApiError | ZodError, GetUserInfoResponse>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useGetUserInfo({ queryOptions }: GetUserInfoOptions = {}) {
  const accessToken = localStorage.getItem('accessToken');
  const queryKey = ['getUserInfo', accessToken];
  const config: AxiosRequestConfig = {
    url: `/users/user-info`,
    method: 'get',
  };
  return useStuQuery<GetUserInfoResponse, GetUserInfoResponse, AxiosError | ApiError | ZodError>(queryKey, config, {
    select: (res) => {
      return GetUserInfoResponseSchema.parse(res);
    },
    ...queryOptions,
  });
}
