import { GetUserPostsResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from './client';

export const getUserPosts = async (page: number, take: number) => {
  const response: AxiosResponse<GetUserPostsResponse> = await clientAuth({
    baseURL: import.meta.env.VITE_API_URL,
    url: `board/mypost?page=${page}&take=${take}`,
    method: 'get',
  });
  return response.data;
};
