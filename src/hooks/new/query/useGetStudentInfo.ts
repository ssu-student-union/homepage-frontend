import { useQuery, UndefinedInitialDataOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z, ZodError } from 'zod';
import { ssoClient } from '@/apis/ssoClient';

/**
 * 학생(유저) 정보 조회 데이터 스키마입니다.
 */
export const GetStudentInfoResponseSchema = z.object({
  studentId: z.string().optional(),
  name: z.string().optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  academicStatus: z.string().optional(),
});

export type GetStudentInfoResponse = z.infer<typeof GetStudentInfoResponseSchema>;

export interface GetStudentInfoOptions {
  queryOptions?: Omit<
    UndefinedInitialDataOptions<GetStudentInfoResponse, AxiosError | ZodError, GetStudentInfoResponse>,
    'queryKey' | 'queryFn'
  >;
}

/**
 * 학생(유저) 정보를 조회하는 Query 훅입니다.
 */
export function useGetStudentInfo({ queryOptions }: GetStudentInfoOptions = {}) {
  return useQuery<GetStudentInfoResponse, AxiosError | ZodError, GetStudentInfoResponse>({
    queryKey: ['getStudentInfo'],
    queryFn: async () => {
      const response = await ssoClient.get('/auth/me');
      return GetStudentInfoResponseSchema.parse(response.data);
    },
    ...queryOptions,
  });
}
