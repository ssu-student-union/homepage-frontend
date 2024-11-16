import { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/schema.ts';
import { QueryKey, UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client.ts';

/**
 * 총학생회 홈페이지에서 반환하는 공통된 API 형식을 처리하는 tanstack query 훅입니다.
 * 기본적인 API 응답을 처리하고, 내부 data를 반환합니다.
 * 요청 중 오류가 발생할 경우 AxiosError가, API 자체 오류가 발생할 경우 ApiError가 throw됩니다.
 * @param queryKey - 해당 쿼리에 지정할 queryKey입니다.
 * @param requestConfig - Axios에 보낼 요청의 정보입니다.
 * @param queryOptions - 추가로 tanstack query를 설정할 수 있습니다. `queryKey`와 `queryFn` 값은 미리 지정되어 있어 덮어씌울 수 없습니다.
 * @typeParam TRaw - Api가 반환하는 내부 값의 타입입니다. `ApiResponse<T>`의 `T`와 동일합니다.
 * @typeParam TError - Api가 발생시킬 수 있는 오류의 타입입니다. 기본값은 `AxiosError | ApiError`입니다.
 * @typeParam TData - `queryOptions.select` 함수를 정의하여 변환한 값의 타입입니다. 기본값은 `TRaw`와 동일합니다.
 * @typeParam TQueryKey - `queryKey`의 타입을 바꾸고 싶다면 사용합니다. 기본 타입은 기본 제공되는 `QueryKey`입니다.
 */
export function useStuQuery<TRaw, TData = TRaw, TError = AxiosError | ApiError, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  requestConfig: AxiosRequestConfig,
  queryOptions?: Omit<UndefinedInitialDataOptions<TRaw, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = (await clientAuth<ApiResponse<TRaw>>(requestConfig)).data;
      if (!response.isSuccess) throw response as ApiError;
      return response.data;
    },
    ...queryOptions,
  });
}
