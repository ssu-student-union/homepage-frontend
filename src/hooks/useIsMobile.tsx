import { useEffect, useState } from 'react';

const getIsMobile = () => window.matchMedia('(max-width: 1439px)').matches;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const handler = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile;
};
