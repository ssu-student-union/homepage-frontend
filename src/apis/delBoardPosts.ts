import { clientAuth } from './client';

/**
 * @deprecated
 */
export async function delBoardPosts(boardCode: string, postId: number | null, fileurl: string[] | null) {
  const resp = await clientAuth({
    method: 'delete',
    url: `/board/${boardCode}/posts/${postId}`,
    data: {
      fileUrls: fileurl,
    },
  });
  return resp;
}
