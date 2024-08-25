import { GetBoardPostsProps } from '@/types/getPetitionTopLiked';
import { client } from './client';

export const getPetitionPostsTopLiked = async ({ page, take }: GetBoardPostsProps) => {
  try {
    const response = await client.get('/boards/청원게시판/posts/top-liked', {
      params: {
        page,
        take,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
