import { client } from './client';

// GET:/board/{boardCode}/posts 요청

export interface getBoardPostsProps {
  boardCode: string;
  category?: string | null;
  page?: number;
  take: number;
}

export async function getBoardPosts({ boardCode, page = 0, take = 9, category = null }: getBoardPostsProps) {
  const resp = await client.get(`/board/${boardCode}/posts`, {
    params: {
      take: take,
      page: page - 1,
      category: category,
    },
  });
  return resp.data;
}
