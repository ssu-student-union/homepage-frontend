import { ApiError, useStuQuery } from '@/hooks/new/useStuQuery';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { UndefinedInitialDataOptions } from '@tanstack/react-query';
import { z, ZodError } from 'zod';

/**
 * 관리자 프로필 조회 데이터 스키마입니다.
 */
export const ManagerProfileResponseSchema = z.object({
  memberName: z.string().nullable(),
  majorName: z.string().nullable(),
  groupCodeList: z.array(z.string()),
});

export type ManagerProfileResponse = z.infer<typeof ManagerProfileResponseSchema>;

export interface GetManagerProfileOptions {
  queryOptions?: Omit<
    UndefinedInitialDataOptions<ManagerProfileResponse, AxiosError | ApiError | ZodError, ManagerProfileResponse>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

/**
 * 관리자 프로필 정보를 조회하는 Query 훅입니다.
 */
export function useGetManagerProfile({ queryOptions }: GetManagerProfileOptions = {}) {
  const queryKey = ['getManagerProfile'];
  const config: AxiosRequestConfig = {
    url: '/managers/profile',
    method: 'get',
  };
  return useStuQuery<ManagerProfileResponse, ManagerProfileResponse, AxiosError | ApiError | ZodError>(
    queryKey,
    config,
    {
      select: (res) => {
        return ManagerProfileResponseSchema.parse(res);
      },
      ...queryOptions,
    }
  );
}
