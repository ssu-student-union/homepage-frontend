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
      className="relative flex h-[231px] w-[231px] cursor-pointer items-center justify-center rounded-sm bg-gray-100"
      onClick={onClick}
    >
      {isThumbnail && (
        <div className="absolute left-[0.5rem] top-[0.75rem] rounded-xs bg-primary px-[0.6rem] py-[0.2rem] text-sm font-bold text-white">
          대표
        </div>
      )}
      {fileURL && <img src={fileURL} alt="uploaded" className="h-full w-full object-cover" />}
      {onRemove && (
        <button
          className="absolute right-[-0.75rem] top-[-0.75rem]"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <XCircle size={32} color="#2F4BF7" weight="fill" />
        </button>
      )}
    </div>
  );
}
