import { ImageDropzone } from '../component/ImageDropzone';
import { ImagePreview } from '../component/ImagePreview';
import { useImageManager } from '../hook/useImageManager';
import { useEffect, useCallback, useState } from 'react';

interface NoticeEditImageSectionProps {
  onImagesChange: (images: File[]) => void;
}

export function NoticeEditImageSection({ onImagesChange }: NoticeEditImageSectionProps): JSX.Element {
  const { images, addImage, removeImage, getValidImages } = useImageManager();
  const [sizeError, setSizeError] = useState<boolean>(false);

  useEffect(() => {
    if (sizeError) {
      const timer = setTimeout(() => {
        setSizeError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sizeError]);

  useEffect(() => {
    onImagesChange(getValidImages());
  }, [getValidImages, onImagesChange]);

  const handleImageAdd = useCallback(
    (acceptedFiles: File[]) => {
      addImage(acceptedFiles);
    },
    [addImage]
  );

  return (
    <div className="px-[30px] xl:px-[200px]">
      <div className="mt-[12px] flex h-[270px] w-full flex-row items-center justify-start gap-4 overflow-x-auto whitespace-nowrap rounded-xs border-[0.125rem] border-gray-300 p-4">
        <ImageDropzone onDrop={handleImageAdd} onFileSizeError={() => setSizeError(true)} />
        <div className="flex max-w-full flex-row gap-4">
          {images.map((imageItem, index) => (
            <ImagePreview
              key={imageItem.id}
              imageItem={imageItem}
              onRemove={() => removeImage(imageItem.id)}
              isThumbnail={index === 0}
            />
          ))}
        </div>
      </div>
      {sizeError && (
        <p className="my-1 ml-1 font-medium text-red-500">10MB를 초과하는 이미지는 업로드할 수 없습니다.</p>
      )}
    </div>
  );
}
