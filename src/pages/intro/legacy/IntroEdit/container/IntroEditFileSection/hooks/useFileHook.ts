import { useCallback, useState } from 'react';

interface FileWithPreview extends File {
  preview: string;
}

export function useFileHook() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeFile = () => {
    setFiles([]);
  };

  return { files, onDrop, removeFile };
}
