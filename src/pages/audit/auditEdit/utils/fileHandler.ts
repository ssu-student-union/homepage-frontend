import { FileItem } from '../container/auditEditFilesSection';

interface UploadedFile {
  id: number;
  url: string;
}

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

export function handleThumbnailImage(uploadedFiles: UploadedFile[]): string | null {
  return (
    uploadedFiles
      .filter((file) => imageExtensions.some((ext) => file.url.toLowerCase().endsWith(ext)))
      .map((file) => file.url)[0] || null
  );
}

export function handleFileLists(uploadedFiles: UploadedFile[]): number[] {
  return uploadedFiles.map((file) => file.id);
}

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

export function addEmptyField(files: FileItem[], setFiles: (files: FileItem[]) => void) {
  setFiles([...files, { id: Date.now(), file: null }]);
}
