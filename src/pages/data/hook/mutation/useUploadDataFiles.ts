import { clientAuth } from '@/apis/client';
import { useStuMutation } from '@/hooks/new/useStuMutation';
import { ApiError, ApiResponse } from '@/hooks/new/useStuQuery';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// 자료집 FILE POST
export interface UseUploadFilesOptions {
  mutationOptions?: Omit<
    UseMutationOptions<UploadFilesResponse, AxiosError | ApiError, UploadFilesVariables & { fileType: string }>,
    'mutationFn'
  >;
}

interface UploadFilesVariables {
  files: File[];
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

export function useUploadDataFiles(
  mutationOptions?: UseMutationOptions<
    UploadFilesResponse,
    AxiosError | ApiError,
    UploadFilesVariables & { fileType: string }
  >
) {
  return useStuMutation(async ({ fileType, files }) => {
    const formData = new FormData();
    appendFormData(formData, 'files', files);

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
