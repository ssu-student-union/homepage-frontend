import { useEffect, useState } from 'react';

const getIsSmall = () => window.matchMedia('(max-width: 1439px)').matches;

export const useHeaderSize = () => {
  const [isMobile, setIsMobile] = useState(getIsSmall());

  useEffect(() => {
    const handler = () => setIsMobile(getIsSmall());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile;
};
