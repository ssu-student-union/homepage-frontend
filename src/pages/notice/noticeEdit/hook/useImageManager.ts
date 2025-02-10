import { useCallback, useState } from 'react';

export interface ManagedImage {
  id: string;
  image: File | null;
}

export function useImageManager() {
  const [images, setImages] = useState<ManagedImage[]>([]);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const addImage = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((image) => ({
      id: generateId(),
      image,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(images.filter((imageItem) => imageItem.id !== id));
  };

  const getValidImages = useCallback(() => {
    return images
      .filter((item) => item.image !== null)
      .map((item) => item.image as File);
  }, [images]);

  return {
    images,
    addImage,
    removeImage,
    getValidImages,
  };
}
