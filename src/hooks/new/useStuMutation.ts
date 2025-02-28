import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery.ts';

/**
 * 총학생회 홈페이지에서 반환하는 공통된 API 형식을 처리하는 tanstack query 훅입니다.
 * 기본적인 API 응답을 처리하고, 내부 data를 반환합니다.
 * 요청 중 오류가 발생할 경우 AxiosError가, API 자체 오류가 발생할 경우 ApiError가 throw됩니다.
 * @param mutationFn - `TVariables`를 입력받고, `Promise<ApiResponse<TData>>`를 반환하는 함수입니다.
 * @param mutationOptions - 추가로 tanstack query mutation을 설정할 수 있습니다. `mutationFn` 값은 미리 지정되어 있어 덮어씌울 수 없습니다.
 * @typeParam TData - 이 mutation이 최종적으로 변환할 값의 타입입니다.
 * @typeParam TVariables - Mutation function에 넘겨줄 variables입니다.
 * @typeParam TError - Api가 발생시킬 수 있는 오류의 타입입니다. 기본값은 `AxiosError | ApiError`입니다.
 * @typeParam TContext - Mutation 시 보존할 Context 정보의 타입입니다. 보통 `onMutate` 함수에서 사용합니다.
 */
export function useStuMutation<TData, TVariables = void, TError = AxiosError | ApiError, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);
      if (!response.isSuccess) throw response as ApiError;
      return response.data;
    },
    ...mutationOptions,
  });
}
