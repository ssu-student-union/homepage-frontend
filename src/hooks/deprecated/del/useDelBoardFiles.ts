import { delBoardFiles, delBoardFilesProps, delBoardFilesResponse } from '@/apis/delBoardFiles';
import { useMutation } from '@tanstack/react-query';

/**
 * @deprecated 백엔드 리팩토링 예정으로 사용되지않을 예정
 */
export function useDelBoardFiles() {
  return useMutation<delBoardFilesResponse, Error, delBoardFilesProps>({
    mutationFn: (delpost: delBoardFilesProps) => delBoardFiles(delpost),
    onSuccess: (data: delBoardFilesResponse) => {
      console.log('s3 이미지 삭제 성공!');
      console.log('삭제된 S3 파일 수:', data.data.s3DeleteCount);
      console.log('삭제된 게시물 파일 수:', data.data.postFileDeleteCount);
    },
  });
}
