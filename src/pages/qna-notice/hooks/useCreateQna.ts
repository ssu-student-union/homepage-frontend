import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/apis/client';
import { ApiResponse } from '../types';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { QnaPostForm } from '../edit/types';

export interface CreateQnaResponse {
  post_id: number;
  boardCode: string;
}

export function useCreateQna() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateQnaResponse, AxiosError, QnaPostForm>({
    mutationFn: async (formData: QnaPostForm) => {
      const response = await clientAuth<ApiResponse<CreateQnaResponse>>({
        method: 'post',
        url: `/board/질의응답게시판/posts`,
        data: formData,
      });

      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['qnaPostsList'],
      });
      navigate(`qna/${data.post_id}`);
    },
  });
}
