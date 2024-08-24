import { clientAuth } from './client';

export async function delBoardPosts(boardCode: string, postId: number) {
  const resp = await clientAuth({
    method: 'delete',
    url: `/boards/${boardCode}/posts/${postId}`,
  });
  return resp;
}
