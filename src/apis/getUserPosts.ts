import { GetUserPostsResponse } from '@/types/apis/get';
import { AxiosResponse } from 'axios';
import { clientAuth } from './client';

export const getUserPosts = async (page: number, take: number) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  const response: AxiosResponse<GetUserPostsResponse> = await clientAuth({
    baseURL: 'http://13.125.101.7:8080',
    url: `board/mypost?page=${page}&take=${take}`,
    method: 'get',
  });
  return response.data;
};
