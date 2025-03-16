import { useStuQuery } from '@/hooks/new/useStuQuery';
import { GetUserProfileResponse } from '@/types/apis/get';
import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from '@/hooks/new/useStuQuery';

type UseGetUserProfileOptions = {
  queryOptions?: UseQueryOptions<GetUserProfileResponse, AxiosError | ApiError>;
};

export const useGetUserProfile = ({ queryOptions }: UseGetUserProfileOptions = {}) => {
  return useStuQuery<GetUserProfileResponse>(
    ['get-user-profile'],
    {
      url: `/users/mypage`,
      method: 'GET',
    },
    queryOptions
  );
};
