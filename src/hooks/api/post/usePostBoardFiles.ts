import { postBoardFiles, postBoardFilesProps } from '@/apis/postBoardFiles';
import { PostBoardFilesResponse } from '@/types/apis/post';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export function usePostBoardFiles(): UseMutationResult<
  AxiosResponse<PostBoardFilesResponse>,
  AxiosError,
  postBoardFilesProps
> {
  return useMutation<AxiosResponse<PostBoardFilesResponse>, AxiosError, postBoardFilesProps>({
    mutationFn: postBoardFiles,
  });
}
