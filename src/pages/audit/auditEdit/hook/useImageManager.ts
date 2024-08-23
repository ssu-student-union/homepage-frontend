import { useState } from 'react';

export interface ImageItem {
  id: number;
  file: File | null;
}

export function useImageManager() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [thumbnailId, setThumbnailId] = useState<number | null>(null); // 대표 이미지를 위한 상태

  const addImage = (acceptedFiles: File[]) => {
    if (images.length < 5) {
      const newImage: ImageItem = { id: Date.now(), file: acceptedFiles[0] };
      setImages([...images, newImage]);
    }
  };

  const removeImage = (id: number) => {
    setImages(images.filter((imageItem) => imageItem.id !== id));
    if (id === thumbnailId) {
      setThumbnailId(null);
    }
  };

  const selectAsThumbnail = (id: number) => {
    setThumbnailId(id);
  };

  return {
    images,
    thumbnailId,
    addImage,
    removeImage,
    selectAsThumbnail,
  };
}
