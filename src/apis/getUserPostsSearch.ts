import { GetUserPostsResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from './client.ts';

export const getUserPostsSearch = async (page: number, take: number, q: string) => {
  const response: AxiosResponse<GetUserPostsResponse> = await clientAuth({
    url: `board/mypost/search?page=${page}&take=${take}&q=${q}`,
    method: 'get',
  });
  return response.data;
};
