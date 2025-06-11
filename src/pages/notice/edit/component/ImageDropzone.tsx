import { useDropzone } from 'react-dropzone';
import { Plus } from '@phosphor-icons/react';

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  onFileSizeError?: () => void;
}

export function ImageDropzone({ onDrop, onFileSizeError }: ImageDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    onDropRejected: (fileRejections) => {
      const oversizedFiles = fileRejections.filter((rejection) => rejection.file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0 && onFileSizeError) {
        onFileSizeError();
      }
    },
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-[231px] min-w-[231px] cursor-pointer items-center justify-center rounded-sm bg-gray-100"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-black">
        <Plus size="56px" />
      </div>
    </div>
  );
}
