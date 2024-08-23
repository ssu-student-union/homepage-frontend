import { client } from './client';

export interface getBoardBoardCodePostsProps {
  accessToken: string;
  boardCode: string;
  page?: number;
  take: number;
}

export async function getBoardBoardCodePosts({
  accessToken,
  boardCode,
  page = 0,
  take = 9,
}: getBoardBoardCodePostsProps) {
  try {
    const resp = await client.get(`/board/${boardCode}/posts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        take: take,
        page: page - 1,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}
