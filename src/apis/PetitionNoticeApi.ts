import { client, clientAuth } from './client';

// 청원 게시판 글쓰기 이미지 변환 api

export interface ImageToUrlDataType {
  id: number;
  url: string;
}

export interface PetitionNoticeEditResponse {
  code: string;
  message: number;
  data: ImageToUrlDataType[];
  isSuccess: boolean;
}

export const postPetitionNoticeEditApi = (images: FormData) => {
  return clientAuth<PetitionNoticeEditResponse>({
    url: '/board/청원게시판/files',
    method: 'post',
    data: images,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 청원 게시판 글쓰기 api
// export const postCreateBoardApi = async (
//   title: string,
//   content: string,
//   categoryCode: string,
//   thumbNailImage: string,
//   isNotice: boolean,
//   postFileList: number[]
// ) => {
//   return clientAuth<>({
//     url: '/board/청원게시판/posts',
//     method: 'post',
//     data: {
//       title: title,
//       content: content,
//       categoryCode: categoryCode,
//       thumbNailImage: thumbNailImage,
//       isNotice: isNotice,
//       postFileList: [postFileList],
//     },
//   });
// };
