import { FileItem } from '../container/auditEditFilesSection';

export function addEmptyField(files: FileItem[], setFiles: (files: FileItem[]) => void) {
  setFiles([...files, { id: Date.now(), file: null }]);
}
