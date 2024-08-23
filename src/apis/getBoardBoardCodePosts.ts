import { client } from './client';

export interface getBoardBoardCodePostsProps {
  boardCode: string;
  category?: string | null;
  page?: number;
  take: number;
}

export async function getBoardBoardCodePosts({
  boardCode,
  page = 0,
  take = 9,
  category = null,
}: getBoardBoardCodePostsProps) {
  try {
    const resp = await client.get(`/board/${boardCode}/posts`, {
      params: {
        take: take,
        page: page - 1,
        category: category,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}
