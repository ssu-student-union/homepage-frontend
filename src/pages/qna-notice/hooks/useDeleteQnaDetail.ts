import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';

export interface DeleteQnaPostRequest {
  postId: number;
  fileUrls?: string[];
}

export function useDeleteQnaDetail({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: '질의응답게시판', mutationOptions });
}
