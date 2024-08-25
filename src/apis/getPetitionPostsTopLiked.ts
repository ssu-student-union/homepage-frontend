import { getBoardPostsProps } from '@/types/apis/get';
import { client } from './client';

export const getPetitionPostsTopLiked = async ({ page, take }: getBoardPostsProps) => {
  try {
    const response = await client.get('/boards/청원게시판/posts/top-liked', {
      params: {
        page,
        take,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
