import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';

export const useContentWidth = () => {
  const [contentWidth, setContentWidth] = useState(1520); // 초기값은 1520px
  const { width } = useResize();

  useEffect(() => {
    if (width >= 1520) {
      setContentWidth(1520);
    } else if (width >= 1040 && width < 1520) {
      setContentWidth(1040);
    } else if (width >= 936 && width < 1040) {
      setContentWidth(936);
    } else if (width >= 590 && width < 936) {
      setContentWidth(596);
    } else if (width <= 590) {
      setContentWidth(316);
    }
  }, [width]);

  return contentWidth;
};
