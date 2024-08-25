import { GetPetitionPostsTopLikedProps } from '@/types/getPetitionTopLiked';
import { client } from './client';

export const getPetitionPostsTopLiked = async ({ page, take }: GetPetitionPostsTopLikedProps) => {
  const respose = await client.get('/boards/청원게시판/posts/top-liked', {
    params: {
      page,
      take,
    },
  });

  return respose.data;
};
