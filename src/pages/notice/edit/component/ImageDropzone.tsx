import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Plus } from '@phosphor-icons/react';

interface ImageDropzoneProps {
  onDrop: (compressedFiles: File[]) => void;
  onCompressError: () => void;
}

export function ImageDropzone({ onDrop, onCompressError }: ImageDropzoneProps) {
  const compressImages = async (files: File[]) => {
    const compressedFiles: File[] = [];

    for (const file of files) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1080,
          useWebWorker: true,
          fileType: 'image/webp',
        });
        compressedFiles.push(compressed);
      } catch (_error) {
        onCompressError();
      }
    }

    return compressedFiles;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const compressed = await compressImages(acceptedFiles);
      onDrop(compressed);
    },
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    multiple: true,
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
