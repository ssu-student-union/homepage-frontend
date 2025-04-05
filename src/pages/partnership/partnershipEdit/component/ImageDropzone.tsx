import { useDropzone } from 'react-dropzone';
import { Plus } from '@phosphor-icons/react';

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="flex size-[231px] cursor-pointer items-center justify-center rounded-sm bg-gray-100"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-black">
        <Plus size="56px" />
      </div>
    </div>
  );
}
