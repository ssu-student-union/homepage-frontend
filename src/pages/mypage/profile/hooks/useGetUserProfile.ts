import { getUserProfile } from '@/apis/getUserProfile';
import { GetUserProfileResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetUserProfile = (): UseQueryResult<GetUserProfileResponse, AxiosError> => {
  return useQuery<GetUserProfileResponse, AxiosError>({
    queryKey: ['get-user-profile'],
    queryFn: getUserProfile,
  });
};
