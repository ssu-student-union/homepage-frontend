import { client } from './client';

export const postBoardBoardCodeFiles = (
  boardCode: string,
  accessToken: string,
  files: File[], // 첫번째 파라미터: files
  images: File[] // 두번째 파라미터: images
) => {
  // FormData 객체 생성
  const formData = new FormData();

  // files 배열을 'files' key로 추가
  files.forEach((file, _index) => {
    formData.append('files', file); // 여러 파일을 전송하려면 index를 사용해도 됨 (files[0], files[1], 등)
  });

  // images 배열을 'images' key로 추가
  images.forEach((image, _index) => {
    formData.append('images', image); // 여러 이미지를 전송하려면 index를 사용해도 됨 (images[0], images[1], 등)
  });

  // API 요청
  return client.post(`/board/${boardCode}/files`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data', // FormData를 보내는 경우 Content-Type은 자동으로 설정됨
    },
  });
};
