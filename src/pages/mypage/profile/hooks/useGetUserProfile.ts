import { getUserProfile } from '@/apis/getUserProfile';
import { getUserProfileResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetUserProfile = (): UseQueryResult<getUserProfileResponse, AxiosError> => {
  return useQuery<getUserProfileResponse, AxiosError>({
    queryKey: ['get-user-profile'],
    queryFn: getUserProfile,
  });
};
