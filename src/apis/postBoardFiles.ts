import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

// POST:/board/{boardCode}/files 요청

export interface postBoardFilesProps {
  boardCode: string;
  files?: File[];
  images?: File[];
}

export async function postBoardFiles({
  boardCode,
  files = [],
  images = [],
}: postBoardFilesProps): Promise<AxiosResponse> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  images.forEach((image) => {
    formData.append('images', image);
  });

  return clientAuth({
    method: 'post',
    url: `/board/${boardCode}/files`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
