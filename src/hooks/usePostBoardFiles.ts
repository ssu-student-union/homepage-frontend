import { postBoardFiles, postBoardFilesProps, PostBoardFilesResponse } from '@/apis/postBoardFiles';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export function usePostBoardFiles(): UseMutationResult<
  AxiosResponse<PostBoardFilesResponse>,
  AxiosError,
  postBoardFilesProps
> {
  return useMutation<AxiosResponse<PostBoardFilesResponse>, AxiosError, postBoardFilesProps>({
    mutationFn: postBoardFiles,
    onSuccess: (data) => {
      console.log('파일 업로드 성공:', data.data);
    },
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
  });
}
