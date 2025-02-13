import { clientAuth } from '@/apis/client';
import { CreatePostResponse } from '@/hooks/new/mutations/useCreatePost';
import { useDeletePost, UseDeletePostOptions } from '@/hooks/new/mutations/useDeletePost';
import { GetPostOptions, useGetPost } from '@/hooks/new/query/useGetPost';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { DataPost, DataPostResponse, DataPostSchema } from '@/pages/data/schema';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const BOARD_CODE = '자료집게시판판' as const;

// 자료집 게시물 상세 조회
export function useGetDataPost({
  postId,
  queryOptions,
}: Omit<GetPostOptions<DataPostResponse, DataPost>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = DataPostSchema;
  return useGetPost({
    boardCode: 'data',
    postId,
    zodSchema,
    queryOptions,
  });
}

// 자료집 POST
interface CreatePostVariables<T> {
  post: T;
}

interface UseCreatePostOptions<TPostRequest> {
  fileCategory: string;
  mutationOptions?: Omit<
    UseMutationOptions<CreatePostResponse, AxiosError | ApiError, CreatePostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

export function useCreateDataPost<DataPostEditRequest>({
  fileCategory,
  mutationOptions,
}: UseCreatePostOptions<DataPostEditRequest>) {
  return useStuMutation(async ({ post }) => {
    return (
      await clientAuth<ApiResponse<CreatePostResponse>>({
        method: 'post',
        url: `/board/data/${fileCategory}/posts`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}

// 자료집 PATCH
export interface UsePatchPostOptions<TPostRequest> {
  fileCategory: string;
  mutationOptions?: Omit<
    UseMutationOptions<number, AxiosError | ApiError, PatchPostVariables<TPostRequest>>,
    'mutationFn'
  >;
}

interface PatchPostVariables<T> {
  id: number;
  post: T;
}

export function usePatchDataPost<DataPostEditRequest>({
  fileCategory,
  mutationOptions,
}: UsePatchPostOptions<DataPostEditRequest>) {
  return useStuMutation(async ({ id, post }) => {
    return (
      await clientAuth<ApiResponse<number>>({
        method: 'patch',
        url: `/board/data/${fileCategory}/posts/${id}`,
        data: post,
      })
    ).data;
  }, mutationOptions);
}

// 자료집 DELETE
export function useDeleteHumanRightsPost({ mutationOptions }: Omit<UseDeletePostOptions, 'boardCode'> = {}) {
  return useDeletePost({ boardCode: BOARD_CODE, mutationOptions });
}

// 자료집 파일 POST
export interface UseUploadFilesOptions {
  fileType: string[];
  mutationOptions?: Omit<
    UseMutationOptions<UploadFilesResponse, AxiosError | ApiError, UploadFilesVariables>,
    'mutationFn'
  >;
}

interface UploadFilesVariables {
  files?: File[];
  images?: File[];
}

export interface UploadFilesResponse {
  thumbnailUrl: string | null;
  postFiles: PostFileResponse[];
}

export interface PostFileResponse {
  id: number;
  url: string;
  originalFileName: string;
}

function appendFormData(formData: FormData, name: string, files: File[]) {
  files.forEach((file) => formData.append(name, file));
}

export function useUploadDataFiles({ fileType, mutationOptions }: UseUploadFilesOptions) {
  return useStuMutation(async ({ files, images }) => {
    const formData = new FormData();
    files && appendFormData(formData, 'files', files);
    images && appendFormData(formData, 'images', images);
    return (
      await clientAuth<ApiResponse<UploadFilesResponse>>({
        method: 'post',
        url: `/board/data/files/${fileType}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }, mutationOptions);
}
