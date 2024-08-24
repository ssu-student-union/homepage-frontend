import { clientAuth } from './client';

export async function delBoardPosts(boardCode: string, postId: string) {
  const resp = await clientAuth({
    method: 'delete',
    url: `/boards/${boardCode}/posts/${postId}`,
  });
  return resp;
}
