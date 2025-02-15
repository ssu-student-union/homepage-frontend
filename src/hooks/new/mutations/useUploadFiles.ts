import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery.ts';
import { useStuMutation } from '@/hooks/new/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';

export interface UseUploadFilesOptions {
  boardCode: string;
  mutationOptions?: Omit<
    UseMutationOptions<UploadFilesResponse, AxiosError | ApiError, UploadFilesVariables>,
    'mutationFn'
  >;
}

interface UploadFilesVariables {
  files?: File[];
  images?: File[];
  fileType?: string;
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

export function useUploadFiles({ boardCode, mutationOptions }: UseUploadFilesOptions) {
  return useStuMutation(async ({ files, images, fileType }) => {
    const formData = new FormData();
    files && appendFormData(formData, 'files', files);
    images && appendFormData(formData, 'images', images);
    return (
      await clientAuth<ApiResponse<UploadFilesResponse>>({
        method: 'post',
        url: `/board/${boardCode}/files${fileType ? `/${fileType}` : ''}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }, mutationOptions);
}
