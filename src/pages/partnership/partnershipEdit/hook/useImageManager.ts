import { useState, useCallback } from 'react';

export interface ManagedImage {
  id: string;
  image: File | null;
}

export function useImageManager() {
  const [images, setImages] = useState<ManagedImage[]>([]);

  // 랜덤 ID 생성 (불필요한 재생성을 방지)
  const generateId = useCallback(() => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }, []);

  // 이미지 추가
  const addImage = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((image) => ({
        id: generateId(),
        image,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    },
    [generateId]
  );

  // 이미지 삭제 (상태 최신화 적용)
  const removeImage = useCallback((id: string) => {
    setImages((prevImages) => prevImages.filter((imageItem) => imageItem.id !== id));
  }, []);

  // 유효한 이미지 반환 (useCallback 적용)
  const getValidImages = useCallback(() => {
    return images.filter((item) => item.image !== null).map((item) => item.image as File);
  }, [images]);

  return {
    images,
    addImage,
    removeImage,
    getValidImages,
  };
}
