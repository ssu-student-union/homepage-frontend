import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

interface DeleteHandlerProps {
  boardCode: string;
  postId: string;
  mutation: UseMutationResult<AxiosResponse<void>, AxiosError, { boardCode: string; postId: string }>;
}

export const deleteHandler = ({ boardCode, postId, mutation }: DeleteHandlerProps) => {
  mutation.mutate(
    { boardCode, postId },
    {
      onError: () => {
        alert('삭제 권한이 없습니다.');
      },
    }
  );
};
