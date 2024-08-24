import { clientAuth } from './client';

export async function postBoardPosts(boardCode: string, postId: string): Promise<PostBoardPostsResponse> {
  const resp = await clientAuth({
    method: 'delete',
    url: `/boards/${boardCode}/posts/${postId}`,
  });
  return resp;
}
