import { ImageDropzone } from '../component/ImageDropzone';
import { ImagePreview } from '../component/ImagePreview';
import { useImageManager } from '../hook/useImageManager';
import { useCallback, useEffect } from 'react';

interface AuditEditImageSectionProps {
  onImagesChange: (images: File[]) => void;
}

export function AuditEditImageSection({ onImagesChange }: AuditEditImageSectionProps): JSX.Element {
  const { images, addImage, removeImage, getValidImages } = useImageManager();

  const GetValidImages = useCallback(() => getValidImages(), [getValidImages]);

  const memoizedOnImagesChange = useCallback(
    (images: File[]) => {
      onImagesChange(images);
    },
    [onImagesChange]
  );

  useEffect(() => {
    memoizedOnImagesChange(GetValidImages());
  }, [images, GetValidImages, memoizedOnImagesChange]);

  const handleImageAdd = (acceptedFiles: File[]) => {
    addImage(acceptedFiles);
  };

  return (
    <div className="px-[30px] xl:px-[200px]">
      <div className="mt-[12px] flex h-[270px] w-full flex-row items-center justify-start gap-4 overflow-x-auto whitespace-nowrap rounded-xs border-[0.125rem] border-gray-300 p-4">
        <ImageDropzone onDrop={handleImageAdd} />
        <div className="flex max-w-full flex-row gap-4">
          {images.map((imageItem, index) => (
            <ImagePreview
              key={imageItem.id}
              imageItem={imageItem}
              onRemove={() => removeImage(imageItem.id)}
              isThumbnail={index == 0 ? true : false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
