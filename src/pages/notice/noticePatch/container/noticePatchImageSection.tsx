import { ImagePreview } from '@/pages/audit/auditEdit/component/ImagePreview';

interface AuditPatchImageSectionProps {
  imageList: string[];
  thumbnailImage: string;
  setThumbnailImage: (image: string) => void;
}

export function NoticePatchImageSection({ imageList, thumbnailImage, setThumbnailImage }: AuditPatchImageSectionProps) {
  return (
    <>
      <div className={imageList.length === 0 ? 'hidden' : 'px-[30px] xl:px-[200px]'}>
        <div className="mr-4 mt-[12px] flex h-auto w-full flex-row items-center justify-start gap-4 overflow-x-auto whitespace-nowrap rounded-xs border-[0.125rem] border-gray-300 p-4">
          <div className="flex max-w-full flex-row gap-4">
            {imageList.map((image, index) => (
              <ImagePreview
                key={image + index}
                imageItem={image}
                isThumbnail={thumbnailImage === image}
                onClick={() => setThumbnailImage(image)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
