import { QnaPostForm } from '../edit/types';
import { useCreatePost, UseCreatePostOptions } from '@/hooks/new/mutations/useCreatePost';

export interface CreateQnaResponse {
  post_id: number;
  boardCode: string;
}

export function useCreateQnaPost(mutationOptions: UseCreatePostOptions<QnaPostForm>['mutationOptions'] = {}) {
  return useCreatePost<QnaPostForm>({ boardCode: '질의응답게시판', mutationOptions });
}
