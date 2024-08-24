import { getBoardDetailProps, GetBoardDetailResponse } from '@/types/apis/get';
import { client } from './client';

// GET:/board/{boardCode}/posts/postId 요청

export async function getBoardDetail({
  boardCode,
  postId,
  userId = 0,
}: getBoardDetailProps): Promise<GetBoardDetailResponse> {
  const resp = await client.get<GetBoardDetailResponse>(`/board/${boardCode}/posts/${postId}`, {
    params: {
      userId,
    },
  });

  return resp.data;
}
