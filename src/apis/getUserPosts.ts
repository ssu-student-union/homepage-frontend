import { GetUserPostsResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from '@/apis/client.ts';

export const getUserPosts = async (page: number, take: number) => {
  const response: AxiosResponse<GetUserPostsResponse> = await clientAuth({
    url: `board/mypost?page=${page}&take=${take}`,
    method: 'get',
  });
  return response.data;
};
