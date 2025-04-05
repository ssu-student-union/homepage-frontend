import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * @deprecated 훅으로 리팩토링 필요
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
