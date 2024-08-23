import { FileItem } from '../container/auditEditFilesSection';

export function removeFileField(
  index: number,
  files: FileItem[],
  setFiles: (files: FileItem[]) => void,
  onFilesChange: (files: File[]) => void
) {
  const newFiles = files.filter((_, i) => i !== index);
  setFiles(newFiles);
  onFilesChange(newFiles.filter((fileItem) => fileItem.file !== null).map((fileItem) => fileItem.file as File));
}
