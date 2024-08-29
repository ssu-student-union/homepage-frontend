import { useState, useEffect } from 'react';

interface RenderImageProps {
  category: string;
  subCategory: string;
}

function getImagePaths(category: string, subCategory: string) {
  const basePath = `/homepage-frontend/src/assets/image/intro/${category}/${subCategory}`;
  return {
    xs: `${basePath}/xs.png`,
    sm: `${basePath}/sm.jpg`,
    md: `${basePath}/md.jpg`,
    lg: `${basePath}/lg.jpg`,
    xl: `${basePath}/xl.jpg`,
  };
}

export function RenderImage({ category, subCategory }: RenderImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const updateImageSrc = () => {
    const screenWidth = window.innerWidth;
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
  };

  useEffect(() => {
    updateImageSrc();
    window.addEventListener('resize', updateImageSrc);

    return () => {
      window.removeEventListener('resize', updateImageSrc);
    };
  }, [category, subCategory]);

  if (!imageSrc) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="h-auto w-full">
      <img src={imageSrc} alt="이미지" className="h-auto w-full" />
    </div>
  );
}
