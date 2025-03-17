import { useState, useEffect } from 'react';
import { useResize } from '@/hooks/useResize';

interface RenderImageProps {
  category: string;
  subCategory: string;
}

function getImagePaths(category: string, subCategory: string) {
  // public 폴더의 구조에 맞게 경로 수정
  const basePath = `/intro/${category}/${subCategory}`; // 'public/'은 생략
  return {
    xs: `${basePath}/xs.webp`,
    sm: `${basePath}/sm.webp`,
    md: `${basePath}/md.webp`,
    lg: `${basePath}/lg.webp`,
    xl: `${basePath}/xl.webp`,
  };
}

export function RenderImage({ category, subCategory }: RenderImageProps) {
  const { width: screenWidth } = useResize();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const imagePaths = getImagePaths(category, subCategory);

    if (screenWidth <= 389) {
      setImageSrc(imagePaths.xs);
    } else if (screenWidth >= 390 && screenWidth <= 719) {
      setImageSrc(imagePaths.sm);
    } else if (screenWidth >= 720 && screenWidth <= 1079) {
      setImageSrc(imagePaths.md);
    } else if (screenWidth >= 1080 && screenWidth <= 1439) {
      setImageSrc(imagePaths.lg);
    } else if (screenWidth >= 1440) {
      setImageSrc(imagePaths.xl);
    } else {
      setImageSrc(imagePaths.lg);
    }
  }, [screenWidth, category, subCategory]);

  if (!imageSrc) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="h-auto w-full">
      <img src={imageSrc} alt="이미지" className="h-auto w-full" />
    </div>
  );
}
