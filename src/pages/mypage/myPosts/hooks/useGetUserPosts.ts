import { getUserPosts } from '@/apis/getUserPosts';
import { GetUserPostsResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const useGetUserPosts = (page: number, take: number): UseQueryResult<GetUserPostsResponse, AxiosError> => {
  return useQuery<GetUserPostsResponse, AxiosError>({
    queryKey: ['get-user-posts', page, take],
    // queryFn: () => getUserPosts(page, take),
    queryFn: async () => {
      try {
        return await getUserPosts(page, take);
      } catch (error) {
        console.error('API Error:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
        }
        throw error;
      }
    },
  });
};
