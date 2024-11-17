import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { useStuMutation } from '@/pages/human-rights/hooks/useStuMutation.ts';
import { clientAuth } from '@/apis/client.ts';
import { FileResponse } from '@/types/apis/get';

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
}

interface UploadFilesResponse {
  thumbnailUrl: string | null;
  postFiles: FileResponse[];
}

function appendFormData(formData: FormData, name: string, files: File[]) {
  files.forEach((file) => formData.append(name, file));
}

export function useUploadFiles({ boardCode, mutationOptions }: UseUploadFilesOptions) {
  return useStuMutation(async ({ files, images }) => {
    const formData = new FormData();
    files && appendFormData(formData, 'files', files);
    images && appendFormData(formData, 'images', images);
    return (
      await clientAuth<ApiResponse<UploadFilesResponse>>({
        method: 'post',
        url: `/board/${boardCode}/files`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data;
  }, mutationOptions);
}
