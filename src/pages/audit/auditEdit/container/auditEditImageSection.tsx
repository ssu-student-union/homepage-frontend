import { ImageDropzone } from '../component/ImageDropzone';
import { ImagePreview } from '../component/ImagePreview';
import { useImageManager } from '../hook/useImageManager';

export function AuditEditImageSection() {
  const { images, thumbnailId, addImage, removeImage, selectAsThumbnail } = useImageManager();

  return (
    <div className="mt-[12px] flex h-[270px] w-full flex-row items-center justify-start gap-4 border border-gray-300 p-4">
      <ImageDropzone onDrop={addImage} />
      <div className="flex max-w-full flex-row gap-4">
        {images.map((imageItem) => (
          <ImagePreview
            key={imageItem.id}
            imageItem={imageItem}
            onRemove={() => removeImage(imageItem.id)}
            onSelect={() => selectAsThumbnail(imageItem.id)}
            isThumbnail={imageItem.id === thumbnailId}
          />
        ))}
      </div>
    </div>
  );
}
