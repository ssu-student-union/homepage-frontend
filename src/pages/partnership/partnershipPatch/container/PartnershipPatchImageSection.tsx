import { ImagePreview } from '../../partnershipEdit/component/ImagePreview';

interface PartnershipPatchImageSectionProps {
  imageList: string[];
  thumbnailImage: string;
  setThumbnailImage: (image: string) => void;
}

export function PartnershipPatchImageSection({
  imageList,
  thumbnailImage,
  setThumbnailImage,
}: PartnershipPatchImageSectionProps) {
  return (
    <>
      <div className={imageList.length === 0 ? 'hidden' : 'px-[30px] xl:px-[200px]'}>
        <div className="mr-[1rem] mt-[12px] flex h-auto w-full flex-row items-center justify-start gap-4 overflow-x-auto whitespace-nowrap rounded-xs border-[0.125rem] border-gray-300 p-[1rem]">
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
