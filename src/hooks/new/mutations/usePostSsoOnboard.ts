import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { ssoClient } from '@/apis/ssoClient';

/**
 * SSO 온보딩 요청 데이터 스키마입니다.
 */
export const SsoOnboardRequestSchema = z.object({
  student_id: z.string(),
  student_name: z.string(),
});

export type SsoOnboardRequest = z.infer<typeof SsoOnboardRequestSchema>;

interface UsePostSsoOnboardOptions {
  mutationOptions?: UseMutationOptions<unknown, AxiosError, SsoOnboardRequest>;
}

/**
 * SSO 온보딩(학생 정보 매핑)을 추가하는 Mutation 훅입니다.
 */
export function usePostSsoOnboard({ mutationOptions }: UsePostSsoOnboardOptions = {}) {
  return useMutation({
    mutationFn: async (data: SsoOnboardRequest) => {
      const validData = SsoOnboardRequestSchema.parse(data);
      const response = await ssoClient.post('/auth/onboard', validData);
      return response.data;
    },
    ...mutationOptions,
  });
}
