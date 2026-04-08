import { PostFile, LocalPostFile, UploadedPostFile } from '@/components/edit/FileInput';
import { PostFileResponse } from '@/hooks/new/mutations/useUploadFiles';
import { FileResponse } from '@/schemas/post';

interface CollectPostFilesOptions {
  files: PostFile[];
  uploadFiles: (args: { files: File[] }) => Promise<{ postFiles: PostFileResponse[] }>;
  processImages: (uploadedFiles?: FileResponse[]) => Promise<{
    existedImages: FileResponse[];
    newImages: PostFileResponse[];
    content: string;
  }>;
  existingImages?: FileResponse[];
}

/**
 * 제출 시 파일/이미지 ID를 수집하는 유틸리티.
 *
 * 1. 이미 업로드된 첨부파일 ID 수집
 * 2. 로컬 첨부파일 업로드 → ID 수집
 * 3. 에디터 이미지 처리 → ID 수집 + content 반환
 *
 * @returns `postFileList` — 모든 파일 ID, `content` — 이미지 URL이 치환된 본문
 */
export async function collectPostFiles({
  files,
  uploadFiles,
  processImages,
  existingImages = [],
}: CollectPostFilesOptions): Promise<{ postFileList: number[]; content: string }> {
  const postFileList: number[] = files
    .filter((file): file is UploadedPostFile => file.isUploaded)
    .map(({ id }) => id);

  const localFiles = files.filter((file): file is LocalPostFile => !file.isUploaded).map(({ file }) => file);
  if (localFiles.length > 0) {
    const uploaded = await uploadFiles({ files: localFiles });
    uploaded.postFiles.forEach(({ id }) => postFileList.push(id));
  }

  const { existedImages, newImages, content } = await processImages(existingImages);
  existedImages.forEach(({ postFileId }) => postFileList.push(postFileId));
  newImages.forEach(({ id }) => postFileList.push(id));

  return { postFileList, content };
}
