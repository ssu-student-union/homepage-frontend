import { ImagePreview } from '../../noticeEdit/component/ImagePreview';

interface NoticePatchImageSectionProps {
  imageList: string[];
  thumbnailImage: string;
  setThumbnailImage: (image: string) => void;
}

export function NoticePatchImageSection({ imageList, thumbnailImage, setThumbnailImage }: NoticePatchImageSectionProps) {
  return (
    <div className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="mt-[12px] flex h-[270px] w-full flex-row items-center justify-start gap-4 overflow-x-auto whitespace-nowrap rounded-xs border-[0.125rem] border-gray-300 p-[1rem]">
        <div className="flex max-w-full flex-row gap-4">
          {imageList.map((image, index) => (
            <ImagePreview
              key={image + index}
              imageItem={image}
              isThumbnail={thumbnailImage === image}
              onRemove={() => {}}
              onClick={() => setThumbnailImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
