import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useResize } from './useResize';

export const useIsOverflow = <T extends HTMLElement>(): [React.RefObject<T>, boolean] => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const { width: windowWidth } = useResize();

  const checkOverflow = useCallback(() => {
    const element = ref.current;
    if (element) {
      setIsOverflow(element.scrollWidth > element.clientWidth || windowWidth < 1741);
    }
  }, [windowWidth]);

  useLayoutEffect(() => {
    checkOverflow();
  }, [checkOverflow]);

  return [ref, isOverflow];
};
