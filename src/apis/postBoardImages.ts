import { PostBoardImagesResponse } from '@/types/postBoardFilesImages';
import { clientAuth } from './client';

// 청원게시판은 파일 등록 없이 이미지 첨부만 가능하여 로직 따로 분리

export const postBoardImages = async (images: FormData) => {
  return await clientAuth<PostBoardImagesResponse>({
    url: '/board/청원게시판/files',
    method: 'post',
    data: images,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
