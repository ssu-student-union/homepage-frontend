import { ImageDropzone } from '../component/ImageDropzone';
import { ImagePreview } from '../component/ImagePreview';
import { useImageManager } from '../hook/useImageManager';
import { useEffect } from 'react';

interface PartnershipEditImageSectionProps {
  onImagesChange: (images: File[]) => void;
}

export function PartnershipEditImageSection({ onImagesChange }: PartnershipEditImageSectionProps): JSX.Element {
  const { images, addImage, removeImage, getValidImages } = useImageManager();

  useEffect(() => {
    onImagesChange(getValidImages());
  }, [images]);

  const handleImageAdd = (acceptedFiles: File[]) => {
    addImage(acceptedFiles);
  };

  return (
    <div className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="mt-[12px] flex h-[270px] w-full flex-row items-center justify-start gap-4 border border-gray-300 p-[1rem]">
        <ImageDropzone onDrop={handleImageAdd} />
        <div className="flex max-w-full flex-row gap-4">
          {images.map((imageItem) => (
            <ImagePreview
              key={imageItem.id}
              imageItem={imageItem}
              onRemove={() => removeImage(imageItem.id)}
              onSelect={() => {}}
              isThumbnail={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
