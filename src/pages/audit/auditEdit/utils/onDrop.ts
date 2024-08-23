import { FileItem } from '../container/auditEditFilesSection';

export function onDrop(
  acceptedFiles: File[],
  index: number,
  files: FileItem[],
  setFiles: (files: FileItem[]) => void,
  onFilesChange: (files: File[]) => void,
  addEmptyField: () => void
) {
  const newFiles = [...files];
  newFiles[index].file = acceptedFiles[0];
  setFiles(newFiles);

  const allFiles = newFiles.filter((fileItem) => fileItem.file !== null).map((fileItem) => fileItem.file as File);
  onFilesChange(allFiles);

  const allFilled = newFiles.every((fileItem) => fileItem.file !== null);
  if (allFilled) {
    addEmptyField();
  }
}
