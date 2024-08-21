import { useState, useEffect } from 'react';
import { Size } from '@/components/PostCard/const/state';

export function useResponseHook() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [size, setSize] = useState<Size>(Size.default);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 720) {
        setItemsPerPage(5);
        setSize(Size.small);
      } else if (width < 1440) {
        setItemsPerPage(5);
        setSize(Size.medium);
      } else if (width < 1920) {
        setItemsPerPage(6);
        setSize(Size.default);
      } else {
        setItemsPerPage(9);
        setSize(Size.default);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { itemsPerPage, size };
}
