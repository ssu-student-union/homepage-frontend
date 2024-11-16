import { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/schema.ts';
import { QueryKey, UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client.ts';
import { ZodError, ZodSchema, ZodTypeDef } from 'zod';

export interface StuQueryOptions<
  TRaw,
  TData = TRaw,
  TQueryKey extends QueryKey = QueryKey,
  TZodTypeDef extends ZodTypeDef = ZodTypeDef,
> {
  zodSchema?: ZodSchema<TData, TZodTypeDef, TRaw>;
  queryOptions: Omit<
    UndefinedInitialDataOptions<TRaw, AxiosError | ApiError | ZodError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'select'
  >;
}

export function useStuQuery<
  TRaw,
  TData = TRaw,
  TQueryKey extends QueryKey = QueryKey,
  TZodTypeDef extends ZodTypeDef = ZodTypeDef,
>(
  queryKey: TQueryKey,
  requestConfig: AxiosRequestConfig,
  stuQueryOptions?: StuQueryOptions<TRaw, TData, TQueryKey, TZodTypeDef>
) {
  const queryOptions: Omit<
    UndefinedInitialDataOptions<TRaw, AxiosError | ApiError | ZodError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  > = stuQueryOptions?.queryOptions ?? {};
  const zodSchema = stuQueryOptions?.zodSchema;
  if (zodSchema !== undefined) queryOptions.select = (data) => zodSchema.parse(data);
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
