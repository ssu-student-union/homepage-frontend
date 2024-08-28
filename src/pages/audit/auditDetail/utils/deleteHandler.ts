import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface DeleteHandlerProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  mutFile: UseMutationResult<AxiosResponse<void>, AxiosError, { boardCode: string; fileUrls: string[] }>;
  mutPost: UseMutationResult<AxiosResponse<void>, AxiosError, { boardCode: string; postId: number }>;
}

export const deleteHandler = ({ boardCode, postId, fileUrls, mutFile, mutPost }: DeleteHandlerProps) => {
  mutFile.mutate(
    { boardCode, fileUrls },
    {
      onError: () => {
        alert('삭제 권한이 없습니다.');
      },
    }
  );

  mutPost.mutate(
    { boardCode, postId },
    {
      onError: () => {
        alert('삭제 권한이 없습니다.');
      },
    }
  );
};
