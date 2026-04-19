import { useCallback, useState } from 'react';
import { PostFile, UploadedPostFile } from '@/components/edit/FileInput';
import { FileResponse } from '@/schemas/post';

/**
 * 파일 첨부 상태를 관리하는 훅.
 *
 * `files` 상태 + `onChange` 핸들러 + 기존 파일 로드 유틸리티를 그룹화합니다.
 *
 * @example
 * ```tsx
 * const attachments = useFileAttachments();
 *
 * // 기존 게시글 로드 시
 * attachments.loadFiles(post.fileResponseList);
 *
 * // FileInputs 컴포넌트에 연결
 * <FileInputs files={attachments.files} onChange={attachments.handleChange} />
 * ```
 */
export function useFileAttachments() {
  const [files, setFiles] = useState<PostFile[]>([]);

  const handleChange = useCallback((newFiles: PostFile[]) => {
    setFiles(newFiles);
  }, []);

  /** 기존 게시글의 첨부파일 목록을 로드합니다. */
  const loadFiles = useCallback(
    (
      fileResponseList: FileResponse[],
      options?: { filter?: (file: FileResponse) => boolean; withCategory?: boolean }
    ) => {
      const filter = options?.filter ?? (({ fileType }: FileResponse) => fileType === 'files');
      const filtered = fileResponseList.filter(filter);

      const uploadedFiles: UploadedPostFile[] = filtered.map(({ postFileId, fileName, fileType }) => ({
        name: fileName,
        isUploaded: true,
        id: postFileId,
        ...(options?.withCategory ? { category: fileType.replace(/ /g, '_') } : {}),
      }));

      setFiles(uploadedFiles);
    },
    []
  );

  return { files, setFiles, handleChange, loadFiles };
}
