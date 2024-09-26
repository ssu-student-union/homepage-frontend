import { clientAuth } from './client';

export interface delBoardFilesResponse {
  code: string;
  message: string;
  data: {
    s3DeleteCount: number;
    postFileDeleteCount: number;
  };
  isSuccess: boolean;
}

export interface delBoardFilesProps {
  boardCode: string;
  fileUrls: string[];
}

export async function delBoardFiles({ boardCode, fileUrls }: delBoardFilesProps): Promise<delBoardFilesResponse> {
  const response = await clientAuth<delBoardFilesResponse>({
    method: 'delete',
    url: `/board/${boardCode}/files`,
    data: {
      fileUrls: fileUrls,
    },
  });
  return response.data;
}
