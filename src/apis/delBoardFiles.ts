import { clientAuth } from './client';

export async function delBoardFiles(boardCode: string, fileUrls: string[]) {
  const resp = await clientAuth({
    method: 'delete',
    url: `/board/${boardCode}/files`,
    data: { fileUrls },
  });
  return resp;
}
