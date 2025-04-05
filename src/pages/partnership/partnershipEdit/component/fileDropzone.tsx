import { useDropzone } from 'react-dropzone';
import { FileText } from '@phosphor-icons/react';

interface FileDropzoneProps {
  file: File | null;
  onDrop: (acceptedFiles: File[]) => void;
}

export function FileDropzone({ file, onDrop }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="flex w-full cursor-pointer items-center rounded border px-3 py-2">
      <input {...getInputProps()} />
      <FileText size="24" className="mr-3" />
      {file ? (
        <p className="text-sm">{file.name}</p>
      ) : (
        <p className="text-sm font-medium text-gray-400">파일을 선택해주세요</p>
      )}
    </div>
  );
}
