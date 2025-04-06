import { useState, useEffect } from 'react';
import { Size } from '@/components/deprecated/PostCard/const/state';
import { useResize } from '@/hooks/useResize';

export function useResponseBoard() {
  const { width } = useResize();
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [size, setSize] = useState<Size>(Size.default);

  useEffect(() => {
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
  }, [width]);

  return { itemsPerPage, size };
}
