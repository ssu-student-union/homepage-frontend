import { client } from './client';

export interface getBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number;
}

export async function getBoardDetail({ boardCode, postId, userId = 0 }: getBoardDetailProps) {
  try {
    const resp = await client.get(`/board/${boardCode}/posts/${postId}`, {
      params: {
        userId,
      },
    });
    console.log('api 요청!!!', resp);
    return resp.data;
  } catch (e) {
    console.log('api 에러!!!', e);
    throw e;
  }
}
