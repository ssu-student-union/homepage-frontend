import { clientAuth } from './client';

export async function delBoardPosts(boardCode: string, postId: number, fileurl: string[]) {
  const resp = await clientAuth({
    method: 'delete',
    url: `/board/${boardCode}/posts/${postId}`,
    data: {
      fileUrls: fileurl || [],
    },
  });
  return resp;
}
