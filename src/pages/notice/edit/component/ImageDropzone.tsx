import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Plus } from '@phosphor-icons/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { compressErrorState, compressLoadingState } from '@/pages/notice/state';
import { Loader } from 'lucide-react';

interface ImageDropzoneProps {
  onDrop: (compressedFiles: File[]) => void;
}

export function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const setCompressing = useSetAtom(compressLoadingState);
  const setCompressError = useSetAtom(compressErrorState);
  const isCompressing = useAtomValue(compressLoadingState);

  // 이미지 압축 함수입니다. 1MB 이하로 압축하고, 최대 너비 또는 높이를 1080px로 설정합니다. 형식은 WebP로 변환합니다.
  const compressImages = async (files: File[]) => {
    setCompressing(true);
    setCompressError(false);

    const compressedFiles: File[] = [];

    for (const file of files) {
      try {
        const compressedBlob = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1080,
          useWebWorker: true,
          fileType: 'image/webp',
        });

        const baseName = file.name.replace(/\.[^/.]+$/, '');
        const webpName = `${baseName}.webp`;

        const finalFile = new File([compressedBlob], webpName, {
          type: compressedBlob.type || file.type,
          lastModified: Date.now(),
        });

        compressedFiles.push(finalFile);
      } catch (_error) {
        setCompressError(true);
      }
    }

    setCompressing(false);
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
        {isCompressing ? <Loader size="56px" className="animate-spin" /> : <Plus size="56px" />}
      </div>
    </div>
  );
}
