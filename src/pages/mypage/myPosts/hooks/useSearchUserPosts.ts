import { getUserPostsSearch } from '@/apis/getUserPostsSearch';
import { GetUserPostsResponse } from '@/types/apis/get';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const useSearchUserPosts = (
  page: number,
  take: number,
  q: string
): UseQueryResult<GetUserPostsResponse, AxiosError> => {
  return useQuery<GetUserPostsResponse, AxiosError>({
    queryKey: ['get-user-posts', page, take, q],
    queryFn: async () => {
      try {
        return await getUserPostsSearch(page, take, q);
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
