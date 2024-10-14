import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';


export const useContentWidth = () => {
  const [contentWidth, setContentWidth] = useState(1520); // 초기값은 1520px
  const { width } = useResize();

  useEffect(() => {
    if (width >= 1440) {
      setContentWidth(1520);
    } else if (width >= 1080 && width < 1440) {
      setContentWidth(1040);
    } else if (width >= 720 && width < 1080) {
      setContentWidth(936);
    } else if (width >= 390 && width < 720) {
      setContentWidth(596);
    } else {
      setContentWidth(316);
    }
  }, [width]);

  return contentWidth;
};