import { XCircle } from '@phosphor-icons/react';
import { ManagedImage } from '../hook/useImageManager';

interface ImagePreviewProps {
  imageItem: ManagedImage | string;
  onRemove?: () => void;
  onClick?: () => void;
  isThumbnail: boolean;
}

export function ImagePreview({ imageItem, onRemove, onClick, isThumbnail }: ImagePreviewProps) {
  const fileURL =
    typeof imageItem === 'string' ? imageItem : imageItem.image ? URL.createObjectURL(imageItem.image) : '';

  return (
    <div
      className="relative flex size-[231px] cursor-pointer items-center justify-center rounded-sm bg-gray-100"
      onClick={onClick}
    >
      {isThumbnail && (
        <div className="absolute left-2 top-3 rounded-xs bg-primary px-[0.6rem] py-[0.2rem] text-sm font-bold text-white">
          대표
        </div>
      )}
      {fileURL && (
        <img
          src={fileURL}
          alt="uploaded"
          className="max-h-[231px] min-h-[231px] min-w-[231px] max-w-[231px] object-cover"
        />
      )}
      {onRemove && (
        <button
          className="absolute -right-3 -top-3"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 m-auto size-[24px] rounded-full bg-white" />
            <XCircle size={32} color="#2F4BF7" weight="fill" className="relative z-10" />
          </div>
        </button>
      )}
    </div>
  );
}
